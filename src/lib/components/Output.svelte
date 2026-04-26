<script lang="ts">
	import type { HistoryEntry } from '$lib/stores/history';
	import TermInfo from './TermInfo.svelte';
	import Banner from './commands/Banner.svelte';
	import Help from './commands/Help.svelte';
	import Home from './commands/Home.svelte';
	import About from './commands/About.svelte';
	import Experience from './commands/Experience.svelte';
	import Skills from './commands/Skills.svelte';
	import Services from './commands/Services.svelte';
	import Projects from './commands/Projects.svelte';
	import Contact from './commands/Contact.svelte';
	import Socials from './commands/Socials.svelte';
	import Themes from './commands/Themes.svelte';
	import Resume from './commands/Resume.svelte';
	import Whoami from './commands/Whoami.svelte';
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
			{:else if entry.component === 'about'}<About />
			{:else if entry.component === 'experience'}<Experience />
			{:else if entry.component === 'skills'}<Skills />
			{:else if entry.component === 'services'}<Services />
			{:else if entry.component === 'projects'}<Projects />
			{:else if entry.component === 'contact'}<Contact />
			{:else if entry.component === 'socials'}<Socials />
			{:else if entry.component === 'themes'}<Themes />
			{:else if entry.component === 'resume'}<Resume />
			{:else if entry.component === 'whoami'}<Whoami />
			{/if}
		</div>
	{/if}
</div>
