import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'dark' | 'light';

function getInitialTheme(): Theme {
	if (!browser) return 'dark';
	const stored = localStorage.getItem('theme') as Theme | null;
	if (stored === 'dark' || stored === 'light') return stored;
	return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('dark');

	function apply(theme: Theme) {
		if (!browser) return;
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}

	function init() {
		const initial = getInitialTheme();
		set(initial);
		apply(initial);
	}

	function toggle() {
		update(current => {
			const next: Theme = current === 'dark' ? 'light' : 'dark';
			apply(next);
			return next;
		});
	}

	return { subscribe, init, toggle };
}

export const themeStore = createThemeStore();
