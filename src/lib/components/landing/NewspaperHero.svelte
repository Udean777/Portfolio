<section class="front-page" id="hero" aria-label="Introduction">
	<div class="front-page-kicker">
		<span>Lead story</span><span>Available for thoughtful freelance work</span>
	</div>
	<div class="front-page-grid">
		<div class="front-page-copy">
			<h1>Interfaces, made human.</h1>
			<p class="standfirst">
				Sajudin Ma'ruf is a Frontend &amp; Mobile Developer building responsive web experiences and
				useful applications from Deli Serdang, Indonesia.
			</p>
			<div class="front-page-links">
				<a class="button-ink" href="#projects">Read the work <span aria-hidden="true">→</span></a><a
					class="text-link"
					href="#contact">Start a conversation</a
				>
			</div>
		</div>
		<figure class="front-page-portrait">
			<img
				src="/images/sajudin-2.webp"
				alt="Sajudin Ma'ruf"
				width="750"
				height="1000"
				fetchpriority="high"
			/>
			<figcaption>Portrait / Sajudin Ma'ruf / Deli Serdang</figcaption>
		</figure>
	</div>
	<div class="front-page-note">
		<span>Web · mobile · systems</span><span
			>Currently: Frontend &amp; Mobile Developer at PT Arah Baru Selayar</span
		>
	</div>
</section>

<style>
	.front-page {
		max-width: 1240px;
		margin: 0 auto;
		padding: var(--space-xl) clamp(1rem, 4vw, 3rem) var(--space-3xl);
	}
	.front-page-kicker,
	.front-page-note {
		display: flex;
		justify-content: space-between;
		gap: var(--space-md);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-ink-2);
	}
	.front-page-kicker {
		padding-bottom: var(--space-xs);
		border-bottom: var(--rule-thin) solid var(--color-rule);
	}
	.front-page-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(15rem, 0.42fr);
		gap: clamp(var(--space-xl), 8vw, var(--space-3xl));
		align-items: start;
		padding-block: var(--space-xl);
	}
	.front-page-copy h1 {
		max-width: 10ch;
		font-family: var(--font-display);
		font-size: clamp(3.3rem, 6.2vw, 7rem);
		font-weight: 600;
		line-height: 0.9;
		letter-spacing: -0.065em;
		font-style: normal;
		text-wrap: balance;
	}
	.standfirst {
		max-width: 42ch;
		margin-top: var(--space-lg);
		font-size: clamp(1.2rem, 2.3vw, 1.8rem);
		line-height: 1.25;
	}
	.front-page-links {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-md);
		margin-top: var(--space-xl);
	}
	.button-ink {
		display: inline-flex;
		gap: var(--space-sm);
		align-items: center;
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-ink);
		color: var(--color-paper);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		text-decoration: none;
		white-space: nowrap;
		border-radius: var(--radius-control);
		transition:
			background-color var(--dur-short) var(--ease-out),
			transform var(--dur-short) var(--ease-out);
	}
	.button-ink:hover {
		background: var(--color-accent);
		transform: translateY(-2px);
	}
	.button-ink:active {
		transform: translateY(0);
	}
	.text-link {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		text-decoration: underline;
		text-decoration-color: var(--color-accent);
		text-underline-offset: 0.35em;
		white-space: nowrap;
	}
	.text-link:hover {
		color: var(--color-accent);
	}
	.front-page-portrait {
		width: min(100%, 18rem);
		justify-self: end;
		margin: var(--space-md) 0 0;
		border-bottom: var(--rule-heavy) solid var(--color-ink);
	}
	.front-page-portrait img {
		display: block;
		width: 100%;
		aspect-ratio: 3 / 4;
		object-fit: cover;
		filter: grayscale(1) contrast(1.08) sepia(0.14);
	}
	.front-page-portrait figcaption {
		padding-block: var(--space-2xs);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-ink-2);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}
	.front-page-note {
		padding-top: var(--space-sm);
		border-top: var(--rule-thin) solid var(--color-rule);
	}
	@media (max-width: 48rem) {
		.front-page {
			padding-top: var(--space-lg);
		}
		.front-page-grid {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-xl);
			padding-block: var(--space-xl);
		}
		.front-page-copy h1 {
			max-width: 10ch;
			font-size: clamp(3.2rem, 14vw, 5.8rem);
		}
		.front-page-portrait {
			justify-self: start;
			max-width: 18rem;
		}
		.front-page-note {
			flex-direction: column;
			gap: var(--space-2xs);
		}
	}
	@media (max-width: 24rem) {
		.front-page-kicker span:last-child {
			max-width: 15ch;
			text-align: right;
		}
		.front-page-copy h1 {
			font-size: clamp(3.3rem, 18vw, 5rem);
		}
	}
</style>
