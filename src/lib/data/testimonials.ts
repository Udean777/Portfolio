export interface TestimonialItem {
	name: string;
	role: string;
	image: string;
	quote: string;
}

export const testimonials: TestimonialItem[] = [
	{
		name: 'John Doe',
		role: 'CEO at TechCorp',
		image: 'https://i.pravatar.cc/150?u=john',
		quote: 'Sajudin delivered our project ahead of schedule and with exceptional quality. Highly recommended!'
	},
	{
		name: 'Jane Smith',
		role: 'Founder of StartUp',
		image: 'https://i.pravatar.cc/150?u=jane',
		quote: 'Working with Sajudin was a breeze. He translated our complex requirements into a beautiful app.'
	}
];
