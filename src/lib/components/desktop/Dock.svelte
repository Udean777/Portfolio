<script lang="ts">
	import { desktopStore } from '$lib/stores/desktop';
	import { dragStore, dockItemIds } from '$lib/stores/drag';
	import AppIcon from '$lib/components/AppIcon.svelte';

	interface Props {
		windows: any[];
	}

	let { windows }: Props = $props();

	let mouseX = $state<number | null>(null);
	let dockEl: HTMLDivElement | null = $state(null);
	let itemEls: (HTMLDivElement | null)[] = $state([]);

	let dockItems = $state([
		{ id: 'finder',   label: 'Finder' },
		{ id: 'terminal', label: 'Terminal' },
		{ id: 'safari',   label: 'Safari' },
		{ id: 'notes',    label: 'Notes' },
		{ id: 'mail',     label: 'Mail' },
		{ id: 'settings', label: 'System Settings' },
	]);

	const ICON_BASE = 52;
	const ICON_MAX  = 72;
	const MAGNIFY_RANGE = 110;

	function isOpen(id: string) {
		return windows.find((w) => w.id === id)?.isOpen ?? false;
	}

	function getScale(el: HTMLDivElement | null): number {
		if (mouseX === null || !el || $dragStore.dragging) return 1;
		const rect = el.getBoundingClientRect();
		const center = rect.left + rect.width / 2;
		const dist = Math.abs(mouseX - center);
		if (dist >= MAGNIFY_RANGE) return 1;
		const t = 1 - dist / MAGNIFY_RANGE;
		return 1 + (ICON_MAX / ICON_BASE - 1) * Math.pow(t, 1.6);
	}

	function handleDockMouseMove(e: MouseEvent) { mouseX = e.clientX; }

	function handleDockMouseLeave() {
		mouseX = null;
		if (!$dragStore.dragging) dragStore.setOverDock(false, null);
	}

	function getInsertIndex(clientX: number): number {
		if (!dockEl) return dockItems.length;
		const els = itemEls.filter(Boolean) as HTMLDivElement[];
		for (let i = 0; i < els.length; i++) {
			const rect = els[i].getBoundingClientRect();
			if (clientX < rect.left + rect.width / 2) return i;
		}
		return dockItems.length;
	}

	$effect(() => {
		function onGlobalMouseUp(e: MouseEvent) {
			if (!$dragStore.dragging) return;
			if (!dockEl) return;
			const rect = dockEl.getBoundingClientRect();
			const over = e.clientX >= rect.left - 20 && e.clientX <= rect.right + 20 && e.clientY >= rect.top - 40 && e.clientY <= rect.bottom + 20;
			if (over) {
				const ds = $dragStore;
				if (ds.dragging && ds.overDock) {
					const alreadyInDock = dockItems.some(d => d.id === ds.id);
					if (!alreadyInDock) {
						const idx = ds.dockInsertIndex ?? dockItems.length;
						const newItems = [...dockItems];
						newItems.splice(idx, 0, { id: ds.id, label: ds.label });
						dockItems = newItems;
						itemEls = Array(dockItems.length).fill(null);
						// sync the shared store so desktop hides this icon
						dockItemIds.update(s => { s.add(ds.id); return new Set(s); });
					}
				}
				dragStore.end();
			} else {
				dragStore.setOverDock(false, null);
			}
		}

		function onGlobalMouseMove(e: MouseEvent) {
			if (!$dragStore.dragging || !dockEl) return;
			const rect = dockEl.getBoundingClientRect();
			const over = e.clientX >= rect.left - 20 && e.clientX <= rect.right + 20 && e.clientY >= rect.top - 40 && e.clientY <= rect.bottom + 20;
			if (over) {
				dragStore.setOverDock(true, getInsertIndex(e.clientX));
			} else {
				dragStore.setOverDock(false, null);
			}
		}

		window.addEventListener('mouseup', onGlobalMouseUp);
		window.addEventListener('mousemove', onGlobalMouseMove);
		return () => {
			window.removeEventListener('mouseup', onGlobalMouseUp);
			window.removeEventListener('mousemove', onGlobalMouseMove);
		};
	});

	const insertIdx = $derived($dragStore.dragging && $dragStore.overDock ? $dragStore.dockInsertIndex : null);
	const draggingId = $derived($dragStore.dragging ? $dragStore.id : null);
</script>

