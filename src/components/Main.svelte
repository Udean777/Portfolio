<script lang="ts">
	let flipped = false;

	function toggleFlip(state: boolean) {
		flipped = state;
	}

	const techStack = [
		{
			name: 'React JS & Native',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'
		},
		{
			name: 'Svelte',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg'
		},
		{
			name: 'Flutter',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg'
		},
		{
			name: 'Jetpack Compose',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jetpackcompose/jetpackcompose-original.svg'
		},
		{
			name: 'Fast API',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original-wordmark.svg'
		},
		{
			name: 'Express JS',
			icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg'
		}
	];

	const projects = [
		{
			name: 'The Habits',
			description: 'A habit tracker app that helps you build good habits and break bad ones.',
			icon: '/images/the-habits.png',
			href: 'https://play.google.com/store/apps/details?id=com.ssajudin.the_habits&hl=id'
		},
		{
			name: 'Uang Bijak',
			description: 'A Expense tracker app that helps you manage your money.',
			icon: '/images/UangBijak.png',
			href: 'https://play.google.com/store/apps/details?id=com.ssajudn.expensetracker'
		},
		{
			name: 'Kaosnyaman',
			description: 'A POS system for selling t-shirts and other products.',
			icon: '/images/kaosnyaman.png',
			href: 'https://play.google.com/store/apps/details?id=com.udeans.kaosnyaman'
		},
		{
			name: 'JDMStore',
			description: 'A POS system for selling t-shirts and other products.',
			icon: '/images/jdm.png',
			href: 'https://play.google.com/store/apps/details?id=com.kitakale.JDMStore'
		}
	];
</script>

<main
	class="flex min-h-screen flex-col items-center justify-between px-4 sm:px-6 md:mx-96 lg:px-12"
>
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

	<section class="container mx-auto px-4 py-12" id="about">
		<div class="mx-auto mb-6 flex w-fit items-center justify-center border-b-4 pb-2">
			<h1 class="text-center text-2xl font-bold sm:text-3xl">About Me</h1>
		</div>

		<div
			class="mx-auto rounded-md border-4 border-zinc-700 bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10"
		>
			<p class="text-center text-sm text-zinc-900 sm:text-base md:text-lg">
				A student of Information Technology at Pembangunan Panca Budi University, I have a passion
				and knowledge in the field of information technology. I enjoy learning new things and
				sharing knowledge to others. I am also a Frontend Developer and Mobile Developer, but I am
				open to exploring new roles in the future. I am usually using React JS or Next JS for
				Frontend web, React Native and Flutter for Mobile Development.
			</p>
		</div>
	</section>

	<section class="container mx-auto px-4 py-12" id="stack">
		<div class="mx-auto mb-6 flex w-fit items-center justify-center border-b-4 pb-2">
			<h1 class="text-center text-2xl font-bold sm:text-3xl">Tech Stack</h1>
		</div>

		<div
			class="mx-auto rounded-md border-4 border-zinc-700 bg-white px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10"
		>
			<div
				class="mx-auto grid grid-cols-3 justify-items-center gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-3"
			>
				{#each techStack as tech}
					<div
						class="hover-shadow flex h-16 w-16 cursor-pointer items-center justify-center rounded-lg border-4 p-2 sm:h-20 sm:w-20 sm:p-3 md:h-24 md:w-24"
					>
						<img src={tech.icon} alt={tech.name} class="h-full w-full object-contain" />
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="container mx-auto px-4 py-12" id="projects">
		<div class="mx-auto mb-6 flex w-fit items-center justify-center border-b-4 pb-2">
			<h1 class="text-center text-2xl font-bold sm:text-3xl">Projects</h1>
		</div>

		<div class="mx-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
			<div class="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
				{#each projects as project}
					<div
						class="group hover-shadow relative flex transform cursor-pointer flex-col items-center justify-center rounded-lg border-4 bg-white p-4"
					>
						<img
							src={project.icon}
							alt={project.name}
							class="mb-4 h-32 w-32 transform rounded-full object-contain transition-all duration-500 ease-out group-hover:scale-110"
						/>
						<h2 class="mb-2 text-center text-lg font-bold">{project.name}</h2>
						<p class="text-center text-sm text-zinc-700">{project.description}</p>
						<a
							href={project.href}
							target="_blank"
							rel="noopener noreferrer"
							class="my-4 flex max-h-0 items-center justify-center overflow-hidden rounded-full bg-yellow-200 px-4 py-2 text-sm font-semibold text-black opacity-0 transition-all duration-500 ease-out group-hover:max-h-12 group-hover:scale-100 group-hover:opacity-100 hover:bg-yellow-300"
						>
							Go to Project &rarr;
						</a>
					</div>
				{/each}
			</div>
		</div>
	</section>
</main>

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

	.hover-shadow:hover {
		box-shadow: 3px 3px 0 black;
		transition: box-shadow 0.2s ease-in-out;
	}

	.wave {
		display: inline-block;
		transform-origin: 70% 70%;
		animation: wave-animation 1s infinite;
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
