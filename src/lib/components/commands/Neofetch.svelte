<script lang="ts">
	import { themeStore } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	// System metrics simulator
	let uptime = $state('0d 0h 0m');
	let memory = $state('8 GB / 16 GB (50%)');

	// Dynamic OS state variables
	let osName = $state('SajudinOS');
	let osIcon = $state<'apple' | 'windows' | 'linux' | 'android' | 'terminal'>('terminal');

	onMount(() => {
		// Calculate simulated uptime
		const startDate = new Date('2022-09-01');
		const now = new Date();
		const diffMs = now.getTime() - startDate.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
		uptime = `${diffDays} days`;

		// Detect Operating System dynamically
		const ua = window.navigator.userAgent;
		if (ua.indexOf('Mac') !== -1) {
			osName = 'macOS';
			osIcon = 'apple';
		} else if (ua.indexOf('Win') !== -1) {
			osName = 'Windows';
			osIcon = 'windows';
		} else if (ua.indexOf('Android') !== -1) {
			osName = 'Android';
			osIcon = 'android';
		} else if (ua.indexOf('Linux') !== -1) {
			osName = 'Linux';
			osIcon = 'linux';
		} else if (ua.indexOf('like Mac') !== -1 || /iPhone|iPad|iPod/.test(ua)) {
			osName = 'iOS';
			osIcon = 'apple';
		} else {
			osName = 'SajudinOS';
			osIcon = 'terminal';
		}

		// Randomize memory slightly to look alive
		const interval = setInterval(() => {
			const activeUsage = (10 + Math.random() * 2).toFixed(1);
			memory = `${activeUsage} GB / 16 GB (${Math.round((parseFloat(activeUsage) / 16) * 100)}%)`;
		}, 3000);

		return () => clearInterval(interval);
	});
</script>

<div
	class="flex flex-col items-center gap-8 py-4 font-mono select-none md:flex-row md:items-start md:gap-12"
