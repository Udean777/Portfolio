<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';

	let { children } = $props();

	onMount(() => {
		themeStore.init();
	});
</script>

<!--
	Inline script runs before paint — prevents flash of wrong theme.
	Reads localStorage or system preference and sets data-theme immediately.
-->
<svelte:head>
	{@html `<script>
		(function() {
			try {
				var stored = localStorage.getItem('newspaper-theme');
				if (stored === 'light' || stored === 'dark') {
					document.documentElement.setAttribute('data-theme', stored);
					} else {
						document.documentElement.setAttribute('data-theme', 'light');
					}
			} catch(e) {}
		})();
	</script>`}
</svelte:head>

{@render children()}
