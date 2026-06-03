<script lang="ts">
	import AppIcon from '$lib/components/AppIcon.svelte';

	interface Props {
		onopen: (id: string) => void;
	}
	let { onopen }: Props = $props();

	const apps = [
		{ id: 'notes',    label: 'Notes'    },
		{ id: 'safari',   label: 'Safari'   },
		{ id: 'finder',   label: 'Finder'   },
		{ id: 'mail',     label: 'Mail'     },
		{ id: 'settings', label: 'Settings' },
	];
</script>

<div class="app-grid">
	{#each apps as app, i}
		<button
			class="app-item"
			style="animation-delay:{i * 60}ms"
			onclick={() => onopen(app.id)}
			aria-label="Open {app.label}"
		>
			<div class="icon-wrap">
				<AppIcon id={app.id} size={76} />
			</div>
			<span class="app-label">{app.label}</span>
		</button>
	{/each}
</div>

<style>
	.app-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 28px 16px;
		padding: 24px 32px;
		justify-items: center;
	}

	.app-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		opacity: 0;
		animation: iconPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		-webkit-tap-highlight-color: transparent;
	}

	@keyframes iconPop {
		from { opacity: 0; transform: scale(0.7) translateY(10px); }
		to   { opacity: 1; transform: scale(1) translateY(0); }
	}

	.app-item:active .icon-wrap { transform: scale(0.9); }

	.icon-wrap {
		width: 76px;
		height: 76px;
		border-radius: 20px;
		overflow: hidden;
		filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
		transition: transform 0.12s ease;
	}

	.app-label {
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
		font-size: 12px;
		font-weight: 500;
		color: rgba(255,255,255,0.9);
		text-shadow: 0 1px 4px rgba(0,0,0,0.7);
		text-align: center;
	}

	@media (max-width: 900px) {
		.app-grid { gap: 22px 12px; padding: 20px 24px; }
	}

	@media (max-width: 600px) {
		.app-grid { grid-template-columns: repeat(3, 1fr); gap: 20px 10px; padding: 16px; }
	}
</style>
