# IRONFORGE FITNESS - Website

Premium strength training facility website built with HTML, CSS, Vanilla JavaScript, and Supabase.

**Live Demo:** [ironforge-fitness.vercel.app](https://ironforge-fitness.vercel.app) (after deployment)

---

## 📋 Overview

This is a **sample/demo website** for IRONFORGE FITNESS, a fictional premium gym in Bangalore, India. It showcases:

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Zero frontend dependencies (HTML, CSS, Vanilla JS)
- ✅ Supabase integration for form submissions
- ✅ Contact and trial booking forms
- ✅ Professional animations and interactions
- ✅ SEO-optimized
- ✅ Accessibility compliant

**Important:** This is a demonstration/portfolio website. It does NOT process real payments or create actual memberships.

---

## 🚀 Quick Start

### Local Development

#### 1. Clone/Download the Project
```bash
git clone <repo-url>
cd ironforge-fitness
```

#### 2. Install Dependencies
This project uses **zero npm dependencies**. No installation needed!

If you want to run a local server:
```bash
# Using Python 3
python3 -m http.server 8000

# Or using Node.js (if available)
npx serve

# Or using PHP
php -S localhost:8000
```

Open `http://localhost:8000` in your browser.

#### 3. (Optional) Configure Supabase

If you want form submissions to work:

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and add your Supabase credentials (see Supabase setup below)

**Without Supabase configured:** Forms will show demo messages but won't save data.

---

## 🔧 Supabase Setup

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up / Log in
3. Click "New Project"
4. Fill in:
   - **Name:** IronForge Fitness
   - **Database Password:** Create a strong password
   - **Region:** Your region (e.g., Singapore, India)
5. Wait for the project to initialize (2-3 minutes)

### Step 2: Get Your Credentials

1. Go to Project Settings → API
2. Copy:
   - **Project URL** (anon URL) → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`
3. Paste into `.env.local`

### Step 3: Create Database Tables

1. Go to SQL Editor
2. Click "New Query"
3. Copy the entire contents of `supabase-setup.sql`
4. Paste it into the query editor
5. Click "Run"

Wait for the success message. The tables are now created!

### Step 4: Verify Tables

1. Go to Table Editor
2. You should see:
   - `contact_enquiries`
   - `trial_requests`

### Step 5: Test Form Submission

1. Open the website
2. Fill in the contact form
3. Submit
4. Check Supabase → Table Editor → `contact_enquiries` for your submission

---

## 📁 Project Structure

```
ironforge-fitness/
├── index.html                 # Main HTML page
├── css/
│   ├── style.css             # Main styles
│   └── responsive.css        # Mobile/responsive styles
├── js/
│   ├── main.js              # Main JavaScript (navigation, carousel)
│   ├── supabase.js          # Supabase client & database service
│   └── forms.js             # Form handling & validation
├── supabase-setup.sql       # Database schema & security policies
├── .env.example             # Environment variables template
├── README.md                # This file
└── DEPLOYMENT.md            # Vercel deployment guide
```

### Code Organization

- **HTML:** Single-page design with semantic sections
- **CSS:** Modular system with CSS variables for theming
- **JavaScript:** Separated concerns (navigation, forms, database)
- **No bundling:** Everything works in the browser directly

---

## 🎨 Features & Sections

### 1. Navigation
- Sticky header
- Smooth scroll links
- Mobile hamburger menu
- Active link indicator

### 2. Hero Section
- Full-screen background
- Call-to-action buttons
- Statistics showcase
- Scroll indicator

### 3. About Section
- Facility overview
- Core values/features
- Accreditation display

### 4. Services/Programs
- 6 program cards (grid layout)
- Program details
- Links to learn more

### 5. Trainers
- 4 coach profiles
- Credentials display
- WhatsApp contact links

### 6. Membership Plans
- 3 tier pricing
- Monthly/Annual toggle
- Feature comparison

### 7. Gallery
- 6 facility images
- Hover overlays
- Responsive grid

### 8. Testimonials
- Carousel with dots
- Previous/Next navigation
- Star ratings
- Author info

### 9. Trial CTA
- Full-screen call-to-action
- Prominent buttons

### 10. Contact & Map
- Contact form (connected to Supabase)
- Contact details
- Google Maps embed

### 11. Footer
- Brand info
- Navigation links
- Social media links
- Legal disclaimers

### 12. Floating WhatsApp Button
- Fixed position
- Green branded color
- Direct WhatsApp chat

---

## 🛡️ Security & Safety

### Frontend Security
- ✅ No sensitive data in JavaScript
- ✅ Supabase public/anon key only (not service key)
- ✅ Form validation on client + server
- ✅ HTTPS enforced in production

### Database Security
- ✅ Row Level Security (RLS) enabled
- ✅ Anonymous users can only INSERT
- ✅ Authenticated users (admins) can VIEW/UPDATE/DELETE
- ✅ No direct database exposure

### Data Protection
- ✅ No credit card collection
- ✅ No real payment processing
- ✅ Minimal personal data (name, email, phone)
- ✅ Privacy policy recommended

---

## 📱 Responsive Design

The website is tested and works on:

- **Desktop:** 1920px, 1440px, 1280px ✅
- **Tablet:** 768px, 768px (iPad, landscape) ✅
- **Mobile:** 480px, 360px (iPhone, Android) ✅

Features:
- No horizontal scrolling
- Touch-friendly buttons (44px minimum)
- Readable typography
- Optimized images
- Mobile navigation menu

---

## ♿ Accessibility

The website meets WCAG AA standards:

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Form labels & validation
- ✅ Alt text on images
- ✅ Color contrast ratios
- ✅ Keyboard navigation
- ✅ Focus visible states
- ✅ Reduced motion support

---

## ⚡ Performance

Optimization techniques:

- ✅ Lazy loading images
- ✅ CSS variables for small bundle size
- ✅ No third-party CSS frameworks
- ✅ Minified assets recommended
- ✅ Efficient JavaScript (no polyfills)
- ✅ Google Fonts optional

---

## 🌐 Deployment

### Option 1: Vercel (Recommended)

#### Prerequisites
- GitHub account
- Vercel account
- Supabase project set up

#### Steps

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ironforge-fitness
git push -u origin main
```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     ```
     VITE_SUPABASE_URL = https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY = your-anon-key
     ```
   - Click "Deploy"

3. **Done!** Your site is now live at `ironforge-fitness.vercel.app`

### Option 2: Netlify

1. Push to GitHub (same steps as above)
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Add same environment variables
6. Deploy!

### Option 3: GitHub Pages (Static only, no backend)

1. Push to GitHub
2. Go to repository Settings → Pages
3. Select "Deploy from a branch"
4. Select `main` branch
5. **Note:** Forms won't work without backend; they'll show demo messages

### Option 4: Manual Server

1. Upload all files to your hosting provider via FTP
2. Set environment variables (ask your host how)
3. Ensure Node.js or a simple HTTP server is configured
4. Access via your domain

---

## 🔌 Environment Variables

### For Local Development
Create `.env.local`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### For Vercel/Netlify
Set in deployment platform's environment variables section:
- Same variable names
- Your actual credentials

### Fallback
If environment variables are not set:
- Website still works (static content)
- Form submissions show demo success messages
- No data is saved to database
- Console shows warning

---

## 🐛 Troubleshooting

### Forms Not Submitting

**Problem:** Form submission fails
**Solution:**
1. Check browser console for errors (F12)
2. Verify Supabase credentials in `.env.local`
3. Verify database tables exist in Supabase
4. Check Row Level Security policies are correct

### Page Not Loading

**Problem:** Blank page or errors
**Solution:**
1. Check browser console (F12 → Console tab)
2. Verify all CSS/JS files are loading (Network tab)
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try in Incognito mode

### Supabase Connection Issues

**Problem:** "Supabase is not configured"
**Solution:**
1. Verify credentials are correct (copy again from Supabase)
2. Check for typos in URL/key
3. Verify your Supabase project is "Active" (not paused)
4. Check internet connection

### Images Not Showing

**Problem:** Broken image icons
**Solution:**
1. Images use external URLs (Unsplash)
2. Check internet connection
3. Images may take time to load (lazy loading)
4. Try refreshing page

---

## 📊 Analytics Integration (Optional)

To add Google Analytics:

1. Get your measurement ID from Google Analytics
2. Add to `.env.local`:
```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
3. Add script to `<head>` in `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔄 Data Flow

### Contact Form Submission
```
User fills form
     ↓
Client-side validation (JavaScript)
     ↓
Send to Supabase REST API
     ↓
Server-side validation (Supabase)
     ↓
Row Level Security check
     ↓
Insert into contact_enquiries table
     ↓
Success message to user
```

### Data Security
- ✅ Validation at both ends
- ✅ RLS prevents unauthorized access
- ✅ Only anon key exposed (limited permissions)
- ✅ Service role key never exposed

---

## 📝 Making Changes

### Edit Content
- Open `index.html`
- Find the section you want to change
- Edit HTML/text
- Refresh browser to see changes

### Change Styling
- Open `css/style.css` or `css/responsive.css`
- Modify CSS
- Refresh browser

### Change Colors
In `css/style.css`, modify the `:root` CSS variables:
```css
:root {
    --color-primary: #000000;      /* Black text */
    --color-accent: #FFA500;       /* Orange accent */
    /* ... more colors ... */
}
```

### Add Images
1. Use external URLs (Unsplash, Pexels)
2. Or upload to `assets/images/` folder
3. Update `src` attribute in HTML

---

## 🤝 Contributing

This is a sample/demo website. To improve it:

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Make changes
4. Commit: `git commit -m "Add your feature"`
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Support & Contact

**For Supabase Issues:**
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://discord.com/invite/hYBJPbz)

**For Vercel Issues:**
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)

