// Cloudflare Pages Function for handling contact form submissions
// This runs on Cloudflare's edge network (serverless)

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

interface Env {
    EMAILJS_SERVICE_ID: string;
    EMAILJS_TEMPLATE_ID: string;
    EMAILJS_PUBLIC_KEY: string;
    EMAILJS_PRIVATE_KEY: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
    const { request, env } = context;

    // CORS headers
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight request
    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        // Parse request body
        const formData: ContactFormData = await request.json();

        // Validate input
        if (!formData.name || !formData.email || !formData.message) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return new Response(
                JSON.stringify({ error: 'Invalid email format' }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        // Check environment variables
        if (!env.EMAILJS_SERVICE_ID || !env.EMAILJS_TEMPLATE_ID || !env.EMAILJS_PUBLIC_KEY || !env.EMAILJS_PRIVATE_KEY) {
            console.error('Missing EmailJS environment variables');
            return new Response(
                JSON.stringify({ error: 'Server configuration error' }),
                {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        // Send email via EmailJS API
        const emailJsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: env.EMAILJS_SERVICE_ID,
                template_id: env.EMAILJS_TEMPLATE_ID,
                user_id: env.EMAILJS_PUBLIC_KEY,
                accessToken: env.EMAILJS_PRIVATE_KEY,
                template_params: {
                    title: `[PPProject] New Contact from ${formData.name}`,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                },
            }),
        });

        if (!emailJsResponse.ok) {
            const errorText = await emailJsResponse.text();
            console.error('EmailJS API error:', errorText);
            return new Response(
                JSON.stringify({ error: 'Failed to send email' }),
                {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            );
        }

        // Success response
        return new Response(
            JSON.stringify({
                success: true,
                message: 'Email sent successfully'
            }),
            {
                status: 200,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error('Error processing contact form:', error);
        return new Response(
            JSON.stringify({ error: 'Internal server error' }),
            {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        );
    }
}
