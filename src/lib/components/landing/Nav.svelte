<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { themeStore } from '$lib/stores/theme';

	let scrolled = $state(false);
	let menuOpen = $state(false);
	let theme = $state<'dark' | 'light'>('dark');

	let supportsScrollTimeline = $state(false);
	let scrollProgress = $state(0);
	let scrollY = $state(0);

	onMount(() => {
		const unsubTheme = themeStore.subscribe((t) => {
			theme = t;
		});

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

		const handler = () => {
			scrolled = window.scrollY > 40;
			scrollY = window.scrollY;
			if (!supportsScrollTimeline) {
				const scrollable = document.documentElement.scrollHeight - window.innerHeight;
				scrollProgress = scrollable > 0 ? window.scrollY / scrollable : 0;
			}
		};

		window.addEventListener('scroll', handler, { passive: true });
		handler();

		return () => {
			window.removeEventListener('scroll', handler);
			unsubTheme();
		};
	});

	function scrollTo(id: string) {
		menuOpen = false;
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<nav
	class="nav"
	class:nav-light={theme === 'light'}
	class:nav-static-scrolled={!supportsScrollTimeline && scrolled}
	style={!supportsScrollTimeline
		? `
		height: ${72 - Math.min(scrollY / 80, 1) * 14}px;
		background: ${theme === 'dark' ? `rgba(10, 10, 10, ${Math.min(scrollY / 80, 1) * 0.88})` : `rgba(255, 255, 255, ${Math.min(scrollY / 80, 1) * 0.88})`};
		backdrop-filter: blur(${Math.min(scrollY / 80, 1) * 20}px);
		-webkit-backdrop-filter: blur(${Math.min(scrollY / 80, 1) * 20}px);
		border-bottom-color: ${Math.min(scrollY / 80, 1) > 0.05 ? 'var(--land-border)' : 'transparent'};
	`
		: ''}
	aria-label="Main navigation"
>
	<div class="nav-inner">
		<a
			href="/"
			class="logo"
			onclick={(e) => {
				e.preventDefault();
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}}
			aria-label="Back to top"
		>
			<img class="logo-mark" src="/favicon.png" alt="Logo" />
		</a>

		<ul class="nav-links" role="list">
			<li>
				<a
					href="#about"
					class="nav-link"
					onclick={(e) => {
						e.preventDefault();
						scrollTo('about');
					}}>About</a
				>
			</li>
			<li>
				<a
					href="#experience"
					class="nav-link"
					onclick={(e) => {
						e.preventDefault();
						scrollTo('experience');
					}}>Experience</a
				>
			</li>
			<li>
				<a
					href="#projects"
					class="nav-link"
					onclick={(e) => {
						e.preventDefault();
						scrollTo('projects');
					}}>Work</a
				>
			</li>
			<li>
				<a
					href="#contact"
					class="nav-link"
					onclick={(e) => {
						e.preventDefault();
						scrollTo('contact');
					}}>Contact</a
				>
			</li>
		</ul>

		<div class="nav-actions">
			<button
				class="theme-toggle"
				onclick={() => themeStore.toggle()}
				aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
			>
				{#if theme === 'dark'}
					<!-- Sun icon -->
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<circle cx="12" cy="12" r="5" />
						<line x1="12" y1="1" x2="12" y2="3" />
						<line x1="12" y1="21" x2="12" y2="23" />
						<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
						<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
						<line x1="1" y1="12" x2="3" y2="12" />
						<line x1="21" y1="12" x2="23" y2="12" />
						<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
						<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
					</svg>
				{:else}
					<!-- Moon icon -->
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
					</svg>
				{/if}
			</button>

			<a href="/assets/CV-Sajudin-ma'ruf.pdf" download class="hire-btn">Download CV</a>
		</div>

		<button
			class="burger"
			aria-label={menuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span class="burger-line" class:open={menuOpen}></span>
			<span class="burger-line" class:open={menuOpen}></span>
		</button>
	</div>

	{#if menuOpen}
		<div class="mobile-menu" role="menu" transition:slide={{ duration: 280, easing: cubicOut }}>
			<a
				href="#about"
				class="mobile-link"
				role="menuitem"
				onclick={(e) => {
					e.preventDefault();
					scrollTo('about');
				}}>About</a
			>
			<a
				href="#experience"
				class="mobile-link"
				role="menuitem"
				onclick={(e) => {
					e.preventDefault();
					scrollTo('experience');
				}}>Experience</a
			>
			<a
				href="#projects"
				class="mobile-link"
				role="menuitem"
				onclick={(e) => {
					e.preventDefault();
					scrollTo('projects');
				}}>Work</a
			>
			<a
				href="#contact"
				class="mobile-link"
				role="menuitem"
				onclick={(e) => {
					e.preventDefault();
					scrollTo('contact');
				}}>Contact</a
			>
			<div class="mobile-bottom">
				<a href="/assets/CV-Sajudin-ma'ruf.pdf" download class="mobile-link mobile-cv"
					>Download CV</a
				>
				<button class="mobile-theme" onclick={() => themeStore.toggle()} aria-label="Toggle theme">
					{#if theme === 'dark'}
						<svg
							width="15"
							height="15"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							aria-hidden="true"
							><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line
								x1="12"
								y1="21"
								x2="12"
								y2="23"
							/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line
								x1="18.36"
								y1="18.36"
								x2="19.78"
								y2="19.78"
							/><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line
								x1="4.22"
								y1="19.78"
								x2="5.64"
								y2="18.36"
							/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg
						>
						Light mode
					{:else}
						<svg
							width="15"
							height="15"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg
						>
						Dark mode
					{/if}
				</button>
			</div>
		</div>
	{/if}
	<div
		class="scroll-progress"
		aria-hidden="true"
		style={!supportsScrollTimeline ? `transform: scaleX(${scrollProgress});` : ''}
	></div>
</nav>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		height: 72px;
		border-bottom: 1px solid transparent;
		background: transparent;
		display: flex;
		align-items: center;
		--nav-bg-scrolled: rgba(10, 10, 10, 0.88);
	}

	.nav-light {
		--nav-bg-scrolled: rgba(255, 255, 255, 0.88);
	}

	/* JS Fallback Scrolled border helper */
	.nav-static-scrolled {
		border-bottom-color: var(--land-border);
	}

	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: scroll()) {
			@keyframes shrink-nav {
				from {
					height: 72px;
					background: transparent;
					backdrop-filter: blur(0px);
					-webkit-backdrop-filter: blur(0px);
					border-bottom-color: transparent;
				}
				to {
					height: 58px;
					background: var(--nav-bg-scrolled);
					backdrop-filter: blur(20px);
					-webkit-backdrop-filter: blur(20px);
					border-bottom-color: var(--land-border);
				}
			}

			.nav {
				animation: shrink-nav auto linear both;
				animation-timeline: scroll();
				animation-range: 0px 80px;
			}
		}
	}

	.scroll-progress {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(to right, var(--blue), #a78bfa);
		transform-origin: 0 50%;
		transform: scaleX(0);
		z-index: 110;
		pointer-events: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: scroll()) {
			@keyframes grow-progress {
				from {
					transform: scaleX(0);
				}
				to {
					transform: scaleX(1);
				}
			}

			.scroll-progress {
				animation: grow-progress auto linear;
				animation-timeline: scroll();
			}
		}
	}

	.nav-inner {
		max-width: 1200px;
		margin: 0 auto;
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 32px;
		gap: 40px;
	}

	/* Logo */
	.logo {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		flex-shrink: 0;
	}

	.logo-mark {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: var(--blue);
		color: #fff;
		font-family: 'Geist', sans-serif;
		font-size: 13px;
		font-weight: 700;
		letter-spacing: -0.02em;
		border-radius: 8px;
		user-select: none;
	}

	.logo:hover .logo-mark {
		background: var(--blue-dim);
	}

	/* Nav links */
	.nav-links {
		display: flex;
		align-items: center;
		gap: 4px;
		list-style: none;
		margin: 0;
		padding: 0;
		flex: 1;
	}

	.nav-link {
		background: none;
		border: none;
		cursor: pointer;
		font-family: 'Geist', sans-serif;
		font-size: 14px;
		font-weight: 500;
		color: var(--land-fg-2);
		padding: 6px 12px;
		border-radius: 6px;
		letter-spacing: -0.01em;
		text-decoration: none;
	}

	.nav-link:hover {
		color: var(--land-fg);
		background: rgba(128, 128, 128, 0.1);
	}

	/* Right actions */
	.nav-actions {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}

	/* Theme toggle */
	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: none;
		border: 1px solid var(--land-border);
		border-radius: 8px;
		cursor: pointer;
		color: var(--land-fg-2);
	}

	.theme-toggle:hover {
		border-color: var(--land-border-hover);
		color: var(--land-fg);
		background: rgba(128, 128, 128, 0.08);
	}

	.theme-toggle:active {
		transform: scale(0.94);
	}

	/* Hire button */
	.hire-btn {
		display: inline-flex;
		align-items: center;
		padding: 8px 18px;
		background: var(--blue);
		color: #fff;
		font-family: 'Geist', sans-serif;
		font-size: 13px;
		font-weight: 600;
		text-decoration: none;
		border-radius: 8px;
		letter-spacing: -0.01em;
		white-space: nowrap;
	}

	.hire-btn:hover {
		background: var(--blue-dim);
	}
	.hire-btn:active {
		transform: scale(0.97);
	}

	/* Burger */
	.burger {
		display: none;
		flex-direction: column;
		gap: 5px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 6px;
		margin-left: auto;
	}

	.burger-line {
		display: block;
		width: 22px;
		height: 2px;
		background: var(--land-fg);
		border-radius: 2px;
		transform-origin: center;
	}

	.burger-line:first-child.open {
		transform: translateY(3.5px) rotate(45deg);
	}

	.burger-line:last-child.open {
		transform: translateY(-3.5px) rotate(-45deg);
	}

	/* Mobile menu */
	.mobile-menu {
		display: none;
	}

	@media (max-width: 768px) {
		.nav-links,
		.hire-btn {
			display: none;
		}

		.theme-toggle {
			display: none;
		}

		.burger {
			display: flex;
		}

		.nav-inner {
			padding: 0 20px;
		}

		.mobile-menu {
			display: flex;
			flex-direction: column;
			background: var(--land-bg);
			border-top: 1px solid var(--land-border);
			padding: 8px 20px 20px;
			gap: 0;
		}

		.mobile-link {
			background: none;
			border: none;
			cursor: pointer;
			font-family: 'Geist', sans-serif;
			font-size: 15px;
			font-weight: 500;
			color: var(--land-fg-2);
			padding: 13px 8px;
			text-align: left;
			text-decoration: none;
			border-bottom: 1px solid var(--land-border);
		}

		.mobile-link:last-child {
			border-bottom: none;
		}
		.mobile-link:hover {
			color: var(--land-fg);
		}
		.mobile-cv {
			color: var(--blue);
		}

		.mobile-bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-top: 4px;
		}

		.mobile-theme {
			display: inline-flex;
			align-items: center;
			gap: 7px;
			background: none;
			border: 1px solid var(--land-border);
			border-radius: 8px;
			padding: 8px 12px;
			cursor: pointer;
			font-family: 'Geist', sans-serif;
			font-size: 13px;
			font-weight: 500;
			color: var(--land-fg-2);
		}

		.mobile-theme:hover {
			color: var(--land-fg);
		}
	}
</style>
