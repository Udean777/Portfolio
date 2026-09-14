<section class="stack-strip" aria-label="Technology stack">
	<div class="stack-label">Tools of the trade</div>
	<div class="stack-list">
		<span>SvelteKit</span><span>TypeScript</span><span>Flutter</span><span>React Native</span><span
			>JavaScript</span
		><span>PostgreSQL</span><span>Git</span><span>Kotlin</span><span>Jetpack Compose</span>
	</div>
</section>

<style>
	.stack-strip {
		max-width: 1240px;
		margin: 0 auto;
		padding: var(--space-lg) clamp(1rem, 4vw, 3rem);
		border-top: var(--rule-heavy) solid var(--color-ink);
		border-bottom: var(--rule-thin) solid var(--color-rule);
	}
	.stack-label {
		margin-bottom: var(--space-sm);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-accent);
	}
	.stack-list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3xs) var(--space-2xs);
		align-items: baseline;
	}
	.stack-list span:not(:last-child)::after {
		content: ' ·';
		color: var(--color-accent);
	}
	.stack-list span {
		font-family: var(--font-display);
		font-size: var(--text-lg);
		font-weight: 500;
	}
</style>
