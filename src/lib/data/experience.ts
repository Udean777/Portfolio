export interface ExperienceItem {
	company: string;
	role: string;
	period: string;
	description: string[];
}

export const experiences: ExperienceItem[] = [
	{
		company: 'Vivnio',
		role: 'Frontend Developer',
		period: 'July 2025 - Present',
		description: [
			'Creating an astonishing yet responsive design of the website and Digital Invitations.',
			'Collaborating with stakeholders to translate business requirements into technical solutions.'
		]
	},
	{
		company: 'KitaKale.ID',
		role: 'Mobile Developer',
		period: 'October 2023 - August 2025',
		description: [
			'Developed and maintained high-performance mobile applications.',
			'Focused on creating seamless user experiences and optimizing app stability.'
		]
	},
	{
		company: 'KitaKale.ID',
		role: 'Teach Lead',
		period: 'September 2023 - June 2024',
		description: [
			'Led technical teams and mentored junior developers.',
			'Oversaw technical architecture and code quality standards.'
		]
	},
	{
		company: 'KitaKale.ID',
		role: 'Web Content Writer',
		period: 'January 2023 - June 2024',
		description: [
			'Managed digital content strategy and technical documentation.',
			'Collaborated with the marketing team to improve platform engagement.'
		]
	}
];
