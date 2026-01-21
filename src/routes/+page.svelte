<script lang="ts">
	import About from '$lib/components/sections/About.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';
	import TechStack from '$lib/components/sections/TechStack.svelte';
	import Experience from '$lib/components/sections/Experience.svelte';
	import Certifications from '$lib/components/sections/Certifications.svelte';
	import Services from '$lib/components/sections/Services.svelte';
	import Testimonials from '$lib/components/sections/Testimonials.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
</script>

<main class="container mx-auto flex min-h-screen flex-col items-center justify-between md:w-[70rem]">
	<Hero />
	<About />
	<Experience />
	<Certifications />
	<Services />
	<TechStack />
	<Projects />
	<Testimonials />
	<Contact />
</main>
