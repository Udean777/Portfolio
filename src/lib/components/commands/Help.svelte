<script lang="ts">
	import { commands } from '$lib/utils/commands';
</script>

<div class="space-y-1">
	<p class="text-accent mb-2">Available commands:</p>
	{#each commands as cmd}
		<div class="flex gap-4">
			<span class="text-command w-24 shrink-0">{cmd.name}</span>
			<span class="text-muted">{cmd.description}</span>
		</div>
	{/each}
	<p class="text-muted mt-2">
		Press <span class="text-output">TAB</span> to autocomplete, <span class="text-output">↑↓</span> to
		navigate history.
	</p>
</div>
