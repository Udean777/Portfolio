<script lang="ts">
  import { Motion } from "svelte-motion";
  import IconContainer from "./IconContainer.svelte";
  import { cn } from "$lib/utils";

  type Item = {
    title: string;
    icon: any;
    href: string;
  };
  
  let { items = [], className = "" } = $props<{
    items: Item[];
    className?: string;
  }>();
</script>

<Motion
  let:motion
  initial={{ x: -100, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ type: "spring", stiffness: 260, damping: 20 }}
>
  <div
    use:motion
    class={cn(
      "fixed left-10 top-0 bottom-0 z-50 hidden md:flex flex-col w-20 h-fit my-auto gap-6 items-center justify-center bg-white border-2 rounded-full border-zinc-700 py-10",
      className
    )}
  >
    {#each items as item (item.title)}
      <IconContainer {...item} direction="right" />
    {/each}
  </div>
</Motion>
