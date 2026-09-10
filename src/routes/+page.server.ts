import type { PageServerLoad } from './$types';

const SITE_URL = 'https://sajudin.my.id';

export const load: PageServerLoad = async () => {
	return {
		meta: {
			title: "Sajudin Ma'ruf — Frontend & Mobile Developer",
			description:
				"Sajudin Ma'ruf is a Frontend & Mobile Developer building responsive web interfaces and mobile applications with SvelteKit, Flutter, React Native, JavaScript, and TypeScript.",
			url: `${SITE_URL}/`,
			image: `${SITE_URL}/favicon.webp`,
			imageAlt: "Sajudin Ma'ruf — Frontend & Mobile Developer Portfolio",
			imageWidth: '512',
			imageHeight: '512',
			publishedTime: '2024-01-01T00:00:00+07:00',
			modifiedTime: '2026-06-01T00:00:00+07:00',
			locale: 'en_US',
			siteName: "Sajudin Ma'ruf"
		}
	};
};
