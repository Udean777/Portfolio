<script lang="ts">
	let formData = $state({ name: '', email: '', message: '' });
	let errors = $state({ name: '', email: '', message: '' });
	let formStatus = $state<'idle' | 'sending' | 'success'>('idle');

	function validate() {
		errors = { name: '', email: '', message: '' };
		if (!formData.name.trim()) errors.name = 'Name is required';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
			errors.email = 'Enter a valid email';
		if (formData.message.trim().length < 10) errors.message = 'Please write at least 10 characters';
		return !errors.name && !errors.email && !errors.message;
	}

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		if (!validate()) return;
		formStatus = 'sending';
		await new Promise((resolve) => setTimeout(resolve, 800));
		formStatus = 'success';
	}
</script>

<section class="section contact-section" id="contact" aria-labelledby="contact-heading">
	<div class="section-head">
		<p class="section-label">Contact desk</p>
		<h2 id="contact-heading">Have something worth making?</h2>
	</div>
	<div class="contact-grid">
		<div class="contact-copy">
			<p>
				Open to freelance and remote projects. Send a note, share the context, and I will get back
				to you.
			</p>
			<div class="contact-links">
				<a href="mailto:sajudinmaruf@gmail.com">sajudinmaruf@gmail.com</a><a
					href="https://github.com/Udean777"
					target="_blank"
					rel="noopener noreferrer">GitHub / Udean777</a
				><a href="https://linkedin.com/in/sajudin" target="_blank" rel="noopener noreferrer"
					>LinkedIn / sajudin</a
				>
			</div>
		</div>
		<div class="form-wrap">
			{#if formStatus === 'success'}
				<div class="success-note">
					<p class="section-label">Filed successfully</p>
					<h3>Thank you for the note.</h3>
					<p>Your message is ready to be followed up.</p>
					<button
						class="text-button"
						onclick={() => {
							formStatus = 'idle';
							formData = { name: '', email: '', message: '' };
						}}>Send another</button
					>
				</div>
			{:else}
				<form onsubmit={submit} novalidate>
					<label for="contact-name"
						>Name<input
							id="contact-name"
							bind:value={formData.name}
							aria-invalid={!!errors.name}
						/></label
					>{#if errors.name}<small>{errors.name}</small>{/if}
					<label for="contact-email"
						>Email<input
							id="contact-email"
							type="email"
							bind:value={formData.email}
							aria-invalid={!!errors.email}
						/></label
					>{#if errors.email}<small>{errors.email}</small>{/if}
					<label for="contact-message"
						>Message<textarea
							id="contact-message"
							rows="5"
							bind:value={formData.message}
							aria-invalid={!!errors.message}
						></textarea></label
					>{#if errors.message}<small>{errors.message}</small>{/if}
					<button class="button-ink" type="submit" disabled={formStatus === 'sending'}
						>{formStatus === 'sending' ? 'Sending…' : 'Send inquiry'}
						<span aria-hidden="true">→</span></button
					>
				</form>
			{/if}
		</div>
	</div>
</section>

<style>
	.contact-grid {
		display: grid;
		grid-template-columns: minmax(0, 0.8fr) minmax(18rem, 1.2fr);
		gap: clamp(var(--space-xl), 9vw, var(--space-3xl));
		margin-top: var(--space-2xl);
	}
	.contact-copy > p {
		max-width: 32ch;
		font-family: var(--font-display);
		font-size: var(--text-xl);
		line-height: 1;
	}
	.contact-links {
		display: grid;
		gap: var(--space-xs);
		margin-top: var(--space-xl);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.contact-links a {
		width: fit-content;
		text-decoration: underline;
		text-decoration-color: var(--color-accent);
		text-underline-offset: 0.3em;
	}
	.contact-links a:hover {
		color: var(--color-accent);
	}
	.form-wrap {
		border-top: var(--rule-thin) solid var(--color-rule);
	}
	form {
		display: grid;
		gap: var(--space-sm);
		padding-top: var(--space-md);
	}
	label {
		display: grid;
		gap: var(--space-2xs);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	input,
	textarea {
		width: 100%;
		appearance: none;
		-webkit-appearance: none;
		border: 0;
		border-bottom: var(--rule-thin) solid var(--color-rule);
		border-radius: 0;
		padding: var(--space-2xs) 0;
		background: transparent;
		color: var(--color-ink);
		box-shadow: none;
		outline: 2px solid transparent;
		outline-offset: 3px;
		resize: vertical;
		transition:
			border-color var(--dur-short) var(--ease-out),
			box-shadow var(--dur-short) var(--ease-out);
	}
	input:hover,
	textarea:hover {
		border-color: var(--color-ink-2);
	}
	input:focus,
	textarea:focus {
		border-color: var(--color-accent);
		box-shadow: none;
		outline: 2px solid var(--color-focus);
	}
	input:focus-visible,
	textarea:focus-visible {
		border-color: var(--color-accent);
		box-shadow: none;
		outline: 2px solid var(--color-focus);
	}
	input:active,
	textarea:active {
		border-color: var(--color-accent);
		box-shadow: none;
	}
	small {
		color: var(--color-accent);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
	}
	form .button-ink {
		justify-self: start;
		margin-top: var(--space-sm);
		border: 0;
		cursor: pointer;
	}
	form .button-ink:disabled {
		cursor: wait;
		opacity: 0.6;
	}
	.success-note {
		display: grid;
		gap: var(--space-sm);
		padding-top: var(--space-md);
	}
	.success-note h3 {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		font-weight: 600;
	}
	.success-note p:not(.section-label) {
		color: var(--color-ink-2);
	}
	.text-button {
		width: fit-content;
		border: 0;
		padding: 0;
		background: transparent;
		color: var(--color-accent);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		text-decoration: underline;
		text-underline-offset: 0.3em;
		cursor: pointer;
	}
	@media (max-width: 48rem) {
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
