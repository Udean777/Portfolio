<script lang="ts">
	import { desktopStore } from '$lib/stores/desktop';

	type ViewMode = 'icons' | 'list';

	let viewMode = $state<ViewMode>('icons');
	let searchQuery = $state('');
	let activeSidebar = $state('desktop');
	let breadcrumb = $state(['Desktop']);

	const sidebarItems = [
		{
			section: 'Favorites',
			items: [
				{ id: 'desktop', label: 'Desktop', icon: 'desktop' },
				{ id: 'apps', label: 'Applications', icon: 'apps' },
				{ id: 'documents', label: 'Documents', icon: 'docs' }
			]
		},
		{
			section: 'Locations',
			items: [
				{ id: 'portfolio', label: "Sajudin's Portfolio", icon: 'mac' }
			]
		}
	];

	interface FileItem {
		name: string;
		icon: string;
		type: string;
		size: string;
		modified: string;
		windowId?: string;
	}

	const contentByLocation: Record<string, FileItem[]> = {
		desktop: [
			{ name: 'About Me.note', icon: 'notes', type: 'Note', size: '—', modified: 'Jun 3, 2026', windowId: 'notes' },
			{ name: 'Projects.safari', icon: 'safari', type: 'Web Page', size: '—', modified: 'Jun 3, 2026', windowId: 'safari' },
			{ name: 'Terminal.app', icon: 'terminal', type: 'Application', size: '—', modified: 'Jun 3, 2026', windowId: 'terminal' },
			{ name: 'Mail.app', icon: 'mail', type: 'Application', size: '—', modified: 'Jun 3, 2026', windowId: 'mail' },
			{ name: 'System Settings.app', icon: 'settings', type: 'Application', size: '—', modified: 'Jun 3, 2026', windowId: 'settings' }
		],
		apps: [
			{ name: 'Terminal', icon: 'terminal', type: 'Application', size: '—', modified: 'Jun 3, 2026', windowId: 'terminal' },
			{ name: 'Safari', icon: 'safari', type: 'Application', size: '—', modified: 'Jun 3, 2026', windowId: 'safari' },
			{ name: 'Notes', icon: 'notes', type: 'Application', size: '—', modified: 'Jun 3, 2026', windowId: 'notes' },
			{ name: 'Mail', icon: 'mail', type: 'Application', size: '—', modified: 'Jun 3, 2026', windowId: 'mail' },
			{ name: 'System Settings', icon: 'settings', type: 'Application', size: '—', modified: 'Jun 3, 2026', windowId: 'settings' }
		],
		documents: [
			{ name: "CV-Sajudin-ma'ruf.pdf", icon: 'pdf', type: 'PDF Document', size: '312 KB', modified: 'Jun 1, 2026' }
		],
		portfolio: [
			{ name: 'src', icon: 'folder', type: 'Folder', size: '—', modified: 'Jun 3, 2026' },
			{ name: 'static', icon: 'folder', type: 'Folder', size: '—', modified: 'Jun 3, 2026' },
			{ name: 'package.json', icon: 'file', type: 'JSON File', size: '1 KB', modified: 'Jun 3, 2026' },
			{ name: 'svelte.config.js', icon: 'file', type: 'JS File', size: '0.6 KB', modified: 'Jun 3, 2026' },
			{ name: 'README.md', icon: 'file', type: 'Markdown', size: '2 KB', modified: 'Jun 3, 2026' }
		]
	};

	const filtered = $derived(() => {
		const items = contentByLocation[activeSidebar] ?? [];
		if (!searchQuery.trim()) return items;
		return items.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
	});

	function openItem(item: FileItem) {
		if (item.windowId) desktopStore.openWindow(item.windowId);
	}

	function selectSidebar(id: string, label: string) {
		activeSidebar = id;
		breadcrumb = [label];
		searchQuery = '';
	}

	const iconColors: Record<string, string> = {
		notes: '#f59e0b',
		safari: '#0ea5e9',
		terminal: '#1f2937',
		mail: '#3b82f6',
		settings: '#9ca3af',
		folder: '#f59e0b',
		pdf: '#ef4444',
		file: '#8b5cf6'
	};
</script>

