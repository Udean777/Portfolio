<script lang="ts">
	import { themeStore } from '$lib/stores/theme';
	import { onMount } from 'svelte';

	// System metrics simulator
	let uptime = $state('0d 0h 0m');
	let memory = $state('8 GB / 16 GB (50%)');

	onMount(() => {
		// Calculate simulated uptime
		const startDate = new Date('2022-09-01');
		const now = new Date();
		const diffMs = now.getTime() - startDate.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
		uptime = `${diffDays} days`;

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
			<span class="text-muted text-[9px] font-bold tracking-wider">sajudin@sysinfo</span>
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

			<!-- Pulsing Terminal Icon -->
			<div class="text-accent relative z-10 mb-1 animate-pulse">
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
				>
					<polyline points="4 17 10 11 4 5" />
					<line x1="12" x2="20" y1="19" y2="19" />
				</svg>
			</div>

			<span class="text-accent relative z-10 text-xs font-bold tracking-widest">SAJUDIN.OS</span>
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
			visitor<span class="text-muted">@</span>sajudin-portfolio
		</div>
		<div class="text-muted leading-none">-------------------------</div>

		<div>
			<span class="text-command font-bold">OS:</span>
			<span>SajudinOS v1.0.0 (Svelte Simulation)</span>
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
