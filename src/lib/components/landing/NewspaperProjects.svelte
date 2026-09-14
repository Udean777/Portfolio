<script lang="ts">
	type StackItem = {
		name: string;
		icon: string;
		url?: string;
	};

	type Project = {
		name: string;
		type: string;
		description: string;
		image?: string;
		url: string;
		repo?: string;
		label: string;
		stack?: StackItem[];
	};

	const projects: Project[] = [
		{
			name: 'Vivnio.com',
			type: 'Web · featured',
			description:
				'A modern digital invitation platform built with SvelteKit. Vivnio supports wedding, khitan, birthday, graduation, and other celebration templates with modal-based editing, real-time previews, rich styling controls, optimized font loading, responsive touch support, admin management, payment integration, and multi-domain routing for resellers.',
			image: '/images/vivnio.webp',
			url: 'https://vivnio.com',
			label: 'Open vivnio.com',
			stack: [
				{
					name: 'Svelte',
					icon: 'https://cdn.simpleicons.org/svelte/FF3E00',
					url: 'https://github.com/a-new-1/proto-inv-4/search?l=svelte'
				},
				{
					name: 'TypeScript',
					icon: 'https://cdn.simpleicons.org/typescript/3178C6',
					url: 'https://github.com/a-new-1/proto-inv-4/search?l=typescript'
				},
				{
					name: 'CSS',
					icon: 'https://cdn.simpleicons.org/css/1572B6',
					url: 'https://github.com/a-new-1/proto-inv-4/search?l=css'
				},
				{
					name: 'Shell',
					icon: 'https://cdn.simpleicons.org/gnubash/4EAA25',
					url: 'https://github.com/a-new-1/proto-inv-4/search?l=shell'
				},
				{
					name: 'JavaScript',
					icon: 'https://cdn.simpleicons.org/javascript/F7DF1E',
					url: 'https://github.com/a-new-1/proto-inv-4/search?l=javascript'
				},
				{
					name: 'PLpgSQL',
					icon: 'https://cdn.simpleicons.org/postgresql/4169E1',
					url: 'https://github.com/a-new-1/proto-inv-4/search?l=plpgsql'
				}
			]
		},
		{
			name: 'Bareuang',
			type: 'Mobile · local-first',
			description:
				"Most finance apps feel like cold, demanding spreadsheets. Bareuang turns that around with Financial Runway: a simple answer to how long your money will last at your current spending pattern. Core financial data stays local on the device. Optional receipt scanning sends photos to Bareuang's proxy and Google Gemini only after consent. Bareuang is guest-only—no accounts, login, cloud sync, or multi-user profiles—and Reset Data clears the app's local data.",
			image: '/images/bareuang.webp',
			url: 'https://bareuang.vercel.app/',
			repo: 'https://github.com/Udean777/Bareuang',
			label: 'Download here!',
			stack: [
				{
					name: 'Kotlin',
					icon: 'https://cdn.simpleicons.org/kotlin/7F52FF',
					url: 'https://github.com/Udean777/Bareuang/search?l=kotlin'
				},
				{
					name: 'Jetpack Compose',
					icon: 'https://cdn.simpleicons.org/jetpackcompose/4285F4',
					url: 'https://github.com/Udean777/Bareuang/search?q=jetpack+compose'
				},
				{
					name: 'HTML',
					icon: 'https://cdn.simpleicons.org/html5/E34F26',
					url: 'https://github.com/Udean777/Bareuang/search?l=html'
				},
				{
					name: 'JavaScript',
					icon: 'https://cdn.simpleicons.org/javascript/F7DF1E',
					url: 'https://github.com/Udean777/Bareuang/search?l=javascript'
				},
				{
					name: 'CSS',
					icon: 'https://cdn.simpleicons.org/css/1572B6',
					url: 'https://github.com/Udean777/Bareuang/search?l=css'
				}
			]
		},
		{
			name: 'The Habits',
			type: 'Mobile',
			description: 'A simple todo list for keeping daily tasks in view.',
			image: '/images/the-habits.webp',
			url: 'https://play.google.com/store/apps/details?id=com.ssajudin.the_habits',
			label: 'Open in Play Store'
		},
		{
			name: 'Fun English',
			type: 'Mobile',
			description:
				'An interactive English-learning app for children, built with React Native and Expo. It teaches alphabets, numbers, body parts, and family vocabulary through drag-and-drop, word scramble, selection quizzes, and vocabulary matching. Leaderboards, profiles, text-to-speech, and progress tracking make practice more engaging, powered by Expo Router, NativeWind, Supabase, Expo Speech, Expo AV, and Reanimated.',
			image: '/images/fun-english.webp',
			url: 'https://play.google.com/store/apps/details?id=com.editzproject.fun_english',
			label: 'Open in Play Store',
			stack: [
				{ name: 'React Native', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
				{ name: 'Expo', icon: 'https://cdn.simpleicons.org/expo/000020' },
				{ name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
				{ name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' }
			]
		},
		{
			name: 'Keycoach',
			type: 'Web',
			description:
				'A touch-typing coach that teaches your fingers instead of your eyes. Keycoach guides learners through 13 arcade-style stages, while spaced repetition drills the keys they actually miss.',
			image: '/images/keycoach.webp',
			url: 'https://keycoach.vercel.app/',
			repo: 'https://github.com/Udean777/Keycoach',
			label: 'Open keycoach.vercel.app',
			stack: [
				{
					name: 'SvelteKit',
					icon: 'https://cdn.simpleicons.org/svelte/FF3E00',
					url: 'https://github.com/Udean777/Keycoach/search?l=svelte'
				},
				{
					name: 'TypeScript',
					icon: 'https://cdn.simpleicons.org/typescript/3178C6',
					url: 'https://github.com/Udean777/Keycoach/search?l=typescript'
				}
			]
		},
		{
			name: 'Henka Convert',
			type: 'Web · local-first',
			description:
				'A media, document, and data converter combining local WebAssembly processing for privacy and speed with cloud-assisted processing for heavier tasks. Built around Clean Architecture, SOLID principles, and a premium user experience.',
			image: '/images/henka-convert.webp',
			url: 'https://henka-convert.vercel.app/',
			repo: 'https://github.com/Udean777/henka-convert',
			label: 'Open henka-convert.vercel.app',
			stack: [
				{
					name: 'Vue',
					icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D',
					url: 'https://github.com/Udean777/henka-convert/search?l=vue'
				},
				{
					name: 'TypeScript',
					icon: 'https://cdn.simpleicons.org/typescript/3178C6',
					url: 'https://github.com/Udean777/henka-convert/search?l=typescript'
				},
				{
					name: 'Golang',
					icon: 'https://cdn.simpleicons.org/go/00ADD8',
					url: 'https://github.com/Udean777/henka-convert/search?l=go'
				},
				{
					name: 'Docker',
					icon: 'https://cdn.simpleicons.org/docker/2496ED',
					url: 'https://github.com/Udean777/henka-convert/search?q=docker'
				}
			]
		}
	];
</script>

<section class="section projects-section" id="projects" aria-labelledby="projects-heading">
	<div class="section-head">
		<p class="section-label">Selected work</p>
		<h2 id="projects-heading">A small index of things made for the real world.</h2>
	</div>
	<div class="catalogue-intro">
		<p>Six projects, across web and mobile.</p>
		<span>Archive / 2023—present</span>
	</div>
	<div class="catalogue-grid">
		{#each projects as project, index}
			<article class:has-image={project.image} class="catalogue-item">
				<div class="item-meta">
					<span class="project-number">0{index + 1}</span>
					<span class="project-type">{project.type}</span>
					<span class="project-arrow" aria-hidden="true">↗</span>
				</div>
				{#if project.image}
					<div class="item-image">
						<img src={project.image} alt="" width="1000" height="1000" loading="lazy" />
					</div>
				{/if}
				<div class="item-copy">
					<h3>{project.name}</h3>
					<p>{project.description}</p>
					{#if project.stack}
						<div class="project-stack" aria-label={`${project.name} technology stack`}>
							<span class="stack-caption">Stack</span>
							<div class="stack-values">
								{#each project.stack as technology}
									{#if technology.url}
										<a
											class="stack-value"
											href={technology.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<img src={technology.icon} alt="" width="16" height="16" loading="lazy" />
											{technology.name}
										</a>
									{:else}
										<span class="stack-value">
											<img src={technology.icon} alt="" width="16" height="16" loading="lazy" />
											{technology.name}
										</span>
									{/if}
								{/each}
							</div>
						</div>
					{/if}
					<div class="item-actions">
						<a class="item-link" href={project.url} target="_blank" rel="noopener noreferrer"
							>{project.label} <span aria-hidden="true">→</span></a
						>
						{#if project.repo}
							<a
								class="item-link item-link-secondary"
								href={project.repo}
								target="_blank"
								rel="noopener noreferrer">View source <span aria-hidden="true">↗</span></a
							>
						{/if}
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	/* Hallmark · genre: editorial · macrostructure: Catalogue · theme: Newsprint · scope: Selected work · enrichment: none */
	.catalogue-intro {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-md);
		margin-top: var(--space-xl);
		padding-block: var(--space-sm);
		border-block: var(--rule-thin) solid var(--color-rule);
		color: var(--color-ink-2);
	}
	.catalogue-intro p {
		font-family: var(--font-display);
		font-size: var(--text-lg);
		line-height: 1;
	}
	.catalogue-intro span {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		white-space: nowrap;
		overflow-wrap: anywhere;
	}
	.catalogue-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		column-gap: var(--space-xl);
		margin-top: var(--space-xl);
		border-top: var(--rule-heavy) solid var(--color-ink);
	}
	.catalogue-item {
		display: grid;
		grid-template-rows: auto auto 1fr;
		gap: var(--space-md);
		min-width: 0;
		padding-block: var(--space-md) var(--space-xl);
		border-bottom: var(--rule-thin) solid var(--color-rule);
		color: inherit;
		text-decoration: none;
	}
	.catalogue-item:hover {
		color: var(--color-accent);
	}
	.item-meta {
		display: grid;
		grid-template-columns: 2rem minmax(0, 1fr) auto;
		align-items: baseline;
		gap: var(--space-sm);
	}
	.project-number,
	.project-arrow,
	.project-type,
	.item-link {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}
	.project-number,
	.project-arrow {
		color: var(--color-ink-3);
	}
	.project-type {
		color: var(--color-accent);
		min-width: 0;
		overflow-wrap: anywhere;
	}
	.item-image {
		max-width: 100%;
		background: var(--color-paper-2);
	}
	.item-image img {
		display: block;
		width: 100%;
		max-height: 14rem;
		aspect-ratio: 16 / 8;
		object-fit: contain;
		object-position: center;
		filter: grayscale(1) sepia(0.16) contrast(1.08);
	}
	.item-copy {
		display: grid;
		align-content: start;
		gap: var(--space-sm);
		min-width: 0;
	}
	.item-copy h3 {
		font-family: var(--font-display);
		font-size: clamp(2rem, 4vw, 3.5rem);
		font-weight: 600;
		line-height: 0.92;
		letter-spacing: -0.05em;
	}
	.item-copy p {
		max-width: 42ch;
		color: var(--color-ink-2);
		overflow-wrap: anywhere;
	}
	.item-link {
		width: fit-content;
		margin-top: var(--space-2xs);
		white-space: nowrap;
		text-decoration: underline;
		text-decoration-color: var(--color-accent);
		text-underline-offset: 0.3em;
	}
	.item-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		margin-top: var(--space-2xs);
	}
	.project-stack {
		display: grid;
		gap: var(--space-2xs);
		margin-top: var(--space-2xs);
		padding-top: var(--space-sm);
		border-top: var(--rule-thin) solid var(--color-rule);
	}
	.stack-caption {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-ink-3);
	}
	.stack-values {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2xs) var(--space-sm);
	}
	.stack-value {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3xs);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		white-space: nowrap;
		max-width: 100%;
	}
	.stack-value img {
		display: block;
		width: 1rem;
		height: 1rem;
		object-fit: contain;
	}
	.stack-value:hover {
		color: var(--color-accent);
	}
	.item-link-secondary {
		color: var(--color-ink-2);
	}
	.catalogue-item:hover .project-number,
	.catalogue-item:hover .project-arrow {
		color: var(--color-accent);
	}
	.catalogue-item:hover .item-image img {
		filter: grayscale(0.65) sepia(0.1) contrast(1.08);
	}
	@media (min-width: 60rem) {
		.catalogue-item:nth-child(odd):not(:first-child) {
			padding-right: var(--space-md);
		}
		.catalogue-item:nth-child(even) {
			padding-left: var(--space-md);
			border-left: var(--rule-thin) solid var(--color-rule);
		}
	}
	@media (max-width: 48rem) {
		.catalogue-intro {
			align-items: flex-start;
			flex-direction: column;
			gap: var(--space-xs);
		}
		.catalogue-intro span {
			white-space: normal;
		}
		.catalogue-grid {
			grid-template-columns: minmax(0, 1fr);
		}
		.catalogue-item:nth-child(even) {
			padding-left: 0;
			border-left: 0;
		}
		.item-image img {
			max-height: 12rem;
		}
		.item-copy h3 {
			font-size: clamp(2rem, 10vw, 3rem);
		}
	}
	@media (max-width: 30rem) {
		.catalogue-grid {
			margin-top: var(--space-lg);
		}
		.catalogue-item {
			gap: var(--space-sm);
			padding-block: var(--space-sm) var(--space-lg);
		}
		.item-meta {
			grid-template-columns: 1.75rem minmax(0, 1fr) auto;
			gap: var(--space-xs);
		}
		.item-actions {
			align-items: flex-start;
			flex-direction: column;
			gap: var(--space-xs);
		}
	}
</style>
