<script lang="ts">
	import { onMount } from 'svelte';

	let password = $state('');
	let phase = $state<'prompt' | 'submitting' | 'result'>('prompt');
	let resultText = $state('');
	let inputEl: HTMLInputElement = $state()!;

	function handleKeydown(e: KeyboardEvent) {
		if (phase !== 'prompt') return;

		if (e.key === 'Enter') {
			phase = 'submitting';
			setTimeout(showResult, 1500); // simulate authorization delay
		}
	}

	function showResult() {
		phase = 'result';

		const responses = [
			'visitor is not in the sudoers file. This incident will be reported.\nReport sent successfully to Santa Claus... 🎅',
			'visitor is not in the sudoers file. This incident will be reported.\nReport logged. A highly-trained space monkey has been dispatched. 🐒',
			"ACCESS DENIED. \nSajudin's security system is too strong! Try asking him nicely via email instead. 😉",
			'Nice try, master hacker! 🧑‍💻 \nUnfortunately, Sajudin has disabled superuser access for security reasons. Your attempt has been logged in our funny incident file!'
		];

		resultText = responses[Math.floor(Math.random() * responses.length)];
	}

	onMount(() => {
		// Focus the inline password input
		inputEl?.focus();
	});
</script>

<div class="py-2 font-mono text-xs leading-relaxed select-none sm:text-sm">
	{#if phase === 'prompt'}
		<div class="flex items-center gap-1">
			<span>[sudo] password for visitor:</span>
			<div class="relative flex flex-1 items-center">
				<input
					bind:this={inputEl}
					bind:value={password}
					onkeydown={handleKeydown}
					type="password"
					class="absolute inset-0 w-full border-none bg-transparent p-0 text-transparent caret-transparent outline-none focus:ring-0 focus:outline-none"
					autocomplete="off"
					aria-label="Password prompt"
				/>
				<!-- Linux sudo doesn't echo characters, show typing visual indicator -->
				<span class="text-accent blink-cursor">█</span>
			</div>
		</div>
	{:else if phase === 'submitting'}
		<div class="text-command flex flex-col gap-1">
			<span>Checking credentials...</span>
			<span>[████████████████████] 100% Done</span>
		</div>
	{:else if phase === 'result'}
		<div class="text-error border-error/20 border-l pl-4 leading-relaxed whitespace-pre-wrap">
			{resultText}
		</div>
	{/if}
</div>
