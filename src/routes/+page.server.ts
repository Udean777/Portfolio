import type { PageServerLoad } from './$types';

const SITE_URL = 'https://sajudin.my.id';
const OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;
const PROFILE_IMAGE = `${SITE_URL}/images/sajudin-2.webp`;

export const load: PageServerLoad = async () => {
	return {
		meta: {
			title: "Sajudin Ma'ruf | Frontend & Mobile Developer",
			description:
				"Sajudin Ma'ruf is a Frontend and Mobile Developer in Indonesia building responsive web and mobile apps with SvelteKit, Flutter, and React Native.",
			socialDescription:
				"Explore Sajudin Ma'ruf's portfolio of responsive web experiences and practical apps built with SvelteKit, Flutter, and React Native.",
			url: `${SITE_URL}/`,
			imageAlt: "Sajudin Ma'ruf, Frontend and Mobile Developer",
			imageWidth: '1200',
			imageHeight: '630',
			ogImage: OG_IMAGE,
			profileImage: PROFILE_IMAGE,
			profileImageAlt: "Sajudin Ma'ruf, Frontend and Mobile Developer",
			publishedTime: '2024-01-01T00:00:00+07:00',
			modifiedTime: '2026-09-14T00:00:00+07:00',
			locale: 'en_US',
			siteName: "Sajudin Ma'ruf"
		}
	};
};
