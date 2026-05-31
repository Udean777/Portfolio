<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { history, addToHistory, clearHistory, type HistoryEntry } from '$lib/stores/history';
	import { commandNames } from '$lib/utils/commands';
	import { themeStore } from '$lib/stores/theme';
	import { themes } from '$lib/utils/themes';
	import { soundEnabled, keyboardSound } from '$lib/stores/sound';
	import TermInfo from './TermInfo.svelte';
	import Output from './Output.svelte';
	import Banner from './commands/Banner.svelte';

	const themeNames = Object.keys(themes);

	let input = $state('');
	let inputEl: HTMLInputElement = $state()!;
	let containerEl: HTMLDivElement = $state()!;
	let commandHistory: string[] = $state([]);
	let historyIndex = $state(-1);

	let booting = $state(true);
	let bootLines: string[] = $state([]);
	let bannerVisible = $state(false);

	const validCommands = new Set([...commandNames, 'experience', 'skills', 'services']);

	// Derived state for zsh-autosuggestion style autocomplete
	let suggestion = $derived.by(() => {
		const trimmed = input.trim();
		if (!trimmed) return '';

		// Check if the user is typing themes command arguments
		if (trimmed.startsWith('themes ')) {
			const typedTheme = input.slice(7).toLowerCase();
			if (!typedTheme) return '';
			const match = themeNames.find((t) => t.startsWith(typedTheme));
			return match ? match.slice(typedTheme.length) : '';
		}

		// Otherwise, suggest first matching command
		if (trimmed.includes(' ')) return '';
		const match = commandNames.find((c) => c.startsWith(trimmed.toLowerCase()));
		return match ? match.slice(trimmed.length) : '';
	});

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
		} else if (cmd === 'sound') {
			if (args[0] === 'on') {
				soundEnabled.set(true);
				entry = { command: trimmed, output: null, component: 'sound' };
			} else if (args[0] === 'off') {
				soundEnabled.set(false);
				entry = { command: trimmed, output: null, component: 'sound' };
			} else {
				entry = { command: trimmed, output: null, component: 'sound' };
			}
		} else if (validCommands.has(cmd)) {
			entry = { command: trimmed, output: null, component: cmd };
		} else {
			// Play computerized alert buzz for incorrect commands
			keyboardSound.playErrorClick();
			entry = {
				command: trimmed,
				output: `command not found: ${cmd}. Type 'help' to see available commands.`,
				component: null
			};
		}

		addToHistory(entry);
	}

	function handleKeydown(e: KeyboardEvent) {
		// Play mechanical typing click for character presses, ignoring meta/modifier keys
		const ignoredKeys = new Set([
			'Shift',
			'Control',
			'Alt',
			'Meta',
			'CapsLock',
			'Escape',
			'ScrollLock',
			'Pause',
			'Insert',
			'Home',
			'PageUp',
			'PageDown',
			'End'
		]);

		if (e.key === 'Enter') {
			keyboardSound.playEnterClick();
			handleCommand(input);
			input = '';
			return;
		}

		if (!ignoredKeys.has(e.key)) {
			keyboardSound.playKeyClick();
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

		// Auto-complete triggers (Tab or ArrowRight)
		if (e.key === 'Tab' || (e.key === 'ArrowRight' && suggestion)) {
			e.preventDefault();
			const trimmed = input.trim();
			if (trimmed.startsWith('themes ')) {
				const typedTheme = input.slice(7).toLowerCase();
				const match = themeNames.find((t) => t.startsWith(typedTheme));
				if (match) {
					input = 'themes ' + match;
				}
			} else {
				const match = commandNames.find((c) => c.startsWith(trimmed.toLowerCase()));
				if (match) {
					input = match;
				}
			}
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
	class="terminal-bg crt flex h-full cursor-text flex-col overflow-hidden p-4 font-mono text-sm"
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
		<!-- Floating Audio Control Switch (Web Audio API click feedback) -->
		<button
			onclick={(e) => {
				e.stopPropagation();
				const nextState = !$soundEnabled;
				soundEnabled.set(nextState);
				if (nextState) {
					// AudioContext gets initialized/resumed on this user click interaction!
					keyboardSound.playKeyClick();
				}
			}}
			class="border-accent/20 bg-muted/10 hover:bg-muted/20 text-accent absolute top-4 right-4 z-50 flex cursor-pointer items-center justify-center rounded-full border p-2 font-mono text-[10px] shadow-[0_0_8px_var(--color-accent)] transition-all duration-200"
			style="box-shadow: 0 0 10px rgba(115, 218, 202, 0.15);"
			aria-label="Toggle Keyboard Sounds"
		>
			{#if $soundEnabled}
				🔊 <span class="ml-1 hidden text-[9px] font-bold tracking-wider uppercase sm:inline"
					>Sound On</span
				>
			{:else}
				🔇 <span class="ml-1 hidden text-[9px] font-bold tracking-wider uppercase sm:inline"
					>Muted</span
				>
			{/if}
		</button>

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
					>{#if suggestion}<span class="text-muted pointer-events-none whitespace-pre opacity-40"
							>{suggestion}</span
						>{/if}
				</div>
			</div>
		</div>
	{/if}
</div>
