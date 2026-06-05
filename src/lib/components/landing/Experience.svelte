<script lang="ts">
	import { onMount } from 'svelte';

	const experiences = [
		{
			company: 'Vivnio',
			role: 'Frontend Developer',
			period: 'Jul 2025 - Present',
			type: 'Full-time',
			description: [
				'Creating responsive website designs and digital invitation products.',
				'Collaborating with stakeholders to translate business requirements into technical solutions.'
			],
			tags: ['SvelteKit', 'TypeScript', 'Prisma', 'PostgreSQL']
		},
		{
			company: 'KitaKale.ID',
			role: 'Mobile Developer',
			period: 'Oct 2023 - Aug 2025',
			type: 'Freelance',
			description: [
				'Developed and maintained high-performance mobile applications.',
				'Focused on seamless user experience and optimizing app stability.'
			],
			tags: ['React Native', 'TypeScript', 'Flutter']
		},
		{
			company: 'KitaKale.ID',
			role: 'Tech Lead',
			period: 'Sep 2023 - Jun 2024',
			type: 'Leadership',
			description: [
				'Led technical teams and mentored junior developers.',
				'Oversaw technical architecture and code quality standards.'
			],
			tags: ['Leadership', 'Architecture', 'Mentoring']
		},
		{
			company: 'KitaKale.ID',
			role: 'Web Content Writer',
			period: 'Jan 2023 - Jun 2024',
			type: 'Part-time',
			description: [
				'Managed digital content strategy and technical documentation.',
				'Collaborated with marketing team to improve platform engagement.'
			],
			tags: ['Content Strategy', 'SEO', 'Documentation']
		}
	];

	let openIndex = $state(0);
	let sectionEl: HTMLElement;
	let visible = $state(false);
	let supportsScrollTimeline = $state(false);
	let progressHeight = $state(0);

	onMount(() => {
		try {
			supportsScrollTimeline =
				CSS.supports('animation-timeline', 'scroll()') &&
				!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		} catch (e) {
			supportsScrollTimeline = false;
		}

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

		const scrollHandler = () => {
			if (!supportsScrollTimeline && sectionEl) {
				const rect = sectionEl.getBoundingClientRect();
				const viewportHeight = window.innerHeight;

				const totalDist = rect.height + viewportHeight;
				const currentDist = viewportHeight - rect.top;

				const pct = Math.max(0, Math.min(1, currentDist / totalDist));
				progressHeight = pct * 100;
			}
		};

		window.addEventListener('scroll', scrollHandler, { passive: true });
		scrollHandler();

		return () => {
			obs.disconnect();
			window.removeEventListener('scroll', scrollHandler);
		};
	});

	function toggle(i: number) {
		openIndex = openIndex === i ? -1 : i;
	}
</script>

<section
	class="exp"
	id="experience"
	bind:this={sectionEl}
	class:visible
	aria-label="Work experience"
