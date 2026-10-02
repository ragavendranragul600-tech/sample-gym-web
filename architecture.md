# IronForge Fitness - Architecture & Code Explanation

A beginner-friendly guide to understanding how this website works, from frontend to backend.

---

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    BROWSER / CLIENT                       │
│  (User's Computer - runs HTML, CSS, JavaScript)          │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐  │
│  │  index.html                                      │  │
│  │  (Page structure & content)                      │  │
│  ├──────────────────────────────────────────────────┤  │
│  │  css/style.css + css/responsive.css              │  │
│  │  (Visual styling & responsive layouts)           │  │
│  ├──────────────────────────────────────────────────┤  │
│  │  js/main.js                                      │  │
│  │  (Navigation, carousel, interactions)            │  │
│  │                                                  │  │
│  │  js/forms.js                                     │  │
│  │  (Form validation & submission)                  │  │
│  │                                                  │  │
│  │  js/supabase.js                                  │  │
│  │  (Database connection & queries)                 │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
              ↓ (HTTP Requests)
┌─────────────────────────────────────────────────────────┐
│              SUPABASE BACKEND / SERVER                   │
│  (Cloud - stores data, runs security)                    │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐  │
│  │  REST API                                        │  │
│  │  (Handles HTTP requests from browser)            │  │
│  │                                                  │  │
│  │  Database                                        │  │
│  │  ├─ contact_enquiries (form submissions)         │  │
│  │  └─ trial_requests (trial bookings)              │  │
│  │                                                  │  │
│  │  Row Level Security (RLS)                        │  │
│  │  (Protects data - only anon can insert)          │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 Data Flow: Contact Form Submission

Let's trace what happens when someone submits the contact form:

### Step 1: User Fills Form
```html
<!-- HTML: form with input fields -->
<input id="name" type="text" placeholder="e.g. Rahul Sharma">
<input id="email" type="email" placeholder="rahul@example.com">
<button type="submit">SEND ENQUIRY →</button>
```

### Step 2: User Clicks Submit
JavaScript detects the click:
```javascript
// js/forms.js
form.addEventListener('submit', function(e) {
    e.preventDefault();  // Stop normal form behavior
    handleContactFormSubmit(this);
});
```

### Step 3: Client-Side Validation
```javascript
// Validation checks:
// - Is name filled? ✓
// - Is email valid format? ✓
// - Is phone at least 10 digits? ✓
// - Is message not too long? ✓

if (!validation.valid) {
    showFormError(statusEl, "Please enter valid email");
    return;  // Stop here, don't send
}
```

### Step 4: Send to Supabase
```javascript
// js/supabase.js
await window.DatabaseService.submitContactEnquiry({
    name: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul@example.com",
    interested_program: "Strength Training",
    message: "I'm interested in joining"
});

// This makes an HTTP request:
// POST https://your-project.supabase.co/rest/v1/contact_enquiries
// With the form data in the body
```

### Step 5: Supabase Processes Request
```
1. Receives HTTP POST request
2. Checks Row Level Security (RLS):
   - Is this an INSERT? ✓
   - Is the user anonymous? ✓
   - Does RLS policy allow? ✓
3. Validates data
4. Inserts into contact_enquiries table
5. Returns success (or error)
```

### Step 6: Browser Gets Response
```javascript
// Response comes back:
// {id: "uuid-123", name: "Rahul Sharma", ...}

// JavaScript shows success message:
showFormSuccess(
    statusEl,
    "Thank you! Your enquiry has been received."
);

// Form is cleared:
form.reset();

// User sees green success box
```

### Step 7: Admin Views in Supabase
Admin goes to Supabase Dashboard:
```
1. Click "Table Editor"
2. Click "contact_enquiries"
3. See new row with all form data
4. Can reply to customer email
```

---

## 🔑 Key Concepts

### 1. Frontend vs Backend

**Frontend = What Users See**
- HTML (structure)
- CSS (styling)
- JavaScript (interactions)
- Runs in the browser
- Can be seen by anyone

**Backend = What Users Don't See**
- Database
- Server logic
- Security
- Runs on servers (Supabase)
- Hidden from users

### 2. HTTP Requests

When your JavaScript wants to save data:

```javascript
// Frontend asks Backend:
fetch('https://api.example.com/data', {
    method: 'POST',
    body: { name: "Rahul", email: "..." }
})

// Backend responds:
{ id: 123, status: "success" }
```

### 3. API (Application Programming Interface)

A set of "rules" for how frontend and backend talk.

```
Frontend says:
"Dear Supabase, please insert this data into contact_enquiries table"

Supabase says:
"OK! I inserted it. Here's the ID: 123"
```

### 4. REST API

Supabase uses REST API - the standard way web apps communicate.

```javascript
// CREATE (INSERT)
POST /contact_enquiries
Body: { name: "Rahul", ... }

// READ (SELECT)
GET /contact_enquiries

// UPDATE
PATCH /contact_enquiries?id=eq.123
Body: { name: "New Name" }

// DELETE
DELETE /contact_enquiries?id=eq.123
```

### 5. Authentication & Security

**Public Key (Anon Key)**
- Safe to use in browser
- Can only INSERT
- Can't read or delete
- Limited by Row Level Security

**Service Key**
- Never exposed to browser
- Full database access
- Only for admin/backend
- Would be dangerous in JavaScript

### 6. Row Level Security (RLS)

Database rules that say who can do what:

```sql
-- "Anyone can INSERT" (form submission)
CREATE POLICY "Anyone can insert"
ON contact_enquiries
FOR INSERT
WITH CHECK (true);

-- "Only admins can SELECT" (view all)
CREATE POLICY "Only authenticated can view"
ON contact_enquiries
FOR SELECT
USING (auth.role() = 'authenticated');
```

Means:
- Anonymous users (website visitors) → can submit forms only
- Authenticated users (admins) → can view, edit, delete

---

## 📚 Code Walkthrough

### File 1: index.html

**What it does:** Defines the page structure

```html
<!-- Basic structure -->
<header>...</header>          <!-- Navigation -->
<section id="hero">...</section>      <!-- Hero section -->
<section id="services">...</section>  <!-- Services section -->
<form id="contactForm">...</form>     <!-- Contact form -->
<script src="js/main.js"></script>   <!-- Run JavaScript -->
```

**Key parts:**
- Form has `id="contactForm"` (so JavaScript can find it)
- Input fields have unique `id` (so JavaScript knows which is which)
- Scripts are at the bottom (so HTML loads first)

### File 2: css/style.css

**What it does:** Makes everything look pretty

```css
:root {
    --color-primary: #000000;  /* Black */
    --color-accent: #FFA500;   /* Orange */
}

.navbar {
    position: sticky;          /* Stays at top when scrolling */
    background-color: white;
    padding: 16px;
}

.btn {
    padding: 16px 32px;
    background-color: var(--color-primary);  /* Use black */
    color: white;
}

.btn:hover {
    background-color: var(--color-accent);  /* Change to orange on hover */
}
```

**Key concepts:**
- CSS Variables: `--color-primary` = reusable values
- Selectors: `.btn` = all elements with class "btn"
- Properties: `color`, `padding`, `background-color`

### File 3: js/main.js

**What it does:** Makes interactive features work

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Wait for page to load, then run code
    
    initMobileMenu();      // Make mobile menu work
    initCarousel();        // Make testimonial carousel work
    initBillingToggle();   // Make pricing toggle work
});

