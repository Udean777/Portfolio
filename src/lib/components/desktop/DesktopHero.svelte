<script lang="ts">
	import { desktopStore } from '$lib/stores/desktop';

	interface Props {
		desktopTheme: 'dark' | 'light';
	}

	let { desktopTheme }: Props = $props();

	const tags = ['Frontend Dev', 'Mobile Dev', 'SvelteKit', 'TypeScript', 'React Native'];

	function getGreeting(): string {
		const h = new Date().getHours();
		if (h < 12) return 'morning';
		if (h < 17) return 'afternoon';
		return 'evening';
	}

	function openTerminal() {
		desktopStore.openWindow('terminal');
	}

	function openNotes() {
		desktopStore.openWindow('notes');
	}
</script>

<div class="hero" class:hero-light={desktopTheme === 'light'}>
	<div class="hero-inner">
		<!-- Avatar -->
		<div class="avatar-wrap">
			<img src="/images/profile-img.png" alt="Sajudin Ma'ruf" class="avatar" />
			<div class="avatar-ring"></div>
		</div>

		<!-- Text -->
		<div class="hero-text">
			<p class="hero-greeting">Good {getGreeting()},</p>
			<h1 class="hero-name">Sajudin Ma'ruf</h1>
			<p class="hero-role">Frontend &amp; Mobile Developer</p>
		</div>

		<!-- Tags -->
		<div class="hero-tags">
			{#each tags as tag, i}
				<span class="tag" style="animation-delay: {300 + i * 80}ms">{tag}</span>
			{/each}
		</div>

		<!-- CTA Buttons -->
		<div class="hero-cta">
			<button class="cta-primary" onclick={openNotes}>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
				About Me
			</button>
			<button class="cta-secondary" onclick={openTerminal}>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
				Open Terminal
			</button>
		</div>

		<!-- Social links -->
		<div class="hero-socials">
			<a href="https://github.com/Udean777" target="_blank" class="social-link" aria-label="GitHub">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
			</a>
			<a href="https://linkedin.com/in/sajudin" target="_blank" class="social-link" aria-label="LinkedIn">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
			</a>
			<a href="mailto:sajudinmaruf@gmail.com" class="social-link" aria-label="Email">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
			</a>
			<a href="/assets/CV-Sajudin-ma'ruf.pdf" download class="social-link" aria-label="Download CV">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
			</a>
		</div>
	</div>
</div>

<script module lang="ts">
	function getGreeting(): string {
		const h = new Date().getHours();
		if (h < 12) return 'morning';
		if (h < 17) return 'afternoon';
		return 'evening';
	}
</script>

<style>
	.hero {
		position: absolute;
		inset: 28px 0 80px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		z-index: 1;
	}

	.hero-inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		pointer-events: auto;
		animation: heroIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@keyframes heroIn {
		from {
			opacity: 0;
			transform: translateY(24px) scale(0.97);
			filter: blur(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
			filter: blur(0);
		}
	}

	/* Avatar */
	.avatar-wrap {
		position: relative;
		width: 110px;
		height: 110px;
		animation: heroIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
	}

	.avatar {
		width: 110px;
		height: 110px;
		border-radius: 50%;
		object-fit: cover;
		border: 3px solid rgba(255, 255, 255, 0.28);
		box-shadow: 0 6px 32px rgba(0, 0, 0, 0.40);
	}

	.avatar-ring {
		position: absolute;
		inset: -7px;
		border-radius: 50%;
		border: 1.5px solid rgba(255, 255, 255, 0.15);
		animation: ringPulse 3s ease-in-out infinite;
	}

	@keyframes ringPulse {
		0%, 100% { opacity: 0.4; transform: scale(1); }
		50%       { opacity: 0.9; transform: scale(1.04); }
	}

	/* Text */
	.hero-text {
		text-align: center;
		animation: heroIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.10s both;
	}

	.hero-greeting {
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
		font-size: 15px;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.55);
		margin: 0 0 6px;
		letter-spacing: 0.02em;
	}

	.hero-name {
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
		font-size: 52px;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.96);
		margin: 0 0 6px;
		letter-spacing: -0.04em;
		text-shadow: 0 3px 28px rgba(0, 0, 0, 0.4);
	}

	.hero-role {
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
		font-size: 17px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.60);
		margin: 0;
		letter-spacing: 0.01em;
	}

	/* Tags */
	.hero-tags {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 6px;
		max-width: 380px;
		animation: heroIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both;
	}

	.tag {
		padding: 4px 11px;
		background: rgba(255, 255, 255, 0.10);
		border: 1px solid rgba(255, 255, 255, 0.16);
		border-radius: 20px;
		font-family: -apple-system, BlinkMacSystemFont, sans-serif;
		font-size: 11px;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.75);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		opacity: 0;
		animation: tagIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	@keyframes tagIn {
		from { opacity: 0; transform: translateY(8px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	/* CTA */
	.hero-cta {
		display: flex;
		gap: 10px;
		animation: heroIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.32s both;
	}

	.cta-primary,
	.cta-secondary {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 9px 18px;
		border-radius: 10px;
		font-family: -apple-system, BlinkMacSystemFont, sans-serif;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		border: none;
		transition: transform 0.15s, opacity 0.15s, box-shadow 0.15s;
		letter-spacing: -0.01em;
	}

	.cta-primary {
		background: rgba(255, 255, 255, 0.92);
		color: #1c1c1e;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
	}

	.cta-primary:hover {
		background: #ffffff;
		transform: translateY(-1px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.30);
	}

	.cta-primary:active {
		transform: scale(0.97);
	}

	.cta-secondary {
		background: rgba(255, 255, 255, 0.12);
		color: rgba(255, 255, 255, 0.88);
		border: 1px solid rgba(255, 255, 255, 0.20);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	.cta-secondary:hover {
		background: rgba(255, 255, 255, 0.18);
		transform: translateY(-1px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
	}

	.cta-secondary:active {
		transform: scale(0.97);
	}

	/* Social links */
	.hero-socials {
		display: flex;
		gap: 10px;
		animation: heroIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.44s both;
	}

	.social-link {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.10);
		border: 1px solid rgba(255, 255, 255, 0.16);
		color: rgba(255, 255, 255, 0.70);
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		transition: background 0.15s, color 0.15s, transform 0.15s;
	}

	.social-link:hover {
		background: rgba(255, 255, 255, 0.22);
		color: rgba(255, 255, 255, 0.95);
		transform: translateY(-2px);
	}

	/* Light mode overrides */
	.hero-light .hero-greeting { color: rgba(0, 0, 0, 0.45); }
	.hero-light .hero-name     { color: rgba(0, 0, 0, 0.88); text-shadow: 0 1px 6px rgba(255,255,255,0.4); }
	.hero-light .hero-role     { color: rgba(0, 0, 0, 0.50); }

	.hero-light .tag {
		background: rgba(0, 0, 0, 0.07);
		border-color: rgba(0, 0, 0, 0.12);
		color: rgba(0, 0, 0, 0.65);
	}

	.hero-light .cta-primary {
		background: rgba(0, 0, 0, 0.82);
		color: #fff;
	}

	.hero-light .cta-primary:hover { background: rgba(0, 0, 0, 0.92); }

	.hero-light .cta-secondary {
		background: rgba(0, 0, 0, 0.07);
		color: rgba(0, 0, 0, 0.75);
		border-color: rgba(0, 0, 0, 0.15);
	}

	.hero-light .cta-secondary:hover { background: rgba(0, 0, 0, 0.12); }

	.hero-light .social-link {
		background: rgba(0, 0, 0, 0.07);
		border-color: rgba(0, 0, 0, 0.12);
		color: rgba(0, 0, 0, 0.55);
	}

	.hero-light .social-link:hover {
		background: rgba(0, 0, 0, 0.14);
		color: rgba(0, 0, 0, 0.85);
	}
</style>
