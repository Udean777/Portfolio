<script lang="ts">
	interface Tab {
		id: string;
		label: string;
		url: string;
		favicon: string;
	}

	const tabs: Tab[] = [
		{ id: 'projects', label: 'Projects', url: 'sajudin.my.id/projects', favicon: '📁' },
		{ id: 'github', label: 'GitHub — Udean777', url: 'github.com/Udean777', favicon: '🐙' }
	];

	let activeTab = $state('projects');
	let navHistory: string[] = $state(['projects']);
	let historyIndex = $state(0);

	const canGoBack = $derived(historyIndex > 0);
	const canGoForward = $derived(historyIndex < navHistory.length - 1);

	function selectTab(id: string) {
		activeTab = id;
		navHistory = [...navHistory.slice(0, historyIndex + 1), id];
		historyIndex = navHistory.length - 1;
	}

	function goBack() {
		if (canGoBack) {
			historyIndex--;
			activeTab = navHistory[historyIndex];
		}
	}

	function goForward() {
		if (canGoForward) {
			historyIndex++;
			activeTab = navHistory[historyIndex];
		}
	}

	const currentTab = $derived(tabs.find((t) => t.id === activeTab)!);

	const projects = [
		{
			name: 'Vivnio',
			description: 'Modern platform for wedding invitations and digital services.',
			status: 'Live',
			statusColor: '#30d158',
			tags: ['SvelteKit', 'TypeScript', 'Prisma', 'PostgreSQL', 'Redis'],
			image: '/images/vivnio.png',
			links: [{ label: 'vivnio.com', url: 'https://vivnio.com' }]
		},
		{
			name: 'kaosnyaman',
			description: 'Mobile Point of Sale system for custom apparel and clothing retail.',
			status: 'Live',
			statusColor: '#30d158',
			tags: ['React Native', 'TypeScript'],
			image: '/images/kaosnyaman.png',
			links: [{ label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.udeans.kaosnyaman' }]
		},
		{
			name: 'jdmstore',
			description: 'Mobile POS system for JDM clothing retail.',
			status: 'Live',
			statusColor: '#30d158',
			tags: ['React Native', 'TypeScript'],
			image: '/images/jdm.png',
			links: [{ label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.kitakale.JDMStore' }]
		},
		{
			name: 'The Habits',
			description: 'A simple and intuitive todo list application to manage daily tasks.',
			status: 'Live',
			statusColor: '#30d158',
			tags: ['Flutter'],
			image: '/images/the-habits.png',
			links: [{ label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.ssajudin.the_habits' }]
		},
		{
			name: 'Uang Bijak',
			description: 'An expense tracker app to help manage personal finances.',
			status: 'Live',
			statusColor: '#30d158',
			tags: ['React Native'],
			image: '/images/UangBijak.png',
			links: [{ label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.ssajudn.expensetracker' }]
		},
		{
			name: 'POS System',
			description: 'Point of Sale application built with Flutter & Go for efficient business management.',
			status: 'Building',
			statusColor: '#ff9f0a',
			tags: ['Flutter', 'Golang', 'PostgreSQL'],
			image: null,
			links: [
				{ label: 'Server Repo', url: 'https://github.com/Udean777/POS-App-Server' },
				{ label: 'Client Repo', url: 'https://github.com/Udean777/POS-App-Client' }
			]
		},
		{
			name: 'Fun English',
			description: 'Interactive mobile learning application for early childhood language development.',
			status: 'Live',
			statusColor: '#30d158',
			tags: ['React Native', 'TypeScript', 'Supabase'],
			image: null,
			links: [{ label: 'Play Store', url: 'https://play.google.com/store/apps/details?id=com.editzproject.fun_english' }]
		}
	];

	import Github from '$lib/components/commands/Github.svelte';
</script>

<div class="safari-shell">
	<!-- Toolbar -->
	<div class="safari-toolbar">
		<!-- Navigation -->
		<div class="nav-group">
			<button class="nav-btn" disabled={!canGoBack} onclick={goBack} aria-label="Back">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
			</button>
			<button class="nav-btn" disabled={!canGoForward} onclick={goForward} aria-label="Forward">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
			</button>
		</div>

		<!-- URL Bar -->
		<div class="url-bar">
			<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#30d158" stroke-width="2.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
			<span class="url-text">{currentTab.url}</span>
		</div>

		<!-- Share -->
		<button class="nav-btn" aria-label="Share">
			<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
		</button>
	</div>

	<!-- Tab Bar -->
	<div class="tab-bar">
		{#each tabs as tab}
			<button
				class="tab-item"
				class:tab-active={activeTab === tab.id}
				onclick={() => selectTab(tab.id)}
			>
				<span class="tab-favicon">{tab.favicon}</span>
				<span class="tab-label">{tab.label}</span>
				{#if activeTab === tab.id}
					<span
						class="tab-close"
						aria-label="Close tab"
						role="button"
						tabindex="0"
						onclick={(e) => { e.stopPropagation(); }}
						onkeydown={(e) => { if (e.key === 'Enter') e.stopPropagation(); }}
					>
						<svg width="8" height="8" viewBox="0 0 10 10"><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
					</span>
				{/if}
			</button>
		{/each}
	</div>

	<!-- Content -->
	<div class="safari-content">
		{#if activeTab === 'projects'}
			<div class="projects-page">
				<div class="page-header">
					<h1 class="page-title">Projects</h1>
					<p class="page-subtitle">A selection of things I've built</p>
				</div>
				<div class="projects-grid">
					{#each projects as project}
						<div class="project-card">
							<div class="card-image-wrap">
								{#if project.image}
									<img src={project.image} alt={project.name} class="card-image" />
								{:else}
									<div class="card-image-placeholder">
										<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--mac-text-tertiary)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
									</div>
								{/if}
								<span class="card-status" style="background:{project.statusColor}20;color:{project.statusColor};border-color:{project.statusColor}40;">
									{project.status}
								</span>
							</div>
							<div class="card-body">
								<h3 class="card-name">{project.name}</h3>
								<p class="card-desc">{project.description}</p>
								<div class="card-tags">
									{#each project.tags as tag}
										<span class="card-tag">{tag}</span>
									{/each}
								</div>
								<div class="card-links">
									{#each project.links as link}
										<a href={link.url} target="_blank" class="card-link">
											<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
											{link.label}
										</a>
									{/each}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

		{:else if activeTab === 'github'}
			<div class="github-wrap">
				<Github />
			</div>
		{/if}
	</div>
</div>

<style>
	.safari-shell {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: var(--mac-win-body);
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
	}

	/* Toolbar */
	.safari-toolbar {
		height: 46px;
		background: var(--mac-win-header);
		border-bottom: 1px solid var(--mac-win-border);
		display: flex;
		align-items: center;
		padding: 0 12px;
		gap: 10px;
		flex-shrink: 0;
	}

	.nav-group {
		display: flex;
		gap: 2px;
	}

	.nav-btn {
		width: 28px;
		height: 28px;
		background: none;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--mac-text-secondary);
		transition: background 0.1s, color 0.1s;
	}

	.nav-btn:hover:not(:disabled) {
		background: var(--mac-surface-2);
		color: var(--mac-text);
	}

	.nav-btn:disabled {
		opacity: 0.28;
		cursor: default;
	}

	.url-bar {
		flex: 1;
		height: 28px;
		background: var(--mac-input-bg);
		border: 1px solid var(--mac-input-border);
		border-radius: 7px;
		display: flex;
		align-items: center;
		padding: 0 10px;
		gap: 7px;
	}

	.url-text {
		font-size: 12px;
		color: var(--mac-text-secondary);
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		letter-spacing: -0.01em;
	}

	/* Tab Bar */
	.tab-bar {
		height: 36px;
		background: var(--mac-surface);
		border-bottom: 1px solid var(--mac-separator);
		display: flex;
		align-items: flex-end;
		padding: 0 10px;
		gap: 2px;
		flex-shrink: 0;
	}

	.tab-item {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 0 10px;
		height: 30px;
		background: none;
		border: none;
		border-radius: 7px 7px 0 0;
		cursor: pointer;
		font-size: 12px;
		font-family: inherit;
		color: var(--mac-text-secondary);
		transition: background 0.1s, color 0.1s;
		position: relative;
		max-width: 180px;
	}

	.tab-item:hover {
		background: var(--mac-surface-2);
		color: var(--mac-text);
	}

	.tab-item.tab-active {
		background: var(--mac-win-body);
		color: var(--mac-text);
		font-weight: 500;
		box-shadow: 0 -1px 0 var(--mac-separator);
	}

	.tab-favicon { font-size: 13px; }

	.tab-label {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 120px;
	}

	.tab-close {
		width: 14px;
		height: 14px;
		background: var(--mac-surface-2);
		border: none;
		border-radius: 50%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--mac-text-secondary);
		padding: 0;
		flex-shrink: 0;
		margin-left: 2px;
	}

	.tab-close:hover {
		background: var(--mac-surface-3);
	}

	/* Content */
	.safari-content {
		flex: 1;
		overflow-y: auto;
	}

	/* Projects Page */
	.projects-page {
		padding: 24px 28px 40px;
	}

	.page-header {
		margin-bottom: 24px;
	}

	.page-title {
		font-size: 22px;
		font-weight: 700;
		color: var(--mac-text);
		margin: 0 0 4px;
		letter-spacing: -0.03em;
	}

	.page-subtitle {
		font-size: 13px;
		color: var(--mac-text-secondary);
		margin: 0;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 16px;
	}

	.project-card {
		background: var(--mac-surface);
		border: 1px solid var(--mac-separator);
		border-radius: 12px;
		overflow: hidden;
		transition: transform 0.15s, box-shadow 0.15s;
	}

	.project-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 24px rgba(0,0,0,0.12);
	}

	.card-image-wrap {
		position: relative;
		height: 130px;
		background: var(--mac-surface-2);
		overflow: hidden;
	}

	.card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.card-image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card-status {
		position: absolute;
		top: 8px;
		right: 8px;
		font-size: 10px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 20px;
		border: 1px solid;
	}

	.card-body {
		padding: 14px;
	}

	.card-name {
		font-size: 14px;
		font-weight: 700;
		color: var(--mac-text);
		margin: 0 0 5px;
		letter-spacing: -0.01em;
	}

	.card-desc {
		font-size: 12px;
		color: var(--mac-text-secondary);
		margin: 0 0 10px;
		line-height: 1.5;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		margin-bottom: 10px;
	}

	.card-tag {
		font-size: 10px;
		padding: 2px 7px;
		background: var(--mac-input-bg);
		border: 1px solid var(--mac-input-border);
		border-radius: 5px;
		color: var(--mac-text-secondary);
		font-weight: 500;
	}

	.card-links {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.card-link {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 11px;
		color: var(--mac-accent);
		text-decoration: none;
		font-weight: 500;
		transition: opacity 0.1s;
	}

	.card-link:hover { opacity: 0.75; }

	/* GitHub wrap */
	.github-wrap {
		padding: 16px;
		--color-accent: #0a84ff;
		--color-muted: #8e8e93;
		--color-output: var(--mac-text);
		--color-command: var(--mac-text);
		--color-background: var(--mac-win-body);
	}

	/* ── Responsive ── */
	@media (max-width: 1023px) {
		.safari-toolbar { height: 40px; padding: 0 8px; gap: 6px; }
		.tab-bar { padding: 0 6px; }
		.tab-label { max-width: 80px; }
		.projects-page { padding: 16px 14px 32px; }
		.projects-grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
	}

	@media (max-width: 600px) {
		.nav-group { display: none; }
		.safari-toolbar { height: 38px; }
		.tab-bar { height: 32px; }
		.tab-item { font-size: 11px; padding: 0 8px; height: 26px; }
		.tab-favicon { display: none; }
		.projects-page { padding: 12px 10px 28px; }
		.projects-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
		.card-image-wrap { height: 100px; }
		.card-body { padding: 10px; }
		.card-name { font-size: 13px; }
		.card-desc { font-size: 11px; }
		.page-title { font-size: 18px; }
		.github-wrap { padding: 10px; }
	}

	@media (max-width: 380px) {
		.projects-grid { grid-template-columns: 1fr; }
	}
</style>
