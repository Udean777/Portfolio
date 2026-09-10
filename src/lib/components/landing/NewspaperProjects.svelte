<script lang="ts">
	const projects = [
		{
			name: 'Vivnio.com',
			type: 'Web · featured',
			description:
				'A modern platform for wedding invitations and digital services. The work focuses on responsive web experiences, clear content presentation, and a smoother path from invitation design to a finished digital event page.',
			image: '/images/vivnio.webp',
			url: 'https://vivnio.com',
			label: 'Open vivnio.com'
		},
		{
			name: 'Uang Bijak',
			type: 'Mobile',
			description: 'An expense tracker for more deliberate personal finances.',
			image: '/images/UangBijak.webp',
			url: 'https://play.google.com/store/apps/details?id=com.ssajudn.expensetracker',
			label: 'Open in Play Store'
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
			description: 'Interactive language learning for children.',
			image: '/images/fun-english.webp',
			url: 'https://play.google.com/store/apps/details?id=com.editzproject.fun_english',
			label: 'Open in Play Store'
		}
	];
</script>

<section class="section projects-section" id="projects" aria-labelledby="projects-heading">
	<div class="section-head">
		<p class="section-label">Selected work</p>
		<h2 id="projects-heading">A small index of things made for the real world.</h2>
	</div>
	<div class="catalogue-intro">
		<p>Four projects, across web and mobile.</p>
		<span>Archive / 2023—present</span>
	</div>
	<div class="catalogue-grid">
		{#each projects as project, index}
			<a
				class:has-image={project.image}
				class="catalogue-item"
				href={project.url}
				target="_blank"
				rel="noopener noreferrer"
			>
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
					<span class="item-link">{project.label} <span aria-hidden="true">→</span></span>
				</div>
			</a>
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
		grid-template-columns: 2rem 1fr auto;
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
	}
	.item-link {
		width: fit-content;
		margin-top: var(--space-2xs);
		white-space: nowrap;
		text-decoration: underline;
		text-decoration-color: var(--color-accent);
		text-underline-offset: 0.3em;
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
</style>
