<script lang="ts">
	import { onMount } from 'svelte';
	import { desktopStore } from '$lib/stores/desktop';
	import { soundEnabled } from '$lib/stores/sound';

	let currentTime = $state('');
	let currentDate = $state('');

	let openMenu = $state<string | null>(null);
	let showControlCenter = $state(false);
	let showCalendar = $state(false);
	let desktopState = $state<any>(null);

	const unsubDesktop = desktopStore.subscribe((s) => (desktopState = s));

	function updateTime() {
		const now = new Date();
		currentTime = now.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		});
		currentDate = now.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric'
		});
	}

	onMount(() => {
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => {
			clearInterval(interval);
			unsubDesktop();
		};
	});

	function closeAll() {
		openMenu = null;
		showControlCenter = false;
		showCalendar = false;
	}

	function toggleMenu(name: string) {
		openMenu = openMenu === name ? null : name;
		showControlCenter = false;
		showCalendar = false;
	}

	function toggleControlCenter() {
		showControlCenter = !showControlCenter;
		openMenu = null;
		showCalendar = false;
	}

	function toggleCalendar() {
		showCalendar = !showCalendar;
		openMenu = null;
		showControlCenter = false;
	}

	function handleAction(action: string) {
		closeAll();
		if (action === 'settings') desktopStore.openWindow('settings');
		else if (action === 'reload') window.location.reload();
		else if (action === 'terminal') desktopStore.openWindow('terminal');
		else if (action === 'finder') desktopStore.openWindow('finder');
		else if (action === 'safari') desktopStore.openWindow('safari');
		else if (action === 'notes') desktopStore.openWindow('notes');
		else if (action === 'mail') desktopStore.openWindow('mail');
		else if (action === 'closeActive') {
			if (desktopState?.activeWindowId) desktopStore.closeWindow(desktopState.activeWindowId);
		} else if (action === 'minimizeActive') {
			if (desktopState?.activeWindowId) desktopStore.minimizeWindow(desktopState.activeWindowId);
		} else if (action === 'fullscreenActive') {
			if (desktopState?.activeWindowId) desktopStore.toggleFullscreen(desktopState.activeWindowId);
		}
	}

	const activeApp = $derived(() => {
		const id = desktopState?.activeWindowId;
		if (!id) return 'Finder';
		const map: Record<string, string> = {
			terminal: 'Terminal',
			finder: 'Finder',
			safari: 'Safari',
			notes: 'Notes',
			settings: 'System Settings',
			mail: 'Mail'
		};
		return map[id] ?? 'Finder';
	});

	const appMenus: Record<string, { label: string; action?: string; shortcut?: string; separator?: boolean; disabled?: boolean }[]> = {
		Terminal: [
			{ label: 'New Window', action: 'terminal', shortcut: '⌘N' },
			{ separator: true, label: '' },
			{ label: 'Clear Screen', action: 'clearTerminal', shortcut: '⌘K' },
			{ separator: true, label: '' },
			{ label: 'Close Window', action: 'closeActive', shortcut: '⌘W' }
		],
		Finder: [
			{ label: 'New Finder Window', action: 'finder', shortcut: '⌘N' },
			{ separator: true, label: '' },
			{ label: 'Close Window', action: 'closeActive', shortcut: '⌘W' }
		],
		Safari: [
			{ label: 'New Tab', action: 'safari', shortcut: '⌘T' },
			{ separator: true, label: '' },
			{ label: 'Close Tab', action: 'closeActive', shortcut: '⌘W' }
		],
		Notes: [
			{ label: 'New Note', disabled: true, shortcut: '⌘N' },
			{ separator: true, label: '' },
			{ label: 'Close', action: 'closeActive', shortcut: '⌘W' }
		],
		Mail: [
			{ label: 'New Message', disabled: true, shortcut: '⌘N' },
			{ separator: true, label: '' },
			{ label: 'Close', action: 'closeActive', shortcut: '⌘W' }
		],
		'System Settings': [
			{ label: 'Close', action: 'closeActive', shortcut: '⌘W' }
		]
	};

	const viewMenus: Record<string, { label: string; action?: string; shortcut?: string; separator?: boolean; disabled?: boolean }[]> = {
		Terminal: [
			{ label: 'Reload', action: 'reload', shortcut: '⌘R' },
			{ separator: true, label: '' },
			{ label: 'Enter Full Screen', action: 'fullscreenActive', shortcut: '⌃⌘F' }
		],
		default: [
			{ label: 'Enter Full Screen', action: 'fullscreenActive', shortcut: '⌃⌘F' }
		]
	};

	const windowMenuItems = [
		{ label: 'Minimize', action: 'minimizeActive', shortcut: '⌘M' },
		{ label: 'Zoom', action: 'fullscreenActive', shortcut: '' },
		{ separator: true, label: '' },
		{ label: 'Terminal', action: 'terminal' },
		{ label: 'Finder', action: 'finder' },
		{ label: 'Safari', action: 'safari' },
		{ label: 'Notes', action: 'notes' },
		{ label: 'Mail', action: 'mail' },
		{ label: 'System Settings', action: 'settings' }
	];

	let calendarDays = $derived(() => {
		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth();
		const firstDay = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const today = now.getDate();
		const days: (number | null)[] = [];
		for (let i = 0; i < firstDay; i++) days.push(null);
		for (let i = 1; i <= daysInMonth; i++) days.push(i);
		return { days, today, monthName: now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) };
	});
