export type Command = {
	name: string;
	description: string;
};

export const commands: Command[] = [
	{ name: 'banner', description: 'Display welcome banner' },
	{ name: 'help', description: 'List all available commands' },
	{ name: 'clear', description: 'Clear the terminal' },
	{ name: 'home', description: 'Go to home section' },
	{ name: 'about', description: 'About me (Dashboard Resume)' },
	{ name: 'projects', description: 'My projects' },
	{ name: 'contact', description: 'Get in touch' },
	{ name: 'themes', description: 'Switch terminal theme' },
	{ name: 'neofetch', description: 'Display system information' },
	{ name: 'matrix', description: 'Activate Matrix code rain' },
	{ name: 'github', description: 'Display GitHub statistics and contributions' },
	{ name: 'sound', description: 'Toggle mechanical keyboard sound effects (on/off)' },
	{ name: 'joke', description: 'Tell a random programmer joke' },
	{ name: 'sudo', description: 'Comedic superuser privileges' }
];

export const commandNames = commands.map((c) => c.name);
