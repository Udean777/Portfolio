<script lang="ts">
	import Nav from '$lib/components/landing/NewspaperNav.svelte';
	import Hero from '$lib/components/landing/NewspaperHero.svelte';
	import About from '$lib/components/landing/NewspaperAbout.svelte';
	import Experience from '$lib/components/landing/NewspaperExperience.svelte';
	import Projects from '$lib/components/landing/NewspaperProjects.svelte';
	import Stack from '$lib/components/landing/NewspaperStack.svelte';
	import Contact from '$lib/components/landing/NewspaperContact.svelte';
	import Footer from '$lib/components/landing/NewspaperFooter.svelte';

	let { data } = $props();
	const { meta } = data;

	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: "Sajudin Ma'ruf",
		alternateName: 'Sajudin',
		url: meta.url,
		image: {
			'@type': 'ImageObject',
			url: 'https://sajudin.my.id/images/sajudin.webp',
			width: 400,
			height: 400,
			caption: "Sajudin Ma'ruf — Frontend & Mobile Developer"
		},
		jobTitle: 'Frontend & Mobile Developer',
		worksFor: { '@type': 'Organization', name: 'PT Arah Baru Selayar' },
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
		author: { '@type': 'Person', name: "Sajudin Ma'ruf" },
		inLanguage: 'en',
		datePublished: meta.publishedTime,
		dateModified: meta.modifiedTime
	};
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href={meta.url} />
	<link rel="preload" as="image" href="/images/sajudin-2.webp" fetchpriority="high" type="image/webp" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={meta.url} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={meta.image} />
	<meta property="og:image:secure_url" content={meta.image} />
	<meta property="og:image:type" content="image/webp" />
	<meta property="og:image:width" content={meta.imageWidth} />
	<meta property="og:image:height" content={meta.imageHeight} />
	<meta property="og:image:alt" content={meta.imageAlt} />
	<meta property="og:locale" content={meta.locale} />
	<meta property="og:site_name" content={meta.siteName} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@sajudin" />
	<meta name="twitter:creator" content="@sajudin" />
	<meta name="twitter:url" content={meta.url} />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={meta.image} />
	<meta name="twitter:image:alt" content={meta.imageAlt} />
	<script type="application/ld+json">
		{@html JSON.stringify(personSchema)}
	</script>
	<script type="application/ld+json">
		{@html JSON.stringify(websiteSchema)}
	</script>
</svelte:head>

<div class="page">
	<Nav />
	<main id="main-content">
		<Hero />
		<div class="newspaper-body">
			<About />
			<Experience />
			<Projects />
			<Stack />
			<Contact />
		</div>
	</main>
	<Footer />
</div>

<style>
	.page {
		max-width: 1440px;
		margin: 0 auto;
		background: var(--color-paper);
		min-height: 100dvh;
		color: var(--color-ink);
		border-inline: var(--rule-thin) solid var(--color-rule);
	}
</style>