function initMobileMenu() {
    const toggle = document.querySelector('.navbar-toggle');
    
    toggle.addEventListener('click', function() {
        // When hamburger menu is clicked:
        this.classList.toggle('active');  // Add/remove 'active' class
        nav.classList.toggle('active');   // Show/hide menu
    });
}
```

**Key concepts:**
- `document.querySelector()` = find HTML element
- `addEventListener()` = listen for events (click, submit, etc.)
- `classList.toggle()` = add/remove CSS class

### File 4: js/forms.js

**What it does:** Handle form submission

```javascript
form.addEventListener('submit', async function(e) {
    e.preventDefault();  // Stop form from reloading page
    
    // Get values from form fields
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        phone: form.querySelector('#phone').value,
    };
    
    // Validate
    if (!isValidEmailFormat(formData.email)) {
        showError("Invalid email!");
        return;
    }
    
    // Send to database
    await DatabaseService.submitContactEnquiry(formData);
    
    // Show success
    showSuccess("Thank you!");
    form.reset();  // Clear form
});
```

**Key concepts:**
- `async/await` = wait for database to respond
- `.value` = get what user typed
- `.reset()` = clear all inputs

### File 5: js/supabase.js

**What it does:** Connect to database and send requests

```javascript
class SupabaseClient {
    constructor(url, key) {
        this.url = url;
        this.key = key;
    }
    