</script>

{#if openMenu || showControlCenter || showCalendar}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="overlay" onclick={closeAll} role="presentation"></div>
{/if}

<div class="menu-bar">
	<!-- LEFT: Apple + App Menus -->
	<div class="menu-bar-left">
		<!-- Apple Menu -->
		<div class="menu-wrap">
			<button class="menu-btn apple-btn" aria-label="Apple Menu" onclick={() => toggleMenu('apple')} class:active={openMenu === 'apple'}>
				<img src="/images/icons/apple.png" alt="Apple" width="15" height="18" style="object-fit:contain;display:block;" draggable="false" />
			</button>
			{#if openMenu === 'apple'}
				<div class="dropdown apple-dropdown">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="dropdown-item" onclick={() => handleAction('aboutPortfolio')} role="button" tabindex="0">
						<span>About This Portfolio</span>
					</div>
					<div class="dropdown-separator"></div>
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="dropdown-item" onclick={() => handleAction('settings')} role="button" tabindex="0">
						<span>System Settings…</span>
					</div>
					<div class="dropdown-separator"></div>
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="dropdown-item" onclick={() => handleAction('reload')} role="button" tabindex="0">
						<span>Restart…</span>
					</div>
				</div>
			{/if}
		</div>

		<!-- Active App Name -->
		<button class="menu-btn app-name" onclick={() => toggleMenu('appMenu')} class:active={openMenu === 'appMenu'}>
			{activeApp()}
		</button>
		{#if openMenu === 'appMenu'}
			<div class="dropdown">
				{#each (appMenus[activeApp()] ?? appMenus['Finder']) as item}
					{#if item.separator}
						<div class="dropdown-separator"></div>
					{:else}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div class="dropdown-item" class:disabled={item.disabled} onclick={() => !item.disabled && handleAction(item.action ?? '')} role="button" tabindex="0">
							<span>{item.label}</span>
							{#if item.shortcut}<span class="shortcut">{item.shortcut}</span>{/if}
						</div>
					{/if}
				{/each}
			</div>
		{/if}

		<!-- File -->
		<div class="menu-wrap">
			<button class="menu-btn" onclick={() => toggleMenu('file')} class:active={openMenu === 'file'}>File</button>
			{#if openMenu === 'file'}
				<div class="dropdown">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="dropdown-item" onclick={() => handleAction('terminal')} role="button" tabindex="0">
						<span>New Terminal Window</span><span class="shortcut">⌘N</span>
					</div>
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="dropdown-item" onclick={() => handleAction('finder')} role="button" tabindex="0">
						<span>Open Finder</span>
					</div>
					<div class="dropdown-separator"></div>
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="dropdown-item" onclick={() => handleAction('closeActive')} role="button" tabindex="0">
						<span>Close Window</span><span class="shortcut">⌘W</span>
					</div>
				</div>
			{/if}
		</div>

		<!-- View -->
		<div class="menu-wrap">
			<button class="menu-btn" onclick={() => toggleMenu('view')} class:active={openMenu === 'view'}>View</button>
			{#if openMenu === 'view'}
				<div class="dropdown">
				{#each (viewMenus[activeApp()] ?? viewMenus['default']) as item}
					{#if item.separator}
						<div class="dropdown-separator"></div>
					{:else}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div class="dropdown-item" onclick={() => handleAction(item.action ?? '')} role="button" tabindex="0">
								<span>{item.label}</span>
								{#if item.shortcut}<span class="shortcut">{item.shortcut}</span>{/if}
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		</div>

		<!-- Window -->
		<div class="menu-wrap">
			<button class="menu-btn" onclick={() => toggleMenu('window')} class:active={openMenu === 'window'}>Window</button>
			{#if openMenu === 'window'}
				<div class="dropdown">
				{#each windowMenuItems as item}
					{#if item.separator}
						<div class="dropdown-separator"></div>
					{:else}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div class="dropdown-item" onclick={() => handleAction(item.action ?? '')} role="button" tabindex="0">
								<span>{item.label}</span>
								{#if item.shortcut}<span class="shortcut">{item.shortcut}</span>{/if}
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		</div>

		<!-- Help -->
		<div class="menu-wrap">
			<button class="menu-btn" onclick={() => toggleMenu('help')} class:active={openMenu === 'help'}>Help</button>
			{#if openMenu === 'help'}
				<div class="dropdown">
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="dropdown-item disabled" role="button" tabindex="0">
						<span>Portfolio Help</span>
					</div>
					<div class="dropdown-separator"></div>
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class="dropdown-item" onclick={() => handleAction('terminal')} role="button" tabindex="0">
						<span>Open Terminal</span>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- RIGHT: Status Icons -->
	<div class="menu-bar-right">
		<!-- Control Center -->
		<div class="status-wrap">
			<button class="status-btn" class:active={showControlCenter} onclick={toggleControlCenter} aria-label="Control Center">
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<rect x="3" y="3" width="7" height="7" rx="1"/>
					<rect x="14" y="3" width="7" height="7" rx="1"/>
					<rect x="3" y="14" width="7" height="7" rx="1"/>
					<rect x="14" y="14" width="7" height="7" rx="1"/>
				</svg>
			</button>
			{#if showControlCenter}
				<div class="control-center">
					<div class="cc-title">Control Center</div>

					<div class="cc-grid">
						<!-- Dark/Light Mode -->
						<button
							class="cc-tile"
							class:cc-tile-active={desktopState?.desktopTheme === 'dark'}
							aria-label={desktopState?.desktopTheme === 'dark' ? 'Dark Mode (active)' : 'Light Mode'}
							onclick={() => {
								const next = desktopState?.desktopTheme === 'dark' ? 'light' : 'dark';
								desktopStore.setDesktopTheme(next);
							}}
						>
							<div class="cc-tile-icon">
								{#if desktopState?.desktopTheme === 'dark'}
									<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
								{:else}
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
								{/if}
							</div>
							<div class="cc-tile-label">{desktopState?.desktopTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}</div>
						</button>

						<!-- Wi-Fi (decorative) -->
						<button class="cc-tile cc-tile-active" aria-label="Wi-Fi (connected)">
							<div class="cc-tile-icon">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>
							</div>
							<div class="cc-tile-label">Wi-Fi</div>
						</button>

						<!-- Bluetooth (decorative) -->
						<button class="cc-tile" aria-label="Bluetooth (off)">
							<div class="cc-tile-icon">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
									<polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"/>
								</svg>
							</div>
							<div class="cc-tile-label">Bluetooth</div>
						</button>

						<!-- Keyboard Sound -->
						<button
							class="cc-tile"
							class:cc-tile-active={$soundEnabled}
							aria-label={$soundEnabled ? 'Keyboard Sound (on)' : 'Keyboard Sound (off)'}
							onclick={() => soundEnabled.set(!$soundEnabled)}
						>
							<div class="cc-tile-icon">
								{#if $soundEnabled}
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
								{:else}
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
								{/if}
							</div>
							<div class="cc-tile-label">Key Sound</div>
						</button>
					</div>
				</div>
			{/if}
		</div>

		<!-- Clock + Calendar -->
		<div class="status-wrap">
			<button class="status-btn clock-btn" class:active={showCalendar} onclick={toggleCalendar}>
				{currentDate} &nbsp; {currentTime}
			</button>
			{#if showCalendar}
				<div class="calendar-panel">
					<div class="cal-month">{calendarDays().monthName}</div>
					<div class="cal-weekdays">
						{#each ['Su','Mo','Tu','We','Th','Fr','Sa'] as d}
							<span class="cal-wd">{d}</span>
						{/each}
					</div>
					<div class="cal-grid">
						{#each calendarDays().days as day}
							<span class="cal-day" class:cal-today={day === calendarDays().today} class:cal-empty={day === null}>
								{day ?? ''}
							</span>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 9998;
	}

	.menu-bar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 28px;
		background: var(--mac-bar);
		backdrop-filter: blur(24px) saturate(180%);
		-webkit-backdrop-filter: blur(24px) saturate(180%);
		border-bottom: 1px solid var(--mac-bar-border);
		z-index: 9999;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 8px;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif;
		font-size: 13px;
		color: var(--mac-bar-text);
		user-select: none;
		animation: barIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@keyframes barIn {
		from { opacity: 0; transform: translateY(-100%); }
		to   { opacity: 1; transform: translateY(0); }
	}

	.menu-bar-left,
	.menu-bar-right {
		display: flex;
		align-items: center;
		gap: 0;
	}

	.menu-wrap {
		position: relative;
	}

	.menu-btn {
		background: none;
		border: none;
		color: var(--mac-bar-text);
		cursor: pointer;
		padding: 3px 9px;
		border-radius: 4px;
		font-size: 13px;
		font-family: inherit;
		transition: background 0.1s;
		height: 22px;
		display: flex;
		align-items: center;
	}

	.menu-btn:hover,
	.menu-btn.active {
		background: var(--mac-dropdown-hover);
	}

	.apple-btn {
		padding: 3px 10px;
		color: var(--mac-bar-text);
	}

	.app-name {
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	/* Dropdowns */
	.dropdown {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		min-width: 220px;
		background: var(--mac-dropdown-bg);
		backdrop-filter: blur(32px) saturate(180%);
		-webkit-backdrop-filter: blur(32px) saturate(180%);
		border: 1px solid var(--mac-dropdown-border);
		border-radius: 8px;
		box-shadow: 0 8px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.16);
		padding: 5px;
		z-index: 10000;
		animation: dropIn 0.18s cubic-bezier(0.16, 1, 0.3, 1) both;
		transform-origin: top left;
	}

	@keyframes dropIn {
		from { opacity: 0; transform: scale(0.94) translateY(-6px); }
		to   { opacity: 1; transform: scale(1) translateY(0); }
	}

	.apple-dropdown {
		min-width: 200px;
	}

	.dropdown-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 10px;
		border-radius: 5px;
		cursor: pointer;
		color: var(--mac-dropdown-text);
		font-size: 13px;
		transition: background 0.08s;
	}

	.dropdown-item:hover {
		background: var(--mac-accent);
		color: #fff;
	}

	.dropdown-item:hover .shortcut {
		color: rgba(255,255,255,0.7);
	}

	.dropdown-item.disabled {
		opacity: 0.4;
		cursor: default;
	}

	.dropdown-item.disabled:hover {
		background: none;
		color: var(--mac-dropdown-text);
	}

	.shortcut {
		color: var(--mac-dropdown-text-dim);
		font-size: 12px;
		font-family: -apple-system, sans-serif;
	}

	.dropdown-separator {
		height: 1px;
		background: var(--mac-dropdown-separator);
		margin: 4px 0;
	}

	/* Status bar right */
	.status-wrap {
		position: relative;
	}

	.status-btn {
		background: none;
		border: none;
		color: var(--mac-bar-text);
		cursor: pointer;
		padding: 3px 8px;
		border-radius: 4px;
		font-size: 13px;
		font-family: inherit;
		height: 22px;
		display: flex;
		align-items: center;
		gap: 4px;
		transition: background 0.1s;
	}

	.status-btn:hover,
	.status-btn.active {
		background: var(--mac-dropdown-hover);
	}

	.clock-btn {
		font-size: 12px;
		font-variant-numeric: tabular-nums;
		letter-spacing: -0.01em;
	}

	/* Control Center Panel */
	.control-center {
		position: absolute;
		top: calc(100% + 6px);
		right: 0;
		width: 260px;
		background: var(--mac-dropdown-bg);
		backdrop-filter: blur(40px) saturate(200%);
		-webkit-backdrop-filter: blur(40px) saturate(200%);
		border: 1px solid var(--mac-dropdown-border);
		border-radius: 14px;
		box-shadow: 0 12px 40px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.16);
		padding: 14px;
		z-index: 10000;
		animation: dropIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
		transform-origin: top right;
	}

	.cc-title {
		font-size: 12px;
		font-weight: 600;
		color: var(--mac-bar-text-dim);
		margin-bottom: 10px;
		padding-left: 2px;
		letter-spacing: 0.01em;
	}

	.cc-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
	}

	.cc-tile {
		background: var(--mac-icon-bg);
		border: 1px solid var(--mac-icon-border);
		border-radius: 12px;
		padding: 12px;
		display: flex;
		flex-direction: column;
		gap: 6px;
		cursor: pointer;
		transition: background 0.15s, transform 0.1s;
		color: var(--mac-text);
	}

	.cc-tile:hover {
		background: var(--mac-surface-2);
		transform: scale(1.02);
	}

	.cc-tile-active {
		background: var(--mac-accent);
		border-color: transparent;
		color: #fff;
	}

	.cc-tile-active:hover {
		background: var(--mac-accent-hover);
	}

	.cc-tile-icon {
		display: flex;
		align-items: center;
	}

	.cc-tile-label {
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.01em;
	}

	/* Calendar Panel */
	.calendar-panel {
		position: absolute;
		top: calc(100% + 6px);
		right: 0;
		width: 220px;
		background: var(--mac-dropdown-bg);
		backdrop-filter: blur(32px) saturate(180%);
		-webkit-backdrop-filter: blur(32px) saturate(180%);
		border: 1px solid var(--mac-dropdown-border);
		border-radius: 12px;
		box-shadow: 0 10px 36px rgba(0,0,0,0.28);
		padding: 14px;
		z-index: 10000;
		animation: dropIn 0.18s cubic-bezier(0.16, 1, 0.3, 1) both;
		transform-origin: top right;
	}

	.cal-month {
		font-size: 13px;
		font-weight: 600;
		color: var(--mac-dropdown-text);
		text-align: center;
		margin-bottom: 10px;
	}

	.cal-weekdays {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		margin-bottom: 4px;
	}

	.cal-wd {
		text-align: center;
		font-size: 10px;
		font-weight: 600;
		color: var(--mac-dropdown-text-dim);
		padding: 2px 0;
	}

	.cal-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 1px;
	}

	.cal-day {
		text-align: center;
		font-size: 11px;
		color: var(--mac-dropdown-text);
		padding: 4px 2px;
		border-radius: 50%;
		cursor: default;
		transition: background 0.1s;
		line-height: 1.4;
	}

	.cal-day.cal-today {
		background: var(--mac-accent);
		color: #fff;
		font-weight: 600;
	}

	.cal-day.cal-empty {
		opacity: 0;
		pointer-events: none;
	}
</style>
