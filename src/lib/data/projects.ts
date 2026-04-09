export interface ProjectLink {
	label: string;
	url: string;
}

export interface ProjectItem {
	name: string;
	description: string;
	icon: string;
	links: ProjectLink[];
	status: 'Live' | 'Building';
	tags: string[];
	featured: boolean;
}

export const projects: ProjectItem[] = [
	{
		name: 'Vivnio.com',
		description: 'Modern platform for wedding invitations and digital services.',
		icon: '/images/apple-touch-icon.png',
		status: 'Live',
		tags: ['Sveltekit', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis'],
		featured: true,
		links: [{ label: 'View Project →', url: 'https://vivnio.com' }]
	},
	{
		name: 'POS System',
		description: 'Point of Sale application built with Flutter & Go for efficient business management.',
		icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
		status: 'Building',
		tags: ['Flutter', 'Golang', 'PostgreSQL'],
		featured: true,
		links: [
			{ label: 'Server Repo →', url: 'https://github.com/Udean777/POS-App-Server' },
			{ label: 'Client Repo →', url: 'https://github.com/Udean777/POS-App-Client' }
		]
	},
	{
		name: 'kaosnyaman',
		description: 'Mobile Point of Sale (POS) system for custom apparel and clothing retail.',
		icon: '/images/kaosnyaman.png',
		status: 'Live',
		tags: ['React Native', 'TypeScript'],
		featured: true,
		links: [
			{
				label: 'View Project →',
				url: 'https://play.google.com/store/apps/details?id=com.udeans.kaosnyaman'
			}
		]
	},
	{
		name: 'jdmstore',
		description: 'Mobile Point of Sale (POS) system for custom apparel and clothing retail.',
		icon: '/images/jdm.png',
		status: 'Live',
		tags: ['React Native', 'TypeScript'],
		featured: true,
		links: [
			{
				label: 'View Project →',
				url: 'https://play.google.com/store/apps/details?id=com.kitakale.JDMStore'
			}
		]
	},
	{
		name: 'Fun English for EarlyChildhood',
		description: 'Interactive mobile learning application designed for children\'s language development.',
		icon: 'https://play-lh.googleusercontent.com/H2NyS0XV5WAUnc3OmnO6HGaGU9LKwSgjYTke8B5c-qUfdRscDuAvIu6h7YPY84HiBINHLvnbOFLgHFnW8jOUsg=w480-h960-rw',
		status: 'Live',
		tags: ['React Native', 'TypeScript', 'Supabase'],
		featured: true,
		links: [
			{
				label: 'View Project →',
				url: 'https://play.google.com/store/apps/details?id=com.editzproject.fun_english'
			}
		]
	},
	{
		name: 'Portfolio Website',
		description: 'Personal portfolio website showcasing skills and experiences.',
		icon: '/favicon.png',
		status: 'Live',
		tags: ['SvelteKit', 'TailwindCSS'],
		featured: false,
		links: [{ label: 'Link', url: 'https://www.sajudin.my.id/' }]
	},
	{
		name: 'The Habits',
		description: 'A simple and intuitive todo list application to manage daily tasks.',
		icon: '/images/the-habits.png',
		status: 'Live',
		tags: ['Flutter'],
		featured: false,
		links: [
			{ label: 'Link', url: 'https://play.google.com/store/apps/details?id=com.ssajudin.the_habits' }
		]
	},
	{
		name: 'Uang Bijak',
		description: 'An expense tracker app to help manage personal finances.',
		icon: '/images/UangBijak.png',
		status: 'Live',
		tags: ['React Native'],
		featured: false,
		links: [
			{ label: 'Link', url: 'https://play.google.com/store/apps/details?id=com.ssajudn.expensetracker' }
		]
	}
];