    async insert(table, data) {
        // Make HTTP request to Supabase
        const response = await fetch(
            `${this.url}/rest/v1/${table}`,
            {
                method: 'POST',
                headers: {
                    'apikey': this.key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)  // Convert data to JSON
            }
        );
        
        return await response.json();  // Get response from server
    }
}

class DatabaseService {
    static async submitContactEnquiry(data) {
        // Validate
        if (!data.name || !data.email) {
            throw new Error('Missing required fields');
        }
        
        // Insert
        return await supabase.insert('contact_enquiries', data);
    }
}
```

**Key concepts:**
- `fetch()` = make HTTP request
- `JSON.stringify()` = convert object to text
- `await` = wait for network request
- `throw` = stop and show error

### File 6: supabase-setup.sql

**What it does:** Create database tables and security rules

```sql
-- Create table
CREATE TABLE contact_enquiries (
    id UUID PRIMARY KEY,          -- Unique identifier
    name VARCHAR(255) NOT NULL,   -- Text, required
    email VARCHAR(255) NOT NULL,  -- Email, required
    created_at TIMESTAMP          -- When submitted
);

-- Security: Anyone can INSERT
CREATE POLICY "Anyone can insert"
ON contact_enquiries
FOR INSERT
WITH CHECK (true);

-- Security: Only authenticated users can SELECT
CREATE POLICY "Only auth users can view"
ON contact_enquiries
FOR SELECT
USING (auth.role() = 'authenticated');
```

**Key concepts:**
- `CREATE TABLE` = define data structure
- `VARCHAR(255)` = text up to 255 characters
- `NOT NULL` = must be filled
- `POLICY` = access control rules

---

## 🔄 Communication Flow Diagrams

### Form Submission Flow

```
User Types Name
        ↓
User Clicks Submit
        ↓
JavaScript Listens (addEventListener)
        ↓
preventDefault() - stop page reload
        ↓
Get Values from Form Fields
        ↓
Validate Email/Phone/Name
        ↓
Show Error if Invalid
        ↓ (if valid)
Call DatabaseService.submitContactEnquiry()
        ↓
Make HTTP Request (fetch)
        POST https://api.supabase.co/rest/v1/contact_enquiries
        Headers: { apikey, Content-Type }
        Body: { name, email, phone, ... }
        ↓
Supabase Receives Request
        ↓
Check Row Level Security
        ↓
Validate Data
        ↓
Insert into Database
        ↓
Return Response
        ↓
JavaScript Receives Response
        ↓
Show Success Message
        ↓
Clear Form (reset)
```

### Page Load Flow

```
User Opens Website
        ↓
Browser Requests index.html
        ↓
Server Sends HTML
        ↓
Browser Parses HTML
        ↓
Browser Downloads CSS Files
        ↓
CSS Applies Styling
        ↓
Browser Executes JavaScript
        ↓
JavaScript Runs DOMContentLoaded Event
        ↓
Initialize Features:
  - Mobile Menu
  - Carousel
  - Billing Toggle
  - Smooth Scroll Links
        ↓
Website is Interactive!
```

---

## 🛠️ How to Debug

### Debug in Browser (F12)

```javascript
// Open F12 → Console tab

// See all errors (red)
console.error('Something went wrong');

// See helpful info (blue)
console.log('Form submitted:', formData);

// See warnings (yellow)
console.warn('This might be a problem');
```

### Debug Form Submission

```javascript
// In forms.js, add:
console.log('Form data:', formData);
console.log('Validation result:', validation);
console.log('Supabase response:', response);
```

### Check Network Requests

```
F12 → Network tab