>
	<!-- Left Side: Custom Glassmorphic Animated CSS Terminal Card (Bypasses ASCII formatting issues & looks extremely premium!) -->
	<div
		class="border-accent/20 bg-muted/5 shadow-accent/5 relative flex h-44 w-52 flex-none flex-col overflow-hidden rounded-lg border font-mono shadow-lg select-none"
	>
		<!-- Terminal Header (macOS style window buttons) -->
		<div
			class="bg-muted/10 border-accent/10 flex h-7 flex-none items-center justify-between gap-1.5 border-b px-3"
		>
			<div class="flex gap-1.5">
				<span class="bg-error/70 h-2.5 w-2.5 rounded-full"></span>
				<span class="bg-command/50 h-2.5 w-2.5 rounded-full"></span>
				<span class="bg-accent/70 h-2.5 w-2.5 rounded-full"></span>
			</div>
			<span class="text-muted text-[9px] font-bold tracking-wider">visitor@{osIcon}</span>
			<div class="w-10"></div>
		</div>

		<!-- Terminal Screen Body with Radial Neon Glow -->
		<div
			class="bg-background/30 relative flex flex-1 flex-col items-center justify-center gap-1.5 p-4"
		>
			<!-- Subtle glow animation inside the screen -->
			<div
				class="from-accent/5 pointer-events-none absolute inset-0 bg-radial to-transparent"
			></div>

			<!-- Dynamic Glowing OS Icon -->
			{#if osIcon === 'apple'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="40"
					height="40"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="text-accent relative z-10 mb-1 animate-pulse"
					style="filter: drop-shadow(0 0 6px var(--color-accent));"
				>
					<path
						d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z"
					/>
				</svg>
			{:else if osIcon === 'windows'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="40"
					height="40"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="text-accent relative z-10 mb-1 animate-pulse"
					style="filter: drop-shadow(0 0 6px var(--color-accent));"
				>
					<path
						d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55l-13.2-1.95v-9.6z"
					/>
				</svg>
			{:else if osIcon === 'linux'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="40"
					height="40"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="text-accent relative z-10 mb-1 animate-pulse"
					style="filter: drop-shadow(0 0 6px var(--color-accent));"
				>
					<path
						d="M12 2C8.5 2 6 4.5 6 8c0 1 .5 2 1.5 3-.5.5-1 1.5-1 2.5 0 2.5 2.5 4.5 5.5 4.5s5.5-2 5.5-4.5c0-1-.5-2-1-2.5 1-1 1.5-2 1.5-3 0-3.5-2.5-6-6-6z"
						fill="currentColor"
						fill-opacity="0.1"
					/>
					<path d="M9 13a2.5 2.5 0 0 1 6 0" />
					<path d="M6 20c0-1.5 2.5-3 6-3s6 1.5 6 3" />
					<circle cx="10" cy="8" r="1" fill="currentColor" />
					<circle cx="14" cy="8" r="1" fill="currentColor" />
				</svg>
			{:else if osIcon === 'android'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="40"
					height="40"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="text-accent relative z-10 mb-1 animate-pulse"
					style="filter: drop-shadow(0 0 6px var(--color-accent));"
				>
					<path
						d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zM12 2C8.69 2 6 4.69 6 8h12c0-3.31-2.69-6-6-6zm-3.5 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm7 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="40"
					height="40"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="text-accent relative z-10 mb-1 animate-pulse"
					style="filter: drop-shadow(0 0 6px var(--color-accent));"
				>
					<polyline points="4 17 10 11 4 5" />
					<line x1="12" x2="20" y1="19" y2="19" />
				</svg>
			{/if}

			<span class="text-accent relative z-10 text-xs font-bold tracking-widest uppercase"
				>{osName}.OS</span
			>
			<div class="text-muted relative z-10 flex items-center gap-1.5 text-[9px]">
				<span class="bg-accent h-1.5 w-1.5 animate-ping rounded-full"></span>
				<span class="font-bold tracking-widest uppercase">ONLINE</span>
			</div>
		</div>
	</div>

	<!-- Right Side: System Info -->
	<div class="text-output flex flex-col gap-1.5 text-xs sm:text-sm">
		<!-- OS Header -->
		<div class="text-prompt mb-1 text-base font-bold">
			visitor<span class="text-muted">@</span>{osName
				.toLowerCase()
				.replace('.os', '')
				.replace(' ', '')}-portfolio
		</div>
		<div class="text-muted leading-none">-------------------------</div>

		<div>
			<span class="text-command font-bold">OS:</span>
			<span>{osName} (Svelte Simulation)</span>
		</div>
		<div>
			<span class="text-command font-bold">Host:</span>
			<span>Sajudin's Brain (Core i9, 100% Passion)</span>
		</div>
		<div>
			<span class="text-command font-bold">Kernel:</span>
			<span>Svelte 5.0.0 (Runes Edition)</span>
		</div>
		<div>
			<span class="text-command font-bold">Uptime:</span>
			<span>{uptime}</span>
		</div>
		<div>
			<span class="text-command font-bold">Shell:</span>
			<span>zsh / portfolio-terminal-shell</span>
		</div>
		<div>
			<span class="text-command font-bold">University:</span>
			<span class="text-accent">Pembangunan Panca Budi University (Medan)</span>
		</div>
		<div>
			<span class="text-command font-bold">Skills:</span>
			<span>SvelteKit · React Native · Flutter · TypeScript</span>
		</div>
		<div>
			<span class="text-command font-bold">Theme:</span>
			<span class="text-accent font-bold capitalize">{$themeStore.name}</span>
		</div>
		<div>
			<span class="text-command font-bold">Memory:</span>
			<span>{memory}</span>
		</div>

		<!-- Palette block (mimics actual neofetch colors block) -->
		<div class="mt-2 flex gap-1.5">
			<span class="border-muted/20 inline-block h-4 w-6 border bg-[#1a1b26]"></span>
			<span class="border-muted/20 inline-block h-4 w-6 border bg-[#f7768e]"></span>
			<span class="border-muted/20 inline-block h-4 w-6 border bg-[#73daca]"></span>
			<span class="border-muted/20 inline-block h-4 w-6 border bg-[#e0af68]"></span>
			<span class="border-muted/20 inline-block h-4 w-6 border bg-[#7aa2f7]"></span>
			<span class="border-muted/20 inline-block h-4 w-6 border bg-[#bb9af7]"></span>
			<span class="border-muted/20 inline-block h-4 w-6 border bg-[#7dcfff]"></span>
			<span class="border-muted/20 inline-block h-4 w-6 border bg-[#a9b1d6]"></span>
		</div>
	</div>
</div>
