export interface ProjectItem {
	name: string;
	description: string;
	icon: string;
	href: string;
}

export const projects: ProjectItem[] = [
	{
		name: 'The Habits',
		description: 'A habit tracker app that helps you build good habits and break bad ones.',
		icon: '/images/the-habits.png',
		href: 'https://play.google.com/store/apps/details?id=com.ssajudin.the_habits&hl=id'
	},
	{
		name: 'Uang Bijak',
		description: 'A Expense tracker app that helps you manage your money.',
		icon: '/images/UangBijak.png',
		href: 'https://play.google.com/store/apps/details?id=com.ssajudn.expensetracker'
	},
	{
		name: 'Kaosnyaman',
		description: 'A POS system for selling t-shirts and other products.',
		icon: '/images/kaosnyaman.png',
		href: 'https://play.google.com/store/apps/details?id=com.udeans.kaosnyaman'
	},
	{
		name: 'JDMStore',
		description: 'A POS system for selling t-shirts and other products.',
		icon: '/images/jdm.png',
		href: 'https://play.google.com/store/apps/details?id=com.kitakale.JDMStore'
	}
];
