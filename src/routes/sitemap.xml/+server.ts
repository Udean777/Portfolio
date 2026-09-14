import type { RequestHandler } from '@sveltejs/kit';

const SITE_URL = 'https://sajudin.my.id';

const LAST_MODIFIED = '2026-09-14';

const pageImages = [
	{
		loc: `${SITE_URL}/images/sajudin-2.webp`,
		title: "Sajudin Ma'ruf profile photo",
		caption: "Sajudin Ma'ruf, Frontend and Mobile Developer."
	},
	{
		loc: `${SITE_URL}/images/vivnio.webp`,
		title: 'Vivnio.com project',
		caption: 'A SvelteKit digital invitation platform.'
	},
	{
		loc: `${SITE_URL}/images/bareuang.webp`,
		title: 'Bareuang project',
		caption: 'A local-first personal finance app.'
	},
	{
		loc: `${SITE_URL}/images/the-habits.webp`,
		title: 'The Habits project',
		caption: 'A simple mobile todo list app.'
	},
	{
		loc: `${SITE_URL}/images/fun-english.webp`,
		title: 'Fun English project',
		caption: 'An interactive English learning app for children.'
	},
	{
		loc: `${SITE_URL}/images/keycoach.webp`,
		title: 'Keycoach project',
		caption: 'A touch typing coach for deliberate practice.'
	},
	{
		loc: `${SITE_URL}/images/henka-convert.webp`,
		title: 'Henka Convert project',
		caption: 'A local-first media, document, and data converter.'
	}
];

function escapeXml(value: string) {
	return value.replace(
		/[<>&'\"]/g,
		(character) =>
			({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character] ?? character
	);
}

export const GET: RequestHandler = () => {
	const imageEntries = pageImages
		.map(
			(image) => `
    <image:image>
      <image:loc>${escapeXml(image.loc)}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>`
		)
		.join('');

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
    ${imageEntries}
  </url>
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=86400, s-maxage=86400'
		}
	});
};
