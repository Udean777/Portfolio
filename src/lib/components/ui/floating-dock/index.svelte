<script lang="ts">
  import FloatingDockDesktop from "./FloatingDockDesktop.svelte";
  import FloatingDockMobile from "./FloatingDockMobile.svelte";

  interface Item {
    title: string;
    icon: any;
    href: string;
  }

  let { items = [], className = "" } = $props<{
    items: Item[];
    className?: string;
  }>();
</script>

<FloatingDockDesktop {items} {className} />
<FloatingDockMobile {items} {className} />
