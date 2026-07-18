import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    author?: string;
}

export const SEO = ({
    title = 'Misbah | Data Analyst & Automation Engineer',
    description = 'Data analyst specializing in PostgreSQL, Python scripting, workflow automation, LLM agents, and problem solving. Building systems that research, process, and deliver insights.',
    image = '/og-image.png',
    url = '',
    type = 'website',
    publishedTime,
    author = 'Misbah',
}: SEOProps) => {
    const siteUrl = import.meta.env.VITE_SITE_URL || 'https://yourdomain.com';
    const fullUrl = `${siteUrl}${url}`;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': type === 'article' ? 'Article' : 'WebSite',
        name: title,
        description: description,
        url: fullUrl,
        image: fullImage,
        ...(type === 'article' && publishedTime
            ? {
                datePublished: publishedTime,
                author: {
                    '@type': 'Person',
                    name: author,
                },
            }
            : {}),
    };

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullImage} />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

            {/* Canonical URL */}
            <link rel="canonical" href={fullUrl} />
        </Helmet>
    );
};
