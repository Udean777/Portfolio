<script lang="ts">
	const skillGroups = [
		{
			category: 'Frontend',
			items: [
				'Svelte',
				'SvelteKit',
				'React',
				'Sveltekit',
				'HTML',
				'CSS',
				'JavaScript',
				'TypeScript'
			]
		},
		{
			category: 'Mobile',
			items: ['Flutter', 'Dart', 'React Native']
		},
		{
			category: 'Backend & DB',
			items: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Prisma', 'Supabase']
		},
		{
			category: 'Tools',
			items: ['Git', 'GitHub', 'Docker', 'VSCode', 'Figma']
		}
	];

	const certifications = [
		{ title: 'Memulai Pemrograman dengan Python', issuer: 'Dicoding Academy' },
		{ title: 'Memulai Pemrograman dengan Dart', issuer: 'Dicoding Academy' },
		{ title: 'Belajar Membuat Aplikasi Flutter untuk Pemula', issuer: 'Dicoding Academy' },
		{ title: 'Memulai Pemrograman dengan Kotlin', issuer: 'Dicoding Academy' },
		{ title: 'Belajar Membuat Aplikasi Android untuk Pemula', issuer: 'Dicoding Academy' }
	];
</script>

<div class="space-y-4">
	<p class="text-accent font-bold">Skills & Tech Stack</p>
	{#each skillGroups as group}
		<div>
			<p class="text-command mb-1">{group.category}</p>
			<div class="flex flex-wrap gap-2">
				{#each group.items as skill}
					<span class="text-output border-muted border px-2 py-0.5 text-xs">{skill}</span>
				{/each}
			</div>
		</div>
	{/each}

	<div class="mt-4">
		<p class="text-accent mb-2 font-bold">Certifications</p>
		{#each certifications as cert}
			<p class="text-muted">▸ <span class="text-output">{cert.title}</span> — {cert.issuer}</p>
		{/each}
	</div>
</div>
