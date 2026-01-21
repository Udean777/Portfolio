<script lang="ts">
	import { testimonials } from '$lib/data/testimonials';
	import ScrollReveal from '../ui/ScrollReveal.svelte';
</script>

<section class="container mx-auto px-4 py-12" id="testimonials">
	<div class="mx-auto mb-6 flex w-fit items-center justify-center border-b-4 pb-2">
		<h1 class="text-center text-2xl font-bold sm:text-3xl">Testimonials</h1>
	</div>

	<div class="mx-auto grid grid-cols-1 gap-6 py-6 md:grid-cols-2">
		{#each testimonials as test, i}
			<ScrollReveal stagger={i * 150}>
				<div
					class="hover-shadow flex h-full flex-col rounded-lg border-4 border-zinc-700 bg-white p-6"
				>
					<div class="mb-4 flex items-center gap-4">
						<img
							src={test.image}
							alt={test.name}
							class="h-12 w-12 rounded-full border-2 border-zinc-700 object-cover"
						/>
						<div>
							<h3 class="font-bold">{test.name}</h3>
							<p class="text-xs text-zinc-500">{test.role}</p>
						</div>
					</div>
					<p class="italic text-zinc-700">"{test.quote}"</p>
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
