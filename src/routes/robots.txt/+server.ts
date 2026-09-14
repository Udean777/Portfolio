import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	const robots = `User-agent: *
Allow: /

Disallow: /.svelte-kit/
Disallow: /node_modules/
Disallow: /src/

Sitemap: https://sajudin.my.id/sitemap.xml
`;

	return new Response(robots, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=86400, s-maxage=86400'
		}
	});
};
