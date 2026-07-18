import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"
import { corsHeaders, verifySignature, logWebhook, checkRateLimit, getClientIP, fanOutWebhooks } from '../_shared/webhookUtils.ts';

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const ip = getClientIP(req);
    let payload: any = {};

    try {
        await checkRateLimit(supabase, ip);
        await verifySignature(req);

        payload = await req.json();
        const { event, data } = payload;

        if (event === 'article.published') {
            // Upsert article
            const { error } = await supabase.from('articles').upsert({
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                content: data.content,
                published: true,
                read_time: data.read_time
            });

            if (error) throw error;

            // Broadcast to public subscribers
            await fanOutWebhooks(supabase, event, data);
        }

        await logWebhook(supabase, 'blog-webhook', event, payload, 'success', undefined, ip);

        return new Response(
            JSON.stringify({ message: "Processed" }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            },
        )
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        await logWebhook(supabase, 'blog-webhook', payload?.event || 'unknown', payload, 'error', message, ip);

        return new Response(
            JSON.stringify({ error: message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            },
        )
    }
})
