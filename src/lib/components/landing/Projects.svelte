<script lang="ts">
	import { onMount } from 'svelte';
	import { highlightStore } from '$lib/stores/highlight.svelte';

	const projects = [
		{
			name: 'Vivnio',
			description:
				'Modern platform for wedding invitations and digital services. Built with SvelteKit, Prisma, and PostgreSQL.',
			status: 'Live',
			tags: ['SvelteKit', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis'],
			categories: ['Web', 'Backend'],
			image: '/images/vivnio.png',
			link: { label: 'vivnio.com', url: 'https://vivnio.com' },
			featured: true
		},
		{
			name: 'kaosnyaman',
			description: 'Mobile Point of Sale system for custom apparel retail.',
			status: 'Live',
			tags: ['React Native', 'TypeScript'],
			categories: ['Mobile'],
			image: '/images/kaosnyaman.png',
			link: {
				label: 'Play Store',
				url: 'https://play.google.com/store/apps/details?id=com.udeans.kaosnyaman'
			}
		},
		{
			name: 'jdmstore',
			description: 'Mobile POS system for JDM clothing retail.',
			status: 'Live',
			tags: ['React Native', 'TypeScript'],
			categories: ['Mobile'],
			image: '/images/jdm.png',
			link: {
				label: 'Play Store',
				url: 'https://play.google.com/store/apps/details?id=com.kitakale.JDMStore'
			}
		},
		{
			name: 'The Habits',
			description: 'Simple and intuitive todo list app for daily task management.',
			status: 'Live',
			tags: ['Flutter'],
			categories: ['Mobile'],
			image: '/images/the-habits.png',
			link: {
				label: 'Play Store',
				url: 'https://play.google.com/store/apps/details?id=com.ssajudin.the_habits'
			}
		},
		{
			name: 'Uang Bijak',
			description: 'Personal finance expense tracker app.',
			status: 'Live',
			tags: ['React Native'],
			categories: ['Mobile'],
			image: '/images/UangBijak.png',
			link: {
				label: 'Play Store',
				url: 'https://play.google.com/store/apps/details?id=com.ssajudn.expensetracker'
			}
		},
		{
			name: 'POS System',
			description: 'Full-stack Point of Sale with Flutter frontend and Go backend.',
			status: 'Building',
			tags: ['Flutter', 'Go', 'PostgreSQL'],
			categories: ['Mobile', 'Backend'],
			image: null,
			accent: '#22c55e',
			link: { label: 'View Repo', url: 'https://github.com/Udean777/POS-App-Server' }
		},
		{
			name: 'Fun English',
			description: 'Interactive language learning app for early childhood education.',
			status: 'Live',
			tags: ['React Native', 'TypeScript', 'Supabase'],
			categories: ['Mobile'],
			image: null,
			accent: '#f59e0b',
			link: {
				label: 'Play Store',
				url: 'https://play.google.com/store/apps/details?id=com.editzproject.fun_english'
			}
		}
	];

	const featured = projects.find((p) => p.featured)!;
	const rest = projects.filter((p) => !p.featured);

	let activeFilter = $state('All');

	const filteredProjects = $derived(
		activeFilter === 'All' ? [] : projects.filter((p) => p.categories.includes(activeFilter))
	);

	let sectionEl: HTMLElement;
	let visible = $state(false);

	onMount(() => {
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					obs.disconnect();
				}
			},
			{ threshold: 0.08 }
		);
		obs.observe(sectionEl);
		return () => obs.disconnect();
	});

	function isHighlighted(tags: string[]) {
		if (!highlightStore.hoveredTech) return false;
		return tags.some((t) => t.toLowerCase() === highlightStore.hoveredTech?.toLowerCase());
	}
</script>

<section
	class="projects"
	id="projects"
	bind:this={sectionEl}
	class:visible
	class:has-active-highlight={highlightStore.hoveredTech !== null}
	aria-label="Projects"
