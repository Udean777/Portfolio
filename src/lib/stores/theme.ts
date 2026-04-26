import { writable } from 'svelte/store';
import { themes, type Theme, type ThemeName } from '$lib/utils/themes';

const STORAGE_KEY = 'terminal-theme';

function getInitialTheme(): Theme {
	if (typeof localStorage !== 'undefined') {
		const saved = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
		if (saved && themes[saved]) return themes[saved];
	}
	return themes.dark;
}

function createThemeStore() {
	const { subscribe, set } = writable<Theme>(themes.dark);

	return {
		subscribe,
		init: () => {
			set(getInitialTheme());
		},
		setTheme: (name: ThemeName) => {
			if (themes[name]) {
				set(themes[name]);
				localStorage.setItem(STORAGE_KEY, name);
			}
		},
	};
}

export const themeStore = createThemeStore();