<div class="dock-container">
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		bind:this={dockEl}
		class="dock"
		class:dock-drop-active={$dragStore.dragging && $dragStore.overDock}
		onmousemove={handleDockMouseMove}
		onmouseleave={handleDockMouseLeave}
		role="toolbar"
		aria-label="Dock"
		tabindex="0"
	>
		{#each dockItems as item, i (item.id)}
			{#if insertIdx === i && draggingId && !dockItems.some(d => d.id === draggingId)}
				<div class="dock-insert-gap">
					<div class="dock-insert-preview">
						<AppIcon id={draggingId} size={44} />
					</div>
				</div>
			{/if}

			{#if item.id === 'settings'}
				<div class="dock-separator"></div>
			{/if}

			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				bind:this={itemEls[i]}
				class="dock-item"
				style="transform: translateY({-4 * (getScale(itemEls[i]) - 1)}px) scale({getScale(itemEls[i])});"
				onclick={() => desktopStore.openWindow(item.id)}
				role="button"
				tabindex="0"
				aria-label={item.label}
			>
				<div class="dock-icon-wrap">
					<AppIcon id={item.id} size={52} />
				</div>
				<div class="dock-tooltip">{item.label}</div>
				{#if isOpen(item.id)}
					<div class="dock-dot"></div>
				{/if}
			</div>
		{/each}

		{#if insertIdx === dockItems.length && draggingId && !dockItems.some(d => d.id === draggingId)}
			<div class="dock-insert-gap">
				<div class="dock-insert-preview">
					<AppIcon id={draggingId} size={44} />
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.dock-container {
		position: fixed;
		bottom: 10px;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		pointer-events: none;
		z-index: 9000;
		animation: dockIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
	}

	@keyframes dockIn {
		from { opacity: 0; transform: translateY(32px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	.dock {
		background: var(--mac-dock-bg);
		backdrop-filter: blur(28px) saturate(160%);
		-webkit-backdrop-filter: blur(28px) saturate(160%);
		border: 1px solid var(--mac-dock-border);
		border-radius: 20px;
		padding: 8px 20px;
		display: flex;
		align-items: flex-end;
		gap: 18px;
		pointer-events: auto;
		box-shadow: 0 8px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.16);
		transition: border-color 0.2s, box-shadow 0.2s;
	}

	.dock-drop-active {
		border-color: rgba(255, 255, 255, 0.30);
		box-shadow: 0 8px 32px rgba(0,0,0,0.36), 0 0 0 1px rgba(255,255,255,0.12), 0 2px 8px rgba(0,0,0,0.16);
	}

	/* Insert gap / drop preview */
	.dock-insert-gap {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 52px;
		flex-shrink: 0;
		animation: gapIn 0.18s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@keyframes gapIn {
		from { width: 0; opacity: 0; }
		to   { width: 52px; opacity: 1; }
	}

	.dock-insert-preview {
		width: 52px;
		height: 52px;
		border: 2px dashed rgba(255,255,255,0.35);
		border-radius: 13px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255,255,255,0.06);
	}

	.dock-item {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		cursor: pointer;
		transform-origin: bottom center;
		transition: transform 0.14s cubic-bezier(0.16, 1, 0.3, 1);
		will-change: transform;
		-webkit-tap-highlight-color: transparent;
		flex-shrink: 0;
	}

	.dock-item:active :global(.app-svg) {
		filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3)) brightness(0.85);
	}

	.dock-icon-wrap {
		width: 52px;
		height: 52px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global(.dock-icon-wrap .app-svg) {
		width: 52px;
		height: 52px;
		filter: drop-shadow(0 2px 6px rgba(0,0,0,0.30));
		transition: filter 0.12s ease;
	}

	.dock-dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--mac-bar-text);
		margin-top: 4px;
		opacity: 0.7;
		animation: dotIn 0.3s ease both;
	}

	@keyframes dotIn {
		from { opacity: 0; transform: scale(0); }
		to   { opacity: 0.7; transform: scale(1); }
	}

	.dock-separator {
		width: 1px;
		height: 40px;
		background: var(--mac-dock-border);
		margin: 0 2px;
		align-self: center;
		border-radius: 1px;
		opacity: 0.6;
		flex-shrink: 0;
	}

	.dock-tooltip {
		position: absolute;
		bottom: calc(100% + 12px);
		left: 50%;
		transform: translateX(-50%) scale(0.92);
		background: var(--mac-dropdown-bg);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		color: var(--mac-dropdown-text);
		font-family: -apple-system, BlinkMacSystemFont, sans-serif;
		font-size: 12px;
		font-weight: 500;
		padding: 4px 10px;
		border-radius: 7px;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.14s ease, transform 0.14s ease;
		border: 1px solid var(--mac-dropdown-border);
		box-shadow: 0 4px 12px rgba(0,0,0,0.18);
	}

	.dock-item:hover .dock-tooltip {
		opacity: 1;
		transform: translateX(-50%) scale(1);
	}
</style>
