<script lang="ts">
	const socials = [
		{ name: 'GitHub', url: 'https://github.com/Udean777', handle: '@Udean777' },
		{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/sajudin/', handle: 'sajudin' },
		{ name: 'Instagram', url: 'https://instagram.com/ssajudn', handle: '@ssajudn' },
		{ name: 'Website', url: 'https://www.sajudin.my.id/', handle: 'sajudin.my.id' }
	];
</script>

<div class="space-y-2">
	<p class="text-accent font-bold">Socials</p>
	{#each socials as social}
		<div class="flex gap-4">
			<span class="text-command w-20 shrink-0">{social.name}</span>
			<a href={social.url} target="_blank" class="text-output hover:underline">↗ {social.handle}</a>
		</div>
	{/each}
</div>
