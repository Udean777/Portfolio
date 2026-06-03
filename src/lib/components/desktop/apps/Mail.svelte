<script lang="ts">
	type MailBox = 'inbox' | 'sent' | 'drafts';

	let activeMailbox = $state<MailBox>('inbox');
	let activeMailId = $state<string | null>('draft-1');
	let composeName = $state('');
	let composeEmail = $state('');
	let composeMessage = $state('');
	let sendState = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');

	const mailboxes: { id: MailBox; label: string; icon: string; count?: number }[] = [
		{ id: 'inbox', label: 'Inbox', icon: 'inbox', count: 1 },
		{ id: 'sent', label: 'Sent', icon: 'sent' },
		{ id: 'drafts', label: 'Drafts', icon: 'drafts', count: 1 }
	];

	interface MailItem {
		id: string;
		from: string;
		subject: string;
		preview: string;
		date: string;
		read: boolean;
		body?: string;
	}

	const mails: Record<MailBox, MailItem[]> = {
		inbox: [
			{
				id: 'inbox-1',
				from: 'GitHub Notifications',
				subject: 'New star on Udean777/portfolio',
				preview: 'Someone starred your repository...',
				date: 'Jun 3',
				read: false,
				body: 'You have a new star on your repository. Keep building great things!'
			}
		],
		sent: [],
		drafts: [
			{
				id: 'draft-1',
				from: 'You',
				subject: 'Contact Sajudin',
				preview: 'Send a message to Sajudin Ma\'ruf',
				date: 'Jun 3',
				read: true
			}
		]
	};

	const activeMails = $derived(mails[activeMailbox]);
	const selectedMail = $derived(activeMails.find((m) => m.id === activeMailId) ?? null);

	async function handleSend(e: Event) {
		e.preventDefault();
		if (!composeName.trim() || !composeEmail.trim() || !composeMessage.trim()) return;
		sendState = 'sending';
		await new Promise((r) => setTimeout(r, 1200));
		sendState = 'sent';
		setTimeout(() => {
			composeName = '';
			composeEmail = '';
			composeMessage = '';
			sendState = 'idle';
		}, 3000);
	}
</script>

