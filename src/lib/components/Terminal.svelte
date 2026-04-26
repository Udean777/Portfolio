<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { history, addToHistory, clearHistory, type HistoryEntry } from '$lib/stores/history';
	import { commandNames } from '$lib/utils/commands';
	import { themeStore } from '$lib/stores/theme';
	import TermInfo from './TermInfo.svelte';
	import Output from './Output.svelte';
	import Banner from './commands/Banner.svelte';

	let input = $state('');
	let inputEl: HTMLInputElement = $state()!;
	let containerEl: HTMLDivElement;
	let commandHistory: string[] = $state([]);
	let historyIndex = $state(-1);

	let booting = $state(true);
	let bootLines: string[] = $state([]);
	let bannerVisible = $state(false);

	const validCommands = new Set(commandNames);

	const bootSequence = [
		'Initializing system...',
		'Loading portfolio data...',
		'Mounting terminal interface...',
		'Done. ✓'
	];

	async function runBoot() {
		for (const line of bootSequence) {
			await new Promise((r) => setTimeout(r, 350));
			bootLines = [...bootLines, line];
		}
		await new Promise((r) => setTimeout(r, 400));
		booting = false;
		await tick();
		bannerVisible = true;
		inputEl?.focus();
	}

	function handleCommand(raw: string) {
		const trimmed = raw.trim().toLowerCase();
		if (!trimmed) return;

		commandHistory = [trimmed, ...commandHistory];
		historyIndex = -1;

		if (trimmed === 'clear') {
			clearHistory();
			return;
		}

		const [cmd, ...args] = trimmed.split(' ');

		let entry: HistoryEntry;

		if (cmd === 'themes' && args[0]) {
			themeStore.setTheme(args[0] as any);
			entry = { command: trimmed, output: `Theme switched to ${args[0]}`, component: null };
		} else if (validCommands.has(cmd)) {
			entry = { command: trimmed, output: null, component: cmd };
		} else {
			entry = {
				command: trimmed,
				output: `command not found: ${cmd}. Type 'help' to see available commands.`,
				component: null
			};
		}

		addToHistory(entry);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			handleCommand(input);
			input = '';
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (historyIndex < commandHistory.length - 1) {
				historyIndex++;
				input = commandHistory[historyIndex];
			}
		}

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (historyIndex > 0) {
				historyIndex--;
				input = commandHistory[historyIndex];
			} else {
				historyIndex = -1;
				input = '';
			}
		}

		if (e.key === 'Tab') {
			e.preventDefault();
			const match = commandNames.find((c) => c.startsWith(input.toLowerCase()));
			if (match) input = match;
		}
	}

	function focusInput() {
		inputEl?.focus();
	}

	$effect(() => {
		$history;
		tick().then(() => {
			containerEl?.scrollTo({ top: containerEl.scrollHeight, behavior: 'smooth' });
		});
	});

	onMount(() => {
		themeStore.init();
		runBoot();
	});
</script>

<div
	class="terminal-bg crt min-h-screen cursor-text p-4 font-mono text-sm"
	onclick={focusInput}
	bind:this={containerEl}
	role="presentation"
>
	{#if booting}
		<div class="space-y-1 py-8">
			{#each bootLines as line, i}
				<p
					class="boot-line text-muted"
					class:text-accent={line.startsWith('Done')}
					style="animation-delay: {i * 50}ms"
				>
					{line}
				</p>
			{/each}
			<span class="text-accent blink-cursor">█</span>
		</div>
	{:else}
		<div class="banner-fadein" class:visible={bannerVisible}>
			<Banner oncommand={handleCommand} />
		</div>

		{#each $history as entry}
			<Output {entry} />
		{/each}

		<div class="flex items-center gap-1">
			<TermInfo />
			<div class="relative flex flex-1 items-center">
				<input
					bind:this={inputEl}
					bind:value={input}
					onkeydown={handleKeydown}
					class="text-command absolute inset-0 w-full bg-transparent outline-none focus:outline-none focus:ring-0 border-none"
					style="caret-color: transparent; color: transparent;"
					autocomplete="off"
					autocorrect="off"
					autocapitalize="off"
					spellcheck={false}
					aria-label="Terminal input"
				/>
				<span class="text-command pointer-events-none whitespace-pre">{input}</span><span
					class="text-accent blink-cursor pointer-events-none">█</span
				>
			</div>
		</div>
	{/if}
</div>