See all HTTP requests:
POST /rest/v1/contact_enquiries → Status 201 (Created)
GET /rest/v1/contact_enquiries → Status 200 (OK)
```

### Check Database

1. Go to Supabase Dashboard
2. Click Table Editor
3. See your data in real time

---

## 🔐 Security Layers

### Layer 1: Client-Side Validation
```javascript
// JavaScript checks before sending
if (!isValidEmail(email)) {
    showError("Invalid email");
    return;  // Don't send
}
```
**Protection:** Catches typos and bad input early

### Layer 2: API Authentication
```javascript
// HTTP request includes public key
headers: {
    'apikey': VITE_SUPABASE_ANON_KEY  // Public key
}
```
**Protection:** Only requests with valid key are processed

### Layer 3: Row Level Security
```sql
-- Supabase checks who is making request
CREATE POLICY "Only insert, no select"
ON contact_enquiries
FOR INSERT WITH CHECK (true);  -- Anyone can insert
FOR SELECT USING (auth.role() = 'authenticated');  -- Only admins can view
```
**Protection:** Even if someone has the API key, they can only insert

### Layer 4: Data Validation
```javascript
// Supabase checks data types
CREATE TABLE contact_enquiries (
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL
);
```
**Protection:** Bad data is rejected by the database

---

## 🚀 Performance Optimization

### Why No Framework?
- **Faster:** No JavaScript framework overhead
- **Smaller:** No library files to download
- **Simpler:** Easy for beginners to understand

### How It Stays Fast
- CSS variables (small file size)
- No external dependencies
- Lazy loading images
- Minified assets (recommended)
- Cached assets on Vercel edge

### Measuring Performance
Use Google Lighthouse:
```
F12 → Lighthouse → Analyze

Scores:
- Performance: 90+ ✓
- Accessibility: 95+ ✓
- Best Practices: 90+ ✓
- SEO: 95+ ✓
```

---

## 📚 Learning Path

### Beginner
1. Read index.html (understand HTML structure)
2. Read css/style.css (understand CSS)
3. Modify colors in `:root` variables
4. Change text in HTML

### Intermediate
1. Read js/main.js (understand JavaScript)
2. Modify navigation links
3. Change button styles
4. Add new sections

### Advanced
1. Read js/supabase.js (understand REST API)
2. Modify form fields
3. Add new database tables
4. Create admin dashboard

---

## 🔗 File Dependencies

```
index.html
├── Requires: css/style.css
├── Requires: css/responsive.css
├── Requires: js/supabase.js
├── Requires: js/forms.js
└── Requires: js/main.js

js/forms.js
├── Requires: js/supabase.js (for DatabaseService)
└── Requires: js/main.js (for utility functions)

js/supabase.js
└── Requires: .env.local or environment variables
    (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
```

---

## 🎯 Common Questions

### Q: Where does data get stored?
**A:** Supabase cloud database. Data is safe and encrypted.

### Q: What if someone hacks my public API key?
**A:** They can only submit forms (INSERT), can't read data. RLS protects you.

### Q: Why can't I see form submissions in the website?
**A:** Only admins (with service key) can view. Website visitors can only submit.

### Q: What happens if Supabase is down?
**A:** Forms won't work, but website still loads (static HTML/CSS).

### Q: Can I change the website without technical skills?
**A:** Yes! Edit HTML text, change colors in CSS `:root`. Don't edit JavaScript.

### Q: How do I add more pages?
**A:** Copy index.html, rename to about.html, edit content, add link to navigation.

---

## 📝 Code Style Guide

### HTML
```html
<!-- Use semantic tags -->
<header>
<nav>
<section id="about">
<footer>

<!-- Use descriptive IDs -->
<form id="contactForm">
<input id="emailAddress">

<!-- Use semantic button types -->
<button type="submit">Send</button>
```

### CSS
```css
/* Use CSS variables for colors */
.btn {
    color: var(--color-primary);
}

/* Use meaningful class names -->
.service-card
.trainer-image
.testimonial-slide

/* Mobile-first or desktop-first */
/* Use media queries for responsive */
@media (max-width: 768px) {
    /* Mobile styles */
}
```

### JavaScript
```javascript
// Use descriptive variable names
const contactForm = document.getElementById('contactForm');
const userEmail = form.querySelector('#email').value;

// Use descriptive function names
function validateContactForm(data) { }
function submitContactEnquiry(data) { }

// Use comments for complex logic
// Check if email matches pattern
if (!isValidEmailFormat(email)) { }
```

---

## 🎓 Next Steps

1. **Understand the code** - Read through all files
2. **Make small changes** - Edit text, colors
3. **Test locally** - Run on your computer
4. **Deploy** - Push to GitHub, deploy on Vercel
5. **Monitor** - Check Supabase for submissions
6. **Improve** - Add features, optimize performance

---

**Happy coding! 🚀**

*Last Updated: October 2026*