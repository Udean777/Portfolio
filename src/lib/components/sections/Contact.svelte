<script lang="ts">
	import ScrollReveal from '../ui/ScrollReveal.svelte';
</script>

<section class="container mx-auto px-4 py-12" id="contact">
	<div class="mx-auto mb-6 flex w-fit items-center justify-center border-b-4 pb-2">
		<h1 class="text-center text-2xl font-bold sm:text-3xl">Get In Touch</h1>
	</div>

	<div class="mx-auto grid max-w-5xl grid-cols-1 gap-10 py-6 md:grid-cols-2">
		<ScrollReveal class="h-full">
			<div
				class="hover-shadow flex h-full flex-col justify-between rounded-lg border-4 border-zinc-700 bg-yellow-100 p-8"
			>
				<div>
					<h2 class="mb-6 text-3xl font-bold">Let's build something amazing together!</h2>
					<p class="mb-8 text-zinc-800">
						I'm currently available for freelance work and new opportunities. If you have a project in
						mind or just want to chat, feel free to reach out.
					</p>
				</div>

				<div class="flex flex-wrap gap-4">
					<a
						href="mailto:sajudinmaruf@gmail.com"
						class="hover-shadow flex items-center gap-2 rounded-full border-2 border-zinc-700 bg-white px-4 py-2 font-bold transition hover:bg-zinc-100"
					>
						<i class="fas fa-envelope"></i> Email Me
					</a>
					<a
						href="https://www.linkedin.com/in/sajudin"
						target="_blank"
						class="hover-shadow flex items-center gap-2 rounded-full border-2 border-zinc-700 bg-white px-4 py-2 font-bold transition hover:bg-zinc-100"
					>
						<i class="fab fa-linkedin"></i> LinkedIn
					</a>
				</div>
			</div>
		</ScrollReveal>

		<ScrollReveal class="h-full" stagger={200}>
			<div class="hover-shadow h-full rounded-lg border-4 border-zinc-700 bg-white p-8">
				<form class="flex flex-col gap-4" on:submit|preventDefault={() => alert('Message Sent!')}>
					<div>
						<label for="name" class="mb-1 block text-sm font-bold">Your Name</label>
						<input
							type="text"
							id="name"
							placeholder="John Doe"
							class="w-full rounded-md border-2 border-zinc-700 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							required
						/>
					</div>
					<div>
						<label for="email" class="mb-1 block text-sm font-bold">Email Address</label>
						<input
							type="email"
							id="email"
							placeholder="john@example.com"
							class="w-full rounded-md border-2 border-zinc-700 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							required
						/>
					</div>
					<div>
						<label for="message" class="mb-1 block text-sm font-bold">Message</label>
						<textarea
							id="message"
							rows="4"
							placeholder="Tell me about your project..."
							class="w-full rounded-md border-2 border-zinc-700 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							required
						></textarea>
					</div>
					<button
						type="submit"
						class="hover-shadow mt-2 rounded-md border-2 border-zinc-700 bg-blue-500 py-3 font-bold text-white transition hover:bg-blue-600"
					>
						Send Message
					</button>
				</form>
			</div>
		</ScrollReveal>
	</div>
</section>

<style>
	.hover-shadow:hover {
		box-shadow: 4px 4px 0 black;
	}
</style>
