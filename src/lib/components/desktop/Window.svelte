<script lang="ts">
	import { desktopStore, type WindowState } from '$lib/stores/desktop';

	interface Props {
		windowState: WindowState;
		active: boolean;
		children: any;
	}

	let { windowState, active, children }: Props = $props();

	let windowEl: HTMLDivElement = $state()!;
	let isDragging = $state(false);
	let isResizing = $state(false);
	let resizeDir = $state('');

	let startX = 0, startY = 0;
	let startW = 0, startH = 0;
	let startLeft = 0, startTop = 0;

	function handleMouseDown(e: MouseEvent) {
		if ((e.target as HTMLElement).closest('.window-header-buttons')) return;
		desktopStore.focusWindow(windowState.id);
		if (windowState.isMaximized || windowState.isFullscreen) return;

		isDragging = true;
		startX = e.clientX;
		startY = e.clientY;
		startLeft = windowState.x;
		startTop = windowState.y;

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging) return;
		const dx = e.clientX - startX;
		const dy = e.clientY - startY;
		desktopStore.updatePosition(windowState.id, Math.max(0, startLeft + dx), Math.max(28, startTop + dy));
	}

	function handleMouseUp() {
		isDragging = false;
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	}

	function handleResizeMouseDown(e: MouseEvent, dir: string) {
		e.stopPropagation();
		e.preventDefault();
		if (windowState.isMaximized || windowState.isFullscreen) return;
		desktopStore.focusWindow(windowState.id);

		isResizing = true;
		resizeDir = dir;
		startX = e.clientX;
		startY = e.clientY;
		startW = windowState.width;
		startH = windowState.height;
		startLeft = windowState.x;
		startTop = windowState.y;

		document.addEventListener('mousemove', handleResizeMove);
		document.addEventListener('mouseup', handleResizeUp);
	}

	function handleResizeMove(e: MouseEvent) {
		if (!isResizing) return;
		const dx = e.clientX - startX;
		const dy = e.clientY - startY;

		if (resizeDir === 'se') {
			desktopStore.updateSize(windowState.id, Math.max(400, startW + dx), Math.max(240, startH + dy));
		} else if (resizeDir === 's') {
			desktopStore.updateSize(windowState.id, startW, Math.max(240, startH + dy));
		} else if (resizeDir === 'e') {
			desktopStore.updateSize(windowState.id, Math.max(400, startW + dx), startH);
		} else if (resizeDir === 'w') {
			const newW = Math.max(400, startW - dx);
			desktopStore.updateSize(windowState.id, newW, startH);
			desktopStore.updatePosition(windowState.id, startLeft + (startW - newW), windowState.y);
		} else if (resizeDir === 'n') {
			const newH = Math.max(240, startH - dy);
			desktopStore.updateSize(windowState.id, startW, newH);
			desktopStore.updatePosition(windowState.id, windowState.x, startTop + (startH - newH));
		}
	}

	function handleResizeUp() {
		isResizing = false;
		document.removeEventListener('mousemove', handleResizeMove);
		document.removeEventListener('mouseup', handleResizeUp);
	}

	function handleFocus() {
		desktopStore.focusWindow(windowState.id);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && windowState.isFullscreen) {
			desktopStore.toggleFullscreen(windowState.id);
		}
	}

	const isExpanded = $derived(windowState.isFullscreen);

	const winStyle = $derived(() => {
		if (windowState.isFullscreen) {
			return `left:0;top:28px;width:100vw;height:calc(100vh - 28px);border-radius:0;`;
		}
		if (windowState.isMaximized) {
			return `left:0;top:28px;width:100vw;height:calc(100vh - 90px);border-radius:0;`;
		}
		return `left:${windowState.x}px;top:${windowState.y}px;width:${windowState.width}px;height:${windowState.height}px;`;
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	bind:this={windowEl}
	class="mac-window"
	class:is-active={active}
	class:is-maximized={windowState.isMaximized}
	class:is-fullscreen={windowState.isFullscreen}
	class:is-minimized={windowState.isMinimized}
	style="{winStyle()} z-index:{windowState.zIndex};"
	onmousedown={handleFocus}
	role="dialog"
	tabindex="-1"
>
	<!-- Resize handles (north, west, east, south, corners) -->
	{#if !isExpanded && !windowState.isMaximized}
		<div class="resize-n" onmousedown={(e) => handleResizeMouseDown(e, 'n')} role="presentation"></div>
		<div class="resize-e" onmousedown={(e) => handleResizeMouseDown(e, 'e')} role="presentation"></div>
		<div class="resize-s" onmousedown={(e) => handleResizeMouseDown(e, 's')} role="presentation"></div>
		<div class="resize-w" onmousedown={(e) => handleResizeMouseDown(e, 'w')} role="presentation"></div>
		<div class="resize-se" onmousedown={(e) => handleResizeMouseDown(e, 'se')} role="presentation"></div>
	{/if}

	<!-- Title bar -->
	<div
		class="win-header"
		class:win-header-inactive={!active}
		onmousedown={handleMouseDown}
		role="presentation"
	>
		<div class="win-traffic">
			<button
				aria-label="Close"
				class="traffic close"
				class:traffic-inactive={!active}
				onclick={() => desktopStore.closeWindow(windowState.id)}
			>
				<svg class="traffic-icon" viewBox="0 0 10 10" fill="none" stroke="rgba(0,0,0,0.55)" stroke-width="1.5" stroke-linecap="round">
					<line x1="3" y1="3" x2="7" y2="7"/>
					<line x1="7" y1="3" x2="3" y2="7"/>
				</svg>
			</button>
			<button
				aria-label="Minimize"
				class="traffic minimize"
				class:traffic-inactive={!active}
				onclick={() => desktopStore.minimizeWindow(windowState.id)}
			>
				<svg class="traffic-icon" viewBox="0 0 10 10" fill="none" stroke="rgba(0,0,0,0.55)" stroke-width="1.5" stroke-linecap="round">
					<line x1="2" y1="5" x2="8" y2="5"/>
				</svg>
			</button>
			<button
				aria-label="Full Screen"
				class="traffic fullscreen"
				class:traffic-inactive={!active}
				onclick={() => desktopStore.toggleFullscreen(windowState.id)}
			>
				{#if windowState.isFullscreen}
					<!-- Exit fullscreen: two inward arrows ↙ ↗ -->
					<svg class="traffic-icon" viewBox="0 0 10 10" fill="none" stroke="rgba(0,0,0,0.55)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="6,2 8,2 8,4"/>
						<line x1="5.5" y1="4.5" x2="8" y2="2"/>
						<polyline points="4,6 2,6 2,8"/>
						<line x1="4.5" y1="5.5" x2="2" y2="8"/>
					</svg>
				{:else}
					<!-- Enter fullscreen: two outward arrows ↗ ↙ -->
					<svg class="traffic-icon" viewBox="0 0 10 10" fill="none" stroke="rgba(0,0,0,0.55)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="2,4 2,2 4,2"/>
						<line x1="2" y1="2" x2="4.5" y2="4.5"/>
						<polyline points="6,8 8,8 8,6"/>
						<line x1="8" y1="8" x2="5.5" y2="5.5"/>
					</svg>
				{/if}
			</button>
		</div>

		<div class="win-title" class:win-title-inactive={!active}>
			{windowState.title}
		</div>

		<div class="win-header-spacer"></div>
	</div>

	<!-- Content -->
	<div class="win-body">
		{@render children()}
	</div>
</div>

<style>
	.mac-window {
		position: absolute;
		display: flex;
		flex-direction: column;
		background: var(--mac-win-chrome);
		backdrop-filter: blur(28px) saturate(160%);
		-webkit-backdrop-filter: blur(28px) saturate(160%);
		border: 1px solid var(--mac-win-border);
		border-radius: 12px;
		box-shadow:
			0 0 0 0.5px rgba(0,0,0,0.18),
			0 8px 24px rgba(0,0,0,0.22),
			0 24px 60px rgba(0,0,0,0.30);
		overflow: hidden;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease,
			left 0.22s cubic-bezier(0.16, 1, 0.3, 1),
			top 0.22s cubic-bezier(0.16, 1, 0.3, 1),
			width 0.22s cubic-bezier(0.16, 1, 0.3, 1),
			height 0.22s cubic-bezier(0.16, 1, 0.3, 1),
			border-radius 0.22s ease,
			opacity 0.18s ease,
			transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
		animation: windowOpen 0.28s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@keyframes windowOpen {
		from {
			opacity: 0;
			transform: scale(0.93) translateY(12px);
			filter: blur(2px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
			filter: blur(0);
		}
	}

	.mac-window.is-active {
		border-color: var(--mac-win-border-active);
		box-shadow:
			0 0 0 0.5px rgba(0,0,0,0.22),
			0 10px 30px rgba(0,0,0,0.30),
			0 30px 70px rgba(0,0,0,0.36);
	}

	.mac-window.is-minimized {
		display: none;
	}

	.mac-window.is-maximized,
	.mac-window.is-fullscreen {
		border-radius: 0;
		border: none;
	}

	/* Resize handles */
	.resize-n  { position: absolute; top: 0;    left: 4px; right: 4px; height: 4px; cursor: n-resize;  z-index: 10; }
	.resize-s  { position: absolute; bottom: 0; left: 4px; right: 4px; height: 4px; cursor: s-resize;  z-index: 10; }
	.resize-e  { position: absolute; right: 0;  top: 4px;  bottom: 4px; width: 4px; cursor: e-resize;  z-index: 10; }
	.resize-w  { position: absolute; left: 0;   top: 4px;  bottom: 4px; width: 4px; cursor: w-resize;  z-index: 10; }
	.resize-se { position: absolute; bottom: 0; right: 0;  width: 12px; height: 12px; cursor: se-resize; z-index: 11; }

	/* Header */
	.win-header {
		height: 38px;
		background: var(--mac-win-header);
		border-bottom: 1px solid var(--mac-win-border);
		display: flex;
		align-items: center;
		padding: 0 14px;
		user-select: none;
		cursor: default;
		flex-shrink: 0;
		transition: background 0.2s;
	}

	.win-header-inactive {
		background: var(--mac-win-chrome);
	}

	.win-traffic {
		display: flex;
		gap: 8px;
		width: 56px;
		flex-shrink: 0;
	}

	.traffic {
		width: 13px;
		height: 13px;
		border-radius: 50%;
		border: none;
		cursor: pointer;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		flex-shrink: 0;
		transition: filter 0.1s;
	}

	.traffic.close    { background: #ff5f57; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.12); }
	.traffic.minimize { background: #ffbd2e; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.12); }
	.traffic.fullscreen { background: #28c840; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.12); }

	.traffic.traffic-inactive {
		background: #6e6e73 !important;
		box-shadow: none !important;
	}

	.traffic:hover {
		filter: brightness(0.82);
	}

	.traffic-icon {
		width: 8px;
		height: 8px;
		opacity: 0;
		transition: opacity 0.1s;
		pointer-events: none;
	}

	/* Show icon only on hover of that specific button */
	.traffic:hover .traffic-icon {
		opacity: 1;
	}

	/* When header is hovered, show all icons subtly */
	.win-header:hover .traffic-icon {
		opacity: 0.55;
	}

	/* Hovered button's icon is fully opaque (overrides above) */
	.win-header:hover .traffic:hover .traffic-icon {
		opacity: 1;
	}

	.win-title {
		flex: 1;
		text-align: center;
		color: var(--mac-win-title);
		font-size: 13px;
		font-weight: 500;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
		letter-spacing: -0.01em;
		transition: color 0.2s;
		pointer-events: none;
	}

	.win-title-inactive {
		color: var(--mac-win-title-inactive);
	}

	.win-header-spacer {
		width: 56px;
		flex-shrink: 0;
	}

	/* Body */
	.win-body {
		flex: 1;
		overflow: auto;
		position: relative;
		background: var(--mac-win-body);
		color: var(--mac-text);
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
	}
</style>
