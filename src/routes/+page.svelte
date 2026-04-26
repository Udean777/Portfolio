<script lang="ts">
	import { themeStore } from '$lib/stores/theme';
	import Terminal from '$lib/components/Terminal.svelte';

	let { data } = $props();
	const { meta } = data;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: "Sajudin Ma'ruf",
		url: meta.url,
		image: meta.image,
		jobTitle: 'Frontend & Mobile Developer',
		sameAs: ['https://github.com/Udean777', 'https://linkedin.com/in/sajudin'],
		knowsAbout: [
			'JavaScript',
			'TypeScript',
			'Svelte',
			'React Native',
			'Web Development',
			'Mobile Development'
		]
	};

	$effect(() => {
		const unsubscribe = themeStore.subscribe((theme) => {
			const root = document.documentElement;
			root.style.setProperty('--color-background', theme.colors.background);
			root.style.setProperty('--color-foreground', theme.colors.foreground);
			root.style.setProperty('--color-prompt', theme.colors.prompt);
			root.style.setProperty('--color-command', theme.colors.command);
			root.style.setProperty('--color-output', theme.colors.output);
			root.style.setProperty('--color-error', theme.colors.error);
			root.style.setProperty('--color-accent', theme.colors.accent);
			root.style.setProperty('--color-muted', theme.colors.muted);
		});
		return unsubscribe;
	});
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href={meta.url} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={meta.url} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={meta.image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content="Sajudin Ma'ruf" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={meta.url} />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={meta.image} />

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<Terminal />
