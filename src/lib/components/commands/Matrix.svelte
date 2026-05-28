<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';

	let canvasEl: HTMLCanvasElement = $state()!;

	onMount(() => {
		const canvas = canvasEl;
		const ctx = canvas.getContext('2d')!;

		let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
		let height = (canvas.height = 300);

		// Matrix characters
		const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*+-/<>[]{}';
		const charArr = chars.split('');

		const fontSize = 14;
		let columns = Math.floor(width / fontSize);

		// Array of drops - one per column
		const drops: number[] = Array(columns)
			.fill(0)
			.map(() => Math.floor(Math.random() * -100));

		// Set rain color matching active theme's accent color
		let rainColor = $themeStore.colors.accent || '#73daca';

		// Handle resize
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				width = canvas.width = entry.contentRect.width || 600;
				columns = Math.floor(width / fontSize);
				// adjust drops array size if columns change
				while (drops.length < columns) {
					drops.push(Math.floor(Math.random() * -100));
				}
			}
		});

		if (canvas.parentElement) {
			resizeObserver.observe(canvas.parentElement);
		}

		let animId: any;

		function draw() {
			// Transparent background to create fade trailing effect
			ctx.fillStyle = 'rgba(26, 27, 38, 0.08)';
			// Override background transparent color matching theme background if possible
			const themeBg = $themeStore.colors.background || '#1a1b26';
			// Convert hex background to rgba to support trailing
			if (themeBg.startsWith('#')) {
				const r = parseInt(themeBg.slice(1, 3), 16);
				const g = parseInt(themeBg.slice(3, 5), 16);
				const b = parseInt(themeBg.slice(5, 7), 16);
				ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.08)`;
			}
			ctx.fillRect(0, 0, width, height);

			ctx.font = `${fontSize}px monospace`;

			for (let i = 0; i < drops.length; i++) {
				const text = charArr[Math.floor(Math.random() * charArr.length)];

				// Draw the text
				ctx.fillStyle = rainColor;
				ctx.fillText(text, i * fontSize, drops[i] * fontSize);

				// Sending drop back to top after it crossed screen
				if (drops[i] * fontSize > height && Math.random() > 0.975) {
					drops[i] = 0;
				}

				drops[i]++;
			}

			animId = requestAnimationFrame(draw);
		}

		draw();

		return () => {
			cancelAnimationFrame(animId);
			resizeObserver.disconnect();
		};
	});
</script>

<div
	class="border-muted/20 relative my-2 w-full overflow-hidden rounded border bg-[var(--color-background)]"
>
	<!-- Status bar -->
	<div
		class="bg-muted/10 border-muted/20 text-muted flex items-center justify-between border-b px-3 py-1.5 font-mono text-xs select-none"
	>
		<span>matrix_rain.sh</span>
		<span class="text-accent font-bold">running...</span>
	</div>

	<!-- Canvas element -->
	<canvas bind:this={canvasEl} class="block w-full"></canvas>
</div>
