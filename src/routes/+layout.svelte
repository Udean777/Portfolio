<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<Navbar />

<main class="pb-24 md:pt-32 md:pb-12">
	{@render children()}
</main>

<Footer />
