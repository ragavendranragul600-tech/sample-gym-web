# Vercel Deployment Guide - IronForge Fitness

Deploy your IronForge Fitness website to production on Vercel in 10 minutes.

---

## Prerequisites

You will need:

1. **GitHub Account** (free) - [github.com](https://github.com)
2. **Vercel Account** (free) - [vercel.com](https://vercel.com)
3. **Supabase Project** (free) - [supabase.com](https://supabase.com)
   - Credentials ready (URL + Anon Key)
   - Database tables created (run supabase-setup.sql)

---

## Step 1: Prepare Your Code

### 1.1 Clone to a Local Folder
```bash
# Make sure you have Git installed
# https://git-scm.com/download

# Navigate to a folder where you want to keep the project
cd ~/Projects

# Clone the repository (or download and unzip)
git clone <your-repo-url>
cd ironforge-fitness
```

### 1.2 Verify Project Structure
```bash
# You should see these files:
ls -la

# Should include:
# index.html
# css/style.css
# css/responsive.css
# js/main.js
# js/supabase.js
# js/forms.js
# supabase-setup.sql
# .env.example
# README.md
```

### 1.3 Create .env.local (Don't Push to Git)
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
# DO NOT commit this to GitHub
```

Update `.env.local`:
```
VITE_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### 1.4 Add to .gitignore
Create/update `.gitignore`:
```
.env.local
.env*.local
node_modules/
.DS_Store
.vscode/
dist/
```

---

## Step 2: Push to GitHub

### 2.1 Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the **"+"** icon in the top right
3. Select **"New repository"**
4. Fill in:
   - **Repository name:** `ironforge-fitness`
   - **Description:** "Premium gym website with Supabase"
   - **Public** or **Private** (your choice)
   - **Skip** "Add README" (we already have one)
5. Click **"Create repository"**

### 2.2 Push Your Code

```bash
# Navigate to your project folder
cd ~/Projects/ironforge-fitness

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - IronForge Fitness website"

# Add remote
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ironforge-fitness.git

# Push to GitHub
git push -u origin main
```

**GitHub should now show your files!**

---

## Step 3: Deploy on Vercel

### 3.1 Create Vercel Project

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Paste your GitHub URL or authorize Vercel to access GitHub
5. Select `ironforge-fitness` repository
6. Click **"Import"**

### 3.2 Configure Project

Vercel should auto-detect this is a static site. You'll see:

- **Project name:** `ironforge-fitness` (can change)
- **Framework Preset:** None (or Other)
- **Root Directory:** ./

**Click "Deploy"** and wait... (this will fail on first try, that's okay!)

### 3.3 Add Environment Variables

After the first deployment fails:

1. Go to your Vercel project
2. Click **"Settings"** tab
3. Go to **"Environment Variables"** (left sidebar)
4. Add variables:

```
Name: VITE_SUPABASE_URL
Value: https://your-project-id.supabase.co
```

Click **"Add"**

```
Name: VITE_SUPABASE_ANON_KEY
Value: your-actual-anon-key-here
```

Click **"Add"**

### 3.4 Redeploy

1. Go back to the **"Deployments"** tab
2. Find the failed deployment
3. Click **"Redeploy"**
4. Choose **"Use existing Environment Variables"**
5. Click **"Redeploy"**

**Wait 1-2 minutes...**

✅ **Success!** You should see a green checkmark and a live URL!

---

## Step 4: Verify Deployment

### 4.1 Test the Website

1. Click the live URL (e.g., `https://ironforge-fitness.vercel.app`)
2. Website should load
3. Try filling the contact form
4. Submit
5. Check Supabase for the submission

### 4.2 Test All Features

- [ ] Navigation links work
- [ ] Mobile menu works
- [ ] Images load
- [ ] Carousel works
- [ ] Forms submit
- [ ] WhatsApp button works
- [ ] Mobile layout looks good (test on phone)

### 4.3 Check Console for Errors

```bash
# Open browser developer tools
F12 or Right-click → Inspect

# Click "Console" tab
# Should see message: "✓ Supabase client initialized"
# No red errors
```

---

## Step 5: Custom Domain (Optional)

### 5.1 Add Custom Domain

1. Go to Vercel project **Settings**
2. Click **"Domains"**
3. Enter your domain (e.g., `ironforgefit.in`)
4. Click **"Add"**
5. Vercel will show DNS records to update

### 5.2 Update DNS

Follow Vercel's instructions for your domain registrar:

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Update DNS records as shown by Vercel
3. Wait 5-30 minutes for DNS propagation
4. Refresh your domain - should load your Vercel app

---

## Troubleshooting

### Issue: "Deploy failed"

**Solution:**
1. Check Vercel build logs (click the failed deployment)
2. Look for error messages
3. Common issues:
   - Missing `.env.local` (this is OK, use Vercel env vars instead)
   - Syntax errors in HTML/JS
   - Bad credentials

### Issue: "Forms don't submit"

**Solution:**
1. Open browser console (F12)
2. Check for error messages
3. Verify environment variables in Vercel are set correctly
4. Verify Supabase tables exist and RLS policies are correct
5. Try submitting again

### Issue: "Page shows but looks broken"

**Solution:**
1. Check if CSS is loading:
   - F12 → Network tab
   - Look for style.css, responsive.css
   - Should have status 200
2. Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
3. Clear browser cache
4. Try different browser

### Issue: "Can't see my changes after pushing"

**Solution:**
1. Vercel redeploys automatically (watch Deployments tab)
2. Wait 2-5 minutes for build to complete
3. Hard refresh browser
4. Check the "Production" deployment, not preview

---

## Continuous Deployment (Auto-Deploy)

Vercel automatically redeploys when you push to GitHub!

### Workflow:

1. Make changes locally
   ```bash
   # Edit files...
   git add .
   git commit -m "Update feature X"
   git push
   ```

2. Watch Vercel redeploy automatically
   - Go to Vercel Dashboard → Deployments tab
   - New deployment will start
   - Wait for green checkmark

3. Changes are **live** when checkmark is green

---

## Managing Environments

### Production vs Preview

**Production:** Main website (from `main` branch)
- URL: `ironforge-fitness.vercel.app`
- Uses prod environment variables
- Google indexable

**Preview:** For testing pull requests
- URL: `ironforge-fitness-pr-1.vercel.app`
- Uses same environment
- Good for testing before merging

### Promoting Deployments

To use an older deployment as production:

1. Go to Deployments
2. Find the deployment you want
3. Click **"..."** menu
4. Select **"Promote to Production"**

---

## Monitoring & Logs

### View Build Logs
1. Go to Deployments tab
2. Click on any deployment
3. See real-time build log
4. Expand sections for details

### View Runtime Logs
1. Click **"Logs"** tab
2. See edge function logs (if used)
3. Errors will appear here

### Analytics (Vercel Pro)
- Visit count, response times, edge caching info
- Available in Web Analytics (not on free plan)

---

## Updating Code

### Simple Update (No environment changes)

```bash
# Make changes
vim index.html  # or use your editor

# Commit and push
git add .
git commit -m "Update homepage content"
git push

# Vercel auto-deploys!
```

### Update with Environment Variable Changes

If you change `.env.example`:

1. Update the example file locally
2. Add the new variable to Vercel dashboard
3. Push to GitHub
4. Vercel redeploys with new variables

---

## Rollback (Revert to Previous Version)

If something breaks:

1. Go to Vercel Deployments
2. Find the last good deployment
3. Click **"..."** menu
4. Click **"Promote to Production"**
5. Website reverts immediately!

Alternatively:

```bash
# Revert the last commit locally
git revert HEAD

# Push
git push

# Vercel redeploys with the reverted code
```

---

## Performance Optimization

### Image Optimization (Vercel)

Vercel automatically optimizes images:
- Converts to WebP
- Resizes for device
- Caches on edge

### CSS & JS Minification

Add to next deployment:
1. Minify CSS: Use an online tool or build process
2. Minify JS: Same
3. Push to GitHub
4. Vercel redeploys

### Caching Headers (Auto-Set by Vercel)

Vercel sets optimal caching headers:
- HTML: No cache (always fresh)
- CSS/JS: 1-year cache (with hash)
- Images: Long cache

---

## Security Checklist

- [ ] No credentials in `.env.local` pushed to Git (use .gitignore)
- [ ] `.env.example` has placeholders only
- [ ] Supabase anon key in Vercel, not service key
- [ ] Row Level Security policies are correct
- [ ] Privacy policy is visible on website
- [ ] Contact form validates input
- [ ] HTTPS is enforced (automatic on Vercel)

---

## Performance Metrics

### Check Lighthouse Score

1. Open website in Chrome
2. Press F12
3. Click "Lighthouse" tab
4. Click "Analyze page load"
5. Scores:
   - **Performance:** 90+
   - **Accessibility:** 95+
   - **Best Practices:** 90+
   - **SEO:** 95+

If scores are lower:
- Compress images
- Minify CSS/JS
- Reduce animations

---

## Scaling (If Needed Later)

### From Static to Dynamic

If you need:
- Server-side rendering
- Backend functions
- Database queries

Upgrade to:
- **Vercel Functions** (serverless)
- **Next.js** (React framework)
- Custom Node.js API

(Not needed for current website)

---

## Support & Resources

### Vercel Docs
- [Deployment Guide](https://vercel.com/docs/deployments/overview)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Custom Domains](https://vercel.com/docs/concepts/projects/custom-domains)

### Supabase Docs
- [Supabase Setup](https://supabase.com/docs/guides/database/setup)
- [REST API](https://supabase.com/docs/reference/api)

### Community Help
- [Vercel Community](https://vercel.com/help/contact)
- [Supabase Community](https://discord.com/invite/hYBJPbz)

---

## Quick Reference Commands

```bash
# Clone repo
git clone <url>
cd ironforge-fitness

# Create env file
cp .env.example .env.local
# Edit .env.local with your credentials

# Push to GitHub
git add .
git commit -m "message"
git push

# After first Vercel deploy, redeploy with env vars:
# 1. Add env vars in Vercel dashboard
# 2. Click "Redeploy"

# Update website
git add .
git commit -m "new changes"
git push
# Vercel auto-deploys!
```

---

**Congratulations! Your website is now live on Vercel! 🎉**

---

*Last Updated: October 2026*