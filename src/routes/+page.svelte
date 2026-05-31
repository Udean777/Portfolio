<script lang="ts">
	import { themeStore } from '$lib/stores/theme';
	import Terminal from '$lib/components/Terminal.svelte';

	let { data } = $props();
	const { meta } = data;

	// Rich Structured Data — Person + WebSite + BreadcrumbList
	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: "Sajudin Ma'ruf",
		alternateName: 'Sajudin',
		url: meta.url,
		image: {
			'@type': 'ImageObject',
			url: 'https://sajudin.my.id/images/sajudin.jpeg',
			width: 400,
			height: 400,
			caption: "Sajudin Ma'ruf — Frontend & Mobile Developer"
		},
		jobTitle: 'Frontend & Mobile Developer',
		worksFor: {
			'@type': 'Organization',
			name: 'Freelance'
		},
		sameAs: ['https://github.com/Udean777', 'https://linkedin.com/in/sajudin'],
		knowsAbout: [
			'JavaScript',
			'TypeScript',
			'Svelte',
			'SvelteKit',
			'React Native',
			'Web Development',
			'Mobile Development'
		],
		description:
			'Frontend & Mobile Developer specializing in JavaScript, TypeScript, Svelte, and React Native.'
	};

	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: "Sajudin Ma'ruf — Portfolio",
		url: meta.url,
		description: meta.description,
		author: {
			'@type': 'Person',
			name: "Sajudin Ma'ruf"
		},
		inLanguage: 'en-US'
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
	<!-- Primary SEO -->
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href={meta.url} />

	<!-- Open Graph (Facebook, LinkedIn, WhatsApp, Telegram) -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={meta.url} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={meta.image} />
	<meta property="og:image:secure_url" content={meta.image} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content={meta.imageWidth} />
	<meta property="og:image:height" content={meta.imageHeight} />
	<meta property="og:image:alt" content={meta.imageAlt} />
	<meta property="og:locale" content={meta.locale} />
	<meta property="og:site_name" content={meta.siteName} />
	<meta property="article:published_time" content={meta.publishedTime} />
	<meta property="article:modified_time" content={meta.modifiedTime} />

	<!-- Twitter / X Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@sajudin" />
	<meta name="twitter:creator" content="@sajudin" />
	<meta name="twitter:url" content={meta.url} />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={meta.image} />
	<meta name="twitter:image:alt" content={meta.imageAlt} />

	<!-- Structured Data: Person -->
	{@html `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`}

	<!-- Structured Data: WebSite -->
	{@html `<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`}
</svelte:head>

<div class="flex h-screen flex-col overflow-hidden bg-[var(--color-background)] font-mono">
	<div class="relative min-h-0 flex-1">
		<div class="absolute inset-0">
			<Terminal />
		</div>
	</div>
</div>