>
	<div class="exp-inner">
		<h2 class="exp-heading">Experience</h2>

		<div class="exp-timeline-wrapper">
			<div class="exp-timeline-line" aria-hidden="true">
				<div
					class="exp-timeline-progress"
					style={!supportsScrollTimeline ? `height: ${progressHeight}%` : ''}
				></div>
			</div>

			<div class="exp-list">
				{#each experiences as exp, i}
					<div class="exp-item" class:exp-open={openIndex === i} style="--ei: {i}">
						<button class="exp-trigger" onclick={() => toggle(i)} aria-expanded={openIndex === i}>
							<div class="exp-trigger-left">
								<span class="exp-company">{exp.company}</span>
								<span class="exp-role">{exp.role}</span>
							</div>
							<div class="exp-trigger-right">
								<span class="exp-period">{exp.period}</span>
								<span class="exp-type-badge">{exp.type}</span>
								<span class="exp-chevron" aria-hidden="true">
									<svg
										width="15"
										height="15"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2.2"
										stroke-linecap="round"
										stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg
									>
								</span>
							</div>
						</button>

						<div class="exp-body-wrap">
							<div class="exp-body">
								<ul class="exp-bullets" role="list">
									{#each exp.description as point}
										<li class="exp-bullet">{point}</li>
									{/each}
								</ul>
								<div class="exp-tags">
									{#each exp.tags as tag}
										<span class="exp-tag">{tag}</span>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.exp {
		background: var(--land-bg);
		padding: 100px 0;
	}

	.exp-inner {
		max-width: 860px;
		margin: 0 auto;
		padding: 0 32px;
	}

	.exp-heading {
		font-family: 'Geist', sans-serif;
		font-size: clamp(36px, 4vw, 52px);
		font-weight: 800;
		color: var(--land-fg);
		margin: 0 0 48px;
		letter-spacing: -0.04em;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
			transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.exp.visible .exp-heading {
		opacity: 1;
		transform: translateY(0);
	}

	/* Timeline wrapper and line styling */
	.exp-timeline-wrapper {
		position: relative;
		padding-left: 36px;
	}

	.exp-timeline-line {
		position: absolute;
		left: 8px;
		top: 12px;
		bottom: 12px;
		width: 2px;
		background: var(--land-border);
		border-radius: 99px;
	}

	.exp-timeline-progress {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 0%;
		background: linear-gradient(to bottom, var(--blue), #a78bfa);
		border-radius: 99px;
		box-shadow:
			0 0 10px var(--blue),
			0 0 20px rgba(0, 102, 255, 0.4);
		transform-origin: top;
	}

	.exp-list {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--land-border);
		border-radius: var(--land-radius);
		overflow: hidden;
		background: var(--land-bg-2);
	}

	.exp-item {
		border-bottom: 1px solid var(--land-border);
		opacity: 0;
		transform: translateY(16px);
		transition:
			opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) calc(0.1s + var(--ei, 0) * 0.08s),
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) calc(0.1s + var(--ei, 0) * 0.08s);
	}

	.exp.visible .exp-item {
		opacity: 1;
		transform: translateY(0);
	}

	.exp-item:last-child {
		border-bottom: none;
	}

	/* Trigger */
	.exp-trigger {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		padding: 22px 26px;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		transition: background 0.15s;
	}

	.exp-trigger:hover {
		background: rgba(255, 255, 255, 0.03);
	}

	.exp-item.exp-open .exp-trigger {
		background: rgba(0, 102, 255, 0.06);
	}

	.exp-trigger-left {
		display: flex;
		flex-direction: column;
		gap: 3px;
		min-width: 0;
	}

	.exp-company {
		font-family: 'Geist', sans-serif;
		font-size: 17px;
		font-weight: 700;
		color: var(--land-fg);
		letter-spacing: -0.02em;
	}

	.exp-role {
		font-family: 'Geist', sans-serif;
		font-size: 13px;
		color: var(--blue);
		font-weight: 500;
	}

	.exp-trigger-right {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-shrink: 0;
	}

	.exp-period {
		font-family: 'JetBrains Mono', monospace;
		font-size: 11px;
		color: var(--land-fg-3);
		white-space: nowrap;
	}

	.exp-type-badge {
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		font-weight: 500;
		padding: 3px 8px;
		border-radius: 20px;
		background: rgba(0, 102, 255, 0.08);
		color: var(--blue);
		border: 1px solid rgba(0, 102, 255, 0.18);
		white-space: nowrap;
	}

	.exp-chevron {
		display: flex;
		color: var(--land-fg-3);
		transition:
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			color 0.2s;
		flex-shrink: 0;
	}

	.exp-item.exp-open .exp-chevron {
		transform: rotate(180deg);
		color: var(--blue);
	}

	/* Smooth expand/collapse via grid-template-rows trick */
	.exp-body-wrap {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.35s cubic-bezier(0.16, 1, 0.3, 1);
		overflow: hidden;
	}

	.exp-item.exp-open .exp-body-wrap {
		grid-template-rows: 1fr;
	}

	.exp-body {
		overflow: hidden;
		padding: 0 26px;
		transition: padding 0.35s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.exp-item.exp-open .exp-body {
		padding: 4px 26px 22px;
	}

	.exp-bullets {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-bottom: 14px;
	}

	.exp-bullet {
		font-family: 'Geist', sans-serif;
		font-size: 14px;
		color: var(--land-fg-2);
		line-height: 1.65;
		padding-left: 16px;
		position: relative;
	}

	.exp-bullet::before {
		content: '';
		position: absolute;
		left: 0;
		top: 8px;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--blue);
	}

	.exp-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.exp-tag {
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		padding: 3px 8px;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid var(--land-border);
		color: var(--land-fg-3);
	}

	/* ── Responsive ── */
	@media (max-width: 768px) {
		.exp {
			padding: 72px 0;
		}
		.exp-inner {
			padding: 0 20px;
		}
		.exp-timeline-wrapper {
			padding-left: 20px;
		}
		.exp-timeline-line {
			left: 4px;
		}

		.exp-trigger {
			flex-direction: column;
			align-items: flex-start;
			gap: 10px;
			padding: 18px 20px;
		}

		.exp-trigger-right {
			width: 100%;
			justify-content: space-between;
		}

		.exp-body {
			padding: 0 20px;
		}
		.exp-item.exp-open .exp-body {
			padding: 4px 20px 20px;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: view()) {
			@keyframes reveal-exp-heading {
				from {
					opacity: 0;
					transform: translateY(28px);
				}
				to {
					opacity: 1;
					transform: translateY(0);
				}
			}

			@keyframes reveal-exp-item {
				from {
					opacity: 0;
					transform: translateY(32px);
				}
				to {
					opacity: 1;
					transform: translateY(0);
				}
			}

			@keyframes trace-line {
				from {
					height: 0%;
				}
				to {
					height: 100%;
				}
			}

			.exp-heading {
				animation: reveal-exp-heading auto cubic-bezier(0.16, 1, 0.3, 1) both;
				animation-timeline: view();
				animation-range: entry 0% entry 30%;
			}

			.exp-item {
				animation: reveal-exp-item auto cubic-bezier(0.16, 1, 0.3, 1) both;
				animation-timeline: view();
				animation-range: entry 0% entry 35%;
				transition: background-color 0.15s;
			}

			.exp-timeline-progress {
				animation: trace-line auto linear both;
				animation-timeline: view();
				animation-range: entry 10% exit 90%;
			}
		}
	}
</style>
