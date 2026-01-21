<script lang="ts">
	import FloatingDock from '../ui/floating-dock/index.svelte';
	import { navItems } from '$lib/data/navigation';
</script>

<FloatingDock items={navItems} />
