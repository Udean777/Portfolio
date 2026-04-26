<script lang="ts">
	let { oncommand = () => {} }: { oncommand?: (cmd: string) => void } = $props();

	const quickMenus = ['about', 'skills', 'services', 'projects'];
	let showHelp = $state(false);

	const allCommands = [
		{ name: 'banner', description: 'Display welcome banner' },
		{ name: 'whoami', description: 'Short description about me' },
		{ name: 'home', description: 'Go to home section' },
		{ name: 'experience', description: 'My work experience' },
		{ name: 'contact', description: 'Get in touch' },
		{ name: 'socials', description: 'My social media links' },
		{ name: 'resume', description: 'Download my resume' },
		{ name: 'themes', description: 'Switch terminal theme' },
		{ name: 'clear', description: 'Clear the terminal' }
	];

	const asciiArt = `:::::::::::::::::::::::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::::::::::::::::::::::::::::
:::::::::::::::::::::::::;:;;::::::::::::::::::::::::::
:::::::::::::::::::::::+%##@@@@@#S%?;::::::::::::::::::
:::::,:::::::::::::::::*#######@@@@@@%:::::::::::::::::
:::::::::::::::::::::::+*?????%##@@@@@%::::::::::::::::
::::::::::::::::::::::;***???***S#####%::::::::::::::::
:::::::::;;;;;::::::::;*?****?**?%?%%#+::::::::::::::::
:::::;;;;;;;;;;;;;;:;:;*???*****????%*:::::::::::::::::
::::;;;;++++++++++;;;:;??%??*****?%?+:::::::::::::::;::
::::;;;;+++++++++++;;;:+???????%%%%?+:;;;;::::::::::;;:
::;;;;+++++++++++++;;;+*%##SSS%%?%%%@@@@@@##S?+:::::;;;
:;;;;;++++++++++++*?S#@@@@@#%SS%%%%S@@@@@@@@@@@S*:::;;;
:;;;;++++++++*+++%#@@@@@@@@@@######@@@@@@@@@@@@@@S*::::
;;;;;+++******++%#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@?;++
;;;;+**+********#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@?+++
;;+++********??S#@@@@@@@@@@@@@@@@@@##@@@@@@@@@@@@@@*+++
;+++********%SS#@@@@@@@@@@@@@@#S%S#%S#S@@@@@@@@@@@#++++
+++******???%##SSSS@@@@@@@@@@@S%??%S%S#@@@@@S%#@@@S;;;;
++****?*????%@?**???#@@@@@@@@#@#SSS##@@@@@@@?+*?S%*;;;;
******???????%***???#@@@@@@@@@@@@@@@@@####@@S%%%%%*;;;;
*****?????????******??%S##@@@@@###SSS%??%%%%??????+::;;
**?????????????********????%????%%?*++***????%%SSS+:::;
++++;;;;;:::::;;;++**??????????%%%%??*;;;+++*****?;::;;`;
</script>

<div class="border-muted mb-4 flex flex-col items-center border-b py-8 text-center">
	<pre class="text-accent text-[0.6rem] leading-none select-none sm:text-xs md:text-sm">
  ███████╗ █████╗      ██╗██╗   ██╗██████╗ ██╗███╗   ██╗
  ██╔════╝██╔══██╗     ██║██║   ██║██╔══██╗██║████╗  ██║
  ███████╗███████║     ██║██║   ██║██║  ██║██║██╔██╗ ██║
  ╚════██║██╔══██║██   ██║██║   ██║██║  ██║██║██║╚██╗██║
  ███████║██║  ██║╚█████╔╝╚██████╔╝██████╔╝██║██║ ╚████║
  ╚══════╝╚═╝  ╚═╝ ╚════╝  ╚═════╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝</pre>

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
