import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	const robots = `# robots.txt for https://sajudin.my.id
# Generated for Google Search Console compliance

# Allow all well-behaved crawlers
User-agent: *
Allow: /
Allow: /sitemap.xml
Allow: /manifest.json
Allow: /images/
Allow: /assets/

# Block common nuisance paths (none in this SPA, but good practice)
Disallow: /.svelte-kit/
Disallow: /node_modules/
Disallow: /src/

# Google-specific directives
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Googlebot for images
User-agent: Googlebot-Image
Allow: /images/
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.webp

# Sitemap declaration (required for Google Search Console submission)
Sitemap: https://sajudin.my.id/sitemap.xml`;

	return new Response(robots, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=86400, s-maxage=86400'
		}
	});
};
