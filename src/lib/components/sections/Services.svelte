<script lang="ts">
	import { services } from '$lib/data/services';
	import ScrollReveal from '../ui/ScrollReveal.svelte';
</script>

<section class="container mx-auto px-4 py-12" id="services">
	<div class="mx-auto mb-6 flex w-fit items-center justify-center border-b-4 pb-2">
		<h1 class="text-center text-2xl font-bold sm:text-3xl">What I Do</h1>
	</div>

	<div class="mx-auto grid grid-cols-1 gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each services as service, i}
			<ScrollReveal stagger={i * 100}>
				<div
					class="hover-shadow flex h-full flex-col items-center rounded-lg border-4 border-zinc-700 bg-white p-8 text-center"
				>
					<div
						class="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-zinc-700 bg-blue-100 text-2xl text-blue-600"
					>
						<i class={service.icon}></i>
					</div>
					<h2 class="mb-4 text-xl font-bold">{service.title}</h2>
					<p class="text-sm text-zinc-700 sm:text-base">
						{service.description}
					</p>
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
