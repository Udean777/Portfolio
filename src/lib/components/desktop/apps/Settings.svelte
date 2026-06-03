<script lang="ts">
	import { desktopStore } from '$lib/stores/desktop';
	import { themeStore } from '$lib/stores/theme';
	import { soundEnabled } from '$lib/stores/sound';
	import { themes } from '$lib/utils/themes';
	import { WALLPAPERS } from '$lib/stores/desktop';

	type Section = 'general' | 'wallpaper' | 'appearance' | 'sound' | 'about';

	let activeSection = $state<Section>('general');

	const sections: { id: Section; icon: string; label: string }[] = [
		{ id: 'general', icon: 'general', label: 'General' },
		{ id: 'wallpaper', icon: 'wallpaper', label: 'Wallpaper' },
		{ id: 'appearance', icon: 'appearance', label: 'Appearance' },
		{ id: 'sound', icon: 'sound', label: 'Sound' },
		{ id: 'about', icon: 'about', label: 'About' }
	];

	const themeNames = Object.keys(themes) as (keyof typeof themes)[];

	const accentColors = [
		{ name: 'Blue', value: '#0a84ff' },
		{ name: 'Purple', value: '#bf5af2' },
		{ name: 'Pink', value: '#ff375f' },
		{ name: 'Red', value: '#ff453a' },
		{ name: 'Orange', value: '#ff9f0a' },
		{ name: 'Yellow', value: '#ffd60a' },
		{ name: 'Green', value: '#30d158' },
		{ name: 'Graphite', value: '#8e8e93' }
	];
</script>

