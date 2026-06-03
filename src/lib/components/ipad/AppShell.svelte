<script lang="ts">
	import Notes from '$lib/components/desktop/apps/Notes.svelte';
	import Safari from '$lib/components/desktop/apps/Safari.svelte';
	import Finder from '$lib/components/desktop/apps/Finder.svelte';
	import Mail from '$lib/components/desktop/apps/Mail.svelte';
	import Settings from '$lib/components/desktop/apps/Settings.svelte';

	interface Props {
		appId: string | null;
		onclose: () => void;
	}

	let { appId, onclose }: Props = $props();

	const titles: Record<string, string> = {
		notes:    'Notes',
		safari:   'Safari',
		finder:   'Finder',
		mail:     'Mail',
		settings: 'System Settings',
	};
</script>

{#if appId}
	<div class="app-shell" class:visible={!!appId}>
		<!-- Nav bar -->
		<div class="app-nav">
			<button class="back-btn" onclick={onclose} aria-label="Back">
				<svg width="10" height="17" viewBox="0 0 10 17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M9 1L1 8.5L9 16"/>
				</svg>
				<span>Back</span>
			</button>
			<span class="app-title">{titles[appId] ?? appId}</span>
			<div class="nav-spacer"></div>
		</div>

		<!-- App content -->
		<div class="app-content">
			{#if appId === 'notes'}
				<Notes />
			{:else if appId === 'safari'}
				<Safari />
			{:else if appId === 'finder'}
				<Finder />
			{:else if appId === 'mail'}
				<Mail />
			{:else if appId === 'settings'}
				<Settings />
			{/if}
		</div>
	</div>
{/if}

<style>
	.app-shell {
		position: absolute;
		inset: 0;
		z-index: 200;
		display: flex;
		flex-direction: column;
		background: var(--mac-win-body, #1c1c1e);
		animation: appOpen 0.36s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@keyframes appOpen {
		from { opacity: 0; transform: scale(0.96) translateY(16px); }
		to   { opacity: 1; transform: scale(1) translateY(0); }
	}

	/* Nav bar */
	.app-nav {
		height: 52px;
		display: flex;
		align-items: center;
		padding: 0 12px;
		background: var(--mac-win-header, rgba(44,44,50,0.95));
		border-bottom: 1px solid var(--mac-separator, rgba(255,255,255,0.08));
		flex-shrink: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
	}

	.back-btn {
		display: flex;
		align-items: center;
		gap: 5px;
		background: none;
		border: none;
		color: var(--mac-accent, #0a84ff);
		font-size: 16px;
		font-family: inherit;
		cursor: pointer;
		padding: 6px 8px 6px 2px;
		border-radius: 6px;
		transition: opacity 0.12s;
		width: 90px;
	}

	.back-btn:hover { opacity: 0.7; }
	.back-btn:active { opacity: 0.5; }

	.app-title {
		flex: 1;
		text-align: center;
		font-size: 17px;
		font-weight: 600;
		color: var(--mac-text, rgba(255,255,255,0.9));
		letter-spacing: -0.02em;
	}

	.nav-spacer { width: 90px; }

	/* Content */
	.app-content {
		flex: 1;
		overflow: hidden;
		position: relative;
	}
</style>
