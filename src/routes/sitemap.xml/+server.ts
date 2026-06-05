import type { RequestHandler } from '@sveltejs/kit';

const SITE_URL = 'https://sajudin.my.id';

// Set a fixed build date — update this when you publish new content
const LAST_MODIFIED = '2026-06-01';

export const GET: RequestHandler = () => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${SITE_URL}/favicon.png</image:loc>
      <image:title>Sajudin Ma'ruf — Frontend &amp; Mobile Developer</image:title>
      <image:caption>Portfolio of Sajudin Ma'ruf, a Frontend &amp; Mobile Developer specializing in Svelte and React Native.</image:caption>
    </image:image>
    <image:image>
      <image:loc>${SITE_URL}/images/sajudin.jpeg</image:loc>
      <image:title>Sajudin Ma'ruf Profile Photo</image:title>
    </image:image>
  </url>
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=86400, s-maxage=86400'
		}
	});
};
