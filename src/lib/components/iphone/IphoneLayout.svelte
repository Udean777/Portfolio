<script lang="ts">
	import { desktopStore } from '$lib/stores/desktop';
	import { IPHONE_WALLPAPERS } from '$lib/stores/deviceMode';
	import DynamicIsland from './DynamicIsland.svelte';
	import StatusBar from './StatusBar.svelte';
	import HomeScreen from './HomeScreen.svelte';
	import IphoneDock from './IphoneDock.svelte';
	import AppShell from './AppShell.svelte';

	const ds = desktopStore;

	let openAppId = $state<string | null>(null);

	function openApp(id: string) {
		openAppId = id;
	}
	function closeApp() {
		openAppId = null;
	}

	// Map desktopTheme to iPhone wallpaper
	const wallpaper = $derived($desktopStore.wallpaper);
</script>

<div
	class="iphone-root"
	class:mac-light={$desktopStore.desktopTheme === 'light'}
	style="background:{wallpaper};"
>
	<div class="noise"></div>

	<DynamicIsland />
	<StatusBar />

	<div class="iphone-main">
		<HomeScreen onopen={openApp} />
	</div>

	<IphoneDock onopen={openApp} />

	{#if openAppId}
		<AppShell appId={openAppId} onclose={closeApp} />
	{/if}
</div>

<style>
	.iphone-root {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
		transition: background 0.6s ease;
	}

	.noise {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		opacity: 0.04;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		background-size: 160px;
	}

	.iphone-main {
		position: absolute;
		top: 54px;
		left: 0;
		right: 0;
		bottom: 110px;
		z-index: 10;
		overflow: hidden;
	}
</style>
