<script lang="ts">
	import { onMount } from 'svelte';

	let { children, once = true, threshold = 0.1, class: className = '', stagger = 0 } = $props();

	let element: HTMLElement;
	let visible = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visible = true;
						if (once) observer.unobserve(element);
					} else if (!once) {
						visible = false;
					}
				});
			},
			{ threshold }
		);

		observer.observe(element);
		return () => observer.disconnect();
	});
</script>

<div bind:this={element} class="reveal-container {className}" style:transition-delay="{stagger}ms">
	<div class="reveal-inner {visible ? 'active' : ''}">
		{@render children()}
	</div>
</div>

<style>
	.reveal-inner {
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
			transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	.reveal-inner.active {
		opacity: 1;
		transform: translateY(0);
	}
</style>
