<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';
	import Terminal from '$lib/components/Terminal.svelte';
	import MenuBar from '$lib/components/desktop/MenuBar.svelte';
	import Dock from '$lib/components/desktop/Dock.svelte';
	import DesktopIcon from '$lib/components/desktop/DesktopIcon.svelte';
	import DesktopHero from '$lib/components/desktop/DesktopHero.svelte';
	import Window from '$lib/components/desktop/Window.svelte';
	import Safari from '$lib/components/desktop/apps/Safari.svelte';
	import Notes from '$lib/components/desktop/apps/Notes.svelte';
	import Finder from '$lib/components/desktop/apps/Finder.svelte';
	import Settings from '$lib/components/desktop/apps/Settings.svelte';
	import Mail from '$lib/components/desktop/apps/Mail.svelte';
	import { desktopStore } from '$lib/stores/desktop';
	import { deviceMode } from '$lib/stores/deviceMode';
	import { dockItemIds } from '$lib/stores/drag';
	import IpadLayout from '$lib/components/ipad/IpadLayout.svelte';
	import IphoneLayout from '$lib/components/iphone/IphoneLayout.svelte';

	let { data } = $props();
	const { meta } = data;

	// Track previous wallpaper for crossfade
	let prevWallpaper = $state('');
	let transitioning = $state(false);
	let lastWallpaper = '';

	// Subscribe to desktopStore via Svelte $ syntax — works on SSR + client
	const ds = desktopStore;

	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: "Sajudin Ma'ruf",
		alternateName: 'Sajudin',
		url: meta.url,
		image: {
			'@type': 'ImageObject',
			url: 'https://sajudin.my.id/images/sajudin.jpeg',
			width: 400,
			height: 400,
			caption: "Sajudin Ma'ruf — Frontend & Mobile Developer"
		},
		jobTitle: 'Frontend & Mobile Developer',
		worksFor: { '@type': 'Organization', name: 'Freelance' },
		sameAs: ['https://github.com/Udean777', 'https://linkedin.com/in/sajudin'],
		knowsAbout: ['JavaScript', 'TypeScript', 'Svelte', 'SvelteKit', 'React Native', 'Web Development', 'Mobile Development'],
		description: "Frontend & Mobile Developer specializing in JavaScript, TypeScript, Svelte, and React Native."
	};

	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: "Sajudin Ma'ruf — Portfolio",
		url: meta.url,
		description: meta.description,
		author: { '@type': 'Person', name: "Sajudin Ma'ruf" },
		inLanguage: 'en-US'
	};

	// Apply terminal theme CSS vars on client only
	onMount(() => {
		const unsubTheme = themeStore.subscribe((theme) => {
			const root = document.documentElement;
			root.style.setProperty('--color-background', theme.colors.background);
			root.style.setProperty('--color-foreground', theme.colors.foreground);
			root.style.setProperty('--color-prompt', theme.colors.prompt);
			root.style.setProperty('--color-command', theme.colors.command);
			root.style.setProperty('--color-output', theme.colors.output);
			root.style.setProperty('--color-error', theme.colors.error);
			root.style.setProperty('--color-accent', theme.colors.accent);
			root.style.setProperty('--color-muted', theme.colors.muted);
		});

		const unsubDesktop = desktopStore.subscribe((val) => {
			if (lastWallpaper && val.wallpaper !== lastWallpaper) {
				prevWallpaper = lastWallpaper;
				transitioning = true;
				setTimeout(() => {
					transitioning = false;
					prevWallpaper = '';
				}, 650);
			}
			lastWallpaper = val.wallpaper;
		});

		return () => {
			unsubTheme();
			unsubDesktop();
		};
	});

	const desktopIconItems = [
		{ id: 'notes',    label: 'Notes',           x: 20, y: 78  },
		{ id: 'safari',   label: 'Safari',           x: 20, y: 166 },
		{ id: 'finder',   label: 'Finder',           x: 20, y: 254 },
		{ id: 'terminal', label: 'Terminal',         x: 20, y: 342 },
		{ id: 'mail',     label: 'Mail',             x: 20, y: 430 },
		{ id: 'settings', label: 'System Settings',  x: 20, y: 518 }
	];
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href={meta.url} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={meta.url} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={meta.image} />
	<meta property="og:image:secure_url" content={meta.image} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content={meta.imageWidth} />
	<meta property="og:image:height" content={meta.imageHeight} />
	<meta property="og:image:alt" content={meta.imageAlt} />
	<meta property="og:locale" content={meta.locale} />
	<meta property="og:site_name" content={meta.siteName} />
	<meta property="article:published_time" content={meta.publishedTime} />
	<meta property="article:modified_time" content={meta.modifiedTime} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@sajudin" />
	<meta name="twitter:creator" content="@sajudin" />
	<meta name="twitter:url" content={meta.url} />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={meta.image} />
	<meta name="twitter:image:alt" content={meta.imageAlt} />
	{@html `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`}
</svelte:head>

{#if $deviceMode === 'ipad'}
	<IpadLayout />
{:else if $deviceMode === 'iphone'}
	<IphoneLayout />
{:else}
<div
	class="desktop-root"
	class:mac-light={$ds.desktopTheme === 'light'}
>
	<!-- Wallpaper crossfade: outgoing layer -->
	{#if transitioning && prevWallpaper}
		<div class="wallpaper-layer wallpaper-out" style="background:{prevWallpaper};"></div>
	{/if}

	<!-- Wallpaper: current -->
	<div class="wallpaper-layer wallpaper-in" style="background:{$ds.wallpaper};"></div>

	<!-- Noise texture -->
	<div class="noise-overlay"></div>

	<MenuBar />

	<!-- Desktop Icons — only show those NOT already in dock -->
	{#each desktopIconItems.filter(item => !$dockItemIds.has(item.id)) as item, i}
		<DesktopIcon id={item.id} label={item.label} x={item.x} y={item.y} animIndex={i} />
	{/each}

	<!-- Hero — hidden when any window is open -->
	{#if !$ds.windows.some(w => w.isOpen && !w.isMinimized)}
		<DesktopHero desktopTheme={$ds.desktopTheme} />
	{/if}

	<!-- Windows — sorted by zIndex so highest is rendered last (on top) -->
	{#each [...$ds.windows].sort((a, b) => a.zIndex - b.zIndex) as win (win.id)}
		{#if win.isOpen}
			<Window windowState={win} active={$ds.activeWindowId === win.id}>
				{#if win.id === 'terminal'}
					<Terminal />
				{:else if win.id === 'finder'}
					<Finder />
				{:else if win.id === 'safari'}
					<Safari />
				{:else if win.id === 'notes'}
					<Notes />
				{:else if win.id === 'settings'}
					<Settings />
				{:else if win.id === 'mail'}
					<Mail />
				{/if}
			</Window>
		{/if}
	{/each}

	<Dock windows={$ds.windows} />
</div>
{/if}

<style>
	.desktop-root {
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	/* Wallpaper layers */
	.wallpaper-layer {
		position: absolute;
		inset: 0;
		z-index: 0;
		background-size: cover;
		background-position: center;
	}

	.wallpaper-out {
		animation: wpOut 0.65s ease forwards;
	}

	.wallpaper-in {
		animation: wpIn 0.65s ease forwards;
	}

	@keyframes wpOut {
		from { opacity: 1; }
		to   { opacity: 0; }
	}

	@keyframes wpIn {
		from { opacity: 0.4; }
		to   { opacity: 1; }
	}

	/* Noise overlay */
	.noise-overlay {
		position: absolute;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		opacity: 0.035;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		background-size: 160px 160px;
	}

</style>
