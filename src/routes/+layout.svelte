<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<Navbar />

<main class="md:pl-20 pb-24 md:pb-12">
	{@render children()}
</main>

<Footer />