**For Website Issues:**
- Check the Troubleshooting section above
- Review browser console (F12)
- Check project files for typos

---

## ✅ Deployment Checklist

Before deploying to production:

- [ ] All images load correctly
- [ ] Forms submit successfully
- [ ] Mobile layout looks good
- [ ] No console errors (F12)
- [ ] All links work
- [ ] Contact information is correct
- [ ] WhatsApp number is updated
- [ ] Google Maps location is correct
- [ ] No hardcoded credentials
- [ ] Environment variables are set
- [ ] Privacy policy is linked (footer)
- [ ] Analytics script added (if needed)
- [ ] Performance tested (Lighthouse)
- [ ] Accessibility checked (axe DevTools)

---

## 🎓 Learning Resources

### HTML/CSS/JavaScript
- [MDN Web Docs](https://developer.mozilla.org/)
- [freeCodeCamp](https://www.freecodecamp.org/)

### Supabase
- [Supabase Docs](https://supabase.com/docs)
- [Supabase REST API](https://supabase.com/docs/reference/api)

### Vercel
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Guides](https://nextjs.org/learn)

### Web Performance
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Web.dev](https://web.dev/)

---

## 🔮 Future Enhancements

Potential features to add:

- [ ] Online class booking system
- [ ] Member progress tracking
- [ ] Blog section
- [ ] Client testimonial submission form
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Email notifications
- [ ] Payment integration (if needed later)
- [ ] Admin dashboard
- [ ] Analytics dashboard

---

**Last Updated:** October 2026

**Made with ❤️ for IRONFORGE FITNESS**