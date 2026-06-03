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
		notes: 'Notes', safari: 'Safari', finder: 'Finder',
		mail: 'Mail', settings: 'Settings',
	};
</script>

{#if appId}
	<div class="ph-app-shell">
		<!-- Status-bar height spacer -->
		<div class="status-space"></div>

		<!-- Nav bar -->
		<div class="ph-nav">
			<button class="ph-back" onclick={onclose} aria-label="Back">
				<svg width="10" height="17" viewBox="0 0 10 17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M9 1L1 8.5L9 16"/>
				</svg>
				<span>Back</span>
			</button>
			<span class="ph-nav-title">{titles[appId] ?? appId}</span>
			<div class="ph-nav-spacer"></div>
		</div>

		<div class="ph-content">
			{#if appId === 'notes'}     <Notes />
			{:else if appId === 'safari'} <Safari />
			{:else if appId === 'finder'} <Finder />
			{:else if appId === 'mail'}   <Mail />
			{:else if appId === 'settings'} <Settings />
			{/if}
		</div>

		<!-- Home indicator bottom -->
		<div class="ph-bottom-bar">
			<div class="home-indicator"></div>
		</div>
	</div>
{/if}

<style>
	.ph-app-shell {
		position: fixed;
		inset: 0;
		z-index: 300;
		display: flex;
		flex-direction: column;
		background: var(--mac-win-body, #1c1c1e);
		animation: slideUp 0.42s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@keyframes slideUp {
		from { transform: translateY(100%); opacity: 0.6; }
		to   { transform: translateY(0); opacity: 1; }
	}

	.status-space {
		height: 54px;
		flex-shrink: 0;
		background: var(--mac-win-header, rgba(28,28,32,0.98));
	}

	.ph-nav {
		height: 44px;
		display: flex;
		align-items: center;
		padding: 0 12px;
		background: var(--mac-win-header, rgba(36,36,42,0.98));
		border-bottom: 1px solid var(--mac-separator, rgba(255,255,255,0.08));
		flex-shrink: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
	}

	.ph-back {
		display: flex;
		align-items: center;
		gap: 5px;
		background: none;
		border: none;
		color: var(--mac-accent, #0a84ff);
		font-size: 16px;
		font-family: inherit;
		cursor: pointer;
		padding: 6px 8px 6px 0;
		border-radius: 6px;
		width: 80px;
		transition: opacity 0.12s;
	}

	.ph-back:active { opacity: 0.5; }

	.ph-nav-title {
		flex: 1;
		text-align: center;
		font-size: 17px;
		font-weight: 600;
		color: var(--mac-text, rgba(255,255,255,0.9));
		letter-spacing: -0.02em;
	}

	.ph-nav-spacer { width: 80px; }

	.ph-content {
		flex: 1;
		overflow: hidden;
		position: relative;
	}

	.ph-bottom-bar {
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		background: var(--mac-win-body, #1c1c1e);
	}

	.home-indicator {
		width: 134px;
		height: 5px;
		background: rgba(255,255,255,0.28);
		border-radius: 3px;
	}
</style>
