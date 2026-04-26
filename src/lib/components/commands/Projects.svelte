<script lang="ts">
	const projects = [
		{
			name: 'Vivnio.com',
			description: 'Modern platform for wedding invitations and digital services.',
			status: 'Live',
			tags: ['SvelteKit', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis'],
			links: [{ label: 'vivnio.com', url: 'https://vivnio.com' }]
		},
		{
			name: 'POS System',
			description: 'Point of Sale application built with Flutter & Go for efficient business management.',
			status: 'Building',
			tags: ['Flutter', 'Golang', 'PostgreSQL'],
			links: [
				{ label: 'Server Repo', url: 'https://github.com/Udean777/POS-App-Server' },
				{ label: 'Client Repo', url: 'https://github.com/Udean777/POS-App-Client' }
			]
		},
		{
			name: 'kaosnyaman',
			description: 'Mobile Point of Sale (POS) system for custom apparel and clothing retail.',
			status: 'Live',
			tags: ['React Native', 'TypeScript'],
			links: [{ label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.udeans.kaosnyaman' }]
		},
		{
			name: 'jdmstore',
			description: 'Mobile POS system for JDM clothing retail.',
			status: 'Live',
			tags: ['React Native', 'TypeScript'],
			links: [{ label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.kitakale.JDMStore' }]
		},
		{
			name: 'Fun English for Early Childhood',
			description: "Interactive mobile learning application designed for children's language development.",
			status: 'Live',
			tags: ['React Native', 'TypeScript', 'Supabase'],
			links: [{ label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.editzproject.fun_english' }]
		},
		{
			name: 'The Habits',
			description: 'A simple and intuitive todo list application to manage daily tasks.',
			status: 'Live',
			tags: ['Flutter'],
			links: [{ label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.ssajudin.the_habits' }]
		},
		{
			name: 'Uang Bijak',
			description: 'An expense tracker app to help manage personal finances.',
			status: 'Live',
			tags: ['React Native'],
			links: [{ label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.ssajudn.expensetracker' }]
		}
	];
</script>

<div class="space-y-4">
	<p class="text-accent font-bold">Projects</p>
	{#each projects as project}
		<div class="border-l-2 border-command pl-4 space-y-1">
			<div class="flex items-center gap-2">
				<p class="text-command font-bold">{project.name}</p>
				<span class="text-xs px-1 border {project.status === 'Live' ? 'border-accent text-accent' : 'border-muted text-muted'}">{project.status}</span>
			</div>
			<p class="text-output">{project.description}</p>
			<div class="flex flex-wrap gap-1">
				{#each project.tags as tag}
					<span class="text-muted text-xs border border-muted px-1">{tag}</span>
				{/each}
			</div>
			<div class="flex flex-wrap gap-3">
				{#each project.links as link}
					<a href={link.url} target="_blank" class="text-accent text-xs hover:underline">↗ {link.label}</a>
				{/each}
			</div>
		</div>
	{/each}
</div>
