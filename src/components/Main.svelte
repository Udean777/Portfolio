<script>
	import About from './About.svelte';
	import Hero from './Hero.svelte';
	import Projects from './Projects.svelte';
	import TechStack from './TechStack.svelte';
</script>

<main
	class="container mx-auto flex min-h-screen flex-col items-center justify-between md:w-[70rem]"
>
	<Hero />

	<About />

	<TechStack />

	<Projects />
</main>
