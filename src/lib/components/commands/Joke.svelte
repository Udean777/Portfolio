<script lang="ts">
	import { onMount } from 'svelte';

	const jokes = [
		"Why do programmers wear glasses? \nBecause they can't C#.",
		"There are 10 types of people in this world: Those who understand binary, and those who don't.",
		"How many programmers does it take to change a light bulb? \nNone, that's a hardware problem.",
		"['hip', 'hip'] \n(hip hip array!)",
		"What is a programmer's favorite hangout place? \nFoo Bar.",
		"A SQL query walks into a bar, walks up to two tables and asks, \n'Can I join you?'",
		"Why did the programmer quit his job? \nBecause he didn't get arrays.",
		"An optimist says: 'The glass is half full.'\nA pessimist says: 'The glass is half empty.'\nA programmer says: 'The glass is twice as large as it needs to be!'"
	];

	let jokeText = $state('');
	let typingDone = $state(false);

	onMount(() => {
		// Pick random joke
		const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

		let i = 0;
		let timeoutId: any;

		function typeChar() {
			if (i < randomJoke.length) {
				jokeText += randomJoke.charAt(i);
				i++;
				timeoutId = setTimeout(typeChar, 25); // snappy typewriter speed
			} else {
				typingDone = true;
			}
		}

		typeChar();

		return () => {
			clearTimeout(timeoutId);
		};
	});
</script>

<div class="py-2 font-mono text-xs leading-relaxed select-none sm:text-sm">
	<!-- Display typewriter text with a terminal indicator -->
	<span class="text-prompt font-bold">🤖 joke_bot:</span>
	<pre class="text-accent border-accent/20 mt-2 border-l pl-4 font-mono whitespace-pre-wrap">
{jokeText}{#if !typingDone}<span class="text-accent blink-cursor">█</span>{/if}
	</pre>
</div>
