<script lang="ts">
	import { Motion } from 'svelte-motion';
	import IconContainer from './IconContainer.svelte';
	import { cn } from '$lib/utils';

	type Item = {
		title: string;
		icon: any;
		href: string;
	};

	let { items = [], className = '' } = $props<{
		items: Item[];
		className?: string;
	}>();
</script>

<Motion
	let:motion
	initial={{ y: -100, opacity: 0 }}
	animate={{ y: 0, opacity: 1 }}
	transition={{ type: 'spring', stiffness: 260, damping: 20 }}
>
	<div
		use:motion
		class={cn(
			'fixed top-10 right-0 left-0 z-50 mx-auto hidden h-20 w-fit flex-row items-center justify-center gap-6 rounded-full border-2 border-zinc-700 bg-white px-10 md:flex',
			className
		)}
	>
		{#each items as item (item.title)}
			<IconContainer {...item} direction="bottom" />
		{/each}
	</div>
</Motion>
