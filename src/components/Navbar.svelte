<script lang="ts">
	let isOpen = false;
	function toggleMenu() {
		isOpen = !isOpen;
	}
</script>

<nav
	class="mx-10 my-5 max-w-7xl rounded-md border-4 border-zinc-700 bg-white px-4 py-4 sm:mx-10 md:mx-72"
>
	<div class="flex items-center justify-between">
		<a href="/" class="hover-yellow-half text-3xl font-bold text-zinc-700 transition duration-200">
			ssajudn<span class="text-5xl text-blue-500">.</span>
		</a>

		<div class="hidden space-x-4 lg:flex">
			<a
				href="#about"
				class="hover-shadow rounded-md border-2 border-zinc-700 px-4 py-2 text-zinc-700 transition duration-200"
				>About</a
			>
			<a
				href="#projects"
				class="hover-shadow rounded-md border-2 border-zinc-700 px-4 py-2 text-zinc-700 transition duration-200"
				>Projects</a
			>
			<a
				href="#stack"
				class="hover-shadow rounded-md border-2 border-zinc-700 px-4 py-2 text-zinc-700 transition duration-200"
				>Skills</a
			>
			<a
				href="/contact"
				class="hover-shadow rounded-md border-2 border-zinc-700 px-4 py-2 text-zinc-700 transition duration-200"
				>Contact</a
			>
		</div>

		<button on:click={toggleMenu} aria-label="Toggle navigation menu" class="block sm:hidden">
			<div class="hamburger-icon block sm:hidden" class:active={isOpen}>
				<span class="line line-1"></span>
				<span class="line line-2"></span>
				<span class="line line-3"></span>
			</div>
		</button>
	</div>

	<div
		id="mobileMenu"
		class="mt-4 transform space-y-2 transition-all duration-300 ease-in-out sm:hidden"
		class:mobile-menu-visible={isOpen}
		class:mobile-menu-hidden={!isOpen}
	>
		<a
			href="#about"
			class="hover-shadow block rounded-md border-4 border-zinc-700 px-4 py-2 text-zinc-700 transition duration-200"
			>About</a
		>
		<a
			href="#projects"
			class="hover-shadow block rounded-md border-4 border-zinc-700 px-4 py-2 text-zinc-700 transition duration-200"
			>Projects</a
		>
		<a
			href="#stack"
			class="hover-shadow block rounded-md border-4 border-zinc-700 px-4 py-2 text-zinc-700 transition duration-200"
			>Skills</a
		>
		<a
			href="/contact"
			class="hover-shadow block rounded-md border-4 border-zinc-700 px-4 py-2 text-zinc-700 transition duration-200"
			>Contact</a
		>
	</div>
</nav>

<style>
	.hover-yellow-half {
		background-image: linear-gradient(transparent 50%, yellow 50%);
		background-size: 100% 200%;
		background-position: 0 0;
		background-repeat: no-repeat;
		transition: background-position 0.2s ease-in-out;
	}

	.hover-yellow-half:hover {
		background-position: 0 30%;
	}

	.hover-shadow:hover {
		box-shadow: 3px 3px 0 black;
		transition: box-shadow 0.2s ease-in-out;
	}

	.hamburger-icon {
		width: 24px;
		height: 24px;
		position: relative;
	}

	.line {
		display: block;
		height: 2px;
		width: 24px;
		background-color: #3f3f46; /* zinc-700 */
		position: absolute;
		left: 0;
		border-radius: 1px;
		transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	}

	.line-1 {
		top: 6px;
		transform-origin: center;
	}

	.line-2 {
		top: 12px;
		transform-origin: center;
	}

	.line-3 {
		top: 18px;
		transform-origin: center;
	}

	/* Active state (close icon) */
	.hamburger-icon.active .line-1 {
		transform: translateY(6px) rotate(45deg);
	}

	.hamburger-icon.active .line-2 {
		opacity: 0;
	}

	.hamburger-icon.active .line-3 {
		transform: translateY(-6px) rotate(-45deg);
	}

	/* Mobile menu animations */
	.mobile-menu-visible {
		display: block;
		animation: expandMenu 0.3s ease-in-out forwards;
	}

	.mobile-menu-hidden {
		display: none;
		animation: collapseMenu 0.3s ease-in-out forwards;
	}

	@keyframes expandMenu {
		0% {
			opacity: 0;
			transform: scaleY(0);
			transform-origin: top;
		}
		100% {
			opacity: 1;
			transform: scaleY(1);
			transform-origin: top;
		}
	}

	@keyframes collapseMenu {
		0% {
			opacity: 1;
			transform: scaleY(1);
			transform-origin: top;
		}
		100% {
			opacity: 0;
			transform: scaleY(0);
			transform-origin: top;
		}
	}
</style>
