<script lang="ts">
	import { onMount } from 'svelte';

	let scrollY = $state(0);
	let supportsScrollTimeline = $state(false);

	onMount(() => {
		let prefersReducedMotion = false;
		try {
			prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		} catch (e) {}

		try {
			supportsScrollTimeline =
				CSS.supports('animation-timeline', 'scroll()') && !prefersReducedMotion;
		} catch (e) {
			supportsScrollTimeline = false;
		}
	});

	function scrollTo(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<svelte:window bind:scrollY />

<section class="hero" id="hero" aria-label="Introduction">
	<div class="hero-inner">
		<div
			class="hero-content"
			style={!supportsScrollTimeline && scrollY < 600
				? `
				transform: translateY(${-scrollY * 0.1}px); 
				opacity: ${1 - (scrollY / 600) * 0.6};
			`
				: ''}
		>
			<div class="hero-label anim" style="--delay: 0ms">
				<span class="label-dot"></span>
				<span>Full-time @ Vivnio &nbsp;·&nbsp; Freelance open</span>
			</div>

			<h1 class="hero-name anim" style="--delay: 80ms">
				Sajudin<br />Ma'ruf
			</h1>

			<p class="hero-role anim" style="--delay: 160ms">
				<span class="role-accent">Frontend</span> &amp; Mobile Developer
			</p>

			<p class="hero-sub anim" style="--delay: 240ms">
				Building fast, thoughtful interfaces for web and mobile. Based in Indonesia.
			</p>

			<div class="hero-cta anim" style="--delay: 320ms">
				<a
					href="#projects"
					class="cta-primary"
					onclick={(e) => {
						e.preventDefault();
						scrollTo('projects');
					}}
				>
					View Work
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
					>
				</a>
				<a
					href="#contact"
					class="cta-secondary"
					onclick={(e) => {
						e.preventDefault();
						scrollTo('contact');
					}}
				>
					Get in Touch
				</a>
			</div>

			<div class="hero-stats anim" style="--delay: 400ms" aria-label="Quick stats">
				<div class="stat">
					<span class="stat-num">2+</span>
					<span class="stat-label">Years exp.</span>
				</div>
				<div class="stat-divider" aria-hidden="true"></div>
				<div class="stat">
					<span class="stat-num">7+</span>
					<span class="stat-label">Projects shipped</span>
				</div>
				<div class="stat-divider" aria-hidden="true"></div>
				<div class="stat">
					<span class="stat-num">2</span>
					<span class="stat-label">Companies</span>
				</div>
			</div>

			<div class="hero-socials anim" style="--delay: 480ms">
				<a
					href="https://github.com/Udean777"
					target="_blank"
					rel="noopener noreferrer"
					class="social-link"
					aria-label="GitHub"
				>
					<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
						><path
							d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
						/></svg
					>
				</a>
				<a
					href="https://linkedin.com/in/sajudin"
					target="_blank"
					rel="noopener noreferrer"
					class="social-link"
					aria-label="LinkedIn"
				>
					<svg
						width="17"
						height="17"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						aria-hidden="true"
						><path
							d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
						/><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg
					>
				</a>
				<a href="mailto:sajudinmaruf@gmail.com" class="social-link" aria-label="Email">
					<svg
						width="17"
						height="17"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						aria-hidden="true"
						><path
							d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
						/><polyline points="22,6 12,13 2,6" /></svg
					>
				</a>
			</div>
		</div>

		<div class="hero-visual anim" style="--delay: 100ms">
			<div class="photo-frame">
				<img
					src="/images/sajudin.jpeg"
					alt="Sajudin Ma'ruf"
					class="photo"
					width="480"
					height="560"
					fetchpriority="high"
					style={!supportsScrollTimeline && scrollY < 600
						? `
						transform: scale(${1 - (scrollY / 600) * 0.08}) translateY(${scrollY * 0.08}px); 
						opacity: ${1 - (scrollY / 600) * 0.65};
					`
						: ''}
				/>
				<div class="photo-overlay" aria-hidden="true"></div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100dvh;
		background: var(--land-bg);
		display: flex;
		flex-direction: column;
		padding-top: 68px;
	}

	.hero-inner {
		flex: 1;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
		padding: 0 32px;
		display: grid;
		grid-template-columns: 1fr 480px;
		align-items: center;
		gap: 64px;
		min-height: calc(100dvh - 68px);
	}

	/* ── Staggered entrance animation ── */
	.anim {
		opacity: 0;
		transform: translateY(20px);
		animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms) both;
	}

	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.hero-content {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	/* Available label */
	.hero-label {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: 'JetBrains Mono', monospace;
		font-size: 11px;
		color: var(--land-fg-2);
		letter-spacing: 0.04em;
		width: fit-content;
		white-space: nowrap;
	}

	.label-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #22c55e;
		flex-shrink: 0;
	}

	/* Name */
	.hero-name {
		font-family: 'Geist', sans-serif;
		font-size: clamp(60px, 8vw, 100px);
		font-weight: 800;
		line-height: 0.9;
		letter-spacing: -0.04em;
		color: var(--land-fg);
		margin: 0;
	}

	/* Role */
	.hero-role {
		font-family: 'Geist', sans-serif;
		font-size: clamp(17px, 2vw, 22px);
		font-weight: 400;
		color: var(--land-fg-2);
		margin: 0;
		letter-spacing: -0.02em;
	}

	.role-accent {
		color: var(--blue);
		font-weight: 600;
	}

	/* Sub */
	.hero-sub {
		font-family: 'Geist', sans-serif;
		font-size: 15px;
		color: var(--land-fg-2);
		line-height: 1.65;
		margin: 0;
		max-width: 38ch;
	}

	/* CTAs */
	.hero-cta {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		margin-top: 4px;
	}

	.cta-primary {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 11px 22px;
		background: var(--blue);
		color: #fff;
		font-family: 'Geist', sans-serif;
		font-size: 14px;
		font-weight: 600;
		border: none;
		border-radius: var(--land-radius);
		cursor: pointer;
		letter-spacing: -0.01em;
		transition:
			background 0.15s,
			transform 0.1s,
			box-shadow 0.15s;
		white-space: nowrap;
		text-decoration: none;
	}

	.cta-primary:hover {
		background: var(--blue-dim);
		box-shadow: 0 4px 20px rgba(0, 102, 255, 0.35);
	}

	.cta-primary:active {
		transform: scale(0.97);
	}

	.cta-secondary {
		display: inline-flex;
		align-items: center;
		padding: 11px 22px;
		background: transparent;
		color: var(--land-fg);
		font-family: 'Geist', sans-serif;
		font-size: 14px;
		font-weight: 500;
		border: 1px solid var(--land-border);
		border-radius: var(--land-radius);
		cursor: pointer;
		letter-spacing: -0.01em;
		transition:
			border-color 0.15s,
			background 0.15s,
			transform 0.1s;
		white-space: nowrap;
		text-decoration: none;
	}

	.cta-secondary:hover {
		border-color: var(--land-border-hover);
		background: rgba(255, 255, 255, 0.04);
	}

	.cta-secondary:active {
		transform: scale(0.97);
	}

	/* Inline stats row */
	.hero-stats {
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 16px 0;
		border-top: 1px solid var(--land-border);
		border-bottom: 1px solid var(--land-border);
		width: fit-content;
		min-width: 280px;
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.stat-num {
		font-family: 'Geist', sans-serif;
		font-size: 26px;
		font-weight: 800;
		color: var(--blue);
		letter-spacing: -0.04em;
		line-height: 1;
	}

	.stat-label {
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		color: var(--land-fg-3);
		letter-spacing: 0.02em;
		white-space: nowrap;
	}

	.stat-divider {
		width: 1px;
		height: 32px;
		background: var(--land-border);
		flex-shrink: 0;
	}

	/* Socials */
	.hero-socials {
		display: flex;
		gap: 8px;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 9px;
		border: 1px solid var(--land-border);
		color: var(--land-fg-2);
		text-decoration: none;
		transition:
			color 0.15s,
			border-color 0.15s,
			background 0.15s,
			transform 0.15s;
	}

	.social-link:hover {
		color: var(--land-fg);
		border-color: var(--land-border-hover);
		background: rgba(255, 255, 255, 0.05);
		transform: translateY(-2px);
	}

	/* Photo */
	.hero-visual {
		position: relative;
		display: flex;
		justify-content: flex-end;
		align-self: stretch;
		align-items: center;
	}

	.photo-frame {
		position: relative;
		width: 100%;
		max-width: 460px;
		height: 560px;
		border-radius: 20px;
		overflow: hidden;
		border: 1px solid var(--land-border);
		transition: border-color 0.3s;
	}

	.photo-frame:hover {
		border-color: var(--land-border-hover);
	}

	.photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top center;
		display: block;
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.photo-frame:hover .photo {
		transform: scale(1.03);
	}

	.photo-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			transparent 55%,
			var(--photo-overlay, rgba(10, 10, 10, 0.55)) 100%
		);
		pointer-events: none;
	}

	/* ── Responsive ── */
	@media (max-width: 1100px) {
		.hero-inner {
			grid-template-columns: 1fr 380px;
			gap: 48px;
		}

		.photo-frame {
			height: 480px;
		}
	}

	@media (max-width: 900px) {
		.hero-inner {
			grid-template-columns: 1fr;
			gap: 40px;
			padding-top: 40px;
			min-height: auto;
			padding-bottom: 64px;
		}

		.hero-visual {
			justify-content: center;
			order: -1;
		}

		.photo-frame {
			max-width: 320px;
			height: 380px;
		}
	}

	@media (max-width: 640px) {
		.hero-inner {
			padding: 32px 20px 64px;
		}

		.hero-name {
			font-size: clamp(52px, 14vw, 76px);
		}

		.photo-frame {
			max-width: 260px;
			height: 300px;
		}

		.hero-stats {
			min-width: unset;
			gap: 16px;
		}

		.stat-num {
			font-size: 22px;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: scroll()) {
			@keyframes scale-down-photo {
				to {
					transform: scale(0.92) translateY(50px);
					opacity: 0.35;
				}
			}

			@keyframes parallax-content {
				to {
					transform: translateY(-60px);
					opacity: 0.4;
				}
			}

			.photo {
				animation: scale-down-photo auto linear both;
				animation-timeline: scroll();
				animation-range: 0px 600px;
				transition: none;
			}

			.hero-content {
				animation: parallax-content auto linear both;
				animation-timeline: scroll();
				animation-range: 0px 600px;
			}
		}
	}
</style>
