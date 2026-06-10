<script lang="ts">
	import { onMount } from 'svelte';
	import { highlightStore } from '$lib/stores/highlight.svelte';

	const skills = [
		{
			category: 'Frontend',
			color: '#0066ff',
			items: ['Svelte', 'SvelteKit', 'React', 'TypeScript', 'HTML', 'CSS']
		},
		{
			category: 'Mobile',
			color: '#22c55e',
			items: [
				'React Native',
				'Flutter',
				'Dart',
				'Kotlin',
				'Jetpack Compose',
				'Compose Multiplatform'
			]
		},
		{
			category: 'Backend',
			color: '#f59e0b',
			items: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Prisma', 'Supabase']
		},
		{ category: 'Tools', color: '#a78bfa', items: ['Git', 'Docker', 'Figma', 'VSCode'] }
	];

	const certifications = [
		'Memulai Pemrograman dengan Python - Dicoding Academy',
		'Memulai Pemrograman dengan Dart - Dicoding Academy',
		'Belajar Membuat Aplikasi Flutter untuk Pemula - Dicoding Academy',
		'Memulai Pemrograman dengan Kotlin - Dicoding Academy',
		'Belajar Membuat Aplikasi Android untuk Pemula - Dicoding Academy'
	];

	let sectionEl: HTMLElement;
	let visible = $state(false);
	let timeString = $state('');

	onMount(() => {
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					obs.disconnect();
				}
			},
			{ threshold: 0.1 }
		);
		obs.observe(sectionEl);

		const updateTime = () => {
			const options: Intl.DateTimeFormatOptions = {
				timeZone: 'Asia/Jakarta',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false
			};
			timeString = new Intl.DateTimeFormat('en-US', options).format(new Date());
		};
		updateTime();
		const interval = setInterval(updateTime, 1000);

		return () => {
			obs.disconnect();
			clearInterval(interval);
		};
	});
</script>

