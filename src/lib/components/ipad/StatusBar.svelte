<script lang="ts">
	import { onMount } from 'svelte';

	let time = $state('');
	let date = $state('');

	onMount(() => {
		function tick() {
			const now = new Date();
			time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
			date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
		}
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});
</script>

<div class="ipad-statusbar">
	<div class="sb-left">
		<span class="sb-time">{time}</span>
		<span class="sb-date">{date}</span>
	</div>
	<div class="sb-right">
		<!-- Signal bars -->
		<svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" aria-label="Signal">
			<rect x="0"  y="8"  width="3" height="4" rx="1" opacity="1"/>
			<rect x="4"  y="5"  width="3" height="7" rx="1" opacity="1"/>
			<rect x="8"  y="2"  width="3" height="10" rx="1" opacity="1"/>
			<rect x="12" y="0"  width="3" height="12" rx="1" opacity="0.3"/>
		</svg>
		<!-- Wifi -->
		<svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" stroke-linecap="round" aria-label="Wifi">
			<path d="M1 4.5a9.5 9.5 0 0 1 14 0" stroke-width="1.4" opacity="0.4"/>
			<path d="M3.5 7a6 6 0 0 1 9 0" stroke-width="1.4" opacity="0.7"/>
			<path d="M6 9.5a3 3 0 0 1 4 0" stroke-width="1.4"/>
			<circle cx="8" cy="11.5" r="0.9" fill="currentColor" stroke="none"/>
		</svg>
		<!-- Battery -->
		<div class="battery">
			<div class="battery-body">
				<div class="battery-fill" style="width: 78%"></div>
			</div>
			<div class="battery-tip"></div>
		</div>
	</div>
</div>

<style>
	.ipad-statusbar {
		position: absolute;
		top: 0; left: 0; right: 0;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
		z-index: 100;
		color: rgba(255,255,255,0.92);
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
		user-select: none;
	}

	.sb-left { display: flex; align-items: baseline; gap: 8px; }

	.sb-time {
		font-size: 15px;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.sb-date {
		font-size: 12px;
		font-weight: 400;
		opacity: 0.65;
	}

	.sb-right {
		display: flex;
		align-items: center;
		gap: 7px;
	}

	.battery {
		display: flex;
		align-items: center;
		gap: 1px;
	}

	.battery-body {
		width: 22px;
		height: 11px;
		border: 1.5px solid rgba(255,255,255,0.75);
		border-radius: 3px;
		padding: 1.5px;
		overflow: hidden;
	}

	.battery-fill {
		height: 100%;
		background: rgba(255,255,255,0.85);
		border-radius: 1.5px;
	}

	.battery-tip {
		width: 2px;
		height: 5px;
		background: rgba(255,255,255,0.6);
		border-radius: 0 1px 1px 0;
	}
</style>
