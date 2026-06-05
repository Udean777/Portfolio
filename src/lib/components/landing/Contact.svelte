<script lang="ts">
	import { onMount } from 'svelte';

	let sectionEl: HTMLElement;
	let visible = $state(false);

	onMount(() => {
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					obs.disconnect();
				}
			},
			{ threshold: 0.15 }
		);
		obs.observe(sectionEl);
		return () => obs.disconnect();
	});

	const links = [
		{
			label: 'Email',
			value: 'sajudinmaruf@gmail.com',
			href: 'mailto:sajudinmaruf@gmail.com',
			icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`
		},
		{
			label: 'GitHub',
			value: '@Udean777',
			href: 'https://github.com/Udean777',
			external: true,
			icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`
		},
		{
			label: 'LinkedIn',
			value: 'sajudin',
			href: 'https://linkedin.com/in/sajudin',
			external: true,
			icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`
		},
		{
			label: 'Resume',
			value: 'Download CV',
			href: "/assets/CV-Sajudin-ma'ruf.pdf",
			download: true,
			icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`
		}
	];

	let formData = $state({ name: '', email: '', message: '' });
	let errors = $state({ name: '', email: '', message: '' });
	let formStatus = $state<'idle' | 'sending' | 'success'>('idle');

	function validate() {
		let valid = true;
		errors = { name: '', email: '', message: '' };

		if (!formData.name.trim()) {
			errors.name = 'Name is required';
			valid = false;
		} else if (formData.name.trim().length < 2) {
			errors.name = 'Name must be at least 2 characters';
			valid = false;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.email.trim()) {
			errors.email = 'Email is required';
			valid = false;
		} else if (!emailRegex.test(formData.email.trim())) {
			errors.email = 'Please enter a valid email address';
			valid = false;
		}

		if (!formData.message.trim()) {
			errors.message = 'Message is required';
			valid = false;
		} else if (formData.message.trim().length < 10) {
			errors.message = 'Message must be at least 10 characters';
			valid = false;
		}

		return valid;
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!validate()) return;

		formStatus = 'sending';
		// Simulate network latency
		await new Promise((resolve) => setTimeout(resolve, 1800));
		formStatus = 'success';
	}

	function resetForm() {
		formData = { name: '', email: '', message: '' };
		errors = { name: '', email: '', message: '' };
		formStatus = 'idle';
	}
</script>

