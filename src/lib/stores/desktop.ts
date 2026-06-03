import { writable } from 'svelte/store';

export type DesktopTheme = 'dark' | 'light';

export interface WindowState {
	id: string;
	title: string;
	isOpen: boolean;
	isMinimized: boolean;
	isMaximized: boolean;
	isFullscreen: boolean;
	x: number;
	y: number;
	width: number;
	height: number;
	zIndex: number;
}

const DEFAULT_WINDOWS: Record<string, Omit<WindowState, 'zIndex'>> = {
	terminal: {
		id: 'terminal',
		title: 'Terminal',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		isFullscreen: false,
		x: 120,
		y: 80,
		width: 720,
		height: 500
	},
	finder: {
		id: 'finder',
		title: 'Finder',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		isFullscreen: false,
		x: 160,
		y: 100,
		width: 760,
		height: 480
	},
	notes: {
		id: 'notes',
		title: 'Notes',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		isFullscreen: false,
		x: 180,
		y: 90,
		width: 780,
		height: 520
	},
	safari: {
		id: 'safari',
		title: 'Safari',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		isFullscreen: false,
		x: 100,
		y: 70,
		width: 920,
		height: 580
	},
	settings: {
		id: 'settings',
		title: 'System Settings',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		isFullscreen: false,
		x: 240,
		y: 150,
		width: 700,
		height: 520
	},
	mail: {
		id: 'mail',
		title: 'Mail',
		isOpen: false,
		isMinimized: false,
		isMaximized: false,
		isFullscreen: false,
		x: 200,
		y: 110,
		width: 800,
		height: 540
	}
};

export const WALLPAPERS: { id: string; label: string; value: string }[] = [
	{
		id: 'midnight-aurora',
		label: 'Midnight Aurora',
		value:
			'radial-gradient(ellipse at 20% 80%, #0d1b2a 0%, #0a1628 40%, #071020 100%), radial-gradient(ellipse at 80% 20%, #112240 0%, transparent 60%)'
	},
	{
		id: 'slate-mist',
		label: 'Slate Mist',
		value:
			'radial-gradient(ellipse at 30% 70%, #1c2333 0%, #141b2d 50%, #0d1117 100%)'
	},
	{
		id: 'copper-dusk',
		label: 'Copper Dusk',
		value:
			'radial-gradient(ellipse at 70% 30%, #2a1a0e 0%, #1e1208 50%, #120b04 100%), radial-gradient(ellipse at 20% 80%, #1a1008 0%, transparent 60%)'
	},
	{
		id: 'forest-depth',
		label: 'Forest Depth',
		value:
			'radial-gradient(ellipse at 40% 60%, #0a1a0f 0%, #081510 50%, #040d08 100%), radial-gradient(ellipse at 70% 20%, #0f2018 0%, transparent 60%)'
	},
	{
		id: 'ink-wash',
		label: 'Ink Wash',
		value:
			'radial-gradient(ellipse at 50% 50%, #1a1a1a 0%, #111111 60%, #0a0a0a 100%)'
	},
	{
		id: 'indigo-night',
		label: 'Indigo Night',
		value:
			'radial-gradient(ellipse at 60% 40%, #13103a 0%, #0e0c2b 50%, #07060f 100%), radial-gradient(ellipse at 20% 80%, #1a1640 0%, transparent 60%)'
	},
	{
		id: 'rose-smoke',
		label: 'Rose Smoke',
		value:
			'radial-gradient(ellipse at 30% 40%, #2a1520 0%, #1e0f18 50%, #120a10 100%), radial-gradient(ellipse at 80% 70%, #1f1018 0%, transparent 55%)'
	},
	{
		id: 'arctic-deep',
		label: 'Arctic Deep',
		value:
			'radial-gradient(ellipse at 50% 30%, #0c1e2e 0%, #091520 50%, #040c14 100%), radial-gradient(ellipse at 80% 80%, #0f2030 0%, transparent 60%)'
	},
	{
		id: 'sandstone',
		label: 'Sandstone',
		value:
			'radial-gradient(ellipse at 40% 60%, #1f1a12 0%, #16130b 50%, #0d0b06 100%)'
	},
	{
		id: 'plum-shadow',
		label: 'Plum Shadow',
		value:
			'radial-gradient(ellipse at 60% 30%, #1e1025 0%, #170c1e 50%, #0e0814 100%), radial-gradient(ellipse at 20% 80%, #1a0e22 0%, transparent 60%)'
	},
	{
		id: 'cloud-day',
		label: 'Cloud Day',
		value:
			'radial-gradient(ellipse at 30% 30%, #e8edf4 0%, #dde4ef 50%, #cdd6e6 100%)'
	},
	{
		id: 'warm-linen',
		label: 'Warm Linen',
		value:
			'radial-gradient(ellipse at 60% 60%, #ede8df 0%, #e4ddd2 50%, #d8cfc3 100%)'
	}
];

