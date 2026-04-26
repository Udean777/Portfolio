export type Command = {
	name: string;
	description: string;
};

export const commands: Command[] = [
	{ name: 'banner', description: 'Display welcome banner' },
	{ name: 'help', description: 'List all available commands' },
	{ name: 'clear', description: 'Clear the terminal' },
	{ name: 'whoami', description: 'Short description about me' },
	{ name: 'home', description: 'Go to home section' },
	{ name: 'about', description: 'About me' },
	{ name: 'experience', description: 'My work experience' },
	{ name: 'skills', description: 'My tech stack & skills' },
	{ name: 'services', description: 'Services I offer' },
	{ name: 'projects', description: 'My projects' },
	{ name: 'contact', description: 'Get in touch' },
	{ name: 'socials', description: 'My social media links' },
	{ name: 'resume', description: 'Download my resume' },
	{ name: 'themes', description: 'Switch terminal theme' },
];

export const commandNames = commands.map((c) => c.name);
