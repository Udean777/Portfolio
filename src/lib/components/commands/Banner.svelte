<script lang="ts">
	import { onMount } from 'svelte';

	let { oncommand = () => {} }: { oncommand?: (cmd: string) => void } = $props();

	const quickMenus = ['about', 'skills', 'services', 'projects'];
	let showHelp = $state(false);

	const allCommands = [
		{ name: 'banner', description: 'Display welcome banner' },
		{ name: 'home', description: 'Go to home section' },
		{ name: 'experience', description: 'My work experience' },
		{ name: 'contact', description: 'Get in touch' },
		{ name: 'socials', description: 'My social media links' },
		{ name: 'resume', description: 'Download my resume' },
		{ name: 'themes', description: 'Switch terminal theme' },
		{ name: 'clear', description: 'Clear the terminal' }
	];

	// Typing effect variables
	let displayText = $state('');
	const words = ['HELLO', 'MY NAME IS', 'SAJUDIN'];
	let wordIndex = 0;
	let charIndex = 0;
	let isDeleting = false;
	let typingSpeed = 100;

	onMount(() => {
		let timeoutId: any;
		function type() {
			const currentWord = words[wordIndex];
			if (isDeleting) {
				displayText = currentWord.substring(0, charIndex - 1);
				charIndex--;
				typingSpeed = 50; // deleting is faster
			} else {
				displayText = currentWord.substring(0, charIndex + 1);
				charIndex++;
				typingSpeed = 100; // regular typing speed
			}

			if (!isDeleting && charIndex === currentWord.length) {
				if (wordIndex === words.length - 1) {
					// Stop at the final word (SAJUDIN)
					return;
				}
				typingSpeed = 1200; // Pause at the end of a word
				isDeleting = true;
			} else if (isDeleting && charIndex === 0) {
				isDeleting = false;
				wordIndex = (wordIndex + 1) % words.length;
				typingSpeed = 400; // Pause before starting next word
			}

			timeoutId = setTimeout(type, typingSpeed);
		}

		type();

		return () => {
			clearTimeout(timeoutId);
		};
	});
</script>

<div class="border-muted mb-4 flex flex-col items-center border-b px-4 py-8 text-center">
	<!-- Responsive retro terminal styled header -->
	<h1
		class="font-terminal-retro text-accent flex h-20 items-center justify-center text-5xl font-bold tracking-wider uppercase select-none sm:text-6xl md:h-24 md:text-8xl"
	>
		{displayText}<span class="text-accent blink-cursor ml-1 text-4xl sm:text-5xl md:text-7xl"
			>▌</span
		>
	</h1>

	<!-- Content is rendered immediately without waiting for typing to complete -->
	<div class="mt-6 flex flex-col items-center justify-center gap-8 md:flex-row md:text-left">
		<div class="flex flex-col items-center">
			<p class="text-output text-base font-bold">Frontend & Mobile Developer</p>
			<p class="text-accent mt-1 text-sm">SvelteKit · React Native · Flutter · Sveltekit</p>

			<p class="text-output mt-4 max-w-xl text-center text-sm leading-relaxed">
				Hi, I'm <span class="text-accent font-bold">Sajudin Ma'ruf</span> — an Information
				Technology student at <span class="text-command">Pembangunan Panca Budi University</span>. I
				build modern web and mobile apps, and I'm always open to learning new things and
				collaborating on interesting projects.
			</p>

			<div class="text-muted mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs">
				<span>📧 <span class="text-output">sajudinmaruf@gmail.com</span></span>
				<span>🌐 <span class="text-output">sajudin.my.id</span></span>
			</div>

			<p class="text-muted mt-4 text-sm">
				Type <button
					onclick={() => oncommand('help')}
					class="text-command cursor-pointer hover:underline">help</button
				> to see all available commands.
			</p>

			<div class="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
				{#each quickMenus as cmd}
					<button
						onclick={() => oncommand(cmd)}
						class="text-command border-command hover:bg-command hover:text-background cursor-pointer border px-4 py-1.5 text-sm transition-colors"
					>
						{cmd}
					</button>
				{/each}
				<button
					onclick={() => (showHelp = !showHelp)}
					class="text-muted border-muted hover:text-output hover:border-output cursor-pointer border px-4 py-1.5 text-sm transition-colors"
				>
					{showHelp ? 'hide' : 'more...'}
				</button>
				<button
					onclick={() => oncommand('clear')}
					class="text-error border-error hover:bg-error hover:text-background cursor-pointer border px-4 py-1.5 text-sm transition-colors"
				>
					clear
				</button>
			</div>

			{#if showHelp}
				<div class="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
					{#each allCommands as cmd}
						<button
							onclick={() => oncommand(cmd.name)}
							class="text-muted border-muted hover:text-output hover:border-output cursor-pointer border px-3 py-1 text-xs transition-colors"
						>
							{cmd.name}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
