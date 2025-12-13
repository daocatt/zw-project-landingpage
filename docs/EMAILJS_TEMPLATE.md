# EmailJS Template Configuration

## Template Variables

Your EmailJS template should use these variables:

```
{{title}}    - Email subject with [PPProject] prefix
{{name}}     - Sender's name
{{email}}    - Sender's email address
{{message}}  - Message content
```

## Recommended Template

### Subject Line:
```
{{title}}
```

### Email Body:
```
New contact form submission from your website.

From: {{name}}
Email: {{email}}

Message:
{{message}}

---
This email was sent from the contact form on your website.
```

## Example Output

When a user submits the form, you'll receive:

**Subject**: `[PPProject] New Contact from John Doe`

**Body**:
```
New contact form submission from your website.

From: John Doe
Email: john@example.com

Message:
I'm interested in your services. Please contact me.

---
This email was sent from the contact form on your website.
```

## Setup in EmailJS Dashboard

1. Go to [EmailJS Templates](https://dashboard.emailjs.com/admin/templates)
2. Create or edit your template
3. Use the variables above in your template
4. Save and test

## Environment Variables (Cloudflare Pages)

Set these in Cloudflare Pages → Settings → Environment variables:

```
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
```

That's it! Your contact form will now send emails with the [PPProject] prefix in the subject line.
