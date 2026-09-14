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

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && menuOpen) menuOpen = false;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

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
				class:open={menuOpen}
				onclick={() => (menuOpen = !menuOpen)}
				aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
				aria-expanded={menuOpen}
				aria-controls="site-menu"
			>
				<span class="menu-icon" aria-hidden="true"><span></span><span></span></span>
				<span class="menu-text">{menuOpen ? 'Close' : 'Menu'}</span>
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
		padding: clamp(1rem, 3vw, 1.5rem) clamp(1rem, 4vw, 3rem) 0;
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
		min-width: 0;
		padding-bottom: var(--space-2xs);
		color: var(--color-ink-2);
		font-size: var(--text-xs);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}
	.masthead-main {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
		align-items: end;
		gap: var(--space-md);
		padding-block: var(--space-md) var(--space-sm);
		border-bottom-width: var(--rule-heavy);
	}
	.wordmark {
		min-width: 0;
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
		min-height: 2.25rem;
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
		align-items: center;
		gap: var(--space-2xs);
		border: var(--rule-thin) solid var(--color-ink);
		border-radius: var(--radius-control);
		padding: var(--space-2xs) var(--space-xs);
		line-height: 1;
		transition:
			background-color var(--dur-short) var(--ease-out),
			color var(--dur-short) var(--ease-out);
	}
	.menu-button:hover,
	.menu-button.open {
		background: var(--color-ink);
		color: var(--color-paper);
		text-decoration: none;
	}
	.menu-icon {
		display: grid;
		width: 0.9rem;
		gap: 0.24rem;
	}
	.menu-icon span {
		display: block;
		height: 1px;
		background: currentColor;
		transition: transform var(--dur-short) var(--ease-out);
	}
	.menu-button.open .menu-icon span:first-child {
		transform: translateY(0.12rem) rotate(45deg);
	}
	.menu-button.open .menu-icon span:last-child {
		transform: translateY(-0.12rem) rotate(-45deg);
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
		.masthead {
			padding: var(--space-sm) 1rem 0;
		}
		.masthead-meta {
			display: grid;
			grid-template-columns: minmax(0, 1fr) auto;
			align-items: center;
			gap: var(--space-xs);
		}
		.masthead-meta span:nth-child(2) {
			display: none;
		}
		.masthead-main {
			grid-template-columns: minmax(0, 1fr) auto;
			align-items: center;
			gap: var(--space-xs);
			padding-block: var(--space-md) var(--space-sm);
		}
		.wordmark {
			font-size: clamp(2.2rem, 10vw, 4rem);
			line-height: 0.84;
			white-space: normal;
			overflow-wrap: normal;
		}
		.wordmark-sub {
			display: none;
		}
		.masthead-actions {
			gap: var(--space-2xs);
			align-self: center;
		}
		.theme-button,
		.menu-button {
			min-height: 2.5rem;
			padding: var(--space-2xs) var(--space-xs);
		}
		.theme-label {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip: rect(0 0 0 0);
			white-space: nowrap;
		}
		.menu-button {
			display: inline-flex;
		}
		.site-nav {
			display: none;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: var(--space-2xs);
			padding-block: var(--space-xs) var(--space-md);
			border-bottom-width: var(--rule-heavy);
		}
		.site-nav.open {
			display: grid;
			animation: menu-in var(--dur-standard) var(--ease-out) both;
		}
		.site-nav a {
			display: flex;
			align-items: center;
			min-height: 3rem;
			padding: var(--space-xs);
			border: var(--rule-thin) solid var(--color-rule);
			background: var(--color-paper-2);
			font-size: var(--text-xs);
			letter-spacing: 0.06em;
		}
		.site-nav a:hover,
		.site-nav a:focus-visible {
			border-color: var(--color-accent);
			background: var(--color-paper-3);
		}
		.site-nav a::after {
			display: none;
		}
	}
	@keyframes menu-in {
		from {
			opacity: 0;
			transform: translateY(-0.5rem);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@media (max-width: 30rem) {
		.masthead-meta span:last-child {
			font-size: 0.65rem;
		}
		.wordmark {
			font-size: clamp(2rem, 10vw, 3.2rem);
		}
		.theme-button {
			padding: var(--space-xs);
		}
	}
	@media (max-width: 22rem) {
		.site-nav {
			grid-template-columns: 1fr;
		}
	}
</style>
