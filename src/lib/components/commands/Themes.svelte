<script lang="ts">
	import { themes, type ThemeName } from '$lib/utils/themes';
	import { themeStore } from '$lib/stores/theme';

	const themeNames = Object.keys(themes) as ThemeName[];
</script>

<div class="space-y-2">
	<p class="text-accent font-bold">Available Themes</p>
	<p class="text-muted mb-2">Usage: <span class="text-command">themes &lt;name&gt;</span></p>
	{#each themeNames as name}
		<button
			class="block text-left text-output hover:text-accent cursor-pointer"
			onclick={() => themeStore.setTheme(name)}
		>
			▸ {name}
		</button>
	{/each}
</div>