<section class="contact" id="contact" bind:this={sectionEl} class:visible aria-label="Contact">
	<div class="contact-inner">
		<div class="contact-left">
			<h2 class="contact-heading">
				Let's work<br /><span class="heading-accent">together.</span>
			</h2>
			<p class="contact-sub">
				Open to freelance and remote projects. Currently at Vivnio, but always happy to talk.
			</p>

			<div class="contact-links-wrap">
				<ul class="links-list" role="list">
					{#each links as link, i}
						<li style="--li: {i}">
							<a
								href={link.href}
								class="contact-link"
								target={link.external ? '_blank' : undefined}
								rel={link.external ? 'noopener noreferrer' : undefined}
								download={link.download ? true : undefined}
							>
								<span class="link-icon">{@html link.icon}</span>
								<span class="link-body">
									<span class="link-label">{link.label}</span>
									<span class="link-value">{link.value}</span>
								</span>
								<span class="link-arrow" aria-hidden="true">
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2.5"
										stroke-linecap="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
									>
								</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="contact-right">
			<div class="form-container">
				{#if formStatus === 'success'}
					<div class="success-screen">
						<div class="success-icon-wrap">
							<svg
								class="success-check"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="3"
								stroke-linecap="round"
								aria-hidden="true"
							>
								<polyline points="20 6 9 17 4 12" />
							</svg>
						</div>
						<h3 class="success-heading">Message Sent!</h3>
						<p class="success-sub">
							Thank you for reaching out. Sajudin will get back to you shortly.
						</p>
						<button onclick={resetForm} class="reset-btn">Send another message</button>
					</div>
				{:else}
					<form class="contact-form" onsubmit={handleSubmit} novalidate>
						<div class="form-group">
							<label for="name" class="form-label">Name</label>
							<input
								type="text"
								id="name"
								bind:value={formData.name}
								class="form-input"
								class:input-error={errors.name}
								placeholder="Your name"
								disabled={formStatus === 'sending'}
								required
							/>
							{#if errors.name}
								<span class="field-error">{errors.name}</span>
							{/if}
						</div>

						<div class="form-group">
							<label for="email" class="form-label">Email Address</label>
							<input
								type="email"
								id="email"
								bind:value={formData.email}
								class="form-input"
								class:input-error={errors.email}
								placeholder="name@example.com"
								disabled={formStatus === 'sending'}
								required
							/>
							{#if errors.email}
								<span class="field-error">{errors.email}</span>
							{/if}
						</div>

						<div class="form-group">
							<label for="message" class="form-label">Message</label>
							<textarea
								id="message"
								bind:value={formData.message}
								class="form-input form-textarea"
								class:input-error={errors.message}
								placeholder="Tell me about your project..."
								rows="4"
								disabled={formStatus === 'sending'}
								required
							></textarea>
							{#if errors.message}
								<span class="field-error">{errors.message}</span>
							{/if}
						</div>

						<button type="submit" class="submit-btn" disabled={formStatus === 'sending'}>
							{#if formStatus === 'sending'}
								<span class="spinner" aria-hidden="true"></span>
								Sending...
							{:else}
								Send Message
								<svg
									class="submit-arrow"
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2.5"
									stroke-linecap="round"
									aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
								>
							{/if}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.contact {
		background: var(--land-bg);
		padding: 120px 0;
	}

	.contact-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 32px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 80px;
		align-items: start;
	}

	/* Left col reveal */
	.contact-left {
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s,
			transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.05s;
	}

	.contact.visible .contact-left {
		opacity: 1;
		transform: translateY(0);
	}

	.contact-heading {
		font-family: 'Geist', sans-serif;
		font-size: clamp(40px, 5vw, 64px);
		font-weight: 800;
		color: var(--land-fg);
		margin: 0 0 20px;
		letter-spacing: -0.04em;
		line-height: 0.95;
	}

	.heading-accent {
		color: var(--blue);
	}

	.contact-sub {
		font-family: 'Geist', sans-serif;
		font-size: 15px;
		color: var(--land-fg-2);
		line-height: 1.7;
		margin: 0;
		max-width: 36ch;
	}

	/* Links list styling */
	.contact-links-wrap {
		margin-top: 36px;
	}

	.links-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 8px;
		overflow: visible;
	}

	.links-list li {
		opacity: 0;
		transform: translateX(16px);
		transition:
			opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) calc(0.15s + var(--li, 0) * 0.08s),
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) calc(0.15s + var(--li, 0) * 0.08s);
		padding-right: 12px;
		margin-right: -12px;
		overflow: visible;
	}

	.contact.visible .links-list li {
		opacity: 1;
		transform: translateX(0);
	}

	.contact-link {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 18px 20px;
		border: 1px solid var(--land-border);
		border-radius: var(--land-radius);
		text-decoration: none;
		transition:
			border-color 0.2s,
			background 0.2s,
			transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.2s;
		background: var(--land-bg-2);
	}

	.contact-link:hover {
		border-color: var(--blue);
		background: var(--blue-glow);
		transform: translateX(5px);
		box-shadow: -4px 0 0 var(--blue);
	}

	.contact-link:active {
		transform: translateX(3px) scale(0.99);
	}

	.link-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid var(--land-border);
		color: var(--land-fg-2);
		flex-shrink: 0;
		transition:
			color 0.2s,
			background 0.2s,
			border-color 0.2s;
	}

	.contact-link:hover .link-icon {
		color: var(--blue);
		background: rgba(0, 102, 255, 0.1);
		border-color: rgba(0, 102, 255, 0.3);
	}

	.link-body {
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
		min-width: 0;
	}

	.link-label {
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		color: var(--land-fg-3);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.link-value {
		font-family: 'Geist', sans-serif;
		font-size: 15px;
		font-weight: 500;
		color: var(--land-fg);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.link-arrow {
		color: var(--land-fg-3);
		display: flex;
		flex-shrink: 0;
		transition:
			color 0.2s,
			transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.contact-link:hover .link-arrow {
		color: var(--blue);
		transform: translateX(4px);
	}

	/* Form container */
	.form-container {
		background: var(--land-bg-2);
		border: 1px solid var(--land-border);
		border-radius: var(--land-radius);
		padding: 36px;
		width: 100%;
		position: relative;
		overflow: hidden;
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s,
			transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
	}

	.contact.visible .form-container {
		opacity: 1;
		transform: translateY(0);
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
		text-align: left;
	}

	.form-label {
		font-family: 'JetBrains Mono', monospace;
		font-size: 10px;
		color: var(--land-fg-3);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.form-input {
		font-family: 'Geist', sans-serif;
		font-size: 14px;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--land-border);
		color: var(--land-fg);
		padding: 12px 14px;
		border-radius: 8px;
		outline: none;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
		width: 100%;
	}

	.form-input::placeholder {
		color: var(--land-fg-3);
		opacity: 0.8;
	}

	.form-input:focus {
		border-color: var(--blue);
		box-shadow: 0 0 12px var(--blue-glow);
		background: rgba(255, 255, 255, 0.04);
	}

	.form-input.input-error {
		border-color: #ef4444;
	}

	.form-input.input-error:focus {
		box-shadow: 0 0 12px rgba(239, 68, 68, 0.15);
	}

	.form-textarea {
		resize: vertical;
		min-height: 100px;
	}

	.field-error {
		font-family: 'Geist', sans-serif;
		font-size: 11px;
		color: #ef4444;
		margin-top: 2px;
	}

	/* Submit Button */
	.submit-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		background: var(--blue);
		color: #fff;
		border: none;
		padding: 12px 24px;
		border-radius: 8px;
		font-family: 'Geist', sans-serif;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 0.15s,
			transform 0.1s,
			box-shadow 0.15s;
		width: 100%;
		margin-top: 8px;
	}

	.submit-btn:hover:not(:disabled) {
		background: var(--blue-dim);
		box-shadow: 0 4px 16px rgba(0, 102, 255, 0.35);
	}

	.submit-btn:active:not(:disabled) {
		transform: scale(0.98);
	}

	.submit-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.submit-arrow {
		transition: transform 0.2s ease;
	}

	.submit-btn:hover:not(:disabled) .submit-arrow {
		transform: translateX(3px);
	}

	/* Loading Spinner */
	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		border-top-color: #fff;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Success Screen */
	.success-screen {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 24px 0;
		animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: scale(0.96);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.success-icon-wrap {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.2);
		color: #22c55e;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20px;
		box-shadow: 0 0 20px rgba(34, 197, 94, 0.15);
	}

	.success-check {
		width: 28px;
		height: 28px;
		stroke-dasharray: 40;
		stroke-dashoffset: 40;
		animation: drawCheck 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
	}

	@keyframes drawCheck {
		to {
			stroke-dashoffset: 0;
		}
	}

	.success-heading {
		font-family: 'Geist', sans-serif;
		font-size: 20px;
		font-weight: 700;
		color: var(--land-fg);
		margin: 0 0 10px;
		letter-spacing: -0.02em;
	}

	.success-sub {
		font-family: 'Geist', sans-serif;
		font-size: 14px;
		color: var(--land-fg-2);
		line-height: 1.6;
		margin: 0 0 24px;
		max-width: 28ch;
	}

	.reset-btn {
		background: none;
		border: 1px solid var(--land-border);
		color: var(--land-fg-2);
		padding: 8px 18px;
		border-radius: 8px;
		font-family: 'Geist', sans-serif;
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.reset-btn:hover {
		color: var(--land-fg);
		border-color: var(--land-border-hover);
		background: rgba(255, 255, 255, 0.04);
	}

	/* ── Responsive ── */
	@media (max-width: 1024px) {
		.contact-inner {
			grid-template-columns: 1fr;
			gap: 48px;
		}
		.form-container {
			padding: 32px;
		}
	}

	@media (max-width: 768px) {
		.contact {
			padding: 80px 0;
		}
		.contact-inner {
			padding: 0 20px;
		}

		.contact-link {
			padding: 14px 16px;
		}

		.link-value {
			font-size: 14px;
		}
		.form-container {
			padding: 24px;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: view()) {
			@keyframes reveal-contact-left {
				from {
					opacity: 0;
					transform: translateX(-32px);
				}
				to {
					opacity: 1;
					transform: translateX(0);
				}
			}

			@keyframes reveal-contact-right {
				from {
					opacity: 0;
					transform: translateY(32px);
				}
				to {
					opacity: 1;
					transform: translateY(0);
				}
			}

			.contact-left {
				animation: reveal-contact-left auto cubic-bezier(0.16, 1, 0.3, 1) both;
				animation-timeline: view();
				animation-range: entry 0% entry 30%;
			}

			.form-container {
				animation: reveal-contact-right auto cubic-bezier(0.16, 1, 0.3, 1) both;
				animation-timeline: view();
				animation-range: entry 5% entry 35%;
			}
		}
	}
</style>
