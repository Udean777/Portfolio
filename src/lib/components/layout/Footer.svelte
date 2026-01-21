<footer
	class="flex flex-col items-center justify-center gap-6 border-t border-solid border-violet-950 py-8 sm:flex-row sm:justify-around sm:gap-8 sm:py-10 md:items-end"
>
	<a href="/" class="hover-yellow-half text-3xl font-bold text-zinc-700 transition duration-200">
		ssajudn<span class="text-5xl text-blue-500">.</span>
	</a>

	<span
		class="hover-yellow-half text-center text-lg font-bold text-zinc-700 transition duration-200"
	>
		&copy; {new Date().getFullYear()} ssajudn. All rights reserved.
	</span>

	<div class="flex gap-4">
		<a href="https://instagram.com/ssajudn" aria-label="Instagram" target="_blank">
			<i class="fa-brands fa-instagram text-[30px]"></i></a
		>
		<a href="https://github.com/Udean777" aria-label="GitHub" target="_blank">
			<i class="fa-brands fa-github text-[30px]"></i>
		</a>
		<a href="https://www.linkedin.com/in/sajudin/" aria-label="LinkedIn" target="_blank">
			<i class="fa-brands fa-linkedin text-[30px]"></i>
		</a>
		<a href="https://twitter.com/ssjudn" aria-label="Twitter" target="_blank">
			<i class="fa-brands fa-x-twitter text-[30px]"></i>
		</a>
	</div>
</footer>

<style>
	.hover-yellow-half {
		background-image: linear-gradient(transparent 50%, yellow 50%);
		background-size: 100% 200%;
		background-position: 0 0;
		background-repeat: no-repeat;
		transition: background-position 0.2s ease-in-out;
	}

	.hover-yellow-half:hover {
		background-position: 0 30%;
	}
</style>
