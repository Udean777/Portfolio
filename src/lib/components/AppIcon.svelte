<script lang="ts">
	interface Props {
		id: string;
		size?: number;
	}
	let { id, size = 60 }: Props = $props();

	const icons: Record<string, string> = {
		finder:   '/images/icons/finder.png',
		terminal: '/images/icons/terminal.png',
		notes:    '/images/icons/notes.png',
		safari:   '/images/icons/safari.png',
		mail:     '/images/icons/mail.png',
		settings: '/images/icons/settings.png',
	};

	const src = icons[id] ?? icons['settings'];
	const label = id.charAt(0).toUpperCase() + id.slice(1);
</script>

<img
	{src}
	alt={label}
	width={size}
	height={size}
	style="width:{size}px;height:{size}px;object-fit:contain;display:block;"
	draggable="false"
/>
