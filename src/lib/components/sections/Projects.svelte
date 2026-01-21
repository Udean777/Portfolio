<script lang="ts">
	import { projects } from '$lib/data/projects';
	import ScrollReveal from '../ui/ScrollReveal.svelte';
</script>

<section class="container mx-auto px-4 py-12" id="projects">
	<div class="mx-auto mb-6 flex w-fit items-center justify-center border-b-4 pb-2">
		<h1 class="text-center text-2xl font-bold sm:text-3xl">Projects</h1>
	</div>

	<div class="mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
		<div class="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2">
			{#each projects as project, i}
				<ScrollReveal stagger={i * 150}>
					<div
						class="group hover-shadow relative flex h-full transform cursor-pointer flex-col items-center justify-center rounded-lg border-4 bg-white p-4"
					>
						<img
							src={project.icon}
							alt={project.name}
							class="mb-4 h-32 w-32 transform rounded-full object-contain transition-all duration-500 ease-out group-hover:scale-110"
						/>
						<h2 class="mb-2 text-center text-lg font-bold">{project.name}</h2>
						<p class="text-center text-sm text-zinc-700">{project.description}</p>
						<a
							href={project.href}
							target="_blank"
							rel="noopener noreferrer"
							class="mt-auto mb-4 flex items-center justify-center rounded-full bg-blue-400 px-4 py-2 text-sm font-semibold text-white transition-all duration-500 ease-out hover:bg-blue-500"
						>
							Go to Project &rarr;
						</a>
					</div>
				</ScrollReveal>
			{/each}
		</div>
	</div>
</section>

<style>
	.hover-shadow:hover {
		box-shadow: 3px 3px 0 black;
		transition: box-shadow 0.2s ease-in-out;
	}
</style>
