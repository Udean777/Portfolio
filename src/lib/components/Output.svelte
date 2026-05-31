<script lang="ts">
	import type { HistoryEntry } from '$lib/stores/history';
	import TermInfo from './TermInfo.svelte';
	import Banner from './commands/Banner.svelte';
	import Help from './commands/Help.svelte';
	import Home from './commands/Home.svelte';
	import About from './commands/About.svelte';
	import Projects from './commands/Projects.svelte';
	import Contact from './commands/Contact.svelte';
	import Themes from './commands/Themes.svelte';
	import Neofetch from './commands/Neofetch.svelte';
	import Matrix from './commands/Matrix.svelte';
	import Github from './commands/Github.svelte';
	import SoundCmd from './commands/SoundCmd.svelte';
	import Joke from './commands/Joke.svelte';
	import Sudo from './commands/Sudo.svelte';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	type Props = { entry: HistoryEntry };
	let { entry }: Props = $props();

	let displayed = writable('');
	let done = $state(false);

	onMount(() => {
		if (entry.output) {
			let i = 0;
			const text = entry.output;
			const interval = setInterval(() => {
				i++;
				displayed.set(text.slice(0, i));
				if (i >= text.length) {
					clearInterval(interval);
					done = true;
				}
			}, 16);
			return () => clearInterval(interval);
		} else {
			done = true;
		}
	});
</script>

<div class="entry-fadein mb-4">
	<div class="flex items-center gap-1">
		<TermInfo />
		<span class="text-command">{entry.command}</span>
	</div>
	{#if entry.output}
		<p class="text-error mt-1">{$displayed}</p>
	{:else if entry.component}
		<div class="component-fadein mt-2 pl-2">
			{#if entry.component === 'banner'}<Banner />
			{:else if entry.component === 'help'}<Help />
			{:else if entry.component === 'home'}<Home />
			{:else if entry.component === 'about' || entry.component === 'experience' || entry.component === 'skills' || entry.component === 'services'}<About />
			{:else if entry.component === 'projects'}<Projects />
			{:else if entry.component === 'contact'}<Contact />
			{:else if entry.component === 'themes'}<Themes />
			{:else if entry.component === 'neofetch'}<Neofetch />
			{:else if entry.component === 'matrix'}<Matrix />
			{:else if entry.component === 'github'}<Github {entry} />
			{:else if entry.component === 'sound'}<SoundCmd {entry} />
			{:else if entry.component === 'joke'}<Joke />
			{:else if entry.component === 'sudo'}<Sudo />
			{/if}
		</div>
	{/if}
</div>
