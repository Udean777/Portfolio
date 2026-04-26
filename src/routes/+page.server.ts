import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		meta: {
			title: "Sajudin Ma'ruf — Frontend & Mobile Developer",
			description:
				"Sajudin Ma'ruf is a Frontend & Mobile Developer specializing in JavaScript, TypeScript, Svelte, and React Native. Explore my projects and experience.",
			url: 'https://sajudin.my.id/',
			image: 'https://sajudin.my.id/images/profile-img.png'
		}
	};
};
