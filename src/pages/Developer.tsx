import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { Check, Copy, Terminal, Globe, Shield, Zap, AlertCircle } from 'lucide-react';

const DeveloperPage = () => {
    const [label, setLabel] = useState('');
    const [webhookUrl, setWebhookUrl] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedConfig, setGeneratedConfig] = useState<{ apiKey: string; secret: string } | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!label || !webhookUrl) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            setIsGenerating(true);

            // Generate random strings for API Key and Secret
            const apiKey = `sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
            const secret = `whsec_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

            const { error } = await supabase.from('developer_webhooks').insert({
                label,
                url: webhookUrl,
                api_key: apiKey,
                secret: secret,
            } as any);

            if (error) throw error;

            setGeneratedConfig({ apiKey, secret });
            toast.success('Webhook registered successfully!');
        } catch (err) {
            console.error(err);
            toast.error('Failed to register webhook. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${type} copied to clipboard`);
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SEO
                title="Developer Portal | AI Automation Studio"
                description="Public API and Webhook documentation. Connect your systems to our automation ecosystem."
            />
            <Navigation />

            <main className="container pt-32 pb-24">
                {/* Hero Section */}
                <section className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge variant="outline" className="mb-4 border-primary/20 text-primary px-3 py-1 font-mono tracking-tighter uppercase">
                            Developer Portal
                        </Badge>
                        <h1 className="font-display text-5xl md:text-7xl tracking-tighter mb-6">
                            Connect to the <span className="text-primary italic">Studio.</span>
                        </h1>
                        <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
                            Register your webhooks to receive real-time updates when new projects are launched or articles are published.
                        </p>
                    </motion.div>
                </section>

                <Tabs defaultValue="setup" className="w-full">
                    <TabsList className="bg-card/50 border border-border/50 mb-8 rounded-full p-1 h-auto overflow-x-auto whitespace-nowrap">
                        <TabsTrigger value="setup" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-background">
                            Webhook Setup
                        </TabsTrigger>
                        <TabsTrigger value="tutorial" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-background">
                            Step-by-Step Guide
                        </TabsTrigger>
                        <TabsTrigger value="docs" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-background">
                            API Documentation
                        </TabsTrigger>
                        <TabsTrigger value="security" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-background">
                            Security & Verification
                        </TabsTrigger>
                    </TabsList>

                    <AnimatePresence mode="wait">
                        <TabsContent value="setup">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="grid md:grid-cols-2 gap-8"
                            >
                                {/* Registration Form */}
                                <Card className="bg-card/40 backdrop-blur-sm border-border/50">
                                    <CardHeader>
                                        <CardTitle className="font-display text-2xl">Setup Webhook</CardTitle>
                                        <CardDescription>Enter your endpoint details to start receiving events.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {!generatedConfig ? (
                                            <form onSubmit={handleGenerate} className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Instance Label</label>
                                                    <Input
                                                        placeholder="e.g. My n8n Cloud / Discord Bot"
                                                        value={label}
                                                        onChange={(e) => setLabel(e.target.value)}
                                                        className="bg-background/50 border-primary/10"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Webhook URL</label>
                                                    <Input
                                                        placeholder="https://your-domain.com/webhook"
                                                        value={webhookUrl}
                                                        onChange={(e) => setWebhookUrl(e.target.value)}
                                                        className="bg-background/50 border-primary/10"
                                                    />
                                                </div>
                                                <Button
                                                    type="submit"
                                                    disabled={isGenerating}
                                                    className="w-full bg-primary text-background border border-transparent hover:bg-transparent hover:border-primary hover:text-primary rounded-xl h-12 font-bold transition-all duration-300"
                                                >
                                                    {isGenerating ? 'Registering...' : 'Generate API Access'}
                                                </Button>
                                                <p className="text-[10px] text-center text-muted-foreground/60 font-mono">
                                                    BY REGISTERING, YOU AGREE TO RECEIVE PAYLOADS AT THE SPECIFIED URL.
                                                </p>
                                            </form>
                                        ) : (
                                            <div className="space-y-6">
                                                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-start gap-4">
                                                    <AlertCircle className="text-primary shrink-0" size={20} />
                                                    <p className="text-xs text-primary/80 leading-relaxed">
                                                        Store these credentials securely. For security reasons, the API Key and Secret will never be shown again.
                                                    </p>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-mono text-muted-foreground uppercase">API Key</label>
                                                        <div className="flex gap-2">
                                                            <Input readOnly value={generatedConfig.apiKey} className="bg-background/50 border-border/50 font-mono text-xs" />
                                                            <Button variant="outline" size="icon" onClick={() => copyToClipboard(generatedConfig.apiKey, 'API Key')}>
                                                                <Copy size={14} />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-mono text-muted-foreground uppercase">Webhook Secret</label>
                                                        <div className="flex gap-2">
                                                            <Input readOnly value={generatedConfig.secret} className="bg-background/50 border-border/50 font-mono text-xs" />
                                                            <Button variant="outline" size="icon" onClick={() => copyToClipboard(generatedConfig.secret, 'Secret')}>
                                                                <Copy size={14} />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button
                                                    onClick={() => setGeneratedConfig(null)}
                                                    variant="ghost"
                                                    className="w-full text-muted-foreground hover:text-foreground"
                                                >
                                                    Register another webhook
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Info Points */}
                                <div className="space-y-6 flex flex-col justify-center">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Zap size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1">Real-time Events</h4>
                                            <p className="text-sm text-muted-foreground">Get notified milliseconds after content is published or projects are updated.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Shield size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1">HMAC Verification</h4>
                                            <p className="text-sm text-muted-foreground">Every request is signed with your secret. Verify origins using SHA-256 HMAC.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                            <Terminal size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1">n8n First</h4>
                                            <p className="text-sm text-muted-foreground">Designed to work seamlessly with n8n HTTP Request and Webhook Response nodes.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="tutorial">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="space-y-12 max-w-4xl"
                            >
                                <div className="space-y-4">
                                    <h3 className="font-display text-3xl tracking-tighter">Automate with n8n</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Follow this guide to connect your n8n workflows to the studio's event stream in less than 5 minutes.
                                    </p>
                                </div>

                                <div className="grid gap-12 relative">
                                    {/* Step 1 */}
                                    <div className="relative pl-12 border-l-2 border-primary/20">
                                        <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-background font-bold border-4 border-background">1</div>
                                        <h4 className="text-xl font-bold mb-4">The Webhook Listener</h4>
                                        <p className="text-muted-foreground text-sm mb-6">Create a new workflow in n8n and add a <strong>Webhook</strong> node. Set the method to <code>POST</code> and copy the "Production URL" (or Test URL for initial setup).</p>
                                        <div className="bg-card/30 border border-border/50 rounded-2xl p-6 italic text-primary/80 text-sm">
                                            "Paste this URL into the <strong>Webhook Setup</strong> tab on this page to register it."
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="relative pl-12 border-l-2 border-primary/20">
                                        <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-background font-bold border-4 border-background">2</div>
                                        <h4 className="text-xl font-bold mb-4">Security Verification</h4>
                                        <p className="text-muted-foreground text-sm mb-6">Add a <strong>Code</strong> node immediately after the Webhook. This ensures requests are coming from our studio and not an imposter.</p>
                                        <div className="bg-black/60 rounded-xl overflow-hidden shadow-2xl">
                                            <div className="bg-muted px-4 py-2 border-b border-border/50 flex items-center justify-between">
                                                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">n8n_security_validator.js</span>
                                                <Terminal size={12} className="text-muted-foreground" />
                                            </div>
                                            <pre className="p-6 font-mono text-[12px] text-muted-foreground leading-relaxed overflow-x-auto">
                                                {`const crypto = require('crypto');
const secret = 'your_whsec_...'; // Use your generated secret
const signature = $items()[0].json.headers['x-studio-signature'];
const body = JSON.stringify($items()[0].json.body);

const hmac = crypto.createHmac('sha256', secret);
const computed = hmac.update(body).digest('hex');

if (signature !== computed) throw new Error('Invalid signature');
return { verified: true, data: $items()[0].json.body };`}
                                            </pre>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="relative pl-12 border-l-2 border-primary/20">
                                        <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-background font-bold border-4 border-background">3</div>
                                        <h4 className="text-xl font-bold mb-4">Event Routing</h4>
                                        <p className="text-muted-foreground text-sm mb-6">Add a <strong>Switch</strong> node to handle different events like contact forms or new articles.</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                                                <p className="text-[10px] font-mono text-primary mb-2">IF_EVENT:</p>
                                                <p className="text-xs font-bold font-mono">contact.received</p>
                                                <p className="text-[10px] text-muted-foreground mt-2">Route to Discord or Telegram</p>
                                            </div>
                                            <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                                                <p className="text-[10px] font-mono text-primary mb-2">IF_EVENT:</p>
                                                <p className="text-xs font-bold font-mono">article.published</p>
                                                <p className="text-[10px] text-muted-foreground mt-2">Route to RSS or Newsletter</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="relative pl-12">
                                        <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-background font-bold border-4 border-background">4</div>
                                        <h4 className="text-xl font-bold mb-4">Live Test</h4>
                                        <p className="text-muted-foreground text-sm mb-6">Click "Execute Workflow" in n8n, then use the <strong>Contact Form</strong> on our home page. You'll see the data burst into your n8n canvas in real-time.</p>
                                        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline font-bold text-sm">
                                            Go to Contact Form →
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="docs">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-12"
                            >
                                {/* Event Types */}
                                <section>
                                    <h3 className="font-display text-3xl mb-8 tracking-tighter">Event Types</h3>
                                    <div className="grid gap-6">
                                        {[
                                            {
                                                event: 'article.published',
                                                desc: 'Triggered when a new article is made public.',
                                                payload: {
                                                    event: "article.published",
                                                    data: { title: "Scaling Webhooks", slug: "scaling-webhooks", read_time: 8 }
                                                }
                                            },
                                            {
                                                event: 'project.created',
                                                desc: 'Triggered when a new automation project is added.',
                                                payload: {
                                                    event: "project.created",
                                                    data: { title: "n8n Dashboard", category: "Internal Tools", tags: ["n8n", "Dashboard"] }
                                                }
                                            },
                                            {
                                                event: 'contact.received',
                                                desc: 'Triggered when someone submits the contact form.',
                                                payload: {
                                                    event: "contact.received",
                                                    data: { name: "User", email: "user@example.com", message: "Hello!" }
                                                }
                                            }
                                        ].map((item) => (
                                            <Card key={item.event} className="bg-card/40 border-border/50 overflow-hidden">
                                                <div className="p-6 border-b border-border/50 flex items-center justify-between">
                                                    <div>
                                                        <code className="text-primary font-mono text-sm bg-primary/5 px-2 py-1 rounded">{item.event}</code>
                                                        <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                                                    </div>
                                                </div>
                                                <div className="bg-black/40 p-6 font-mono text-[13px] text-muted-foreground">
                                                    <pre>{JSON.stringify(item.payload, null, 2)}</pre>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </section>
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="security">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="max-w-3xl space-y-8"
                            >
                                <h3 className="font-display text-3xl tracking-tighter">Security & Headers</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    All webhook requests originate from our Supabase Edge Runtime. Each request includes standard security headers to ensure integrity.
                                </p>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h4 className="font-bold">Required Headers</h4>
                                        <div className="bg-card/40 border border-border/50 rounded-xl p-4 font-mono text-xs space-y-2">
                                            <div className="flex justify-between border-b border-border/30 pb-2">
                                                <span className="text-primary">x-studio-signature</span>
                                                <span className="text-muted-foreground">HMAC-SHA256 signature</span>
                                            </div>
                                            <div className="flex justify-between border-b border-border/30 pb-2 pt-2">
                                                <span className="text-primary">x-studio-event</span>
                                                <span className="text-muted-foreground">Event name (e.g. article.published)</span>
                                            </div>
                                            <div className="flex justify-between pt-2">
                                                <span className="text-primary">Content-Type</span>
                                                <span className="text-muted-foreground">application/json</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-bold">Verifying Signatures</h4>
                                        <p className="text-sm text-muted-foreground">
                                            We sign the JSON payload using your Webhook Secret. You can verify the `x-studio-signature` header using the following logic:
                                        </p>
                                        <div className="bg-black/40 p-6 rounded-xl font-mono text-[13px] text-muted-foreground overflow-x-auto">
                                            <pre>{`// Node.js Example
const crypto = require('crypto');

const secret = 'your_whsec_...';
const signature = req.headers['x-studio-signature'];
const payload = JSON.stringify(req.body);

const hmac = crypto.createHmac('sha256', secret);
const digest = hmac.update(payload).digest('hex');

if (signature === digest) {
  // Request is valid
}`}</pre>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </TabsContent>
                    </AnimatePresence>
                </Tabs>
            </main>
        </div>
    );
};

export default DeveloperPage;
