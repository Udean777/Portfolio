import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type DeviceMode = 'desktop' | 'ipad' | 'iphone';

function getMode(width: number): DeviceMode {
	if (width >= 1024) return 'desktop';
	if (width >= 768) return 'ipad';
	return 'iphone';
}

function createDeviceModeStore() {
	const initial: DeviceMode = browser ? getMode(window.innerWidth) : 'desktop';
	const { subscribe, set } = writable<DeviceMode>(initial);

	if (browser) {
		const handler = () => set(getMode(window.innerWidth));
		window.addEventListener('resize', handler);
	}

	return { subscribe };
}

export const deviceMode = createDeviceModeStore();

// ─── iPad Wallpapers (landscape abstract gradients) ───────────────────────
export const IPAD_WALLPAPERS = [
	{
		id: 'ip-aurora',
		label: 'Aurora',
		value: 'radial-gradient(ellipse at 15% 85%, #0a1a2e 0%, #091220 45%, #050c14 100%), radial-gradient(ellipse at 85% 15%, #0d2040 0%, transparent 55%)'
	},
	{
		id: 'ip-slate',
		label: 'Slate',
		value: 'radial-gradient(ellipse at 25% 75%, #18202e 0%, #111825 50%, #090d14 100%)'
	},
	{
		id: 'ip-copper',
		label: 'Copper',
		value: 'radial-gradient(ellipse at 75% 25%, #271808 0%, #1b1005 50%, #100a02 100%), radial-gradient(ellipse at 15% 85%, #180e04 0%, transparent 60%)'
	},
	{
		id: 'ip-forest',
		label: 'Forest',
		value: 'radial-gradient(ellipse at 35% 65%, #091608 0%, #071210 50%, #030a06 100%), radial-gradient(ellipse at 75% 15%, #0c1c14 0%, transparent 60%)'
	},
	{
		id: 'ip-indigo',
		label: 'Indigo',
		value: 'radial-gradient(ellipse at 65% 35%, #100c32 0%, #0c0a24 50%, #060508 100%), radial-gradient(ellipse at 15% 85%, #161238 0%, transparent 60%)'
	},
	{
		id: 'ip-rose',
		label: 'Rose',
		value: 'radial-gradient(ellipse at 25% 40%, #26121c 0%, #1a0c14 50%, #100810 100%), radial-gradient(ellipse at 80% 70%, #1c0e16 0%, transparent 55%)'
	},
	{
		id: 'ip-arctic',
		label: 'Arctic',
		value: 'radial-gradient(ellipse at 45% 25%, #0a1a28 0%, #071218 50%, #030c12 100%), radial-gradient(ellipse at 80% 80%, #0d1c2c 0%, transparent 60%)'
	},
	{
		id: 'ip-plum',
		label: 'Plum',
		value: 'radial-gradient(ellipse at 55% 30%, #1a0e22 0%, #140a1a 50%, #0c0610 100%), radial-gradient(ellipse at 15% 80%, #180c20 0%, transparent 60%)'
	}
];

// ─── iPhone Wallpapers (portrait abstract gradients) ─────────────────────
export const IPHONE_WALLPAPERS = [
	{
		id: 'ph-aurora',
		label: 'Aurora',
		value: 'radial-gradient(ellipse at 50% 20%, #0d1b2a 0%, #0a1628 40%, #050c14 100%), radial-gradient(ellipse at 80% 80%, #112240 0%, transparent 60%)'
	},
	{
		id: 'ph-slate',
		label: 'Slate',
		value: 'radial-gradient(ellipse at 40% 20%, #1a2130 0%, #111825 55%, #090d14 100%)'
	},
	{
		id: 'ph-copper',
		label: 'Copper',
		value: 'radial-gradient(ellipse at 60% 15%, #2a1a0e 0%, #1e1208 50%, #100a02 100%), radial-gradient(ellipse at 20% 90%, #180e04 0%, transparent 60%)'
	},
	{
		id: 'ph-forest',
		label: 'Forest',
		value: 'radial-gradient(ellipse at 45% 15%, #0a1a0f 0%, #081510 50%, #030a06 100%), radial-gradient(ellipse at 70% 80%, #0c1c14 0%, transparent 60%)'
	},
	{
		id: 'ph-indigo',
		label: 'Indigo',
		value: 'radial-gradient(ellipse at 50% 10%, #13103a 0%, #0e0c2b 55%, #06050e 100%), radial-gradient(ellipse at 20% 85%, #1a1640 0%, transparent 55%)'
	},
	{
		id: 'ph-rose',
		label: 'Rose',
		value: 'radial-gradient(ellipse at 40% 15%, #2a1520 0%, #1e0f18 50%, #100810 100%), radial-gradient(ellipse at 75% 80%, #1f1018 0%, transparent 55%)'
	},
	{
		id: 'ph-arctic',
		label: 'Arctic',
		value: 'radial-gradient(ellipse at 50% 15%, #0c1e2e 0%, #091520 55%, #030c12 100%), radial-gradient(ellipse at 80% 85%, #0f2030 0%, transparent 60%)'
	},
	{
		id: 'ph-plum',
		label: 'Plum',
		value: 'radial-gradient(ellipse at 55% 10%, #1e1025 0%, #170c1e 55%, #0c0810 100%), radial-gradient(ellipse at 20% 85%, #1a0e22 0%, transparent 60%)'
	}
];