<div class="settings-shell">
	<!-- Profile Header -->
	<div class="settings-header">
		<div class="profile-avatar">
			<img src="/images/profile-img.png" alt="Sajudin" class="avatar" />
		</div>
		<div class="profile-info">
			<div class="profile-name">Sajudin Ma'ruf</div>
			<div class="profile-sub">sajudinmaruf@gmail.com</div>
		</div>
	</div>

	<div class="settings-body">
		<!-- Sidebar -->
		<div class="settings-sidebar">
			{#each sections as sec}
				<button
					class="sec-item"
					class:sec-active={activeSection === sec.id}
					onclick={() => (activeSection = sec.id)}
				>
					<span class="sec-icon-wrap">
						{#if sec.icon === 'general'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/>{#each [0,60,120,180,240,300] as deg}<rect x="11" y="2" width="2" height="4" rx="1" transform="rotate({deg} 12 12)"/>{/each}</svg>
						{:else if sec.icon === 'wallpaper'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="3"/><circle cx="8.5" cy="8.5" r="2"/><polyline points="21 15 16 10 5 21"/></svg>
						{:else if sec.icon === 'appearance'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20A10 10 0 1 1 12 2"/></svg>
						{:else if sec.icon === 'sound'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
						{:else if sec.icon === 'about'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
						{/if}
					</span>
					{sec.label}
				</button>
			{/each}
		</div>

		<!-- Content Panel -->
		<div class="settings-content">

			{#if activeSection === 'general'}
				<div class="panel">
					<h2 class="panel-title">General</h2>

					<div class="setting-group">
						<div class="group-label">Appearance</div>
						<div class="appearance-toggle">
							<button
								class="appearance-option"
								class:appearance-active={$desktopStore.desktopTheme === 'dark'}
								onclick={() => desktopStore.setDesktopTheme('dark')}
							>
								<div class="appearance-preview dark-preview">
									<div class="preview-bar"></div>
									<div class="preview-dots"><span></span><span></span><span></span></div>
								</div>
								<span class="appearance-label">Dark</span>
							</button>
							<button
								class="appearance-option"
								class:appearance-active={$desktopStore.desktopTheme === 'light'}
								onclick={() => desktopStore.setDesktopTheme('light')}
							>
								<div class="appearance-preview light-preview">
									<div class="preview-bar"></div>
									<div class="preview-dots"><span></span><span></span><span></span></div>
								</div>
								<span class="appearance-label">Light</span>
							</button>
						</div>
					</div>

					<div class="separator"></div>

					<div class="setting-group">
						<div class="group-label">Accent Color</div>
						<div class="accent-colors">
							{#each accentColors as color}
								<button
									class="accent-dot"
									aria-label="Set accent color to {color.name}"
									title={color.name}
									style="background:{color.value};"
									onclick={() => {}}
								>
									<div class="accent-check">
										<svg width="8" height="8" viewBox="0 0 10 10"><polyline points="2 5 4 8 8 2" stroke="white" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
									</div>
								</button>
							{/each}
						</div>
					</div>
				</div>

			{:else if activeSection === 'wallpaper'}
				<div class="panel">
					<h2 class="panel-title">Wallpaper</h2>
					<p class="panel-subtitle">Choose a desktop wallpaper</p>
					<div class="wallpaper-grid">
						{#each WALLPAPERS as wp}
							<button
								class="wallpaper-thumb"
								class:wp-active={$desktopStore.wallpaper === wp.value}
								style="background:{wp.value};"
								onclick={() => desktopStore.setWallpaper(wp.value)}
								title={wp.label}
							>
								{#if $desktopStore.wallpaper === wp.value}
									<div class="wp-check">
										<svg width="12" height="12" viewBox="0 0 16 16"><polyline points="3 8 6.5 12 13 4" stroke="white" stroke-width="2" stroke-linecap="round" fill="none"/></svg>
									</div>
								{/if}
							</button>
						{/each}
					</div>
					<div class="wp-labels">
						{#each WALLPAPERS as wp}
							<span class="wp-label" class:wp-label-active={$desktopStore.wallpaper === wp.value}>{wp.label}</span>
						{/each}
					</div>
				</div>

			{:else if activeSection === 'appearance'}
				<div class="panel">
					<h2 class="panel-title">Terminal Theme</h2>
					<p class="panel-subtitle">Color scheme for the Terminal app</p>
					<div class="theme-grid">
						{#each themeNames as name}
							{@const theme = themes[name]}
							<button
								class="theme-swatch"
								class:theme-active={$themeStore.name === name}
								onclick={() => themeStore.setTheme(name)}
								title={name}
							>
								<div class="swatch-preview" style="background:{theme.colors.background};">
									<div class="swatch-prompt" style="color:{theme.colors.prompt};">$</div>
									<div class="swatch-text" style="background:{theme.colors.accent}; opacity:0.7; height:4px; border-radius:2px; margin-top:3px; width:70%;"></div>
									<div class="swatch-text" style="background:{theme.colors.output}; opacity:0.5; height:3px; border-radius:2px; margin-top:3px; width:50%;"></div>
								</div>
								<div class="swatch-name">{name}</div>
								{#if $themeStore.name === name}
									<div class="swatch-active-dot"></div>
								{/if}
							</button>
						{/each}
					</div>
				</div>

			{:else if activeSection === 'sound'}
				<div class="panel">
					<h2 class="panel-title">Sound</h2>
					<div class="setting-row">
						<div class="setting-label">
							<div class="setting-name">Keyboard Click Sound</div>
							<div class="setting-desc">Mechanical keyboard sound effects in Terminal</div>
						</div>
						<button
							class="toggle-switch"
							class:toggle-on={$soundEnabled}
							onclick={() => soundEnabled.set(!$soundEnabled)}
							aria-label="Toggle keyboard sounds"
						>
							<div class="toggle-knob"></div>
						</button>
					</div>
				</div>

			{:else if activeSection === 'about'}
				<div class="panel">
					<h2 class="panel-title">About This Mac</h2>
				<div class="about-logo">
						<img src="/images/icons/apple.png" alt="Apple" width="72" height="88" style="object-fit:contain;display:block;opacity:0.75;" draggable="false" />
					</div>
					<div class="about-name">macOS Portfolio</div>
					<div class="about-version">Version 2.0 (2026)</div>
					<div class="separator"></div>
					<div class="about-table">
						<div class="about-row"><span class="about-key">Developer</span><span class="about-val">Sajudin Ma'ruf</span></div>
						<div class="about-row"><span class="about-key">Framework</span><span class="about-val">SvelteKit 5 + Svelte 5</span></div>
						<div class="about-row"><span class="about-key">Styling</span><span class="about-val">Tailwind CSS v4</span></div>
						<div class="about-row"><span class="about-key">Language</span><span class="about-val">TypeScript</span></div>
						<div class="about-row"><span class="about-key">Runtime</span><span class="about-val">Bun</span></div>
						<div class="about-row"><span class="about-key">Deployed</span><span class="about-val">sajudin.my.id</span></div>
					</div>
				</div>
			{/if}

		</div>
	</div>
</div>

<style>
	.settings-shell {
		display: flex;
		flex-direction: column;
		height: 100%;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
		background: var(--mac-win-body);
	}

	/* Profile header */
	.settings-header {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 18px 22px;
		border-bottom: 1px solid var(--mac-separator);
		background: var(--mac-win-header);
		flex-shrink: 0;
	}

	.profile-avatar {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		overflow: hidden;
		border: 2px solid var(--mac-separator);
		flex-shrink: 0;
	}

	.avatar {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.profile-name {
		font-size: 15px;
		font-weight: 600;
		color: var(--mac-text);
		letter-spacing: -0.01em;
	}

	.profile-sub {
		font-size: 12px;
		color: var(--mac-text-secondary);
		margin-top: 2px;
	}

	/* Body */
	.settings-body {
		display: flex;
		flex: 1;
		overflow: hidden;
	}

	/* Sidebar */
	.settings-sidebar {
		width: 200px;
		background: var(--mac-sidebar-bg);
		border-right: 1px solid var(--mac-sidebar-border);
		flex-shrink: 0;
		padding: 12px 8px;
		overflow-y: auto;
	}

	.sec-item {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 8px 12px;
		background: none;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-size: 13px;
		font-family: inherit;
		font-weight: 500;
		color: var(--mac-sidebar-text);
		text-align: left;
		transition: background 0.1s;
		margin-bottom: 1px;
	}

	.sec-item:hover { background: var(--mac-sidebar-active); }
	.sec-item.sec-active {
		background: var(--mac-accent);
		color: #fff;
	}
	.sec-item.sec-active .sec-icon-wrap { color: #fff; }

	.sec-icon-wrap {
		width: 22px;
		height: 22px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--mac-text-secondary);
		flex-shrink: 0;
	}

	/* Content */
	.settings-content {
		flex: 1;
		overflow-y: auto;
	}

	.panel {
		padding: 24px 28px;
		max-width: 560px;
	}

	.panel-title {
		font-size: 20px;
		font-weight: 700;
		color: var(--mac-text);
		margin: 0 0 4px;
		letter-spacing: -0.03em;
	}

	.panel-subtitle {
		font-size: 12px;
		color: var(--mac-text-secondary);
		margin: 0 0 20px;
	}

	.separator {
		height: 1px;
		background: var(--mac-separator);
		margin: 20px 0;
	}

	.setting-group { margin-bottom: 20px; }

	.group-label {
		font-size: 12px;
		font-weight: 600;
		color: var(--mac-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin-bottom: 10px;
	}

	/* Appearance toggle */
	.appearance-toggle {
		display: flex;
		gap: 16px;
	}

	.appearance-option {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		background: none;
		border: 2px solid var(--mac-separator);
		border-radius: 10px;
		padding: 10px;
		cursor: pointer;
		transition: border-color 0.15s;
	}

	.appearance-option.appearance-active {
		border-color: var(--mac-accent);
	}

	.appearance-preview {
		width: 80px;
		height: 52px;
		border-radius: 6px;
		overflow: hidden;
		position: relative;
	}

	.dark-preview { background: #1c1c1e; }
	.light-preview { background: #f5f5f7; }

	.preview-bar {
		height: 10px;
		background: rgba(128,128,128,0.2);
	}

	.preview-dots {
		display: flex;
		gap: 3px;
		padding: 4px 5px;
	}

	.preview-dots span {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: rgba(128,128,128,0.35);
	}

	.appearance-label {
		font-size: 12px;
		font-weight: 500;
		color: var(--mac-text);
	}

	/* Accent colors */
	.accent-colors {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.accent-dot {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		border: none;
		cursor: pointer;
		position: relative;
		transition: transform 0.1s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.accent-dot:hover { transform: scale(1.15); }

	.accent-check { display: none; }

	/* Wallpaper grid */
	.wallpaper-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
		margin-bottom: 10px;
	}

	.wallpaper-thumb {
		height: 72px;
		border-radius: 8px;
		cursor: pointer;
		border: 2px solid transparent;
		position: relative;
		transition: border-color 0.15s, transform 0.12s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.wallpaper-thumb:hover { transform: scale(1.03); border-color: var(--mac-separator); }

	.wallpaper-thumb.wp-active { border-color: var(--mac-accent); }

	.wp-check {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--mac-accent);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.wp-labels {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
	}

	.wp-label {
		font-size: 10px;
		color: var(--mac-text-tertiary);
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.wp-label-active { color: var(--mac-accent); font-weight: 600; }

	/* Theme swatches */
	.theme-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10px;
		margin-top: 12px;
	}

	.theme-swatch {
		background: none;
		border: 2px solid var(--mac-separator);
		border-radius: 10px;
		cursor: pointer;
		padding: 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		transition: border-color 0.15s, transform 0.12s;
		position: relative;
	}

	.theme-swatch:hover { transform: scale(1.03); }
	.theme-swatch.theme-active { border-color: var(--mac-accent); }

	.swatch-preview {
		width: 100%;
		height: 48px;
		border-radius: 6px;
		padding: 6px 8px;
		overflow: hidden;
	}

	.swatch-prompt {
		font-family: 'JetBrains Mono', monospace;
		font-size: 11px;
		font-weight: 700;
		line-height: 1;
	}

	.swatch-name {
		font-size: 10px;
		color: var(--mac-text-secondary);
		font-weight: 500;
		text-align: center;
	}

	.swatch-active-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--mac-accent);
		position: absolute;
		top: 6px;
		right: 6px;
	}

	/* Sound */
	.setting-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 14px 16px;
		background: var(--mac-surface);
		border-radius: 10px;
		border: 1px solid var(--mac-separator);
	}

	.setting-name {
		font-size: 13px;
		font-weight: 500;
		color: var(--mac-text);
	}

	.setting-desc {
		font-size: 11px;
		color: var(--mac-text-secondary);
		margin-top: 2px;
	}

	/* Toggle switch */
	.toggle-switch {
		width: 40px;
		height: 24px;
		border-radius: 12px;
		background: var(--mac-surface-3);
		border: none;
		cursor: pointer;
		padding: 2px;
		display: flex;
		align-items: center;
		transition: background 0.2s;
		flex-shrink: 0;
	}

	.toggle-switch.toggle-on { background: var(--mac-accent); }

	.toggle-knob {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: white;
		box-shadow: 0 1px 3px rgba(0,0,0,0.28);
		transition: transform 0.2s;
	}

	.toggle-on .toggle-knob { transform: translateX(16px); }

	/* About */
	.about-logo {
		display: flex;
		justify-content: center;
		padding: 20px 0 10px;
	}

	.about-name {
		text-align: center;
		font-size: 18px;
		font-weight: 700;
		color: var(--mac-text);
		letter-spacing: -0.02em;
	}

	.about-version {
		text-align: center;
		font-size: 13px;
		color: var(--mac-text-secondary);
		margin-top: 4px;
		margin-bottom: 4px;
	}

	.about-table { display: flex; flex-direction: column; gap: 1px; }

	.about-row {
		display: flex;
		padding: 9px 0;
		border-bottom: 1px solid var(--mac-separator);
		font-size: 13px;
	}

	.about-row:last-child { border-bottom: none; }
	.about-key { width: 110px; color: var(--mac-text-secondary); font-weight: 500; flex-shrink: 0; }
	.about-val { color: var(--mac-text); }

	/* ── Responsive ── */
	@media (max-width: 1023px) {
		.settings-sidebar { width: 160px; }
		.wallpaper-grid { grid-template-columns: repeat(3, 1fr); }
		.wp-labels { grid-template-columns: repeat(3, 1fr); }
		.theme-grid { grid-template-columns: repeat(3, 1fr); }
	}

	@media (max-width: 600px) {
		.settings-shell { flex-direction: column; }

		.settings-header { padding: 12px 14px; }
		.profile-avatar { width: 40px; height: 40px; }
		.profile-name { font-size: 14px; }
		.profile-sub { font-size: 11px; }

		.settings-body { flex-direction: column; }

		/* Sidebar becomes horizontal tab bar */
		.settings-sidebar {
			width: 100%;
			border-right: none;
			border-bottom: 1px solid var(--mac-sidebar-border);
			padding: 0;
			display: flex;
			flex-direction: row;
			overflow-x: auto;
			-ms-overflow-style: none;
			scrollbar-width: none;
		}

		.settings-sidebar::-webkit-scrollbar { display: none; }

		.sec-item {
			width: auto;
			flex-shrink: 0;
			flex-direction: column;
			gap: 3px;
			padding: 8px 14px;
			border-radius: 0;
			font-size: 10px;
			border-bottom: 2px solid transparent;
			margin-bottom: 0;
		}

		.sec-item.sec-active {
			background: transparent;
			color: var(--mac-accent);
			border-bottom-color: var(--mac-accent);
		}

		.sec-icon-wrap { width: 18px; height: 18px; }

		.panel { padding: 14px 14px 28px; }
		.panel-title { font-size: 16px; }
		.wallpaper-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
		.wallpaper-thumb { height: 56px; }
		.wp-labels { grid-template-columns: repeat(3, 1fr); }
		.theme-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
		.swatch-preview { height: 40px; }
		.appearance-toggle { gap: 10px; }
		.appearance-preview { width: 64px; height: 42px; }
	}
</style>
