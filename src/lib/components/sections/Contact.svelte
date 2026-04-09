<script lang="ts">
	import ScrollReveal from '../ui/ScrollReveal.svelte';
</script>

<section class="container mx-auto px-4 py-12" id="contact">
	<div class="mx-auto mb-6 flex w-fit items-center justify-center border-b-4 pb-2">
		<h1 class="text-center text-2xl font-bold sm:text-3xl">Get In Touch</h1>
	</div>

	<div class="mx-auto grid max-w-5xl grid-cols-1 gap-10 py-6 md:grid-cols-2">
		<ScrollReveal class="h-full" fullHeight={true}>
			<div
				class="hover-shadow flex h-full flex-col justify-between rounded-lg border-4 border-zinc-700 bg-yellow-100 p-8"
			>
				<div>
					<h2 class="mb-6 text-3xl font-bold">Let's build something amazing together!</h2>
					<p class="mb-8 text-zinc-800">
						I'm currently available for freelance work and new opportunities. If you have a project in
						mind or just want to chat, feel free to reach out directly via email.
					</p>
				</div>

				<div class="flex flex-wrap gap-4">
					<a
						href="mailto:sajudinmaruf@gmail.com"
						class="hover-shadow flex items-center gap-2 rounded-full border-2 border-zinc-700 bg-white px-6 py-3 font-bold transition hover:bg-zinc-100"
					>
						<i class="fas fa-envelope"></i> Email Me
					</a>
				</div>
			</div>
		</ScrollReveal>

		<ScrollReveal class="h-full" stagger={200} fullHeight={true}>
			<div
				class="hover-shadow flex h-full flex-col justify-between rounded-lg border-4 border-zinc-700 bg-white p-8"
			>
				<div>
					<h2 class="mb-6 text-3xl font-bold">Connect With Me</h2>
					<p class="mb-8 text-zinc-800">
						Stay updated with my latest projects and daily activities by following me on social
						media.
					</p>
				</div>

				<div class="flex flex-wrap gap-4">
					<a
						href="https://github.com/Udean777"
						target="_blank"
						class="hover-shadow flex items-center gap-2 rounded-full border-2 border-zinc-700 bg-white px-4 py-2 font-bold transition hover:bg-zinc-100"
					>
						<i class="fab fa-github"></i> GitHub
					</a>
					<a
						href="https://www.linkedin.com/in/sajudin/"
						target="_blank"
						class="hover-shadow flex items-center gap-2 rounded-full border-2 border-zinc-700 bg-white px-4 py-2 font-bold transition hover:bg-zinc-100"
					>
						<i class="fab fa-linkedin"></i> LinkedIn
					</a>
					<a
						href="https://instagram.com/ssajudn"
						target="_blank"
						class="hover-shadow flex items-center gap-2 rounded-full border-2 border-zinc-700 bg-white px-4 py-2 font-bold transition hover:bg-zinc-100"
					>
						<i class="fab fa-instagram"></i> Instagram
					</a>
				</div>
			</div>
		</ScrollReveal>
	</div>
</section>


