<script lang="ts">
	import AppIcon from '$lib/components/AppIcon.svelte';

	interface Props {
		windows: any[];
		onopen: (id: string) => void;
	}

	let { windows, onopen }: Props = $props();

	const dockApps = [
		{ id: 'finder',   label: 'Finder'   },
		{ id: 'safari',   label: 'Safari'   },
		{ id: 'notes',    label: 'Notes'    },
		{ id: 'mail',     label: 'Mail'     },
		{ id: 'settings', label: 'Settings' },
	];

	function isOpen(id: string) {
		return windows.find((w: any) => w.id === id)?.isOpen ?? false;
	}
</script>

<div class="ipad-dock-bar">
	<div class="ipad-dock">
		{#each dockApps as app}
			<button class="idk-item" onclick={() => onopen(app.id)} aria-label={app.label}>
				<div class="idk-icon">
					<AppIcon id={app.id} size={54} />
				</div>
				{#if isOpen(app.id)}
					<div class="idk-dot"></div>
				{/if}
				<div class="idk-tooltip">{app.label}</div>
			</button>
		{/each}
	</div>
</div>

<style>
	.ipad-dock-bar {
		position: absolute;
		bottom: 16px;
		left: 0; right: 0;
		display: flex;
		justify-content: center;
		z-index: 50;
		animation: dockUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
	}

	@keyframes dockUp {
		from { opacity: 0; transform: translateY(28px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	.ipad-dock {
		display: flex;
		align-items: flex-end;
		gap: 16px;
		padding: 10px 20px 12px;
		background: rgba(30, 30, 40, 0.48);
		backdrop-filter: blur(32px) saturate(180%);
		-webkit-backdrop-filter: blur(32px) saturate(180%);
		border: 1px solid rgba(255,255,255,0.14);
		border-radius: 26px;
		box-shadow: 0 8px 28px rgba(0,0,0,0.28);
	}

	.idk-item {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		-webkit-tap-highlight-color: transparent;
		transition: transform 0.14s ease;
	}

	.idk-item:active { transform: scale(0.88); }

	.idk-icon {
		width: 54px;
		height: 54px;
		filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
	}

	.idk-dot {
		width: 4px; height: 4px;
		border-radius: 50%;
		background: rgba(255,255,255,0.75);
		position: absolute;
		bottom: -6px;
	}

	.idk-tooltip {
		position: absolute;
		bottom: calc(100% + 14px);
		left: 50%;
		transform: translateX(-50%) scale(0.9);
		background: rgba(28,28,32,0.92);
		backdrop-filter: blur(12px);
		color: rgba(255,255,255,0.9);
		font-family: -apple-system, sans-serif;
		font-size: 11px;
		font-weight: 500;
		padding: 4px 10px;
		border-radius: 7px;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.14s, transform 0.14s;
		border: 1px solid rgba(255,255,255,0.1);
	}

	.idk-item:hover .idk-tooltip {
		opacity: 1;
		transform: translateX(-50%) scale(1);
	}
</style>
