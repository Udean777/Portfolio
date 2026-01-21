<script lang="ts">
	import { techStack } from '$lib/data/tech-stack';
	import ScrollReveal from '../ui/ScrollReveal.svelte';
</script>

<section class="container mx-auto px-4 py-12" id="stack">
	<div class="mx-auto mb-6 flex w-fit items-center justify-center border-b-4 pb-2">
		<h1 class="text-center text-2xl font-bold sm:text-3xl">Tech Stack</h1>
	</div>

	<!-- <div
    class="mx-auto rounded-md border-4 border-zinc-700 bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10"
  > -->
	<div class="flex flex-wrap justify-center gap-4">
		{#each techStack as tech, i}
			<ScrollReveal stagger={i * 50}>
				<div
					class="hover-shadow flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg border-4 border-zinc-700 bg-white p-2 transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28"
				>
					<img src={tech.icon} alt={tech.name} class="h-full w-full object-contain" />
				</div>
			</ScrollReveal>
		{/each}
	</div>
	<!-- </div> -->
</section>

<style>
	.hover-shadow:hover {
		box-shadow: 3px 3px 0 black;
		transition: box-shadow 0.2s ease-in-out;
	}
</style>
