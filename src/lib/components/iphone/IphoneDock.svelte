<script lang="ts">
	import AppIcon from '$lib/components/AppIcon.svelte';

	interface Props {
		onopen: (id: string) => void;
	}
	let { onopen }: Props = $props();

	const dockItems = [
		{ id: 'finder',   label: 'Finder'   },
		{ id: 'safari',   label: 'Safari'   },
		{ id: 'mail',     label: 'Mail'     },
		{ id: 'settings', label: 'Settings' },
	];
</script>

<div class="iphone-dock-area">
	<div class="iphone-dock">
		{#each dockItems as item}
			<button class="ph-dock-btn" onclick={() => onopen(item.id)} aria-label={item.label}>
				<div class="ph-icon">
					<AppIcon id={item.id} size={52} />
				</div>
			</button>
		{/each}
	</div>
	<div class="home-indicator"></div>
</div>

<style>
	.iphone-dock-area {
		position: absolute;
		bottom: 0; left: 0; right: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 8px 16px 12px;
		z-index: 50;
	}

	.iphone-dock {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 10px 20px;
		background: rgba(28, 28, 36, 0.5);
		backdrop-filter: blur(32px) saturate(180%);
		-webkit-backdrop-filter: blur(32px) saturate(180%);
		border: 1px solid rgba(255,255,255,0.12);
		border-radius: 26px;
		box-shadow: 0 4px 20px rgba(0,0,0,0.28);
		animation: dockSlide 0.55s cubic-bezier(0.16,1,0.3,1) 0.25s both;
	}

	@keyframes dockSlide {
		from { opacity: 0; transform: translateY(24px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	.ph-dock-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		-webkit-tap-highlight-color: transparent;
		transition: transform 0.12s;
	}

	.ph-dock-btn:active { transform: scale(0.86); }

	.ph-icon {
		width: 52px;
		height: 52px;
		filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
	}

	.home-indicator {
		width: 134px;
		height: 5px;
		background: rgba(255,255,255,0.35);
		border-radius: 3px;
	}

	@media (max-width: 380px) {
		.iphone-dock { gap: 10px; padding: 8px 14px; }
		.ph-icon { width: 44px; height: 44px; }
	}
</style>
