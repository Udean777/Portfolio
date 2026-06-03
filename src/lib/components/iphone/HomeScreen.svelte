<script lang="ts">
	import Widget from './Widget.svelte';
	import AppIcon from '$lib/components/AppIcon.svelte';
	import { onMount } from 'svelte';

	interface Props {
		onopen: (id: string) => void;
	}
	let { onopen }: Props = $props();

	let currentPage = $state(0);
	let dragging = $state(false);
	let dragDx = $state(0);
	let clipEl: HTMLDivElement | null = $state(null);

	let startX = 0;
	let startY = 0;
	let lockAxis: 'x' | 'y' | null = null;
	let isDown = false;

	// ── Register touch listeners manually with passive:false ─────
	onMount(() => {
		const el = clipEl;
		if (!el) return;

		function touchStart(e: TouchEvent) {
			const t = e.touches[0];
			startX = t.clientX;
			startY = t.clientY;
			isDown = true;
			dragDx = 0;
			lockAxis = null;
		}

		function touchMove(e: TouchEvent) {
			if (!isDown) return;
			const t = e.touches[0];
			const dx = t.clientX - startX;
			const dy = t.clientY - startY;

			if (!lockAxis) {
				lockAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
			}

			if (lockAxis === 'x') {
				e.preventDefault(); // safe: listener is non-passive
				dragging = true;
				dragDx = dx;
			}
		}

		function touchEnd() {
			if (!isDown) return;
			commit();
			isDown = false;
		}

		el.addEventListener('touchstart', touchStart, { passive: true });
		el.addEventListener('touchmove', touchMove, { passive: false });
		el.addEventListener('touchend', touchEnd, { passive: true });
		el.addEventListener('touchcancel', touchEnd, { passive: true });

		return () => {
			el.removeEventListener('touchstart', touchStart);
			el.removeEventListener('touchmove', touchMove);
			el.removeEventListener('touchend', touchEnd);
			el.removeEventListener('touchcancel', touchEnd);
		};
	});

	// ── Mouse (desktop preview) ───────────────────────────────────
	function onMouseDown(e: MouseEvent) {
		if (e.button !== 0) return;
		startX = e.clientX;
		startY = e.clientY;
		isDown = true;
		dragDx = 0;
		lockAxis = null;
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}

	function onMouseMove(e: MouseEvent) {
		if (!isDown) return;
		const dx = e.clientX - startX;
		const dy = e.clientY - startY;
		if (!lockAxis) lockAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
		if (lockAxis === 'x') {
			dragging = true;
			dragDx = dx;
		}
	}

	function onMouseUp() {
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', onMouseUp);
		if (!isDown) return;
		commit();
		isDown = false;
	}

	// ── Commit swipe ──────────────────────────────────────────────
	function commit() {
		if (lockAxis === 'x') {
			if (dragDx < -60 && currentPage < 1) currentPage = 1;
			else if (dragDx > 60 && currentPage > 0) currentPage = 0;
		}
		dragging = false;
		dragDx = 0;
		lockAxis = null;
	}

	function getGreeting(): string {
		const h = new Date().getHours();
		if (h < 12) return 'morning';
		if (h < 17) return 'afternoon';
		return 'evening';
	}

	// ── Data ──────────────────────────────────────────────────────
	const widgetPageApps = [
		{ id: 'notes', label: 'Notes' },
		{ id: 'mail', label: 'Mail' }
	];

	const allApps = [
		{ id: 'notes', label: 'Notes' },
		{ id: 'safari', label: 'Safari' },
		{ id: 'finder', label: 'Finder' },
		{ id: 'mail', label: 'Mail' },
		{ id: 'settings', label: 'Settings' }
	];

	const trackStyle = $derived(
		`transform: translateX(calc(${currentPage * -100}vw + ${dragging ? dragDx : 0}px));` +
			`transition: ${dragging ? 'none' : 'transform 0.38s cubic-bezier(0.16,1,0.3,1)'};`
	);
</script>

