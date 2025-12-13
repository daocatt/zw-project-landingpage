# Cloudflare Pages Deployment Guide

## Project Structure

```
/
├── functions/           # Cloudflare Pages Functions (serverless)
│   └── api/
│       └── contact.ts   # Contact form API endpoint
├── dist/               # Build output (auto-generated)
└── ...
```

## Cloudflare Pages Functions

This project uses **Cloudflare Pages Functions** for serverless backend functionality:

- **Endpoint**: `/api/contact`
- **Method**: POST
- **Purpose**: Securely handle contact form submissions
- **Runtime**: Cloudflare Workers (V8 isolates)
- **Cost**: FREE (100,000 requests/day)

## Deployment Steps

### 1. Build the Project

```bash
npm run build
```

This creates the `dist/` folder with your static files.

### 2. Deploy to Cloudflare Pages

#### Option A: Connect Git Repository (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages**
3. Click **Create a project**
4. Connect your GitHub/GitLab repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave empty)
6. Click **Save and Deploy**

#### Option B: Direct Upload

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy dist
```

### 3. Configure Environment Variables

In Cloudflare Pages dashboard:

1. Go to your project → **Settings** → **Environment variables**
2. Add these variables:

```
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
```

3. Click **Save**
4. **Redeploy** for changes to take effect

See [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) for detailed EmailJS configuration.

## How Functions Work

Cloudflare Pages automatically routes requests:

```
/api/contact → functions/api/contact.ts
/api/foo     → functions/api/foo.ts
```

No configuration needed! Just put `.ts` files in `functions/api/`.

## Local Development

### Test Functions Locally

```bash
# Install Wrangler
npm install -g wrangler

# Run dev server with functions
wrangler pages dev dist --compatibility-date=2024-01-01
```

Or use the regular Vite dev server (functions won't work locally):

```bash
npm run dev
```

### Environment Variables for Local Testing

Create `.env` file (gitignored):

```bash
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
```

## Custom Domain

1. In Cloudflare Pages → **Custom domains**
2. Add your domain
3. Cloudflare handles SSL automatically (free)

## Automatic Deployments

When connected to Git:
- ✅ Every push to `main` → Production deployment
- ✅ Every pull request → Preview deployment
- ✅ Automatic builds
- ✅ Instant rollbacks

## Performance

Cloudflare Pages serves your site from **300+ edge locations** worldwide:

- ⚡ Ultra-fast global CDN
- 🔒 Free SSL/TLS
- 🚀 HTTP/3 support
- 📊 Web Analytics (optional)

## Limits (Free Tier)

- ✅ Unlimited bandwidth
- ✅ Unlimited requests
- ✅ 500 builds per month
- ✅ 100,000 function invocations per day
- ✅ 20,000 files per deployment

**Perfect for this project - completely free!**

## Troubleshooting

### Functions not working
- Ensure `functions/` folder is in the root
- Check function syntax (must export `onRequestPost`, etc.)
- Redeploy after adding functions

### Build fails
- Check build command: `npm run build`
- Verify output directory: `dist`
- Check Node.js version compatibility

### Environment variables not working
- Set them in Cloudflare dashboard, not `.env`
- Redeploy after adding variables
- Check variable names match exactly

## Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Functions Documentation](https://developers.cloudflare.com/pages/functions/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

## Why Cloudflare Pages?

✅ **Free** - No credit card required  
✅ **Fast** - Global CDN  
✅ **Secure** - Automatic HTTPS  
✅ **Serverless** - Functions included  
✅ **Git integration** - Auto-deploy  
✅ **No vendor lock-in** - Standard web tech  

Your site is production-ready on Cloudflare Pages! 🚀
