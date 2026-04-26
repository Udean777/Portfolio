<script lang="ts">
	const services = [
		{
			title: 'Web Development',
			description:
				'Building fast, responsive, and modern websites using SvelteKit, React, or Sveltekit.'
		},
		{
			title: 'Mobile Development',
			description:
				'Creating high-performance cross-platform mobile apps with Flutter or React Native.'
		},
		{
			title: 'Backend Development',
			description:
				'Building robust, scalable server-side logic, high-performance APIs, and efficient database architectures.'
		}
	];
</script>

<div class="space-y-3">
	<p class="text-accent font-bold">Services</p>
	{#each services as service}
		<div class="space-y-1">
			<p class="text-command">▸ {service.title}</p>
			<p class="text-muted pl-4">{service.description}</p>
		</div>
	{/each}
</div>
