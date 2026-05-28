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
	let containerEl: HTMLDivElement = $state()!;
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
	class="terminal-bg crt flex h-screen cursor-text flex-col overflow-hidden p-4 font-mono text-sm"
	onclick={focusInput}
	role="presentation"
>
	{#if booting}
		<div class="flex-1 space-y-1 overflow-y-auto py-8">
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
		<!-- Fixed Banner at the top -->
		<div class="banner-fadein flex-none" class:visible={bannerVisible}>
			<Banner oncommand={handleCommand} />
		</div>

		<!-- Scrollable history and sticky input area -->
		<div class="min-h-0 flex-1 overflow-y-auto pr-1" bind:this={containerEl}>
			<div class="space-y-2 py-2">
				{#each $history as entry}
					<Output {entry} />
				{/each}
			</div>

			<!-- Sticky Input Prompt -->
			<div class="sticky bottom-0 z-10 flex items-center gap-1 bg-[var(--color-background)] py-3">
				<TermInfo />
				<div class="relative flex flex-1 items-center">
					<input
						bind:this={inputEl}
						bind:value={input}
						onkeydown={handleKeydown}
						class="text-command absolute inset-0 w-full border-none bg-transparent p-0 outline-none focus:ring-0 focus:outline-none"
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
		</div>
	{/if}
</div>
