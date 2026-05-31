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

	const skillGroups = [
		{
			category: 'Frontend',
			items: ['Svelte', 'SvelteKit', 'React', 'HTML', 'CSS', 'JavaScript', 'TypeScript']
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

	const services = [
		{
			title: 'Web Development',
			description: 'Building fast, responsive, and modern websites using SvelteKit, React, or Svelte.'
		},
		{
			title: 'Mobile Development',
			description: 'Creating high-performance cross-platform mobile apps with Flutter or React Native.'
		},
		{
			title: 'Backend Development',
			description: 'Building robust, scalable server-side logic, high-performance APIs, and efficient database architectures.'
		}
	];
</script>

<div class="animate-fadein space-y-6 py-2 select-text">
	<!-- MAIN HEADER -->
	<div class="border-b border-[var(--color-accent)]/20 pb-3">
		<h2 class="text-accent text-xl font-bold tracking-wider uppercase">DEVELOPER PROFILE DASHBOARD</h2>
		<p class="text-muted text-xs">Sajudin Ma'ruf // Frontend & Mobile Architect</p>
	</div>

	<!-- GRID LAYOUT -->
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
		<!-- LEFT COLUMN -->
		<div class="space-y-6">
			<!-- PROFILE & BIO CARD -->
			<div class="border border-[var(--color-accent)]/10 bg-black/15 rounded-lg p-5 shadow-xl transition-all hover:border-[var(--color-accent)]/20">
				<h3 class="text-accent mb-3 text-sm font-bold tracking-widest uppercase">👤 PERSONAL BIO</h3>
				<p class="text-output text-xs leading-relaxed">
					A student of Information Technology at Pembangunan Panca Budi University, I have a passion and
					knowledge in the field of information technology. I enjoy learning new things and sharing
					knowledge to others. I am a Frontend Developer and Mobile Developer, open to exploring new roles.
				</p>
				<div class="mt-4 space-y-2 border-t border-[var(--color-muted)]/10 pt-3 text-xs">
					<p class="text-muted">Name : <span class="text-output font-semibold">Sajudin Ma'ruf</span></p>
					<p class="text-muted">Role : <span class="text-output font-semibold">Frontend & Mobile Developer</span></p>
					<p class="text-muted">Education : <span class="text-output">Pembangunan Panca Budi University</span></p>
					<p class="text-muted">Email : <span class="text-output">sajudinmaruf@gmail.com</span></p>
					<p class="text-muted">Website : <span class="text-output">sajudin.my.id</span></p>
				</div>
				<div class="mt-5">
					<a
						href="/assets/CV-Sajudin-ma'ruf.pdf"
						target="_blank"
						download="CV-Sajudin-ma'ruf.pdf"
						class="text-accent border-accent hover:bg-accent hover:text-background inline-block cursor-pointer border px-4 py-2 text-[10px] font-bold tracking-wider uppercase transition-colors rounded"
						style="box-shadow: 0 0 6px rgba(115, 218, 202, 0.1);"
					>
						📥 Download CV (PDF)
					</a>
				</div>
			</div>

			<!-- SKILLS & TECH STACK CARD -->
			<div class="border border-[var(--color-accent)]/10 bg-black/15 rounded-lg p-5 shadow-xl transition-all hover:border-[var(--color-accent)]/20">
				<h3 class="text-accent mb-4 text-sm font-bold tracking-widest uppercase">🛠️ SKILLS & TECH STACK</h3>
				<div class="space-y-4">
					{#each skillGroups as group}
						<div>
							<p class="text-command mb-1.5 text-xs font-semibold">{group.category}</p>
							<div class="flex flex-wrap gap-1.5">
								{#each group.items as skill}
									<span class="text-output border border-[var(--color-muted)]/20 bg-[var(--color-background)]/30 rounded px-2 py-0.5 text-[10px] transition-colors hover:border-[var(--color-accent)]/30">
										{skill}
									</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- CERTIFICATIONS CARD -->
			<div class="border border-[var(--color-accent)]/10 bg-black/15 rounded-lg p-5 shadow-xl transition-all hover:border-[var(--color-accent)]/20">
				<h3 class="text-accent mb-3 text-sm font-bold tracking-widest uppercase">📜 CERTIFICATIONS</h3>
				<div class="space-y-2 text-xs">
					{#each certifications as cert}
						<div class="flex gap-2">
							<span class="text-accent flex-none">▸</span>
							<p class="text-muted"><span class="text-output font-medium">{cert.title}</span> — {cert.issuer}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- RIGHT COLUMN -->
		<div class="space-y-6">
			<!-- WORK EXPERIENCE CARD -->
			<div class="border border-[var(--color-accent)]/10 bg-black/15 rounded-lg p-5 shadow-xl transition-all hover:border-[var(--color-accent)]/20">
				<h3 class="text-accent mb-4 text-sm font-bold tracking-widest uppercase">💼 WORK EXPERIENCE</h3>
				<div class="space-y-4 relative border-l border-[var(--color-accent)]/20 pl-4 ml-1">
					{#each experiences as exp}
						<div class="relative space-y-1">
							<!-- Timeline Dot -->
							<span class="bg-accent absolute -left-[21px] top-1.5 h-2 w-2 rounded-full ring-4 ring-black/40"></span>
							
							<p class="text-command text-xs font-bold">{exp.role}</p>
							<p class="text-output text-[10px] opacity-90">{exp.company} · <span class="text-muted font-normal">{exp.period}</span></p>
							<div class="mt-1 space-y-1">
								{#each exp.description as desc}
									<p class="text-muted text-[11px] leading-relaxed">  - {desc}</p>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- SERVICES CARD -->
			<div class="border border-[var(--color-accent)]/10 bg-black/15 rounded-lg p-5 shadow-xl transition-all hover:border-[var(--color-accent)]/20">
				<h3 class="text-accent mb-3 text-sm font-bold tracking-widest uppercase">🚀 SERVICES OFFERED</h3>
				<div class="space-y-4">
					{#each services as service}
						<div class="group space-y-1">
							<p class="text-command text-xs font-semibold">▸ {service.title}</p>
							<p class="text-muted pl-4 text-xs leading-relaxed">{service.description}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.animate-fadein {
		animation: fadeIn 0.4s ease-out forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
