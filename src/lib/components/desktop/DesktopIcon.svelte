<script lang="ts">
	import { desktopStore } from '$lib/stores/desktop';
	import { dragStore } from '$lib/stores/drag';
	import AppIcon from '$lib/components/AppIcon.svelte';

	interface Props {
		id: string;
		label: string;
		x: number;
		y: number;
		animIndex?: number;
	}

	let { id, label, x, y, animIndex = 0 }: Props = $props();

	let posX = $state(x);
	let posY = $state(y);
	let dragging = $state(false);
	let hasMoved = $state(false);
	let dragOffsetX = 0;
	let dragOffsetY = 0;

	function onMouseDown(e: MouseEvent) {
		if (e.button !== 0) return;
		e.preventDefault();
		e.stopPropagation();

		dragging = true;
		hasMoved = false;
		dragOffsetX = e.clientX - posX;
		dragOffsetY = e.clientY - posY;

		dragStore.start(id, label, posX, posY, e.clientX, e.clientY);

		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}

	function onMouseMove(e: MouseEvent) {
		hasMoved = true;
		posX = e.clientX - dragOffsetX;
		posY = e.clientY - dragOffsetY;
		dragStore.move(e.clientX, e.clientY);
	}

	function onMouseUp() {
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', onMouseUp);

		const ds = $dragStore;
		if (ds.overDock) {
			// snap back to original position
			posX = x;
			posY = y;
		}

		dragging = false;
		dragStore.end();
	}

	function onClick() {
		// only open window on click-without-drag
		if (!hasMoved) desktopStore.openWindow(id);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="desktop-icon"
	class:is-dragging={dragging}
	style="left:{posX}px; top:{posY}px; animation-delay:{animIndex * 70}ms;"
	onmousedown={onMouseDown}
	onclick={onClick}
	onkeydown={(e) => { if (e.key === 'Enter') desktopStore.openWindow(id); }}
	role="button"
	tabindex="0"
	aria-label={label}
>
	<div class="icon-wrap">
		<AppIcon {id} size={52} />
	</div>
	<span class="icon-label">{label}</span>
</div>

<style>
	.desktop-icon {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 72px;
		cursor: grab;
		user-select: none;
		gap: 5px;
		padding: 7px 6px;
		border-radius: 8px;
		z-index: 10;
		opacity: 0;
		animation: iconIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		transition: background 0.15s;
		touch-action: none;
	}

	@keyframes iconIn {
		from { opacity: 0; transform: scale(0.72) translateY(10px); }
		to   { opacity: 1; transform: scale(1) translateY(0); }
	}

	.desktop-icon:hover {
		background: rgba(255, 255, 255, 0.12);
	}

	.desktop-icon.is-dragging {
		cursor: grabbing;
		opacity: 0.6;
		z-index: 9998;
		background: transparent;
		/* kill animation when dragging so position updates freely */
		animation: none;
		transition: none;
	}

	.icon-wrap {
		width: 52px;
		height: 52px;
		display: flex;
		align-items: center;
		justify-content: center;
		filter: drop-shadow(0 2px 6px rgba(0,0,0,0.35));
		transition: transform 0.12s, filter 0.12s;
	}

	.desktop-icon:not(.is-dragging):hover .icon-wrap {
		transform: scale(1.08);
	}

	.desktop-icon.is-dragging .icon-wrap {
		transform: scale(1.14);
		filter: drop-shadow(0 8px 24px rgba(0,0,0,0.55));
	}

	.icon-label {
		color: #ffffff;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
		font-size: 11px;
		font-weight: 500;
		text-align: center;
		text-shadow: 0 1px 4px rgba(0, 0, 0, 0.85);
		line-height: 1.2;
		word-break: break-word;
	}
</style>
