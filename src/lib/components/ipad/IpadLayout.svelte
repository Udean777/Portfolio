<script lang="ts">
	import { desktopStore } from '$lib/stores/desktop';
	import { IPAD_WALLPAPERS } from '$lib/stores/deviceMode';
	import StatusBar from './StatusBar.svelte';
	import AppGrid from './AppGrid.svelte';
	import IpadDock from './IpadDock.svelte';
	import AppShell from './AppShell.svelte';

	const ds = desktopStore;

	let openAppId = $state<string | null>(null);

	function openApp(id: string) {
		openAppId = id;
	}
	function closeApp() {
		openAppId = null;
	}

	const wallpaper = $derived($desktopStore.wallpaper);

	const tags = ['Frontend Dev', 'Mobile Dev', 'SvelteKit', 'React Native'];

	function getGreeting(): string {
		const h = new Date().getHours();
		if (h < 12) return 'morning';
		if (h < 17) return 'afternoon';
		return 'evening';
	}
</script>

<div
	class="ipad-root"
	class:mac-light={$desktopStore.desktopTheme === 'light'}
	style="background:{wallpaper};"
>
	<div class="noise"></div>
	<StatusBar />

	<div class="ipad-main">
		{#if !openAppId}
			<!-- Hero -->
			<div class="ipad-hero">
				<div class="hero-avatar-wrap">
					<img src="/images/profile-img.png" alt="Sajudin" class="hero-avatar" />
					<div class="hero-avatar-ring"></div>
				</div>
				<div class="hero-body">
					<p class="hero-greeting">Good {getGreeting()}</p>
					<h1 class="hero-name">Sajudin Ma'ruf</h1>
					<p class="hero-role">Frontend &amp; Mobile Developer</p>
					<div class="hero-tags">
						{#each tags as tag}
							<span class="hero-tag">{tag}</span>
						{/each}
					</div>
				</div>
			</div>

			<AppGrid onopen={openApp} />
		{/if}
	</div>

	{#if openAppId}
		<AppShell appId={openAppId} onclose={closeApp} />
	{/if}

	<IpadDock windows={$desktopStore.windows} onopen={openApp} />
</div>

<style>
	.ipad-root {
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

	.ipad-main {
		position: absolute;
		top: 44px;
		left: 0;
		right: 0;
		bottom: 100px;
		overflow-y: auto;
		z-index: 10;
		display: flex;
		flex-direction: column;
	}

	/* Hero */
	.ipad-hero {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 28px 36px 16px;
		animation: fadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(18px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.hero-avatar-wrap {
		position: relative;
		flex-shrink: 0;
	}

	.hero-avatar {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		object-fit: cover;
		border: 2.5px solid rgba(255, 255, 255, 0.28);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		display: block;
	}

	.hero-avatar-ring {
		position: absolute;
		inset: -5px;
		border-radius: 50%;
		border: 1.5px solid rgba(255, 255, 255, 0.14);
		animation: ringPulse 3s ease-in-out infinite;
		pointer-events: none;
	}

	@keyframes ringPulse {
		0%,
		100% {
			opacity: 0.35;
			transform: scale(1);
		}
		50% {
			opacity: 0.85;
			transform: scale(1.04);
		}
	}

	.hero-body {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.hero-greeting {
		font-size: 12px;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.45);
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.hero-name {
		margin: 0;
		font-size: 28px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.96);
		letter-spacing: -0.03em;
		text-shadow: 0 2px 16px rgba(0, 0, 0, 0.35);
	}

	.hero-role {
		margin: 0;
		font-size: 14px;
		color: rgba(255, 255, 255, 0.55);
		font-weight: 400;
	}

	.hero-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: 6px;
	}

	.hero-tag {
		padding: 3px 10px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 20px;
		font-size: 11px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.72);
		backdrop-filter: blur(8px);
	}

	/* Light mode */
	.mac-light .hero-greeting {
		color: rgba(0, 0, 0, 0.38);
	}
	.mac-light .hero-name {
		color: rgba(0, 0, 0, 0.88);
		text-shadow: none;
	}
	.mac-light .hero-role {
		color: rgba(0, 0, 0, 0.5);
	}
	.mac-light .hero-avatar {
		border-color: rgba(0, 0, 0, 0.14);
	}
	.mac-light .hero-tag {
		background: rgba(0, 0, 0, 0.07);
		border-color: rgba(0, 0, 0, 0.12);
		color: rgba(0, 0, 0, 0.6);
	}
</style>
