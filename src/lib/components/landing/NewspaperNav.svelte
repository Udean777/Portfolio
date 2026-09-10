<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme';

	let menuOpen = $state(false);
	let theme = $state<'dark' | 'light'>('dark');

	onMount(() => {
		const unsubscribe = themeStore.subscribe((value) => (theme = value));
		return unsubscribe;
	});

	function scrollTo(id: string) {
		menuOpen = false;
		document.getElementById(id)?.scrollIntoView({
			behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
			block: 'start'
		});
		history.replaceState(null, '', `#${id}`);
	}
</script>

<header class="masthead">
	<div class="masthead-meta">
		<span>Independent portfolio</span>
		<span>Medan · Indonesia</span>
		<span>Issue 01 · {new Date().getFullYear()}</span>
	</div>
	<div class="masthead-main">
		<a class="wordmark" href="/" aria-label="Sajudin Ma'ruf home">Sajudin Ma'ruf</a>
		<p class="wordmark-sub">Frontend &amp; mobile developer</p>
		<div class="masthead-actions">
			<button
				class="theme-button"
				onclick={() => themeStore.toggle()}
				aria-label="Toggle paper theme"
				aria-pressed={theme === 'dark'}
			>
				<span class="theme-mark" aria-hidden="true"></span>
				<span class="theme-label">{theme === 'dark' ? 'Light paper' : 'Dark ink'}</span>
			</button>
			<button
				class="menu-button"
				onclick={() => (menuOpen = !menuOpen)}
				aria-expanded={menuOpen}
				aria-controls="site-menu"
			>
				{menuOpen ? 'Close' : 'Menu'}
			</button>
		</div>
	</div>
	<nav class:open={menuOpen} id="site-menu" class="site-nav" aria-label="Main navigation">
		<a
			href="#about"
			onclick={(event) => {
				event.preventDefault();
				scrollTo('about');
			}}>About</a
		>
		<a
			href="#experience"
			onclick={(event) => {
				event.preventDefault();
				scrollTo('experience');
			}}>Experience</a
		>
		<a
			href="#projects"
			onclick={(event) => {
				event.preventDefault();
				scrollTo('projects');
			}}>Selected work</a
		>
		<a
			href="#contact"
			onclick={(event) => {
				event.preventDefault();
				scrollTo('contact');
			}}>Contact</a
		>
	</nav>
</header>

<style>
	.masthead {
		max-width: 1240px;
		margin: 0 auto;
		padding: var(--space-md) clamp(1rem, 4vw, 3rem) 0;
		font-family: var(--font-mono);
		animation: masthead-in var(--dur-long) var(--ease-out) both;
	}
	.masthead-meta,
	.masthead-main,
	.site-nav {
		border-bottom: var(--rule-thin) solid var(--color-rule);
	}
	.masthead-meta {
		display: flex;
		justify-content: space-between;
		gap: var(--space-sm);
		padding-bottom: var(--space-2xs);
		color: var(--color-ink-2);
		font-size: var(--text-xs);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}
	.masthead-main {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: end;
		gap: var(--space-md);
		padding-block: var(--space-md) var(--space-sm);
		border-bottom-width: var(--rule-heavy);
	}
	.wordmark {
		font-family: var(--font-display);
		font-size: clamp(2.8rem, 7vw, 6.2rem);
		font-weight: 600;
		line-height: 0.8;
		letter-spacing: -0.06em;
		text-decoration: none;
		white-space: nowrap;
	}
	.wordmark-sub {
		font-size: var(--text-xs);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		text-align: center;
		color: var(--color-ink-2);
	}
	.masthead-actions {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: var(--space-sm);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.theme-button,
	.menu-button {
		border: 0;
		background: transparent;
		color: var(--color-ink);
		cursor: pointer;
		text-decoration: none;
		white-space: nowrap;
	}
	.theme-button {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2xs);
		border: var(--rule-thin) solid var(--color-ink);
		border-radius: var(--radius-control);
		padding: var(--space-2xs) var(--space-xs);
		line-height: 1;
	}
	.theme-mark {
		display: inline-block;
		width: var(--space-2xs);
		height: var(--space-2xs);
		border: var(--rule-thin) solid currentColor;
		background: var(--color-accent);
	}
	.theme-button:hover,
	.menu-button:hover {
		color: var(--color-accent);
	}
	.theme-button:hover {
		background: var(--color-paper-2);
		text-decoration: none;
	}
	.menu-button:hover {
		text-decoration: underline;
		text-underline-offset: 0.3em;
	}
	.menu-button {
		display: none;
	}
	.site-nav {
		display: flex;
		justify-content: center;
		gap: clamp(1rem, 5vw, 4rem);
		padding-block: var(--space-sm);
		font-size: var(--text-sm);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
	.site-nav a {
		text-decoration: none;
		white-space: nowrap;
	}
	.site-nav a::after {
		display: block;
		width: 0;
		height: 1px;
		margin-top: 0.25rem;
		background: var(--color-accent);
		content: '';
		transition: width var(--dur-short) var(--ease-out);
	}
	.site-nav a:hover::after,
	.site-nav a:focus-visible::after {
		width: 100%;
	}
	@keyframes masthead-in {
		from {
			opacity: 0;
			transform: translateY(-12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@media (max-width: 48rem) {
		.masthead-meta span:nth-child(2) {
			display: none;
		}
		.masthead-main {
			grid-template-columns: 1fr auto;
			align-items: center;
		}
		.wordmark-sub {
			display: none;
		}
		.masthead-actions {
			gap: var(--space-xs);
		}
		.menu-button {
			display: inline-block;
		}
		.site-nav {
			display: none;
			justify-content: flex-start;
			flex-wrap: wrap;
			gap: var(--space-sm) var(--space-md);
		}
		.site-nav.open {
			display: flex;
		}
	}
	@media (max-width: 24rem) {
		.masthead-meta span:last-child {
			display: none;
		}
		.wordmark {
			font-size: clamp(2.35rem, 14vw, 4rem);
		}
		.theme-label {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip: rect(0 0 0 0);
			white-space: nowrap;
		}
		.theme-button {
			padding: var(--space-xs);
		}
	}
</style>
