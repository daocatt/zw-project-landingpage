# 🚀 Quick Start: Fix Email Sending

## The Problem

Your email is failing because **Cloudflare Functions don't work in local Vite development**.

## Quick Fix (Choose One)

### Option A: Test on Cloudflare Pages (Recommended)

1. **Get EmailJS credentials** from https://www.emailjs.com/
2. **Set environment variables** in Cloudflare Pages dashboard:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`
3. **Deploy** and test on your live site

### Option B: Test Locally with Wrangler

1. **Create `.dev.vars` file** in project root:
   ```bash
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   EMAILJS_PUBLIC_KEY=your_public_key
   ```

2. **Run with Wrangler**:
   ```bash
   npm run dev:pages
   ```

3. **Test** at http://localhost:8788

## What I've Done

✅ Installed Wrangler (Cloudflare's local dev tool)  
✅ Added `npm run dev:pages` command for local testing  
✅ Created configuration files (`wrangler.toml`, `.dev.vars.example`)  
✅ Updated `.gitignore` to protect secrets  
✅ Created troubleshooting documentation

## Next Steps

1. **If you want to test locally:**
   - Copy `.dev.vars.example` to `.dev.vars`
   - Add your EmailJS credentials to `.dev.vars`
   - Run `npm run dev:pages`

2. **If you want to test on Cloudflare Pages:**
   - Set environment variables in Cloudflare dashboard
   - Deploy your site
   - Test the contact form

## Need Help?

See the full guide: `docs/EMAIL_TROUBLESHOOTING.md`
