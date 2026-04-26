export type ThemeName = 'dark' | 'light' | 'matrix' | 'espresso' | 'ubuntu';

export type Theme = {
	name: ThemeName;
	colors: {
		background: string;
		foreground: string;
		prompt: string;
		command: string;
		output: string;
		error: string;
		accent: string;
		muted: string;
	};
};

export const themes: Record<ThemeName, Theme> = {
	dark: {
		name: 'dark',
		colors: {
			background: '#1a1b26',
			foreground: '#c0caf5',
			prompt: '#7aa2f7',
			command: '#bb9af7',
			output: '#a9b1d6',
			error: '#f7768e',
			accent: '#73daca',
			muted: '#565f89',
		},
	},
	light: {
		name: 'light',
		colors: {
			background: '#f5f5f5',
			foreground: '#383a42',
			prompt: '#4078f2',
			command: '#a626a4',
			output: '#383a42',
			error: '#e45649',
			accent: '#0184bc',
			muted: '#9e9e9e',
		},
	},
	matrix: {
		name: 'matrix',
		colors: {
			background: '#0d0d0d',
			foreground: '#00ff41',
			prompt: '#00cc33',
			command: '#00ff41',
			output: '#00cc33',
			error: '#ff0000',
			accent: '#00ff41',
			muted: '#005c1a',
		},
	},
	espresso: {
		name: 'espresso',
		colors: {
			background: '#2b1d0e',
			foreground: '#e8d5b7',
			prompt: '#d4a853',
			command: '#c97b3a',
			output: '#c8b89a',
			error: '#cc4444',
			accent: '#d4a853',
			muted: '#7a5c3a',
		},
	},
	ubuntu: {
		name: 'ubuntu',
		colors: {
			background: '#300a24',
			foreground: '#ffffff',
			prompt: '#e95420',
			command: '#77216f',
			output: '#eeeeec',
			error: '#cc0000',
			accent: '#e95420',
			muted: '#875a7b',
		},
	},
};
