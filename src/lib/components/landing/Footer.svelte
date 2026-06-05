<footer class="footer">
	<div class="footer-inner">
		<span class="footer-name">Sajudin Ma'ruf</span>
		<span class="footer-copy">
			Built with <a href="https://kit.svelte.dev" target="_blank" rel="noopener noreferrer" class="footer-link">SvelteKit</a>
		</span>
		<span class="footer-year">&copy; {new Date().getFullYear()}</span>
	</div>
</footer>

<style>
	.footer {
		background: var(--land-bg);
		border-top: 1px solid var(--land-border);
		padding: 28px 0;
	}

	.footer-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 32px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}

	.footer-name {
		font-family: 'Geist', sans-serif;
		font-size: 13px;
		font-weight: 600;
		color: var(--land-fg-2);
		letter-spacing: -0.01em;
	}

	.footer-copy {
		font-family: 'Geist', sans-serif;
		font-size: 12px;
		color: var(--land-fg-3);
	}

	.footer-link {
		color: var(--blue);
		text-decoration: none;
	}

	.footer-link:hover {
		text-decoration: underline;
	}

	.footer-year {
		font-family: 'JetBrains Mono', monospace;
		font-size: 11px;
		color: var(--land-fg-3);
	}

	@media (max-width: 768px) {
		.footer-inner {
			flex-direction: column;
			text-align: center;
			gap: 8px;
			padding: 0 20px;
		}
	}
</style>
