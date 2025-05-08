<script lang="ts">
	let flipped = false;

	function toggleFlip(state: boolean) {
		flipped = state;
	}
</script>

<section
	class="container mx-auto flex flex-col-reverse items-center justify-between gap-10 px-4 py-12 md:flex-row"
>
	<div class="text-center text-zinc-900 md:text-left">
		<h1 class="mb-6 text-2xl leading-tight font-bold sm:text-3xl md:text-4xl lg:text-5xl">
			Hello <span class="wave inline-block">👋🏻</span> I'm
			<span class="hover-highlight relative inline-block">Sajudin Ma'ruf</span>
		</h1>
		<a
			href="/assets/CV-Sajudin-ma'ruf.pdf"
			download="CV-Sajudin-ma'ruf.pdf"
			class="hover-shadow inline-flex items-center rounded-full border-4 border-black bg-yellow-200 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300 sm:px-6 sm:py-3 sm:text-lg"
		>
			My Resume &darr;
		</a>
	</div>

	<div class="relative flex w-full justify-center md:w-1/2">
		<div
			class="relative h-32 w-32 [perspective:1000px] sm:h-40 sm:w-40 md:h-56 md:w-56 lg:h-72 lg:w-72"
			role="button"
			tabindex="0"
			aria-label="Toggle flip"
			on:mouseover={() => toggleFlip(true)}
			on:mouseout={() => toggleFlip(false)}
			on:focus={() => toggleFlip(true)}
			on:blur={() => toggleFlip(false)}
		>
			<div
				class="relative h-full w-full rounded-full border-4 transition-transform duration-500 [transform-style:preserve-3d]"
				class:rotate-y-180={flipped}
			>
				<img
					src="/images/profile-img.png"
					alt="profile"
					class="absolute h-full w-full rounded-full object-cover backface-hidden"
				/>
				<img
					src="/favicon.png"
					alt="favicon"
					class="absolute h-full w-full rotate-y-180 rounded-full object-cover backface-hidden"
				/>
			</div>
		</div>

		<img
			src="/icons/splash-2.png"
			alt="Idea"
			class="absolute -top-4 left-8 h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-12 lg:w-12"
		/>
		<img
			src="/icons/splash-1.png"
			alt="Arrow"
			class="absolute right-8 bottom-0 w-6 rotate-[20deg] sm:w-8 md:w-10 lg:w-16"
		/>
	</div>
</section>

<style>
	.hover-highlight {
		background-image: linear-gradient(transparent 50%, yellow 50%);
		background-size: 100% 200%;
		background-position: 0 0;
		background-repeat: no-repeat;
		transition: background-position 0.2s ease-in-out;
	}

	.hover-highlight:hover {
		background-position: 0 50%;
	}

	.wave {
		display: inline-block;
		transform-origin: 70% 70%;
		animation: wave-animation 1s infinite;
	}

	.hover-shadow:hover {
		box-shadow: 3px 3px 0 black;
		transition: box-shadow 0.2s ease-in-out;
	}

	@keyframes wave-animation {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(10deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
</style>
