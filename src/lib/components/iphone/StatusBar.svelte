<script lang="ts">
	import { onMount } from 'svelte';

	let time = $state('');

	onMount(() => {
		function tick() {
			const now = new Date();
			time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
		}
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});
</script>

<div class="iphone-statusbar">
	<!-- Clock left -->
	<div class="sb-time">{time}</div>

	<!-- Center spacer for dynamic island -->
	<div class="sb-center"></div>

	<!-- Icons right -->
	<div class="sb-icons">
		<!-- Signal -->
		<svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-label="Signal">
			<rect x="0"  y="7"  width="2.5" height="4" rx="0.8"/>
			<rect x="3.5" y="4.5" width="2.5" height="6.5" rx="0.8"/>
			<rect x="7" y="2" width="2.5" height="9" rx="0.8"/>
			<rect x="10.5" y="0" width="2.5" height="11" rx="0.8" opacity="0.28"/>
		</svg>
		<!-- Wifi -->
		<svg width="15" height="11" viewBox="0 0 16 12" fill="none" stroke="currentColor" stroke-linecap="round" aria-label="Wifi">
			<path d="M1 4a9.5 9.5 0 0 1 14 0" stroke-width="1.3" opacity="0.38"/>
			<path d="M3.5 6.5a6 6 0 0 1 9 0" stroke-width="1.3" opacity="0.7"/>
			<path d="M6 9a3 3 0 0 1 4 0" stroke-width="1.3"/>
			<circle cx="8" cy="11" r="0.9" fill="currentColor" stroke="none"/>
		</svg>
		<!-- Battery -->
		<div class="battery">
			<div class="bat-body"><div class="bat-fill" style="width:74%"></div></div>
			<div class="bat-tip"></div>
		</div>
	</div>
</div>

<style>
	.iphone-statusbar {
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 54px;
		display: flex;
		align-items: flex-end;
		padding: 0 20px 10px;
		z-index: 100;
		color: rgba(255,255,255,0.92);
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
		user-select: none;
	}

	.sb-time {
		font-size: 15px;
		font-weight: 600;
		letter-spacing: -0.02em;
		flex: 1;
	}

	.sb-center { flex: 1; }

	.sb-icons {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 6px;
	}

	.battery { display: flex; align-items: center; gap: 1px; }

	.bat-body {
		width: 22px; height: 11px;
		border: 1.5px solid rgba(255,255,255,0.75);
		border-radius: 3px;
		padding: 1.5px;
		overflow: hidden;
	}

	.bat-fill {
		height: 100%;
		background: rgba(255,255,255,0.85);
		border-radius: 1.5px;
	}

	.bat-tip {
		width: 2px; height: 5px;
		background: rgba(255,255,255,0.6);
		border-radius: 0 1px 1px 0;
	}

	/* Light mode styles */
	:global(.mac-light) .iphone-statusbar {
		color: rgba(0, 0, 0, 0.88);
	}
	:global(.mac-light) .iphone-statusbar .bat-body {
		border-color: rgba(0, 0, 0, 0.7);
	}
	:global(.mac-light) .iphone-statusbar .bat-fill {
		background: rgba(0, 0, 0, 0.8);
	}
	:global(.mac-light) .iphone-statusbar .bat-tip {
		background: rgba(0, 0, 0, 0.5);
	}
</style>
