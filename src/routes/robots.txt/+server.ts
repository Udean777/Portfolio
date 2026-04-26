import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = () => {
	const robots = `User-agent: *
Allow: /

Sitemap: https://sajudin.my.id/sitemap.xml`;

	return new Response(robots, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
