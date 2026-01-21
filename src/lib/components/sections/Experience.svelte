<script lang="ts">
	import { experiences } from '$lib/data/experience';
	import ScrollReveal from '../ui/ScrollReveal.svelte';
</script>

<section class="container mx-auto px-4 py-12" id="experience">
	<div class="mx-auto mb-6 flex w-fit items-center justify-center border-b-4 pb-2">
		<h1 class="text-center text-2xl font-bold sm:text-3xl">Work Experience</h1>
	</div>

	<div class="mx-auto flex max-w-4xl flex-col gap-8 py-6">
		{#each experiences as exp, i}
			<ScrollReveal stagger={i * 100}>
				<div
					class="hover-shadow group relative flex transform flex-col rounded-lg border-4 border-zinc-700 bg-white p-6 transition-all duration-300"
				>
					<div class="mb-4 flex flex-col justify-between sm:flex-row sm:items-center">
						<div>
							<h2 class="text-xl font-bold text-blue-500">{exp.role}</h2>
							<h3 class="text-lg font-semibold text-zinc-700">{exp.company}</h3>
						</div>
						<span
							class="mt-2 inline-block w-fit rounded-full border-2 border-zinc-700 bg-yellow-100 px-3 py-1 text-xs font-bold text-zinc-700 sm:mt-0"
						>
							{exp.period}
						</span>
					</div>
					<ul class="list-inside list-disc space-y-2 text-sm text-zinc-900 sm:text-base">
						{#each exp.description as point}
							<li>{point}</li>
						{/each}
					</ul>
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
