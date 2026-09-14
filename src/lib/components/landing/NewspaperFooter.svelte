<footer class="colophon">
	<div class="colophon-main">
		<p class="colophon-name">Sajudin<br />Ma'ruf</p>
		<p class="colophon-line">Frontend &amp; Mobile Developer<br />Deli Serdang, Indonesia</p>
		<a class="colophon-top" href="#hero">Back to top ↑</a>
	</div>
	<div class="colophon-bottom">
		<span>Built with SvelteKit</span><span>© {new Date().getFullYear()} Sajudin Ma'ruf</span><span
			><a href="mailto:sajudinmaruf@gmail.com">Email</a> ·
			<a href="https://github.com/Udean777" target="_blank" rel="noopener noreferrer">GitHub</a>
			·
			<a href="https://linkedin.com/in/sajudin" target="_blank" rel="noopener noreferrer"
				>LinkedIn</a
			></span
		>
	</div>
</footer>

<style>
	.colophon {
		max-width: 1240px;
		margin: 0 auto;
		padding: var(--space-xl) clamp(1rem, 4vw, 3rem) var(--space-md);
		border-top: var(--rule-heavy) solid var(--color-ink);
	}
	.colophon-main {
		display: grid;
		grid-template-columns: 1fr 1fr auto;
		gap: var(--space-lg);
		align-items: end;
	}
	.colophon-name {
		font-family: var(--font-display);
		font-size: clamp(2.8rem, 7vw, 6rem);
		font-weight: 600;
		line-height: 0.75;
		letter-spacing: -0.06em;
	}
	.colophon-line,
	.colophon-bottom {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-ink-2);
	}
	.colophon-top {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-accent);
		text-decoration: none;
		text-transform: uppercase;
		white-space: nowrap;
	}
	.colophon-bottom {
		display: flex;
		justify-content: space-between;
		gap: var(--space-sm);
		margin-top: var(--space-2xl);
		padding-top: var(--space-sm);
		border-top: var(--rule-thin) solid var(--color-rule);
	}
	.colophon-bottom > span {
		min-width: 0;
		overflow-wrap: anywhere;
	}
	.colophon-bottom a {
		text-decoration: underline;
		text-underline-offset: 0.3em;
	}
	@media (max-width: 48rem) {
		.colophon-main {
			grid-template-columns: 1fr;
			align-items: start;
		}
		.colophon-bottom {
			flex-direction: column;
			gap: var(--space-xs);
		}
	}
</style>
