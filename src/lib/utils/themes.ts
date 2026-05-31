export type ThemeName = 'dark' | 'light' | 'matrix' | 'espresso' | 'ubuntu' | 'dracula' | 'nord' | 'cyberpunk' | 'gruvbox' | 'onedark' | 'github-dark' | 'synthwave';

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
	dracula: {
		name: 'dracula',
		colors: {
			background: '#282a36',
			foreground: '#f8f8f2',
			prompt: '#8be9fd',
			command: '#ff79c6',
			output: '#f8f8f2',
			error: '#ff5555',
			accent: '#50fa7b',
			muted: '#6272a4',
		},
	},
	nord: {
		name: 'nord',
		colors: {
			background: '#2e3440',
			foreground: '#d8dee9',
			prompt: '#88c0d0',
			command: '#81a1c1',
			output: '#e5e9f0',
			error: '#bf616a',
			accent: '#a3be8c',
			muted: '#4c566a',
		},
	},
	cyberpunk: {
		name: 'cyberpunk',
		colors: {
			background: '#0f051d',
			foreground: '#00f0ff',
			prompt: '#ff007f',
			command: '#00f0ff',
			output: '#e0e0ff',
			error: '#ff3b30',
			accent: '#ffee00',
			muted: '#5c477a',
		},
	},
	gruvbox: {
		name: 'gruvbox',
		colors: {
			background: '#282828',
			foreground: '#ebdbb2',
			prompt: '#8ec07c',
			command: '#fabd2f',
			output: '#b8bb26',
			error: '#fb4934',
			accent: '#fe8019',
			muted: '#928374',
		},
	},
	onedark: {
		name: 'onedark',
		colors: {
			background: '#282c34',
			foreground: '#abb2bf',
			prompt: '#61afef',
			command: '#c678dd',
			output: '#abb2bf',
			error: '#e06c75',
			accent: '#98c379',
			muted: '#5c6370',
		},
	},
	'github-dark': {
		name: 'github-dark',
		colors: {
			background: '#0d1117',
			foreground: '#c9d1d9',
			prompt: '#58a6ff',
			command: '#bc8cff',
			output: '#c9d1d9',
			error: '#ff7b72',
			accent: '#3fb950',
			muted: '#8b949e',
		},
	},
	synthwave: {
		name: 'synthwave',
		colors: {
			background: '#2b213a',
			foreground: '#f0eef5',
			prompt: '#f92aad',
			command: '#2de2e6',
			output: '#f0eef5',
			error: '#fe4450',
			accent: '#ffee00',
			muted: '#5c4d7d',
		},
	},
};