<section class="about" id="about" bind:this={sectionEl} class:visible aria-label="About me">
	<div class="about-inner">
		<div class="about-left">
			<div class="photo-wrap">
				<img
					src="/images/sajudin-1.webp"
					alt="Sajudin Ma'ruf"
					class="about-photo"
					width="400"
					height="500"
					loading="lazy"
				/>
			</div>
		</div>

		<div class="about-right">
			<h2 class="about-heading">About</h2>

			<div class="about-bio">
				<p>
					I'm a Frontend &amp; Mobile Developer studying Information Technology at Pembangunan Panca
					Budi University. I enjoy building things that are fast, clean, and work well on any
					screen.
				</p>
				<p>
					Currently at <a
						href="https://vivnio.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-link">Vivnio</a
					> building responsive web and digital invitation products. Previously led mobile development
					at KitaKale.ID, shipping multiple apps to the Play Store.
				</p>
				<p>Open to freelance and remote projects on the side.</p>
			</div>

			<div class="skills-grid">
				{#each skills as group, gi}
					<div class="skill-group" style="--gi: {gi}">
						<span class="skill-category" style="color: {group.color}">{group.category}</span>
						<div class="skill-tags">
							{#each group.items as skill, si}
								<span
									class="skill-tag"
									style="--tag-color: {group.color}; --si: {si}"
									onmouseenter={() => (highlightStore.hoveredTech = skill)}
									onmouseleave={() => (highlightStore.hoveredTech = null)}
									role="none"
								>
									{skill}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<div class="extra-info-grid">
				<div class="info-col-left">
					<div class="edu-section">
						<h3 class="extra-heading">Education</h3>
						<div class="edu-item">
							<div class="edu-dot" aria-hidden="true"></div>
							<div class="edu-details">
								<span class="edu-school">Pembangunan Panca Budi University</span>
								<span class="edu-degree">Bachelor of Information Technology</span>
								<span class="edu-period">2022 - Present &nbsp;·&nbsp; GPA: 3.84 / 4.00</span>
							</div>
						</div>
					</div>

					<div class="lang-section">
						<h3 class="extra-heading">Languages</h3>
						<div class="lang-items">
							<div class="lang-item">
								<span class="lang-name">Indonesian</span>
								<span class="lang-badge">Native</span>
							</div>
							<div class="lang-item">
								<span class="lang-name">English</span>
								<span class="lang-badge">Professional</span>
							</div>
						</div>
					</div>
				</div>

				<div class="info-col-right">
					<h3 class="extra-heading">Certifications</h3>
					<ul class="certs-list" role="list">
						{#each certifications as cert, i}
							<li class="cert-item" style="--ci: {i}">
								<svg
									class="cert-check"
									width="12"
									height="12"
									viewBox="0 0 24 24"
									fill="none"
									stroke="var(--blue)"
									stroke-width="2.5"
									stroke-linecap="round"
									aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg
								>
								<span>{cert}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		background: var(--land-bg-2);
		padding: 100px 0;
	}

	/* Section reveal */
	.about-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 32px;
		display: grid;
		grid-template-columns: 320px 1fr;
		gap: 80px;
		align-items: start;
	}

	/* Photo col */
	.about-left {
		position: sticky;
		top: 100px;
		opacity: 0;
		transform: translateX(-24px);
		transition:
			opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s,
			transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
	}

	.about.visible .about-left {
		opacity: 1;
		transform: translateX(0);
	}

	.photo-wrap {
		position: relative;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid var(--land-border);
		transition: border-color 0.3s;
	}

	.photo-wrap:hover {
		border-color: var(--land-border-hover);
	}

	.about-photo {
		width: 100%;
		height: 500px;
		object-fit: cover;
		object-position: center 10%;
		display: block;
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.photo-wrap:hover .about-photo {
		transform: scale(1.03);
	}

	/* Right col */
	.about-right {
		display: flex;
		flex-direction: column;
		gap: 32px;
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s,
			transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
	}

	.about.visible .about-right {
		opacity: 1;
		transform: translateY(0);
	}

	.about-heading {
		font-family: 'Geist', sans-serif;
		font-size: clamp(36px, 4vw, 52px);
		font-weight: 800;
		color: var(--land-fg);
		margin: 0;
		letter-spacing: -0.04em;
	}

	.about-bio {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.about-bio p {
		font-family: 'Geist', sans-serif;
		font-size: 15px;
		color: var(--land-fg-2);
		line-height: 1.75;
		margin: 0;
		max-width: 60ch;
	}

	.text-link {
		color: var(--blue);
		text-decoration: none;
		font-weight: 500;
	}

	.text-link:hover {
		text-decoration: underline;
	}

	/* Skills */
	.skills-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
	}

	.skill-group {
		display: flex;
		flex-direction: column;
		gap: 10px;
		opacity: 0;
		transform: translateY(12px);
		transition:
			opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) calc(0.3s + var(--gi, 0) * 0.07s),
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) calc(0.3s + var(--gi, 0) * 0.07s);
	}

	.about.visible .skill-group {
		opacity: 1;
		transform: translateY(0);
	}

	.skill-category {
		font-family: 'Geist', sans-serif;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.01em;
	}

	.skill-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.skill-tag {
		font-family: 'Geist', sans-serif;
		font-size: 12px;
		font-weight: 500;
		padding: 4px 10px;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid var(--land-border);
		color: var(--land-fg-2);
		transition:
			border-color 0.15s,
			color 0.15s,
			background 0.15s;
		cursor: default;
	}

	.skill-tag:hover {
		border-color: var(--tag-color, var(--blue));
		color: var(--tag-color, var(--blue));
		background: rgba(255, 255, 255, 0.06);
	}

	/* Extra Info Grid */
	.extra-info-grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: 40px;
		border-top: 1px solid var(--land-border);
		padding-top: 28px;
	}

	.info-col-left {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.info-col-right {
		display: flex;
		flex-direction: column;
	}

	.extra-heading {
		font-family: 'Geist', sans-serif;
		font-size: 11px;
		font-weight: 600;
		color: var(--land-fg-3);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin: 0 0 16px;
	}

	/* Education section */
	.edu-item {
		display: flex;
		gap: 12px;
		position: relative;
	}

	.edu-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--blue);
		margin-top: 5px;
		flex-shrink: 0;
		box-shadow: 0 0 8px var(--blue);
	}

	.edu-details {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.edu-school {
		font-family: 'Geist', sans-serif;
		font-size: 14px;
		font-weight: 700;
		color: var(--land-fg);
		letter-spacing: -0.01em;
	}

	.edu-degree {
		font-family: 'Geist', sans-serif;
		font-size: 12px;
		color: var(--land-fg-2);
	}

	.edu-period {
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		color: var(--land-fg-3);
		margin-top: 2px;
	}

	/* Languages section */
	.lang-items {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.lang-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 5px 10px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--land-border);
		border-radius: 6px;
	}

	.lang-name {
		font-family: 'Geist', sans-serif;
		font-size: 12px;
		font-weight: 500;
		color: var(--land-fg-2);
	}

	.lang-badge {
		font-family: 'JetBrains Mono', monospace;
		font-size: 9px;
		color: var(--blue);
		background: rgba(0, 102, 255, 0.08);
		border: 1px solid rgba(0, 102, 255, 0.15);
		padding: 1px 5px;
		border-radius: 4px;
	}

	/* Certs */
	.certs-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.cert-item {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-family: 'Geist', sans-serif;
		font-size: 13px;
		color: var(--land-fg-2);
		line-height: 1.5;
		opacity: 0;
		transform: translateX(-8px);
		transition:
			opacity 0.4s ease calc(0.5s + var(--ci, 0) * 0.06s),
			transform 0.4s ease calc(0.5s + var(--ci, 0) * 0.06s);
	}

	.about.visible .cert-item {
		opacity: 1;
		transform: translateX(0);
	}

	.cert-check {
		flex-shrink: 0;
		margin-top: 2px;
	}

	/* ── Responsive ── */
	@media (max-width: 1024px) {
		.about-inner {
			grid-template-columns: 1fr;
			gap: 48px;
		}

		.about-left {
			position: static;
			display: flex;
			justify-content: center;
		}

		.photo-wrap {
			max-width: 360px;
		}
		.about-photo {
			height: 340px;
		}
	}

	@media (max-width: 768px) {
		.about {
			padding: 72px 0;
		}
		.about-inner {
			padding: 0 20px;
		}
		.skills-grid {
			grid-template-columns: 1fr;
		}
		.extra-info-grid {
			grid-template-columns: 1fr;
			gap: 32px;
		}
		.photo-wrap {
			max-width: 100%;
		}
		.about-photo {
			height: 280px;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: view()) {
			@keyframes reveal-about-left {
				from {
					opacity: 0;
					transform: translateX(-32px);
				}
				to {
					opacity: 1;
					transform: translateX(0);
				}
			}

			@keyframes reveal-about-right {
				from {
					opacity: 0;
					transform: translateY(32px);
				}
				to {
					opacity: 1;
					transform: translateY(0);
				}
			}

			.about-left {
				animation: reveal-about-left auto cubic-bezier(0.16, 1, 0.3, 1) both;
				animation-timeline: view();
				animation-range: entry 0% entry 30%;
			}

			.about-right {
				animation: reveal-about-right auto cubic-bezier(0.16, 1, 0.3, 1) both;
				animation-timeline: view();
				animation-range: entry 5% entry 35%;
			}
		}
	}
</style>