<div class="finder-shell">
	<!-- Sidebar -->
	<div class="finder-sidebar">
		{#each sidebarItems as section}
			<div class="sidebar-section">
				<div class="sidebar-section-title">{section.section}</div>
				{#each section.items as item}
					<button
						class="sidebar-item"
						class:sidebar-active={activeSidebar === item.id}
						onclick={() => selectSidebar(item.id, item.label)}
					>
						<!-- Sidebar icons -->
						{#if item.icon === 'desktop'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
						{:else if item.icon === 'apps'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/></svg>
						{:else if item.icon === 'docs'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
						{:else if item.icon === 'mac'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
						{/if}
						<span>{item.label}</span>
					</button>
				{/each}
			</div>
		{/each}
	</div>

	<!-- Main area -->
	<div class="finder-main">
		<!-- Toolbar -->
		<div class="finder-toolbar">
			<div class="toolbar-left">
				<button class="toolbar-btn" aria-label="Back" disabled onclick={() => {}}>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
				</button>
				<button class="toolbar-btn" aria-label="Forward" disabled onclick={() => {}}>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
				</button>
			</div>

			<div class="view-switcher">
				<button class="view-btn" class:view-active={viewMode === 'icons'} onclick={() => (viewMode = 'icons')} aria-label="Icon view">
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
				</button>
				<button class="view-btn" class:view-active={viewMode === 'list'} onclick={() => (viewMode = 'list')} aria-label="List view">
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
				</button>
			</div>

			<div class="search-wrap">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
				<input
					class="search-input"
					type="text"
					placeholder="Search"
					bind:value={searchQuery}
				/>
			</div>
		</div>

		<!-- Breadcrumb / Pathbar -->
		<div class="pathbar">
			{#each breadcrumb as crumb, i}
				{#if i > 0}<span class="path-sep">›</span>{/if}
				<span class="path-item">{crumb}</span>
			{/each}
		</div>

		<!-- File Grid / List -->
		<div class="finder-content">
			{#if viewMode === 'icons'}
				<div class="file-grid">
					{#each filtered() as file}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
						<div class="file-icon-item" onclick={() => openItem(file)} role="button" tabindex="0">
							<div class="file-icon-wrap" style="background:{iconColors[file.icon] || '#8b5cf6'}22; border-color:{iconColors[file.icon] || '#8b5cf6'}33;">
								{#if file.icon === 'folder'}
									<svg width="28" height="28" viewBox="0 0 24 24" fill="{iconColors.folder}" stroke="none"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
								{:else if file.icon === 'pdf'}
									<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="12" y2="17"/></svg>
								{:else}
									<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="{iconColors[file.icon] || '#8b5cf6'}" stroke-width="1.5" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
								{/if}
							</div>
							<span class="file-name">{file.name}</span>
						</div>
					{/each}
				</div>

			{:else}
				<!-- List View -->
				<table class="file-table">
					<thead>
						<tr class="table-head">
							<th class="th-name">Name</th>
							<th class="th-col">Type</th>
							<th class="th-col">Size</th>
							<th class="th-col">Modified</th>
						</tr>
					</thead>
					<tbody>
						{#each filtered() as file}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<tr class="table-row" onclick={() => openItem(file)} role="button" tabindex="0">
								<td class="td-name">
									<span class="td-icon" style="color:{iconColors[file.icon] || '#8b5cf6'}">
										{#if file.icon === 'folder'}📁
										{:else if file.icon === 'pdf'}📄
										{:else if file.icon === 'notes'}📝
										{:else if file.icon === 'safari'}🌐
										{:else if file.icon === 'terminal'}💻
										{:else if file.icon === 'mail'}✉️
										{:else if file.icon === 'settings'}⚙️
										{:else}📄{/if}
									</span>
									{file.name}
								</td>
								<td class="td-col">{file.type}</td>
								<td class="td-col">{file.size}</td>
								<td class="td-col">{file.modified}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</div>

		<!-- Status bar -->
		<div class="statusbar">
			{filtered().length} item{filtered().length !== 1 ? 's' : ''}
		</div>
	</div>
</div>

<style>
	.finder-shell {
		display: flex;
		height: 100%;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
		background: var(--mac-win-body);
	}

	/* Sidebar */
	.finder-sidebar {
		width: 170px;
		background: var(--mac-sidebar-bg);
		border-right: 1px solid var(--mac-sidebar-border);
		flex-shrink: 0;
		overflow-y: auto;
		padding: 8px 0;
		user-select: none;
	}

	.sidebar-section { margin-bottom: 6px; }

	.sidebar-section-title {
		font-size: 10px;
		font-weight: 700;
		color: var(--mac-text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		padding: 6px 12px 3px;
	}

	.sidebar-item {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 5px 12px;
		width: 100%;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 12px;
		font-family: inherit;
		color: var(--mac-sidebar-text);
		text-align: left;
		border-radius: 6px;
		margin: 0 4px;
		width: calc(100% - 8px);
		transition: background 0.1s;
	}

	.sidebar-item:hover { background: var(--mac-sidebar-active); }
	.sidebar-item.sidebar-active {
		background: var(--mac-accent);
		color: #fff;
	}

	/* Main */
	.finder-main {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	/* Toolbar */
	.finder-toolbar {
		height: 44px;
		background: var(--mac-win-header);
		border-bottom: 1px solid var(--mac-separator);
		display: flex;
		align-items: center;
		padding: 0 12px;
		gap: 8px;
		flex-shrink: 0;
	}

	.toolbar-left { display: flex; gap: 2px; }

	.toolbar-btn {
		width: 26px;
		height: 26px;
		background: none;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--mac-text-secondary);
		transition: background 0.1s;
	}

	.toolbar-btn:disabled { opacity: 0.28; cursor: default; }

	.view-switcher {
		display: flex;
		background: var(--mac-input-bg);
		border: 1px solid var(--mac-input-border);
		border-radius: 6px;
		overflow: hidden;
	}

	.view-btn {
		width: 28px;
		height: 24px;
		background: none;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--mac-text-secondary);
		transition: background 0.1s, color 0.1s;
	}

	.view-btn.view-active {
		background: var(--mac-accent);
		color: #fff;
	}

	.search-wrap {
		display: flex;
		align-items: center;
		gap: 6px;
		background: var(--mac-input-bg);
		border: 1px solid var(--mac-input-border);
		border-radius: 7px;
		padding: 0 10px;
		height: 26px;
		margin-left: auto;
		color: var(--mac-text-secondary);
	}

	.search-input {
		background: none;
		border: none;
		outline: none;
		font-size: 12px;
		color: var(--mac-text);
		font-family: inherit;
		width: 120px;
	}

	.search-input::placeholder { color: var(--mac-text-tertiary); }

	/* Pathbar */
	.pathbar {
		height: 28px;
		border-bottom: 1px solid var(--mac-separator);
		display: flex;
		align-items: center;
		padding: 0 14px;
		gap: 4px;
		flex-shrink: 0;
	}

	.path-item { font-size: 11px; color: var(--mac-text-secondary); font-weight: 500; }
	.path-sep { font-size: 11px; color: var(--mac-text-tertiary); }

	/* Content */
	.finder-content { flex: 1; overflow-y: auto; }

	/* Icon Grid */
	.file-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
		gap: 8px;
		padding: 16px;
	}

	.file-icon-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 8px 6px;
		border-radius: 8px;
		cursor: pointer;
		transition: background 0.1s;
		user-select: none;
	}

	.file-icon-item:hover { background: var(--mac-sidebar-active); }

	.file-icon-wrap {
		width: 44px;
		height: 44px;
		border-radius: 10px;
		border: 1px solid;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.file-name {
		font-size: 10px;
		color: var(--mac-text);
		text-align: center;
		word-break: break-word;
		line-height: 1.3;
		max-width: 72px;
	}

	/* List / Table */
	.file-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 12px;
	}

	.table-head th {
		padding: 7px 14px;
		text-align: left;
		font-size: 11px;
		font-weight: 600;
		color: var(--mac-text-secondary);
		border-bottom: 1px solid var(--mac-separator);
		background: var(--mac-surface);
		user-select: none;
	}

	.th-name { width: 50%; }
	.th-col { width: auto; color: var(--mac-text-secondary); }

	.table-row {
		cursor: pointer;
		transition: background 0.08s;
	}

	.table-row:hover td { background: var(--mac-sidebar-active); }

	.table-row td {
		padding: 7px 14px;
		border-bottom: 1px solid var(--mac-separator);
		color: var(--mac-text);
	}

	.td-name {
		display: flex;
		align-items: center;
		gap: 8px;
		font-weight: 500;
	}

	.td-icon { font-size: 15px; flex-shrink: 0; }

	.td-col {
		color: var(--mac-text-secondary);
		font-size: 11px;
	}

	/* Statusbar */
	.statusbar {
		height: 24px;
		border-top: 1px solid var(--mac-separator);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
		color: var(--mac-text-secondary);
		flex-shrink: 0;
		background: var(--mac-surface);
	}

	/* ── Responsive ── */
	@media (max-width: 1023px) {
		.finder-sidebar { width: 140px; }
		.search-input { width: 90px; }
	}

	@media (max-width: 600px) {
		.finder-shell { flex-direction: column; }

		.finder-sidebar {
			width: 100%;
			flex-direction: row;
			height: auto;
			border-right: none;
			border-bottom: 1px solid var(--mac-sidebar-border);
			padding: 0;
		}

		.sidebar-section { margin: 0; }

		.sidebar-section-title { display: none; }

		.sidebar-item {
			width: auto;
			margin: 0;
			border-radius: 0;
			padding: 10px 14px;
			font-size: 12px;
			border-bottom: 2px solid transparent;
		}

		.sidebar-item.sidebar-active {
			background: transparent;
			border-bottom-color: var(--mac-accent);
			color: var(--mac-accent);
		}

		.finder-toolbar { height: 38px; padding: 0 8px; gap: 4px; }
		.search-input { width: 70px; }
		.file-grid { grid-template-columns: repeat(auto-fill, minmax(68px, 1fr)); gap: 6px; padding: 10px; }
		.file-icon-wrap { width: 38px; height: 38px; }
		.file-name { font-size: 9px; }
		.statusbar { height: 20px; font-size: 10px; }
	}
</style>
