<script lang="ts">
	const experiences = [
		{
			company: 'PT Arah Baru Selayar',
			role: 'Frontend & Mobile Developer',
			period: 'Jul 2025 – Present',
			body: 'Translating intricate UI/UX designs into pixel-perfect, responsive SvelteKit interfaces for digital invitations, marketing landing pages, and interactive dashboards. Establishing scalable Flutter foundations with Clean Architecture and Riverpod.'
		},
		{
			company: 'KitaKale ID',
			role: 'Freelance Mobile Developer',
			period: 'Oct 2023 – Aug 2025',
			body: 'Developing and maintaining mobile applications with React Native and Flutter, with attention to navigation, state management, native module integration, and stability.'
		},
		{
			company: 'KitaKale ID',
			role: 'Web Content Writer',
			period: 'Jan 2023 – Jun 2023',
			body: 'Writing technical and web content with a firm grasp of HTML structure and the ability to explain core JavaScript concepts clearly.'
		}
	];
</script>

<section class="section experience-section" id="experience" aria-labelledby="experience-heading">
	<div class="section-head">
		<p class="section-label">Professional record</p>
		<h2 id="experience-heading">Work, in the order it happened.</h2>
	</div>
	<div class="experience-list">
		{#each experiences as experience, index}
			<article class="experience-entry">
				<div class="entry-index">0{index + 1}</div>
				<div class="entry-main">
					<p class="entry-period">{experience.period}</p>
					<h3>{experience.role}</h3>
					<p class="entry-company">{experience.company}</p>
					<p class="entry-body">{experience.body}</p>
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	.experience-list {
		margin-top: var(--space-2xl);
		border-top: var(--rule-thin) solid var(--color-rule);
	}
	.experience-entry {
		display: grid;
		grid-template-columns: 5rem minmax(0, 1fr);
		gap: var(--space-xl);
		padding-block: var(--space-lg);
		border-bottom: var(--rule-thin) solid var(--color-rule);
	}
	.entry-index {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-accent);
	}
	.entry-main {
		display: grid;
		grid-template-columns: minmax(10rem, 0.45fr) minmax(0, 1fr);
		column-gap: var(--space-xl);
		row-gap: var(--space-2xs);
	}
	.entry-period {
		grid-column: 1;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-ink-2);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.entry-main h3 {
		grid-column: 1;
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 600;
		line-height: 1;
		font-style: normal;
	}
	.entry-company {
		grid-column: 1;
		color: var(--color-accent);
	}
	.entry-body {
		grid-column: 2;
		grid-row: 1 / span 3;
		max-width: 50ch;
		color: var(--color-ink-2);
	}
	@media (max-width: 48rem) {
		.experience-entry {
			grid-template-columns: 2rem minmax(0, 1fr);
			gap: var(--space-sm);
		}
		.entry-main {
			display: block;
		}
		.entry-main h3,
		.entry-company,
		.entry-body {
			margin-top: var(--space-2xs);
		}
	}
</style>
