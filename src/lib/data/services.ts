export interface ServiceItem {
	title: string;
	description: string;
	icon: string;
}

export const services: ServiceItem[] = [
	{
		title: 'Web Development',
		description: 'Building fast, responsive, and modern websites using SvelteKit, React, or Next.js.',
		icon: 'fas fa-code'
	},
	{
		title: 'Mobile Development',
		description: 'Creating high-performance cross-platform mobile apps with Flutter or React Native.',
		icon: 'fas fa-mobile-alt'
	},
	{
		title: 'Backend Development',
		description: 'Building robust, scalable server-side logic, high-performance APIs, and efficient database architectures.',
		icon: 'fas fa-server'
	}
];
