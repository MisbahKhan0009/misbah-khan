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
        // 1. Rate Limit
        await checkRateLimit(supabase, ip);

        // 2. Verify Signature
        await verifySignature(req);

        // 3. Parse and Validate
        payload = await req.json();
        const { email } = payload;

        if (!email) throw new Error('Email is required');

        // 4. Core Logic
        // Here we would typically call n8n
        // const n8nWebhookUrl = Deno.env.get('N8N_WEBHOOK_URL')
        // await fetch(n8nWebhookUrl!, { ... })
        console.log(`New subscriber: ${email}`);

        // 5. Log Success
        await logWebhook(supabase, 'newsletter-webhook', 'subscribe', payload, 'success', undefined, ip);

        return new Response(
            JSON.stringify({ message: "subscribed", email }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            },
        )
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';

        // Log Error
        await logWebhook(supabase, 'newsletter-webhook', 'subscribe', payload, 'error', message, ip);

        return new Response(
            JSON.stringify({ error: message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            },
        )
    }
})