>
	<div class="projects-inner">
		<h2 class="projects-heading">Work</h2>

		<div class="filter-tabs">
			{#each ['All', 'Web', 'Mobile', 'Backend'] as cat}
				<button
					class="filter-tab"
					class:active={activeFilter === cat}
					onclick={() => (activeFilter = cat)}
				>
					{cat}
				</button>
			{/each}
		</div>

		{#if activeFilter === 'All'}
			<div class="bento">
				<a
					href={featured.link.url}
					target="_blank"
					rel="noopener noreferrer"
					class="bento-featured card-anim"
					class:is-highlighted={isHighlighted(featured.tags)}
					style="--ci: 0"
					aria-label="{featured.name} - {featured.description}"
				>
					<div class="featured-image-wrap">
						<img src={featured.image} alt={featured.name} class="featured-img" loading="lazy" />
						<div class="featured-overlay" aria-hidden="true"></div>
					</div>
					<div class="featured-body">
						<div class="card-top">
							<span class="card-status status-live">Live</span>
							<span class="card-ext-icon" aria-hidden="true">
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline
										points="15 3 21 3 21 9"
									/><line x1="10" y1="14" x2="21" y2="3" /></svg
								>
							</span>
						</div>
						<h3 class="card-name card-name-featured">{featured.name}</h3>
						<p class="card-desc">{featured.description}</p>
						<div class="card-tags">
							{#each featured.tags as tag}
								<span class="card-tag">{tag}</span>
							{/each}
						</div>
					</div>
				</a>

				<div class="bento-grid">
					{#each rest as project, i}
						<a
							href={project.link.url}
							target="_blank"
							rel="noopener noreferrer"
							class="bento-card card-anim"
							class:is-highlighted={isHighlighted(project.tags)}
							style="--ci: {i + 1}"
							aria-label="{project.name} - {project.description}"
						>
							{#if project.image}
								<div class="card-image-wrap">
									<img src={project.image} alt={project.name} class="card-img" loading="lazy" />
									<div class="card-img-overlay" aria-hidden="true"></div>
								</div>
							{:else}
								<div
									class="card-no-image"
									style="--accent: {project.accent ?? '#0066ff'}"
									aria-hidden="true"
								>
									<div class="card-no-image-grid"></div>
									<span class="card-no-image-name">{project.name}</span>
								</div>
							{/if}
							<div class="card-body">
								<div class="card-top">
									<span
										class="card-status {project.status === 'Live'
											? 'status-live'
											: 'status-building'}">{project.status}</span
									>
								</div>
								<h3 class="card-name">{project.name}</h3>
								<p class="card-desc card-desc-sm">{project.description}</p>
								<div class="card-tags">
									{#each project.tags.slice(0, 3) as tag}
										<span class="card-tag">{tag}</span>
									{/each}
								</div>
							</div>
						</a>
					{/each}
				</div>
			</div>
		{:else}
			<div class="filtered-grid">
				{#each filteredProjects as project, i}
					<a
						href={project.link.url}
						target="_blank"
						rel="noopener noreferrer"
						class="bento-card card-anim"
						class:is-highlighted={isHighlighted(project.tags)}
						style="--ci: {i}"
						aria-label="{project.name} - {project.description}"
					>
						{#if project.image}
							<div class="card-image-wrap">
								<img src={project.image} alt={project.name} class="card-img" loading="lazy" />
								<div class="card-img-overlay" aria-hidden="true"></div>
							</div>
						{:else}
							<div
								class="card-no-image"
								style="--accent: {project.accent ?? '#0066ff'}"
								aria-hidden="true"
							>
								<div class="card-no-image-grid"></div>
								<span class="card-no-image-name">{project.name}</span>
							</div>
						{/if}
						<div class="card-body">
							<div class="card-top">
								<span
									class="card-status {project.status === 'Live'
										? 'status-live'
										: 'status-building'}">{project.status}</span
								>
							</div>
							<h3 class="card-name">{project.name}</h3>
							<p class="card-desc card-desc-sm">{project.description}</p>
							<div class="card-tags">
								{#each project.tags as tag}
									<span class="card-tag">{tag}</span>
								{/each}
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}

		<div class="projects-cta">
			<a
				href="https://github.com/Udean777"
				target="_blank"
				rel="noopener noreferrer"
				class="github-link"
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
					><path
						d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
					/></svg
				>
				See all on GitHub
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
				>
			</a>
		</div>
	</div>
</section>

<style>
	.projects {
		background: var(--land-bg-2);
		padding: 100px 0;
	}

	.projects-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 32px;
	}

	.projects-heading {
		font-family: 'Geist', sans-serif;
		font-size: clamp(36px, 4vw, 52px);
		font-weight: 800;
		color: var(--land-fg);
		margin: 0 0 48px;
		letter-spacing: -0.04em;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.projects.visible .projects-heading {
		opacity: 1;
		transform: translateY(0);
	}

	/* Category filters */
	.filter-tabs {
		display: flex;
		justify-content: center;
		gap: 8px;
		margin-bottom: 40px;
	}

	.filter-tab {
		background: var(--land-bg-3);
		border: 1px solid var(--land-border);
		color: var(--land-fg-2);
		padding: 8px 18px;
		border-radius: 20px;
		font-family: 'Geist', sans-serif;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.filter-tab:hover {
		color: var(--land-fg);
		border-color: var(--land-border-hover);
		background: rgba(255, 255, 255, 0.04);
	}

	.filter-tab.active {
		background: var(--blue);
		color: #fff;
		border-color: var(--blue);
		box-shadow: 0 4px 12px rgba(0, 102, 255, 0.25);
	}

	/* Card animation and interactive highlighting */
	.card-anim {
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1) calc(0.1s + var(--ci, 0) * 0.07s),
			transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) calc(0.1s + var(--ci, 0) * 0.07s),
			filter 0.3s ease,
			border-color 0.25s,
			box-shadow 0.25s;
	}

	.projects.visible .card-anim {
		opacity: 1;
		transform: translateY(0);
	}

	.projects.has-active-highlight .card-anim {
		opacity: 0.35;
		filter: grayscale(60%) blur(0.5px);
	}

	.projects.has-active-highlight .card-anim.is-highlighted {
		opacity: 1;
		filter: none;
		border-color: var(--blue);
		box-shadow: 0 12px 36px rgba(0, 102, 255, 0.2);
		transform: translateY(-4px);
	}

	/* Bento layout */
	.bento {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px;
	}

	.bento-featured {
		grid-row: span 2;
		display: flex;
		flex-direction: column;
		border-radius: var(--land-radius);
		overflow: hidden;
		border: 1px solid var(--land-border);
		background: var(--land-bg-3);
		text-decoration: none;
	}

	.bento-featured:hover {
		border-color: var(--blue);
		transform: translateY(-4px);
		box-shadow: 0 12px 40px rgba(0, 102, 255, 0.15);
	}

	.featured-image-wrap {
		position: relative;
		height: 260px;
		overflow: hidden;
		flex-shrink: 0;
	}

	.featured-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
		display: block;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.bento-featured:hover .featured-img {
		transform: scale(1.04);
	}

	.featured-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.55) 100%);
	}

	.featured-body {
		padding: 20px 22px 24px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		flex: 1;
	}

	/* Small cards grid */
	.bento-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 14px;
	}

	/* Uniform grid for filtered views */
	.filtered-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 14px;
	}

	.bento-card {
		display: flex;
		flex-direction: column;
		border-radius: var(--land-radius);
		overflow: hidden;
		border: 1px solid var(--land-border);
		background: var(--land-bg-3);
		text-decoration: none;
	}

	.bento-card:hover {
		border-color: var(--land-border-hover);
		transform: translateY(-3px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
	}

	/* Card image */
	.card-image-wrap {
		height: 110px;
		overflow: hidden;
		flex-shrink: 0;
		position: relative;
	}

	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
		display: block;
		transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.bento-card:hover .card-img {
		transform: scale(1.05);
	}

	.card-img-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, transparent 50%, rgba(26, 26, 26, 0.4) 100%);
	}

	/* Premium custom cover for no-image cards */
	.card-no-image {
		height: 110px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(
			135deg,
			color-mix(in srgb, var(--accent, #0066ff) 14%, transparent) 0%,
			rgba(20, 20, 20, 0.4) 100%
		);
		border-bottom: 1px solid var(--land-border);
		position: relative;
		overflow: hidden;
	}

	.card-no-image-grid {
		position: absolute;
		inset: 0;
		opacity: 0.08;
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
		background-size: 10px 10px;
		pointer-events: none;
	}

	.card-no-image::after {
		content: '';
		position: absolute;
		width: 80px;
		height: 80px;
		background: var(--accent, #0066ff);
		filter: blur(28px);
		opacity: 0.22;
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition:
			transform 0.4s ease,
			opacity 0.4s ease;
		pointer-events: none;
	}

	.bento-card:hover .card-no-image::after {
		transform: translate(-50%, -50%) scale(1.35);
		opacity: 0.35;
	}

	.card-no-image-name {
		font-family: 'Geist', sans-serif;
		font-size: 20px;
		font-weight: 800;
		color: var(--accent, #0066ff);
		opacity: 0.75;
		letter-spacing: -0.04em;
		line-height: 1;
		z-index: 2;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	}

	/* Card body */
	.card-body {
		padding: 14px 16px 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		flex: 1;
	}

	.card-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.card-status {
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		font-weight: 600;
		padding: 3px 8px;
		border-radius: 20px;
		border: 1px solid;
	}

	.status-live {
		background: rgba(34, 197, 94, 0.1);
		color: #22c55e;
		border-color: rgba(34, 197, 94, 0.25);
	}

	.status-building {
		background: rgba(245, 158, 11, 0.1);
		color: #f59e0b;
		border-color: rgba(245, 158, 11, 0.25);
	}

	.card-ext-icon {
		color: var(--land-fg-3);
		display: flex;
		transition:
			color 0.15s,
			transform 0.2s;
	}

	.bento-featured:hover .card-ext-icon {
		color: var(--blue);
		transform: translate(2px, -2px);
	}

	.card-name {
		font-family: 'Geist', sans-serif;
		font-size: 15px;
		font-weight: 700;
		color: var(--land-fg);
		margin: 0;
		letter-spacing: -0.02em;
	}

	.card-name-featured {
		font-size: 22px;
	}

	.card-desc {
		font-family: 'Geist', sans-serif;
		font-size: 13px;
		color: var(--land-fg-2);
		margin: 0;
		line-height: 1.55;
	}

	.card-desc-sm {
		font-size: 12px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
		margin-top: auto;
	}

	.card-tag {
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		padding: 2px 7px;
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid var(--land-border);
		color: var(--land-fg-3);
	}

	/* GitHub link */
	.projects-cta {
		margin-top: 28px;
		display: flex;
		justify-content: center;
	}

	.github-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 11px 22px;
		border: 1px solid var(--land-border);
		border-radius: var(--land-radius);
		font-family: 'Geist', sans-serif;
		font-size: 14px;
		font-weight: 500;
		color: var(--land-fg-2);
		text-decoration: none;
		transition:
			color 0.15s,
			border-color 0.15s,
			background 0.15s;
	}

	.github-link:hover {
		color: var(--land-fg);
		border-color: var(--land-border-hover);
		background: rgba(255, 255, 255, 0.04);
	}

	/* ── Responsive ── */
	@media (max-width: 1024px) {
		.bento {
			grid-template-columns: 1fr;
		}
		.bento-featured {
			grid-row: span 1;
		}
		.bento-grid {
			grid-template-columns: 1fr 1fr;
		}
		.filtered-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 768px) {
		.projects {
			padding: 72px 0;
		}
		.projects-inner {
			padding: 0 20px;
		}
		.bento-grid {
			grid-template-columns: 1fr;
		}
		.filtered-grid {
			grid-template-columns: 1fr;
		}
		.featured-image-wrap {
			height: 200px;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: view()) {
			@keyframes reveal-project-heading {
				from {
					opacity: 0;
					transform: translateY(28px);
				}
				to {
					opacity: 1;
					transform: translateY(0);
				}
			}

			@keyframes reveal-project-card {
				from {
					opacity: 0;
					transform: translateY(40px) rotateX(10deg) scale(0.96);
					filter: blur(1px);
				}
				to {
					opacity: 1;
					transform: translateY(0) rotateX(0deg) scale(1);
					filter: blur(0px);
				}
			}

			.bento,
			.bento-grid,
			.filtered-grid {
				perspective: 1000px;
			}

			.projects-heading {
				animation: reveal-project-heading auto cubic-bezier(0.16, 1, 0.3, 1) both;
				animation-timeline: view();
				animation-range: entry 0% entry 30%;
			}

			.card-anim {
				animation: reveal-project-card auto cubic-bezier(0.16, 1, 0.3, 1) both;
				animation-timeline: view();
				animation-range: entry 0% entry 35%;
				transform-style: preserve-3d;
				transition:
					filter 0.3s ease,
					border-color 0.25s,
					box-shadow 0.25s,
					transform 0.25s;
			}
		}
	}
</style>