<div class="homescreen">
	<!-- clip wrapper — touch & mouse attached here -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="slides-clip" bind:this={clipEl} onmousedown={onMouseDown}>
		<div class="slides-track" style={trackStyle}>
			<!-- Slide 1: hero + widgets + 2 apps -->
			<div class="slide">
				<div class="slide-inner">
					<!-- Mini hero -->
					<div class="ph-hero">
						<img src="/images/profile-img.png" alt="Sajudin" class="ph-avatar" />
						<div class="ph-hero-body">
							<p class="ph-greeting">Good {getGreeting()}</p>
							<h2 class="ph-name">Sajudin Ma'ruf</h2>
							<p class="ph-role">Frontend &amp; Mobile Dev</p>
						</div>
					</div>

					<Widget type="clock" size="full" />
					<div class="widget-row">
						<Widget type="profile" size="half" />
						<Widget type="skills" size="half" />
					</div>
					<div class="app-row">
						{#each widgetPageApps as app, i}
							<button
								class="app-btn"
								style="animation-delay:{i * 70}ms"
								onclick={() => onopen(app.id)}
								aria-label="Open {app.label}"
							>
								<div class="app-icon"><AppIcon id={app.id} size={60} /></div>
								<span class="app-label">{app.label}</span>
							</button>
						{/each}
					</div>
				</div>
			</div>

			<!-- Slide 2: all apps -->
			<div class="slide">
				<div class="slide-inner">
					<div class="apps-grid">
						{#each allApps as app, i}
							<button
								class="app-btn"
								style="animation-delay:{i * 55}ms"
								onclick={() => onopen(app.id)}
								aria-label="Open {app.label}"
							>
								<div class="app-icon"><AppIcon id={app.id} size={60} /></div>
								<span class="app-label">{app.label}</span>
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Dots -->
	<div class="dots">
		{#each [0, 1] as p}
			<button
				class="dot"
				class:active={currentPage === p}
				onclick={() => (currentPage = p)}
				aria-label="Page {p + 1}"
			></button>
		{/each}
	</div>
</div>

<style>
	.homescreen {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	/* Clipping container — exactly one viewport wide, hides overflow */
	.slides-clip {
		flex: 1;
		width: 100%;
		overflow: hidden;
		position: relative;
		cursor: grab;
		touch-action: pan-y; /* allow vertical scroll, intercept horizontal */
	}

	.slides-clip:active {
		cursor: grabbing;
	}

	/* Track holds both slides side-by-side, each 100vw wide */
	.slides-track {
		display: flex;
		width: 200vw;
		height: 100%;
		will-change: transform;
	}

	/* Each slide = 100vw */
	.slide {
		width: 100vw;
		flex-shrink: 0;
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.slide::-webkit-scrollbar {
		display: none;
	}

	.slide-inner {
		padding: 14px 18px 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.widget-row {
		display: flex;
		gap: 12px;
		min-height: 120px;
	}

	.app-row {
		display: flex;
		justify-content: center;
		gap: 28px;
		padding: 4px 0 8px;
	}

	.apps-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 24px 0;
		justify-items: center;
		padding-top: 8px;
	}

	.app-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 7px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		opacity: 0;
		animation: popIn 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		-webkit-tap-highlight-color: transparent;
		touch-action: manipulation;
	}

	@keyframes popIn {
		from {
			opacity: 0;
			transform: scale(0.72);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.app-btn:active .app-icon {
		transform: scale(0.88);
	}

	.app-icon {
		width: 60px;
		height: 60px;
		filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.28));
		transition: transform 0.1s;
	}

	.app-label {
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
		font-size: 11px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.9);
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
		text-align: center;
	}

	/* Dots */
	.dots {
		display: flex;
		justify-content: center;
		gap: 7px;
		padding: 8px 0 6px;
		flex-shrink: 0;
	}

	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.28);
		border: none;
		cursor: pointer;
		padding: 0;
		transition:
			background 0.2s,
			transform 0.2s;
	}

	.dot.active {
		background: rgba(255, 255, 255, 0.85);
		transform: scale(1.2);
	}

	@media (max-width: 380px) {
		.slide-inner {
			padding: 10px 14px 16px;
			gap: 10px;
		}
		.widget-row {
			min-height: 100px;
			gap: 8px;
		}
		.app-icon {
			width: 52px;
			height: 52px;
		}
		.apps-grid {
			gap: 18px 0;
		}
	}

	/* iPhone hero */
	.ph-hero {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 4px 2px 2px;
		animation: phHeroIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@keyframes phHeroIn {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.ph-avatar {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid rgba(255, 255, 255, 0.25);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
		flex-shrink: 0;
	}

	.ph-hero-body {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.ph-greeting {
		font-size: 10px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.4);
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.ph-name {
		font-size: 18px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.95);
		margin: 0;
		letter-spacing: -0.03em;
		text-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
	}

	.ph-role {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.5);
		margin: 0;
		font-weight: 400;
	}

	/* Light mode styles */
	:global(.mac-light) .ph-greeting {
		color: rgba(0, 0, 0, 0.4);
	}
	:global(.mac-light) .ph-name {
		color: rgba(0, 0, 0, 0.85);
		text-shadow: none;
	}
	:global(.mac-light) .ph-role {
		color: rgba(0, 0, 0, 0.5);
	}
	:global(.mac-light) .ph-avatar {
		border-color: rgba(0, 0, 0, 0.12);
	}
	:global(.mac-light) .app-label {
		color: rgba(0, 0, 0, 0.8);
		text-shadow: none;
	}
	:global(.mac-light) .dot {
		background: rgba(0, 0, 0, 0.18);
	}
	:global(.mac-light) .dot.active {
		background: rgba(0, 0, 0, 0.65);
	}
</style>
