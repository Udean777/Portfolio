<script lang="ts">
	import { projects } from '$lib/data/projects';
	import ScrollReveal from '../ui/ScrollReveal.svelte';

	const featuredProjects = projects.filter((p) => p.featured);
	const otherProjects = projects.filter((p) => !p.featured);
</script>

<section class="container mx-auto px-4 py-12" id="projects">
	<div class="mx-auto mb-6 flex w-fit items-center justify-center border-b-4 pb-2">
		<h1 class="text-center text-2xl font-bold sm:text-3xl">Projects</h1>
	</div>

	<div class="mx-auto px-4 py-6">
		<h2 class="mb-8 text-xl font-bold text-zinc-700">🚀 Featured Projects</h2>
		<div class="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2">
			{#each featuredProjects as project, i}
				<ScrollReveal
					stagger={i * 150}
					fullHeight={true}
					class={i === featuredProjects.length - 1 && featuredProjects.length % 2 !== 0
						? 'sm:col-span-2'
						: ''}
				>
					<div
						class="hover-shadow relative flex h-full flex-col items-center rounded-lg border-4 border-zinc-700 bg-white p-6 text-center"
					>
						<div class="absolute top-4 right-4 capitalize">
							{#if project.status === 'Live'}
								<span
									class="inline-block rounded-full border-2 border-zinc-700 bg-green-100 px-3 py-1 text-xs font-bold text-green-700"
								>
									{project.status}
								</span>
							{:else}
								<span
									class="inline-block rounded-full border-2 border-zinc-700 bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700"
								>
									{project.status}
								</span>
							{/if}
						</div>

						<img src={project.icon} alt={project.name} class="mb-6 h-24 w-24 object-contain" />

						<h3 class="mb-3 text-2xl font-bold">{project.name}</h3>
						<p class="mb-6 text-sm text-zinc-700 sm:text-base">
							{project.description}
						</p>

						<div class="mb-8 flex flex-wrap justify-center gap-2">
							{#each project.tags as tag}
								<span
									class="rounded-md border-2 border-zinc-700 bg-zinc-100 px-2 py-1 text-[10px] font-bold tracking-wider text-zinc-700 uppercase"
								>
									{tag}
								</span>
							{/each}
						</div>

						<div class="mt-auto flex w-full flex-wrap justify-center gap-4">
							{#each project.links as link}
								<a
									href={link.url}
									target="_blank"
									rel="noopener noreferrer"
									class="hover-shadow flex items-center justify-center rounded-full border-2 border-zinc-700 bg-blue-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-600"
								>
									{link.label}
								</a>
							{/each}
						</div>
					</div>
				</ScrollReveal>
			{/each}
		</div>

		{#if otherProjects.length > 0}
			<h2 class="mt-20 mb-8 text-xl font-bold text-zinc-700">🔗 Other Projects</h2>
			<div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
				{#each otherProjects as project, i}
					<ScrollReveal
						stagger={i * 100}
						fullHeight={true}
						class="
						{i === otherProjects.length - 1 && otherProjects.length % 2 !== 0 ? 'sm:col-span-2 md:col-span-1' : ''} 
						{i === otherProjects.length - 1 && otherProjects.length % 3 === 1 ? 'md:col-span-3' : ''}
					"
					>
						<div
							class="hover-shadow relative flex h-full flex-col items-center rounded-lg border-4 border-zinc-700 bg-white p-6 text-center"
						>
							<div class="absolute top-4 right-4 capitalize">
								{#if project.status === 'Live'}
									<span
										class="inline-block rounded-full border-2 border-zinc-700 bg-green-100 px-3 py-1 text-xs font-bold text-green-700"
									>
										{project.status}
									</span>
								{:else}
									<span
										class="inline-block rounded-full border-2 border-zinc-700 bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700"
									>
										{project.status}
									</span>
								{/if}
							</div>

							<img src={project.icon} alt={project.name} class="mb-6 h-20 w-20 object-contain" />

							<h3 class="mb-3 text-xl font-bold">{project.name}</h3>
							<p class="mb-6 text-sm text-zinc-700">
								{project.description}
							</p>

							<div class="mb-8 flex flex-wrap justify-center gap-2">
								{#each project.tags as tag}
									<span
										class="rounded-md border-2 border-zinc-700 bg-zinc-100 px-2 py-1 text-[10px] font-bold tracking-wider text-zinc-700 uppercase"
									>
										{tag}
									</span>
								{/each}
							</div>

							<div class="mt-auto flex w-full flex-wrap justify-center gap-4">
								{#each project.links as link}
									<a
										href={link.url}
										target="_blank"
										rel="noopener noreferrer"
										class="hover-shadow flex items-center justify-center rounded-full border-2 border-zinc-700 bg-blue-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-600"
									>
										{link.label}
									</a>
								{/each}
							</div>
						</div>
					</ScrollReveal>
				{/each}
			</div>
		{/if}
	</div>
</section>
