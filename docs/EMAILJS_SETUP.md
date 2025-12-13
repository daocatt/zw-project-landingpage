# EmailJS Configuration Guide for Cloudflare Pages

This guide will help you set up EmailJS for the contact form with **server-side security**.

## Why Server-Side?

Your EmailJS credentials are now stored **securely on Cloudflare's servers**, not exposed in the frontend code. This prevents:
- ✅ Credential theft
- ✅ API abuse
- ✅ Unauthorized email sending

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create an Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email
5. Copy the **Service ID** (e.g., `service_abc123`)

## Step 3: Create an Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. Save the template and copy the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (also called User ID)
3. Copy it (e.g., `user_abcdefg123456`)

## Step 5: Configure Cloudflare Pages Environment Variables

### In Cloudflare Pages Dashboard:

1. Go to your Cloudflare Pages project
2. Navigate to **Settings** → **Environment variables**
3. Add these three variables for **Production** (and optionally **Preview**):

| Variable Name | Value | Example |
|--------------|-------|---------|
| `EMAILJS_SERVICE_ID` | Your service ID | `service_abc123` |
| `EMAILJS_TEMPLATE_ID` | Your template ID | `template_xyz789` |
| `EMAILJS_PUBLIC_KEY` | Your public key | `user_abcdefg123456` |

4. Click **Save**
5. **Redeploy** your site for changes to take effect

### Important Notes:

- ⚠️ **DO NOT** put these in a `.env` file in your repository
- ⚠️ **DO NOT** commit any `.env` file with real credentials
- ✅ Set them **only** in Cloudflare Pages dashboard
- ✅ They will be available to your serverless function at runtime

## Step 6: Test the Contact Form

1. Deploy your site to Cloudflare Pages
2. Navigate to `/contact` on your live site
3. Fill out and submit the form
4. Check your email for the message

## How It Works

```
User fills form → Frontend sends to /api/contact → 
Cloudflare Function (server-side) → EmailJS API → 
Email sent to you
```

**Your credentials never leave Cloudflare's servers!**

## Template Variables

The contact form sends these variables to EmailJS:

- `from_name` - User's name
- `from_email` - User's email address
- `message` - User's message

Make sure your EmailJS template uses these exact variable names.

## Local Development

For local testing, you can create a `.env` file (which is gitignored):

```bash
EMAILJS_SERVICE_ID=service_abc123
EMAILJS_TEMPLATE_ID=template_xyz789
EMAILJS_PUBLIC_KEY=user_abcdefg123456
```

But remember: **Never commit this file!**

## Troubleshooting

### Error: "Server configuration error"
- Check that all three environment variables are set in Cloudflare Pages
- Redeploy your site after adding variables

### Error: "Failed to send email"
- Check your EmailJS dashboard for delivery status
- Verify your email service is properly connected
- Check spam folder

### CORS errors
- The serverless function handles CORS automatically
- Make sure you're calling `/api/contact` from the same domain

### 404 on /api/contact
- Ensure the `functions/api/contact.ts` file exists
- Cloudflare Pages automatically routes `/api/*` to `functions/api/*`
- Redeploy if needed

## Free Tier Limits

### EmailJS:
- 200 emails per month
- 2 email services
- 2 email templates

### Cloudflare Pages:
- Unlimited requests
- 100,000 function invocations per day
- **Completely free for this use case!**

## Security Benefits

✅ **Credentials protected** - Never exposed to frontend  
✅ **Rate limiting** - Can add if needed  
✅ **Input validation** - Server-side checks  
✅ **No CORS issues** - Same-origin requests  
✅ **Free hosting** - Cloudflare Pages is free  

Your contact form is now secure and production-ready! 🎉
