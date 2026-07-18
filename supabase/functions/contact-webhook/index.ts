import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { corsHeaders, verifySignature, logWebhook, checkRateLimit, getClientIP } from '../_shared/webhookUtils.ts';

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const ip = getClientIP(req);
    let payload = {};

    try {
        await checkRateLimit(supabase, ip);
        await verifySignature(req);

        payload = await req.json();
        const { email, message, name } = payload;

        if (!email || !message) {
            throw new Error('Email and message are required');
        }

        console.log(`New contact message from: ${email}`);

        await logWebhook(supabase, 'contact-webhook', 'contact_form', payload, 'success', undefined, ip);

        return new Response(
            JSON.stringify({ message: "Message sent successfully" }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            },
        )
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        await logWebhook(supabase, 'contact-webhook', 'contact_form', payload, 'error', message, ip);

        return new Response(
            JSON.stringify({ error: message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            },
        )
    }
})
