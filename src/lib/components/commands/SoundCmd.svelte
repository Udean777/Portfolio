<script lang="ts">
	import { soundEnabled } from '$lib/stores/sound';

	// Props to receive terminal entry
	let { entry }: { entry?: any } = $props();

	const commandStr = entry?.command || 'sound';
	const parts = commandStr.trim().split(/\s+/);
	const arg = parts[1]?.toLowerCase() || '';
</script>

<div class="space-y-2 font-mono text-xs sm:text-sm">
	<p class="text-accent font-bold">🔊 Terminal Audio System</p>

	{#if arg === 'on'}
		<p class="text-output">
			Mechanical keyboard sound effects are now <span class="text-accent font-bold">ENABLED</span>!
			Start typing to experience tactility.
		</p>
	{:else if arg === 'off'}
		<p class="text-output">
			Mechanical keyboard sound effects have been <span class="text-error font-bold">MUTED</span>.
		</p>
	{:else}
		<p class="text-output">
			Current Status:
			{#if $soundEnabled}
				<span class="text-accent font-bold">🔊 ENABLED (Sound On)</span>
			{:else}
				<span class="text-error font-bold">🔇 MUTED (Silence)</span>
			{/if}
		</p>
		<div class="text-muted mt-2 space-y-1 text-[11px] leading-relaxed">
			<p>
				Enjoy tactical mechanical keyboard clicking and return bells as you navigate the terminal.
			</p>
			<p class="text-command mt-1 font-bold">Usage Command List:</p>
			<p>▸ <span class="text-command">sound on</span> - Unmute typewriter clicks</p>
			<p>▸ <span class="text-command">sound off</span> - Mute sound effects</p>
		</div>
	{/if}
</div>
