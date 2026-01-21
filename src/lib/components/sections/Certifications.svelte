<script lang="ts">
	import { certifications } from '$lib/data/certifications';
	import ScrollReveal from '../ui/ScrollReveal.svelte';
</script>

<section class="container mx-auto px-4 py-12" id="certifications">
	<div class="mx-auto mb-6 flex w-fit items-center justify-center border-b-4 pb-2">
		<h1 class="text-center text-2xl font-bold sm:text-3xl">Certifications</h1>
	</div>

	<div class="mx-auto grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each certifications as cert, i}
			<ScrollReveal stagger={i * 100}>
				<div
					class="hover-shadow flex h-full flex-col justify-center rounded-lg border-4 border-zinc-700 bg-white p-6 transition-all duration-300"
				>
					<h2 class="mb-2 text-lg font-bold text-zinc-900">{cert.title}</h2>
					<p class="text-sm font-semibold text-blue-500">{cert.issuer}</p>
				</div>
			</ScrollReveal>
		{/each}
	</div>
</section>

<style>
	.hover-shadow:hover {
		box-shadow: 4px 4px 0 black;
	}
</style>
