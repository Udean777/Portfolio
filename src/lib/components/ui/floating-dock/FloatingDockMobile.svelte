<script lang="ts">
  import { fly } from "svelte/transition";
  import { backOut } from "svelte/easing";
  import { LayoutGrid, X } from "lucide-svelte";
  import { cn } from "$lib/utils";

  interface Item {
    title: string;
    icon: any;
    href: string;
  }

  let { items = [], className = "" } = $props<{
    items: Item[];
    className?: string;
  }>();

  let open = $state(false);

  // Custom transition for a more "liquid" pop effect
  function pop(node: HTMLElement, { delay = 0, duration = 500 }) {
    return {
      delay,
      duration,
      easing: backOut,
      css: (t: number) => `
        transform: translateY(${(1 - t) * 40}px) scale(${0.5 + 0.5 * t});
        opacity: ${t};
      `
    };
  }
</script>

<div class={cn("fixed bottom-10 right-10 z-50 block md:hidden", className)}>
  <div class="relative flex flex-col items-end gap-4">
    {#if open}
      <div class="flex flex-col items-end gap-4 mb-4">
        {#each items as item, i (item.title)}
          {@const Icon = item.icon}
          <a
            href={item.href}
            transition:pop={{ delay: (items.length - 1 - i) * 80 }}
            class="flex items-center gap-3 group"
            onclick={() => (open = false)}
          >
            <span class="bg-zinc-900 text-white text-[10px] font-black uppercase px-2 py-1 rounded border-2 border-zinc-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {item.title}
            </span>
            <div class="p-3 rounded-full bg-white border-2 border-zinc-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
              <Icon class="h-6 w-6 text-blue-600" />
            </div>
          </a>
        {/each}
      </div>
    {/if}

    <button
      onclick={() => (open = !open)}
      class="p-4 rounded-full bg-white border-2 border-zinc-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer z-[60]"
      aria-label="Toggle menu"
    >
      <div class={cn("transition-transform duration-300", open && "rotate-180")}>
        {#if open}
          <X class="h-6 w-6 text-zinc-700" />
        {:else}
          <LayoutGrid class="h-6 w-6 text-zinc-700" />
        {/if}
      </div>
    </button>
  </div>
</div>