<div class="mail-shell">
	<!-- Mailbox Sidebar -->
	<div class="mail-sidebar">
		<div class="mail-sidebar-header">
			<svg width="28" height="28" viewBox="0 0 60 60" fill="none">
				<rect width="60" height="60" rx="14" fill="url(#mail-icon-grad)"/>
				<defs><linearGradient id="mail-icon-grad" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#60a5fa"/><stop offset="100%" stop-color="#1d4ed8"/></linearGradient></defs>
				<rect x="10" y="16" width="40" height="28" rx="4" fill="white" opacity="0.9"/>
				<polyline points="10,16 30,30 50,16" stroke="#1d4ed8" stroke-width="2.5" stroke-linejoin="round" fill="none"/>
			</svg>
			<span class="sidebar-app-name">Mail</span>
		</div>

		<div class="mailbox-list">
			{#each mailboxes as mbox}
				<button
					class="mailbox-item"
					class:mbox-active={activeMailbox === mbox.id}
					onclick={() => {
						activeMailbox = mbox.id;
						activeMailId = mails[mbox.id][0]?.id ?? null;
					}}
				>
					<span class="mbox-icon">
						{#if mbox.icon === 'inbox'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
						{:else if mbox.icon === 'sent'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
						{:else if mbox.icon === 'drafts'}
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
						{/if}
					</span>
					<span class="mbox-label">{mbox.label}</span>
					{#if mbox.count}
						<span class="mbox-badge">{mbox.count}</span>
					{/if}
				</button>
			{/each}
		</div>
	</div>

	<!-- Mail List -->
	<div class="mail-list">
		<div class="mail-list-header">{mailboxes.find(m => m.id === activeMailbox)?.label}</div>
		{#if activeMails.length === 0}
			<div class="empty-state">No messages</div>
		{:else}
			{#each activeMails as mail}
				<button
					class="mail-item"
					class:mail-active={activeMailId === mail.id}
					class:mail-unread={!mail.read}
					onclick={() => (activeMailId = mail.id)}
				>
					<div class="mail-item-top">
						{#if !mail.read}<div class="unread-dot"></div>{/if}
						<span class="mail-from">{mail.from}</span>
						<span class="mail-date">{mail.date}</span>
					</div>
					<div class="mail-subject">{mail.subject}</div>
					<div class="mail-preview">{mail.preview}</div>
				</button>
			{/each}
		{/if}
	</div>

	<!-- Detail / Compose Pane -->
	<div class="mail-detail">
		{#if activeMailbox === 'drafts' && activeMailId === 'draft-1'}
			<!-- Compose -->
			<div class="compose-pane">
				<div class="compose-header">
					<div class="compose-to-label">To: <span class="compose-to-addr">sajudinmaruf@gmail.com</span></div>
				</div>
				<div class="compose-subject">New Message for Sajudin</div>

				{#if sendState === 'sent'}
					<div class="send-success">
						<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#30d158" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
						<p class="success-text">Message sent!</p>
						<p class="success-sub">Sajudin will get back to you soon.</p>
					</div>
				{:else}
					<form class="compose-form" onsubmit={handleSend}>
						<div class="field-group">
							<label class="field-label" for="compose-name">Your Name</label>
							<input id="compose-name" class="field-input" type="text" placeholder="John Doe" bind:value={composeName} required />
						</div>
						<div class="field-group">
							<label class="field-label" for="compose-email">Your Email</label>
							<input id="compose-email" class="field-input" type="email" placeholder="you@example.com" bind:value={composeEmail} required />
						</div>
						<div class="field-group flex-grow-field">
							<label class="field-label" for="compose-message">Message</label>
							<textarea
								id="compose-message"
								class="field-textarea"
								placeholder="Hi Sajudin, I'd like to..."
								bind:value={composeMessage}
								required
								rows="6"
							></textarea>
						</div>
						<div class="compose-actions">
							<div class="quick-links">
								<a href="mailto:sajudinmaruf@gmail.com" class="quick-link">
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
									Email directly
								</a>
								<a href="https://linkedin.com/in/sajudin" target="_blank" class="quick-link">
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
									LinkedIn
								</a>
								<a href="https://github.com/Udean777" target="_blank" class="quick-link">
									<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
									GitHub
								</a>
							</div>
							<button type="submit" class="send-btn" disabled={sendState === 'sending'}>
								{#if sendState === 'sending'}
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" class="spin"><path d="M12 2a10 10 0 1 0 10 10"/></svg>
									Sending…
								{:else}
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
									Send
								{/if}
							</button>
						</div>
					</form>
				{/if}
			</div>

		{:else if selectedMail && selectedMail.body}
			<!-- Read mail -->
			<div class="read-pane">
				<div class="read-subject">{selectedMail.subject}</div>
				<div class="read-meta">
					<div class="read-from-avatar">{selectedMail.from[0]}</div>
					<div>
						<div class="read-from">{selectedMail.from}</div>
						<div class="read-date">{selectedMail.date}</div>
					</div>
				</div>
				<div class="read-body">{selectedMail.body}</div>
			</div>

		{:else}
			<div class="empty-state">Select a message</div>
		{/if}
	</div>
</div>

<style>
	.mail-shell {
		display: flex;
		height: 100%;
		font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
		background: var(--mac-win-body);
	}

	/* Sidebar */
	.mail-sidebar {
		width: 180px;
		background: var(--mac-sidebar-bg);
		border-right: 1px solid var(--mac-sidebar-border);
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
	}

	.mail-sidebar-header {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 14px 14px 12px;
		border-bottom: 1px solid var(--mac-separator);
		flex-shrink: 0;
	}

	.sidebar-app-name {
		font-size: 16px;
		font-weight: 700;
		color: var(--mac-text);
		letter-spacing: -0.02em;
	}

	.mailbox-list {
		padding: 8px 6px;
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.mailbox-item {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 7px 10px;
		background: none;
		border: none;
		border-radius: 7px;
		cursor: pointer;
		font-size: 13px;
		font-family: inherit;
		color: var(--mac-sidebar-text);
		text-align: left;
		transition: background 0.1s;
		width: 100%;
	}

	.mailbox-item:hover { background: var(--mac-sidebar-active); }
	.mailbox-item.mbox-active {
		background: var(--mac-accent);
		color: #fff;
	}
	.mailbox-item.mbox-active .mbox-icon { color: #fff; }

	.mbox-icon { color: var(--mac-text-secondary); flex-shrink: 0; }
	.mbox-label { flex: 1; font-weight: 500; }

	.mbox-badge {
		background: var(--mac-accent);
		color: #fff;
		font-size: 10px;
		font-weight: 700;
		padding: 1px 6px;
		border-radius: 10px;
		min-width: 18px;
		text-align: center;
	}

	.mbox-active .mbox-badge {
		background: rgba(255,255,255,0.3);
	}

	/* Mail list */
	.mail-list {
		width: 240px;
		background: var(--mac-surface);
		border-right: 1px solid var(--mac-separator);
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}

	.mail-list-header {
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

	.mail-item {
		padding: 12px 14px;
		border-bottom: 1px solid var(--mac-separator);
		background: none;
		border-left: none;
		border-right: none;
		border-top: none;
		cursor: pointer;
		text-align: left;
		font-family: inherit;
		transition: background 0.1s;
		position: relative;
	}

	.mail-item:hover { background: var(--mac-sidebar-active); }

	.mail-item.mail-active {
		background: var(--mac-accent);
	}

	.mail-item.mail-active .mail-from,
	.mail-item.mail-active .mail-subject,
	.mail-item.mail-active .mail-preview,
	.mail-item.mail-active .mail-date {
		color: #fff;
	}

	.mail-item-top {
		display: flex;
		align-items: center;
		gap: 6px;
		margin-bottom: 3px;
	}

	.unread-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--mac-accent);
		flex-shrink: 0;
	}

	.mail-item.mail-active .unread-dot { background: white; }

	.mail-from {
		flex: 1;
		font-size: 13px;
		font-weight: 600;
		color: var(--mac-text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mail-date {
		font-size: 11px;
		color: var(--mac-text-secondary);
		flex-shrink: 0;
	}

	.mail-subject {
		font-size: 12px;
		font-weight: 500;
		color: var(--mac-text);
		margin-bottom: 2px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.mail-preview {
		font-size: 11px;
		color: var(--mac-text-secondary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* Detail pane */
	.mail-detail {
		flex: 1;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
	}

	.empty-state {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		color: var(--mac-text-tertiary);
	}

	/* Compose */
	.compose-pane {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 20px 24px;
	}

	.compose-header {
		padding-bottom: 12px;
		border-bottom: 1px solid var(--mac-separator);
		margin-bottom: 4px;
	}

	.compose-to-label {
		font-size: 12px;
		color: var(--mac-text-secondary);
	}

	.compose-to-addr {
		color: var(--mac-accent);
		font-weight: 500;
	}

	.compose-subject {
		font-size: 18px;
		font-weight: 700;
		color: var(--mac-text);
		padding: 10px 0 16px;
		letter-spacing: -0.02em;
		border-bottom: 1px solid var(--mac-separator);
		margin-bottom: 16px;
	}

	.compose-form {
		display: flex;
		flex-direction: column;
		gap: 14px;
		flex: 1;
	}

	.field-group {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.flex-grow-field { flex: 1; }

	.field-label {
		font-size: 11px;
		font-weight: 600;
		color: var(--mac-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.field-input {
		height: 34px;
		background: var(--mac-input-bg);
		border: 1px solid var(--mac-input-border);
		border-radius: 7px;
		padding: 0 12px;
		font-size: 13px;
		color: var(--mac-text);
		font-family: inherit;
		outline: none;
		transition: border-color 0.15s;
	}

	.field-input:focus {
		border-color: var(--mac-accent);
	}

	.field-textarea {
		flex: 1;
		min-height: 100px;
		background: var(--mac-input-bg);
		border: 1px solid var(--mac-input-border);
		border-radius: 7px;
		padding: 10px 12px;
		font-size: 13px;
		color: var(--mac-text);
		font-family: inherit;
		outline: none;
		resize: none;
		line-height: 1.5;
		transition: border-color 0.15s;
	}

	.field-textarea:focus {
		border-color: var(--mac-accent);
	}

	.compose-actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 4px;
	}

	.quick-links {
		display: flex;
		gap: 12px;
	}

	.quick-link {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 12px;
		color: var(--mac-accent);
		text-decoration: none;
		font-weight: 500;
		transition: opacity 0.1s;
	}

	.quick-link:hover { opacity: 0.72; }

	.send-btn {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 8px 18px;
		background: var(--mac-accent);
		color: #fff;
		border: none;
		border-radius: 8px;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		font-family: inherit;
		transition: background 0.15s;
	}

	.send-btn:hover { background: var(--mac-accent-hover); }
	.send-btn:disabled { opacity: 0.6; cursor: not-allowed; }

	@keyframes spin { to { transform: rotate(360deg); } }
	.spin { animation: spin 0.8s linear infinite; }

	/* Send success */
	.send-success {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.success-text {
		font-size: 16px;
		font-weight: 600;
		color: var(--mac-text);
		margin: 0;
	}

	.success-sub {
		font-size: 13px;
		color: var(--mac-text-secondary);
		margin: 0;
	}

	/* Read pane */
	.read-pane {
		padding: 24px;
	}

	.read-subject {
		font-size: 18px;
		font-weight: 700;
		color: var(--mac-text);
		margin-bottom: 14px;
		letter-spacing: -0.02em;
	}

	.read-meta {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 20px;
		padding-bottom: 16px;
		border-bottom: 1px solid var(--mac-separator);
	}

	.read-from-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: var(--mac-accent);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		font-weight: 700;
		flex-shrink: 0;
	}

	.read-from {
		font-size: 13px;
		font-weight: 600;
		color: var(--mac-text);
	}

	.read-date {
		font-size: 11px;
		color: var(--mac-text-secondary);
	}

	.read-body {
		font-size: 13px;
		color: var(--mac-text-secondary);
		line-height: 1.7;
	}

	/* ── Responsive ── */
	@media (max-width: 1023px) {
		.mail-sidebar { width: 150px; }
		.mail-list { width: 200px; }
	}

	@media (max-width: 600px) {
		.mail-shell { flex-direction: column; }

		/* sidebar becomes top tab row */
		.mail-sidebar {
			width: 100%;
			flex-direction: row;
			height: auto;
			border-right: none;
			border-bottom: 1px solid var(--mac-sidebar-border);
		}

		.mail-sidebar-header { display: none; }

		.mailbox-list {
			flex-direction: row;
			padding: 0 8px;
			gap: 0;
		}

		.mailbox-item {
			width: auto;
			border-radius: 0;
			padding: 10px 16px;
			font-size: 12px;
			border-bottom: 2px solid transparent;
		}

		.mailbox-item.mbox-active {
			background: transparent;
			color: var(--mac-accent);
			border-bottom-color: var(--mac-accent);
		}

		.mbox-badge { display: none; }

		/* mail list becomes full width strip */
		.mail-list {
			width: 100%;
			border-right: none;
			border-bottom: 1px solid var(--mac-separator);
			height: 80px;
			flex-direction: row;
			overflow-x: auto;
			overflow-y: hidden;
			flex-shrink: 0;
			-ms-overflow-style: none;
			scrollbar-width: none;
		}

		.mail-list::-webkit-scrollbar { display: none; }

		.mail-list-header { display: none; }

		.mail-item {
			min-width: 160px;
			border-bottom: none;
			border-right: 1px solid var(--mac-separator);
		}

		.compose-pane { padding: 14px 14px 20px; }
		.compose-actions { flex-direction: column; gap: 12px; align-items: flex-start; }
		.quick-links { flex-wrap: wrap; gap: 10px; }
	}
</style>
