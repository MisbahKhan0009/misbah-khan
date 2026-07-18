import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

export const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-webhook-secret',
};

export async function verifySignature(req: Request): Promise<void> {
    const secret = Deno.env.get('WEBHOOK_SECRET');
    if (!secret) {
        console.warn('WEBHOOK_SECRET is not set, skipping signature verification.');
        return;
    }

    const headerSecret = req.headers.get('x-webhook-secret');
    if (headerSecret !== secret) {
        throw new Error('Invalid webhook secret');
    }
}

export async function logWebhook(
    supabase: SupabaseClient,
    functionName: string,
    eventType: string,
    payload: any,
    status: 'success' | 'error',
    errorMessage?: string,
    ip?: string
) {
    try {
        // Sanitize payload if needed (e.g. remove sensitive data), for now keeping it simple
        await supabase.from('webhook_logs').insert({
            function_name: functionName,
            event_type: eventType,
            payload: payload,
            status: status,
            error_message: errorMessage,
            ip_address: ip
        });
    } catch (err) {
        console.error('Failed to log webhook:', err);
    }
}

export async function checkRateLimit(supabase: SupabaseClient, ip: string, limit = 60, windowSeconds = 60) {
    if (ip === 'unknown') return;

    const timeWindow = new Date(Date.now() - windowSeconds * 1000).toISOString();

    // Count requests from this IP in the last windowSeconds
    const { count, error } = await supabase
        .from('webhook_logs')
        .select('id', { count: 'exact', head: true })
        .eq('ip_address', ip)
        .gt('created_at', timeWindow);

    if (error) {
        console.error('Rate limit check failed:', error);
        return; // Fail open to avoid blocking valid traffic on db error
    }

    if (count !== null && count > limit) {
        throw new Error(`Rate limit exceeded. Try again in ${windowSeconds} seconds.`);
    }
}

export function getClientIP(req: Request): string {
    return req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
}

export async function fanOutWebhooks(supabase: SupabaseClient, event: string, data: any) {
    const { data: webhooks, error } = await supabase
        .from('developer_webhooks')
        .select('*')
        .eq('is_active', true);

    if (error || !webhooks) {
        console.error('Failed to fetch developer webhooks:', error);
        return;
    }

    const payload = JSON.stringify({ event, data });

    const results = await Promise.allSettled(webhooks.map(async (webhook) => {
        // Simple signature generation (Hex digest)
        // Note: For a real production system, you'd use SubtleCrypto for speed
        const key = await crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(webhook.secret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["sign"]
        );
        const signatureBuffer = await crypto.subtle.sign(
            "HMAC",
            key,
            new TextEncoder().encode(payload)
        );
        const signature = Array.from(new Uint8Array(signatureBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        try {
            const resp = await fetch(webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-studio-signature': signature,
                    'x-studio-event': event,
                },
                body: payload,
            });
            console.log(`Webhook sent to ${webhook.label}: ${resp.status}`);
        } catch (err) {
            console.error(`Failed to send webhook to ${webhook.label}:`, err);
        }
    }));

    return results;
}
