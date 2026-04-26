<script lang="ts">
	const experiences = [
		{
			company: 'Vivnio',
			role: 'Frontend Developer',
			period: 'July 2025 - Present',
			description: [
				'Creating an astonishing yet responsive design of the website and Digital Invitations.',
				'Collaborating with stakeholders to translate business requirements into technical solutions.'
			]
		},
		{
			company: 'KitaKale.ID',
			role: 'Mobile Developer',
			period: 'October 2023 - August 2025',
			description: [
				'Developed and maintained high-performance mobile applications.',
				'Focused on creating seamless user experiences and optimizing app stability.'
			]
		},
		{
			company: 'KitaKale.ID',
			role: 'Tech Lead',
			period: 'September 2023 - June 2024',
			description: [
				'Led technical teams and mentored junior developers.',
				'Oversaw technical architecture and code quality standards.'
			]
		},
		{
			company: 'KitaKale.ID',
			role: 'Web Content Writer',
			period: 'January 2023 - June 2024',
			description: [
				'Managed digital content strategy and technical documentation.',
				'Collaborated with the marketing team to improve platform engagement.'
			]
		}
	];
</script>

<div class="space-y-4">
	<p class="text-accent font-bold">Work Experience</p>
	{#each experiences as exp}
		<div class="border-l-2 border-accent pl-4 space-y-1">
			<p class="text-command font-bold">{exp.role}</p>
			<p class="text-output">{exp.company} · {exp.period}</p>
			{#each exp.description as desc}
				<p class="text-muted">  - {desc}</p>
			{/each}
		</div>
	{/each}
</div>
