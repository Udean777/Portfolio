<script lang="ts">
	import { highlightStore } from '$lib/stores/highlight.svelte';

	const techStack = [
		{ name: 'Kotlin', slug: 'kotlin', color: '7f52ff' },
		{ name: 'Svelte', slug: 'svelte', color: 'ff3e00' },
		{ name: 'TypeScript', slug: 'typescript', color: '3178c6' },
		{ name: 'React', slug: 'react', color: '61dafb' },
		{ name: 'Flutter', slug: 'flutter', color: '02569b' },
		{ name: 'Go', slug: 'go', color: '00add8' },
		{ name: 'Node.js', slug: 'nodedotjs', color: '5fa04e' },
		{ name: 'PostgreSQL', slug: 'postgresql', color: '4169e1' },
		{ name: 'Redis', slug: 'redis', color: 'ff4438' },
		{ name: 'Docker', slug: 'docker', color: '2496ed' },
		{ name: 'Git', slug: 'git', color: 'f05032' },
		{ name: 'Figma', slug: 'figma', color: 'f24e1e' },
		{ name: 'Supabase', slug: 'supabase', color: '3ecf8e' },
		{ name: 'Prisma', slug: 'prisma', color: 'ffffff' },
	];

	const doubled = [...techStack, ...techStack];
</script>

<section class="stack" aria-label="Technology stack">
	<div class="stack-label" aria-hidden="true">
		<span>Stack</span>
	</div>

	<div class="marquee-wrap" aria-hidden="true">
		<div class="marquee-track">
			{#each doubled as tech}
				<div 
					class="tech-item"
					onmouseenter={() => (highlightStore.hoveredTech = tech.name)}
					onmouseleave={() => (highlightStore.hoveredTech = null)}
					role="none"
				>
					<img
						src="https://cdn.simpleicons.org/{tech.slug}/{tech.color}"
						alt=""
						width="18"
						height="18"
						loading="lazy"
					/>
					<span class="tech-name">{tech.name}</span>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.stack {
		background: var(--land-bg);
		padding: 56px 0;
		border-top: 1px solid var(--land-border);
		border-bottom: 1px solid var(--land-border);
		overflow: hidden;
	}

	.stack-label {
		display: flex;
		justify-content: center;
		margin-bottom: 28px;
	}

	.stack-label span {
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		color: var(--land-fg-3);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		opacity: 0.6;
	}

	.marquee-wrap {
		width: 100%;
		overflow: hidden;
		-webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
		mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
	}

	.marquee-track {
		display: flex;
		gap: 48px;
		width: max-content;
		animation: marquee 28s linear infinite;
	}

	.marquee-wrap:hover .marquee-track {
		animation-play-state: paused;
	}

	@keyframes marquee {
		from { transform: translateX(0); }
		to   { transform: translateX(-50%); }
	}

	.tech-item {
		display: flex;
		align-items: center;
		gap: 9px;
		flex-shrink: 0;
		opacity: 0.65;
		transition: opacity 0.2s;
	}

	.marquee-wrap:hover .tech-item:hover {
		opacity: 1;
	}

	.tech-item img {
		width: 18px;
		height: 18px;
		object-fit: contain;
	}

	.tech-name {
		font-family: 'Geist', sans-serif;
		font-size: 13px;
		font-weight: 500;
		color: var(--land-fg-2);
		white-space: nowrap;
	}
</style>
