<script lang="ts">
	import { onMount } from 'svelte';

	type WidgetType = 'clock' | 'profile' | 'skills';

	interface Props {
		type: WidgetType;
		size?: 'full' | 'half';
	}

	let { type, size = 'half' }: Props = $props();

	let time = $state('');
	let date = $state('');
	let greeting = $state('');

	onMount(() => {
		function tick() {
			const now = new Date();
			time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
			date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
			const h = now.getHours();
			greeting = h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening';
		}
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	});

	const skills = [
		{ name: 'Svelte', color: '#ff3e00' },
		{ name: 'TypeScript', color: '#3178c6' },
		{ name: 'React Native', color: '#61dafb' },
		{ name: 'Flutter', color: '#02569b' },
	];
</script>

<div class="widget widget-{size} widget-{type}">
	{#if type === 'clock'}
		<div class="w-clock">
			<div class="w-greeting">{greeting}</div>
			<div class="w-time">{time}</div>
			<div class="w-date">{date}</div>
		</div>
	{:else if type === 'profile'}
		<div class="w-profile">
			<img src="/images/profile-img.png" alt="Sajudin" class="w-avatar" />
			<div class="w-info">
				<div class="w-name">Sajudin</div>
				<div class="w-role">Frontend & Mobile Dev</div>
				<div class="w-loc">
					<svg width="9" height="11" viewBox="0 0 24 28" fill="rgba(255,255,255,0.5)"><path d="M12 0C7.6 0 4 3.6 4 8c0 6 8 20 8 20s8-14 8-20c0-4.4-3.6-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
					Indonesia
				</div>
			</div>
		</div>
	{:else if type === 'skills'}
		<div class="w-skills">
			<div class="w-skills-title">Skills</div>
			{#each skills as skill}
				<div class="w-skill-row">
					<span class="skill-dot" style="background:{skill.color}"></span>
					<span class="skill-name">{skill.name}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.widget {
		background: rgba(28, 28, 36, 0.72);
		backdrop-filter: blur(24px) saturate(160%);
		-webkit-backdrop-filter: blur(24px) saturate(160%);
		border: 1px solid rgba(255,255,255,0.12);
		border-radius: 22px;
		overflow: hidden;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
		color: rgba(255,255,255,0.9);
	}

	.widget-full { width: 100%; padding: 18px 20px; }
	.widget-half { flex: 1; min-width: 0; padding: 16px; }

	/* Clock */
	.w-clock { display: flex; flex-direction: column; gap: 2px; }
	.w-greeting { font-size: 11px; font-weight: 500; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.06em; }
	.w-time { font-size: 44px; font-weight: 300; letter-spacing: -0.04em; line-height: 1; color: rgba(255,255,255,0.97); margin: 4px 0; }
	.w-date { font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 400; }

	/* Profile */
	.w-profile { display: flex; align-items: center; gap: 10px; height: 100%; }
	.w-avatar { width: 46px; height: 46px; border-radius: 50%; object-fit: cover; border: 1.5px solid rgba(255,255,255,0.2); flex-shrink: 0; }
	.w-name { font-size: 15px; font-weight: 700; letter-spacing: -0.02em; }
	.w-role { font-size: 10px; color: rgba(255,255,255,0.5); margin-top: 1px; line-height: 1.3; }
	.w-loc { display: flex; align-items: center; gap: 3px; font-size: 10px; color: rgba(255,255,255,0.4); margin-top: 4px; }

	/* Skills */
	.w-skills { display: flex; flex-direction: column; gap: 7px; }
	.w-skills-title { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px; }
	.w-skill-row { display: flex; align-items: center; gap: 7px; }
	.skill-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
	.skill-name { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.82); }

	@media (max-width: 380px) {
		.widget-full { padding: 14px 16px; }
		.widget-half { padding: 12px; }
		.w-time { font-size: 36px; }
		.w-avatar { width: 38px; height: 38px; }
		.w-name { font-size: 13px; }
		.skill-name { font-size: 11px; }
	}

	/* Light mode styles */
	:global(.mac-light) .widget {
		background: rgba(255, 255, 255, 0.72);
		border-color: rgba(0, 0, 0, 0.12);
		color: rgba(0, 0, 0, 0.88);
	}
	:global(.mac-light) .w-greeting { color: rgba(0,0,0,0.45); }
	:global(.mac-light) .w-time { color: rgba(0,0,0,0.92); }
	:global(.mac-light) .w-date { color: rgba(0,0,0,0.5); }
	:global(.mac-light) .w-avatar { border-color: rgba(0,0,0,0.12); }
	:global(.mac-light) .w-role { color: rgba(0,0,0,0.5); }
	:global(.mac-light) .w-loc { color: rgba(0,0,0,0.4); }
	:global(.mac-light) .w-loc svg { fill: rgba(0,0,0,0.4); }
	:global(.mac-light) .w-skills-title { color: rgba(0,0,0,0.45); }
	:global(.mac-light) .skill-name { color: rgba(0,0,0,0.80); }
</style>
