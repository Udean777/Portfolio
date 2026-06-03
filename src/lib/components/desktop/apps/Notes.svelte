<script lang="ts">
	const experiences = [
		{
			company: 'Vivnio',
			role: 'Frontend Developer',
			period: 'July 2025 – Present',
			description: [
				'Creating astonishing yet responsive website designs and Digital Invitations.',
				'Collaborating with stakeholders to translate business requirements into technical solutions.'
			]
		},
		{
			company: 'KitaKale.ID',
			role: 'Mobile Developer',
			period: 'October 2023 – August 2025',
			description: [
				'Developed and maintained high-performance mobile applications.',
				'Focused on creating seamless user experiences and optimizing app stability.'
			]
		},
		{
			company: 'KitaKale.ID',
			role: 'Tech Lead',
			period: 'September 2023 – June 2024',
			description: [
				'Led technical teams and mentored junior developers.',
				'Oversaw technical architecture and code quality standards.'
			]
		},
		{
			company: 'KitaKale.ID',
			role: 'Web Content Writer',
			period: 'January 2023 – June 2024',
			description: [
				'Managed digital content strategy and technical documentation.',
				'Collaborated with the marketing team to improve platform engagement.'
			]
		}
	];

	const skillGroups = [
		{ category: 'Frontend', color: '#0a84ff', items: ['Svelte', 'SvelteKit', 'React', 'HTML', 'CSS', 'JavaScript', 'TypeScript'] },
		{ category: 'Mobile', color: '#30d158', items: ['Flutter', 'Dart', 'React Native'] },
		{ category: 'Backend & DB', color: '#ff9f0a', items: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Prisma', 'Supabase'] },
		{ category: 'Tools', color: '#bf5af2', items: ['Git', 'GitHub', 'Docker', 'VSCode', 'Figma'] }
	];

	const certifications = [
		{ title: 'Memulai Pemrograman dengan Python', issuer: 'Dicoding Academy' },
		{ title: 'Memulai Pemrograman dengan Dart', issuer: 'Dicoding Academy' },
		{ title: 'Belajar Membuat Aplikasi Flutter untuk Pemula', issuer: 'Dicoding Academy' },
		{ title: 'Memulai Pemrograman dengan Kotlin', issuer: 'Dicoding Academy' },
		{ title: 'Belajar Membuat Aplikasi Android untuk Pemula', issuer: 'Dicoding Academy' }
	];

	const services = [
		{ icon: '🌐', title: 'Web Development', description: 'Building fast, responsive, and modern websites using SvelteKit, React, or Svelte.' },
		{ icon: '📱', title: 'Mobile Development', description: 'Creating high-performance cross-platform mobile apps with Flutter or React Native.' },
		{ icon: '⚙️', title: 'Backend Development', description: 'Building robust, scalable server-side logic, high-performance APIs, and efficient database architectures.' }
	];

	type FolderKey = 'profile' | 'experience' | 'skills' | 'services';

	const folders: { id: FolderKey; label: string; icon: string; count: number }[] = [
		{ id: 'profile', label: 'About Me', icon: '👤', count: 1 },
		{ id: 'experience', label: 'Experience', icon: '💼', count: experiences.length },
		{ id: 'skills', label: 'Skills', icon: '🛠️', count: skillGroups.length },
		{ id: 'services', label: 'Services', icon: '🚀', count: services.length }
	];

	type NoteKey = 'bio' | 'certs' | 'exp-vivnio' | 'exp-mobile' | 'exp-lead' | 'exp-writer' | 'skill-frontend' | 'skill-mobile' | 'skill-backend' | 'skill-tools' | 'svc-web' | 'svc-mobile' | 'svc-backend';

	const notesByFolder: Record<FolderKey, { id: NoteKey; title: string; preview: string; date: string }[]> = {
		profile: [
			{ id: 'bio', title: 'Personal Profile', preview: 'Frontend & Mobile Developer at Pembangunan Panca Budi University', date: 'Jun 3, 2026' }
		],
		experience: [
			{ id: 'exp-vivnio', title: 'Vivnio — Frontend Dev', preview: 'July 2025 – Present', date: 'Jun 3, 2026' },
			{ id: 'exp-mobile', title: 'KitaKale.ID — Mobile Dev', preview: 'October 2023 – August 2025', date: 'Jun 3, 2026' },
			{ id: 'exp-lead', title: 'KitaKale.ID — Tech Lead', preview: 'September 2023 – June 2024', date: 'Jun 3, 2026' },
			{ id: 'exp-writer', title: 'KitaKale.ID — Content Writer', preview: 'January 2023 – June 2024', date: 'Jun 3, 2026' }
		],
		skills: [
			{ id: 'skill-frontend', title: 'Frontend Stack', preview: 'Svelte, SvelteKit, React, TypeScript…', date: 'Jun 3, 2026' },
			{ id: 'skill-mobile', title: 'Mobile Stack', preview: 'Flutter, Dart, React Native', date: 'Jun 3, 2026' },
			{ id: 'skill-backend', title: 'Backend & Database', preview: 'Go, Node.js, PostgreSQL, Redis…', date: 'Jun 3, 2026' },
			{ id: 'skill-tools', title: 'Dev Tools', preview: 'Git, Docker, VSCode, Figma', date: 'Jun 3, 2026' }
		],
		services: [
			{ id: 'svc-web', title: 'Web Development', preview: 'SvelteKit, React, modern web', date: 'Jun 3, 2026' },
			{ id: 'svc-mobile', title: 'Mobile Development', preview: 'Flutter, React Native', date: 'Jun 3, 2026' },
			{ id: 'svc-backend', title: 'Backend Development', preview: 'APIs, databases, architecture', date: 'Jun 3, 2026' }
		]
	};

	let activeFolder = $state<FolderKey>('profile');
	let activeNote = $state<NoteKey>('bio');

	function selectFolder(f: FolderKey) {
		activeFolder = f;
		activeNote = notesByFolder[f][0].id;
	}
</script>

<div class="notes-shell">
	<!-- Folder Sidebar -->
	<div class="folder-sidebar">
		<div class="folder-header">Notes</div>
		<div class="folder-list">
			{#each folders as folder}
				<button
					class="folder-item"
					class:folder-active={activeFolder === folder.id}
					onclick={() => selectFolder(folder.id)}
				>
					<span class="folder-icon">{folder.icon}</span>
					<span class="folder-label">{folder.label}</span>
					<span class="folder-count">{folder.count}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- Notes List -->
	<div class="note-list">
		<div class="note-list-header">{folders.find(f => f.id === activeFolder)?.label}</div>
		{#each notesByFolder[activeFolder] as note}
			<button
				class="note-item"
				class:note-active={activeNote === note.id}
				onclick={() => (activeNote = note.id)}
			>
				<div class="note-item-title">{note.title}</div>
				<div class="note-item-meta">
					<span class="note-item-date">{note.date}</span>
					<span class="note-item-preview">{note.preview}</span>
				</div>
			</button>
		{/each}
	</div>

	<!-- Content Pane -->
	<div class="note-content">
		<div class="note-content-scroll">

			{#if activeNote === 'bio'}
				<div class="content-section">
					<div class="content-avatar">
						<img src="/images/profile-img.png" alt="Sajudin" class="avatar-img" />
					</div>
					<h1 class="content-name">Sajudin Ma'ruf</h1>
					<p class="content-role">Frontend & Mobile Developer</p>
					<div class="content-divider"></div>
					<div class="content-fields">
						<div class="field-row"><span class="field-key">Education</span><span class="field-val">Pembangunan Panca Budi University</span></div>
						<div class="field-row"><span class="field-key">Email</span><a href="mailto:sajudinmaruf@gmail.com" class="field-link">sajudinmaruf@gmail.com</a></div>
						<div class="field-row"><span class="field-key">Website</span><a href="https://sajudin.my.id" target="_blank" class="field-link">sajudin.my.id</a></div>
						<div class="field-row"><span class="field-key">GitHub</span><a href="https://github.com/Udean777" target="_blank" class="field-link">@Udean777</a></div>
						<div class="field-row"><span class="field-key">LinkedIn</span><a href="https://linkedin.com/in/sajudin" target="_blank" class="field-link">sajudin</a></div>
					</div>
					<div class="content-divider"></div>
					<p class="content-bio">A student of Information Technology at Pembangunan Panca Budi University with a passion for building beautiful and performant web and mobile experiences. Open to new opportunities in frontend, mobile, and full-stack development.</p>
					<a href="/assets/CV-Sajudin-ma'ruf.pdf" download class="download-btn">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
						Download CV
					</a>

					<div class="cert-section">
						<h3 class="cert-title">Certifications</h3>
						{#each certifications as cert}
							<div class="cert-item">
								<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--mac-accent)" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
								<div>
									<div class="cert-name">{cert.title}</div>
									<div class="cert-issuer">{cert.issuer}</div>
								</div>
							</div>
						{/each}
					</div>
				</div>

			{:else if activeNote === 'exp-vivnio' || activeNote === 'exp-mobile' || activeNote === 'exp-lead' || activeNote === 'exp-writer'}
				{@const expMap: Record<string, typeof experiences[0]> = {
					'exp-vivnio': experiences[0],
					'exp-mobile': experiences[1],
					'exp-lead': experiences[2],
					'exp-writer': experiences[3]
				}}
				{@const exp = expMap[activeNote]}
				<div class="content-section">
					<div class="exp-badge">{exp.company}</div>
					<h2 class="exp-role">{exp.role}</h2>
					<p class="exp-period">{exp.period}</p>
					<div class="content-divider"></div>
					<ul class="exp-bullets">
						{#each exp.description as desc}
							<li class="exp-bullet">{desc}</li>
						{/each}
					</ul>
				</div>

			{:else if activeNote === 'skill-frontend' || activeNote === 'skill-mobile' || activeNote === 'skill-backend' || activeNote === 'skill-tools'}
				{@const skillMap: Record<string, typeof skillGroups[0]> = {
					'skill-frontend': skillGroups[0],
					'skill-mobile': skillGroups[1],
					'skill-backend': skillGroups[2],
					'skill-tools': skillGroups[3]
				}}
				{@const group = skillMap[activeNote]}
				<div class="content-section">
					<h2 class="skill-heading">{group.category}</h2>
					<div class="content-divider"></div>
					<div class="skill-tags">
						{#each group.items as skill}
							<span class="skill-tag" style="border-color:{group.color}30; color:{group.color}">{skill}</span>
						{/each}
					</div>
				</div>

			{:else if activeNote === 'svc-web' || activeNote === 'svc-mobile' || activeNote === 'svc-backend'}
				{@const svcMap: Record<string, typeof services[0]> = {
					'svc-web': services[0],
					'svc-mobile': services[1],
					'svc-backend': services[2]
				}}
				{@const svc = svcMap[activeNote]}
				<div class="content-section">
					<div class="svc-icon">{svc.icon}</div>
					<h2 class="svc-title">{svc.title}</h2>
					<div class="content-divider"></div>
					<p class="svc-desc">{svc.description}</p>
				</div>
			{/if}

		</div>
	</div>
</div>

<style>
	.notes-shell {
		display: flex;
		height: 100%;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
		background: var(--mac-win-body);
		overflow: hidden;
	}

	/* Folder Sidebar */
	.folder-sidebar {
		width: 180px;
		background: var(--mac-sidebar-bg);
		border-right: 1px solid var(--mac-sidebar-border);
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		user-select: none;
	}

	.folder-header {
		height: 44px;
		display: flex;
		align-items: center;
		padding: 0 16px;
		font-size: 18px;
		font-weight: 700;
		color: var(--mac-text);
		letter-spacing: -0.02em;
		border-bottom: 1px solid var(--mac-separator);
	}

	.folder-list {
		padding: 8px 6px;
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.folder-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 7px 10px;
		border-radius: 7px;
		cursor: pointer;
		background: none;
		border: none;
		color: var(--mac-sidebar-text);
		font-size: 13px;
		font-family: inherit;
		text-align: left;
		transition: background 0.1s;
	}

	.folder-item:hover {
		background: var(--mac-sidebar-active);
	}

	.folder-item.folder-active {
		background: var(--mac-accent);
		color: #fff;
	}

	.folder-item.folder-active .folder-count {
		background: rgba(255,255,255,0.25);
		color: #fff;
	}

	.folder-icon { font-size: 14px; }
	.folder-label { flex: 1; font-weight: 500; }
	.folder-count {
		font-size: 11px;
		background: var(--mac-surface-2);
		color: var(--mac-text-secondary);
		border-radius: 10px;
		padding: 1px 6px;
		font-weight: 600;
		min-width: 18px;
		text-align: center;
	}

	/* Notes List */
	.note-list {
		width: 200px;
		background: var(--mac-surface);
		border-right: 1px solid var(--mac-separator);
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		overflow-y: auto;
	}

	.note-list-header {
		height: 44px;
		display: flex;
		align-items: center;
		padding: 0 14px;
		font-size: 14px;
		font-weight: 600;
		color: var(--mac-text);
		border-bottom: 1px solid var(--mac-separator);
		flex-shrink: 0;
	}

	.note-item {
		padding: 12px 14px;
		border-bottom: 1px solid var(--mac-separator);
		cursor: pointer;
		background: none;
		border-left: none;
		border-right: none;
		border-top: none;
		text-align: left;
		font-family: inherit;
		transition: background 0.1s;
	}

	.note-item:hover {
		background: var(--mac-sidebar-active);
	}

	.note-item.note-active {
		background: var(--mac-accent);
	}

	.note-item.note-active .note-item-title,
	.note-item.note-active .note-item-date,
	.note-item.note-active .note-item-preview {
		color: #fff;
	}

	.note-item-title {
		font-size: 13px;
		font-weight: 600;
		color: var(--mac-text);
		margin-bottom: 3px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.note-item-meta {
		display: flex;
		gap: 6px;
		align-items: baseline;
	}

	.note-item-date {
		font-size: 11px;
		color: var(--mac-text-secondary);
		white-space: nowrap;
	}

	.note-item-preview {
		font-size: 11px;
		color: var(--mac-text-tertiary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Content */
	.note-content {
		flex: 1;
		overflow-y: auto;
		background: var(--mac-win-body);
	}

	.note-content-scroll {
		padding: 28px 28px 40px;
	}

	.content-section {
		max-width: 520px;
	}

	.content-avatar {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		overflow: hidden;
		margin-bottom: 14px;
		border: 2px solid var(--mac-separator);
	}

	.avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.content-name {
		font-size: 22px;
		font-weight: 700;
		color: var(--mac-text);
		margin: 0 0 4px;
		letter-spacing: -0.03em;
	}

	.content-role {
		font-size: 14px;
		color: var(--mac-accent);
		font-weight: 500;
		margin: 0 0 16px;
	}

	.content-divider {
		height: 1px;
		background: var(--mac-separator);
		margin: 16px 0;
	}

	.content-fields {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.field-row {
		display: flex;
		gap: 12px;
		font-size: 13px;
	}

	.field-key {
		width: 80px;
		flex-shrink: 0;
		color: var(--mac-text-secondary);
		font-weight: 500;
	}

	.field-val {
		color: var(--mac-text);
	}

	.field-link {
		color: var(--mac-accent);
		text-decoration: none;
	}

	.field-link:hover { text-decoration: underline; }

	.content-bio {
		font-size: 13px;
		color: var(--mac-text-secondary);
		line-height: 1.65;
		margin: 0 0 20px;
	}

	.download-btn {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 8px 16px;
		background: var(--mac-accent);
		color: #fff;
		border-radius: 8px;
		font-size: 13px;
		font-weight: 500;
		text-decoration: none;
		transition: background 0.15s;
	}

	.download-btn:hover { background: var(--mac-accent-hover); }

	.cert-section { margin-top: 24px; }

	.cert-title {
		font-size: 13px;
		font-weight: 700;
		color: var(--mac-text);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin: 0 0 12px;
	}

	.cert-item {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		padding: 8px 0;
		border-bottom: 1px solid var(--mac-separator);
	}

	.cert-item:last-child { border-bottom: none; }

	.cert-name { font-size: 12px; font-weight: 500; color: var(--mac-text); }
	.cert-issuer { font-size: 11px; color: var(--mac-text-secondary); }

	/* Experience */
	.exp-badge {
		display: inline-block;
		padding: 3px 10px;
		background: var(--mac-accent);
		color: #fff;
		border-radius: 20px;
		font-size: 12px;
		font-weight: 600;
		margin-bottom: 10px;
	}

	.exp-role {
		font-size: 22px;
		font-weight: 700;
		color: var(--mac-text);
		margin: 0 0 6px;
		letter-spacing: -0.03em;
	}

	.exp-period {
		font-size: 13px;
		color: var(--mac-text-secondary);
		margin: 0;
	}

	.exp-bullets { padding-left: 20px; margin: 0; }
	.exp-bullet {
		font-size: 13px;
		color: var(--mac-text-secondary);
		line-height: 1.7;
		margin-bottom: 8px;
	}

	/* Skills */
	.skill-heading {
		font-size: 22px;
		font-weight: 700;
		color: var(--mac-text);
		margin: 0 0 4px;
		letter-spacing: -0.03em;
	}

	.skill-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 4px;
	}

	.skill-tag {
		padding: 5px 12px;
		border-radius: 8px;
		border: 1px solid;
		font-size: 13px;
		font-weight: 500;
		background: var(--mac-surface);
		transition: background 0.12s;
	}

	/* Services */
	.svc-icon { font-size: 40px; margin-bottom: 10px; }
	.svc-title {
		font-size: 22px;
		font-weight: 700;
		color: var(--mac-text);
		margin: 0 0 4px;
		letter-spacing: -0.03em;
	}
	.svc-desc {
		font-size: 13px;
		color: var(--mac-text-secondary);
		line-height: 1.7;
		margin: 0;
	}

	/* ── Responsive: tablet / phone ── */
	@media (max-width: 1023px) {
		.notes-shell {
			flex-direction: column;
		}

		/* Hide folder sidebar on narrow, fold note list into top tab bar */
		.folder-sidebar {
			width: 100%;
			flex-direction: row;
			height: auto;
			border-right: none;
			border-bottom: 1px solid var(--mac-separator);
		}

		.folder-header { display: none; }

		.folder-list {
			flex-direction: row;
			flex-wrap: nowrap;
			overflow-x: auto;
			padding: 8px 10px;
			gap: 6px;
			width: 100%;
			-ms-overflow-style: none;
			scrollbar-width: none;
		}

		.folder-list::-webkit-scrollbar { display: none; }

		.folder-item {
			flex-direction: row;
			padding: 6px 12px;
			flex-shrink: 0;
			border-radius: 20px;
			font-size: 12px;
			white-space: nowrap;
		}

		.folder-count { display: none; }

		/* Note list becomes horizontal scrollable strip */
		.note-list {
			width: 100%;
			border-right: none;
			border-bottom: 1px solid var(--mac-separator);
			flex-direction: row;
			height: 80px;
			overflow-x: auto;
			overflow-y: hidden;
			flex-shrink: 0;
			-ms-overflow-style: none;
			scrollbar-width: none;
		}

		.note-list::-webkit-scrollbar { display: none; }

		.note-list-header { display: none; }

		.note-item {
			min-width: 160px;
			max-width: 180px;
			border-bottom: none;
			border-right: 1px solid var(--mac-separator);
			padding: 10px 12px;
		}

		.note-item-meta { flex-direction: column; gap: 1px; }

		.note-content-scroll {
			padding: 16px 16px 32px;
		}

		.content-section { max-width: 100%; }

		.content-name { font-size: 18px; }
	}

	@media (max-width: 480px) {
		.note-item { min-width: 140px; }
		.content-name { font-size: 16px; }
		.content-avatar { width: 56px; height: 56px; }
		.download-btn { font-size: 12px; padding: 7px 13px; }
	}
</style>
