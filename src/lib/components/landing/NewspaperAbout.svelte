<section class="section about-section" id="about" aria-labelledby="about-heading">
	<div class="section-head">
		<p class="section-label">The profile</p>
		<h2 id="about-heading">A developer who reads the room before writing the code.</h2>
	</div>
	<div class="about-columns">
		<div class="about-copy">
			<p class="dropcap">
				I build engaging, functional experiences across web and mobile. My work moves between
				interface craft, application architecture, and the small details that make software feel
				considered.
			</p>
			<p>
				My current practice is rooted in SvelteKit, JavaScript, TypeScript, React Native, and
				Flutter. I enjoy translating a visual direction into a responsive, useful product.
			</p>
		</div>
		<div class="about-facts">
			<div>
				<h3>Technical skills</h3>
				<p>
					React Native · Flutter · Dart · JavaScript · TypeScript · Git &amp; GitHub · Responsive
					Design
				</p>
			</div>
			<div>
				<h3>Languages</h3>
				<p>Indonesian — native<br />English — professional</p>
			</div>
			<div>
				<h3>Location</h3>
				<p>Deli Serdang, Sumatra Utara, Indonesia</p>
			</div>
		</div>
	</div>
	<div class="education-strip">
		<div>
			<span class="fact-label">Education</span><strong>Bachelor of Information Technology</strong
			><span>Universitas Pembangunan Panca Budi Medan · 2023–Present</span>
		</div>
		<div>
			<span class="fact-label">Earlier study</span><strong>Software Engineering Major</strong><span
				>SMKN 1 Binjai · 2020–2023</span
			>
		</div>
	</div>
</section>

<style>
	.section {
		padding-block: var(--space-2xl);
	}
	.section-label,
	.fact-label {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--color-accent);
	}
	.about-columns {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(16rem, 0.8fr);
		gap: clamp(var(--space-xl), 9vw, var(--space-3xl));
		margin-top: var(--space-2xl);
	}
	.about-copy {
		max-width: 58ch;
		font-size: clamp(1.15rem, 2vw, 1.45rem);
		line-height: 1.4;
	}
	.about-copy p + p {
		margin-top: var(--space-md);
	}
	.dropcap::first-letter {
		float: left;
		margin: 0.08em 0.12em 0 0;
		color: var(--color-accent);
		font-family: var(--font-display);
		font-size: 4.5em;
		line-height: 0.72;
	}
	.about-facts {
		display: grid;
		gap: var(--space-lg);
		border-top: var(--rule-thin) solid var(--color-rule);
	}
	.about-facts > div {
		padding-top: var(--space-sm);
		border-bottom: var(--rule-thin) solid var(--color-rule);
	}
	.about-facts h3 {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.about-facts p {
		margin-top: var(--space-2xs);
		color: var(--color-ink-2);
	}
	.education-strip {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-xl);
		margin-top: var(--space-2xl);
		padding-top: var(--space-md);
		border-top: var(--rule-thin) solid var(--color-rule);
	}
	.education-strip > div {
		display: grid;
		gap: var(--space-2xs);
	}
	.education-strip strong {
		font-family: var(--font-display);
		font-size: var(--text-lg);
		font-weight: 600;
	}
	.education-strip span:last-child {
		color: var(--color-ink-2);
	}
	@media (max-width: 48rem) {
		.section {
			padding-block: var(--space-2xl);
		}
		.section-head h2 {
			max-width: 13ch;
		}
		.about-columns,
		.education-strip {
			grid-template-columns: 1fr;
		}
	}
</style>