const DARK_DEFAULT_WALLPAPER  = WALLPAPERS[0].value;   // Midnight Aurora
const LIGHT_DEFAULT_WALLPAPER = WALLPAPERS[10].value;  // Cloud Day

function createDesktopStore() {
	let maxZ = 10;

	const initialWindows: WindowState[] = Object.keys(DEFAULT_WINDOWS).map((key, index) => ({
		...DEFAULT_WINDOWS[key],
		zIndex: index + 1
	}));

	const { subscribe, update } = writable({
		windows: initialWindows,
		activeWindowId: 'terminal',
		wallpaper: WALLPAPERS[0].value,
		wallpapers: WALLPAPERS,
		desktopTheme: 'dark' as DesktopTheme
	});

	const focusWindow = (id: string) => {
		update((state) => {
			maxZ += 1;
			const updated = state.windows.map((w) => {
				if (w.id === id) return { ...w, zIndex: maxZ, isMinimized: false };
				return w;
			});
			return { ...state, windows: updated, activeWindowId: id };
		});
	};

	return {
		subscribe,
		openWindow: (id: string) => {
			update((state) => {
				const updated = state.windows.map((w) => {
					if (w.id === id) return { ...w, isOpen: true, isMinimized: false };
					return w;
				});
				return { ...state, windows: updated };
			});
			focusWindow(id);
		},
		closeWindow: (id: string) => {
			update((state) => {
				const updated = state.windows.map((w) => {
					if (w.id === id) return { ...w, isOpen: false, isFullscreen: false };
					return w;
				});
				let nextActive = state.activeWindowId;
				if (state.activeWindowId === id) {
					const openRemaining = updated.filter((w) => w.isOpen && !w.isMinimized);
					if (openRemaining.length > 0) {
						const sorted = [...openRemaining].sort((a, b) => b.zIndex - a.zIndex);
						nextActive = sorted[0].id;
					} else {
						nextActive = '';
					}
				}
				return { ...state, windows: updated, activeWindowId: nextActive };
			});
		},
		minimizeWindow: (id: string) => {
			update((state) => {
				const updated = state.windows.map((w) => {
					if (w.id === id) return { ...w, isMinimized: true, isFullscreen: false };
					return w;
				});
				let nextActive = state.activeWindowId;
				if (state.activeWindowId === id) {
					const openRemaining = updated.filter((w) => w.isOpen && !w.isMinimized);
					if (openRemaining.length > 0) {
						const sorted = [...openRemaining].sort((a, b) => b.zIndex - a.zIndex);
						nextActive = sorted[0].id;
					} else {
						nextActive = '';
					}
				}
				return { ...state, windows: updated, activeWindowId: nextActive };
			});
		},
		maximizeWindow: (id: string) => {
			update((state) => {
				const updated = state.windows.map((w) => {
					if (w.id === id) return { ...w, isMaximized: !w.isMaximized, isFullscreen: false };
					return w;
				});
				return { ...state, windows: updated };
			});
			focusWindow(id);
		},
		toggleFullscreen: (id: string) => {
			update((state) => {
				const updated = state.windows.map((w) => {
					if (w.id === id) return { ...w, isFullscreen: !w.isFullscreen, isMaximized: false };
					return w;
				});
				return { ...state, windows: updated };
			});
			focusWindow(id);
		},
		focusWindow,
		updatePosition: (id: string, x: number, y: number) => {
			update((state) => {
				const updated = state.windows.map((w) => {
					if (w.id === id) return { ...w, x, y };
					return w;
				});
				return { ...state, windows: updated };
			});
		},
		updateSize: (id: string, width: number, height: number) => {
			update((state) => {
				const updated = state.windows.map((w) => {
					if (w.id === id) return { ...w, width, height };
					return w;
				});
				return { ...state, windows: updated };
			});
		},
		setWallpaper: (wallpaper: string) => {
			update((state) => ({ ...state, wallpaper }));
		},
		setDesktopTheme: (theme: DesktopTheme) => {
			update((state) => ({
				...state,
				desktopTheme: theme,
				wallpaper: theme === 'light' ? LIGHT_DEFAULT_WALLPAPER : DARK_DEFAULT_WALLPAPER
			}));
		}
	};
}

export const desktopStore = createDesktopStore();
