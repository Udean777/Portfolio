<script lang="ts">
  import { fly } from "svelte/transition";
  import { cn } from "$lib/utils";

  type Direction = "top" | "bottom" | "left" | "right";

  let { title, icon: Icon, href, direction = "top" } = $props<{
    title: string;
    icon: any;
    href: string;
    direction?: Direction;
  }>();

  let hovered = $state(false);

  const tooltipConfigs: Record<Direction, string> = {
    top: "left-1/2 -translate-x-1/2 -top-14",
    bottom: "left-1/2 -translate-x-1/2 top-full mt-4",
    left: "right-full mr-4 top-1/2 -translate-y-1/2",
    right: "left-full ml-4 top-1/2 -translate-y-1/2",
  };

  const caretConfigs: Record<Direction, string> = {
    top: "-bottom-2 left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-t-zinc-700",
    bottom: "-top-2 left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-b-[6px] border-b-zinc-700",
    left: "-right-2 top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-l-[6px] border-l-zinc-700",
    right: "-left-2 top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-r-[6px] border-r-zinc-700",
  };

  const getFlyParams = (dir: Direction) => {
    switch (dir) {
      case "top": return { y: 10, duration: 200 };
      case "bottom": return { y: -10, duration: 200 };
      case "left": return { x: 10, duration: 200 };
      case "right": return { x: -10, duration: 200 };
    }
  };
</script>

<a 
  href={href} 
  class="group/icon relative flex flex-col items-center justify-center transition-all duration-300 hover:scale-125 active:scale-95"
  onmouseenter={() => (hovered = true)}
  onmouseleave={() => (hovered = false)}
>
  {#if hovered}
    <div
      transition:fly={getFlyParams(direction as Direction)}
      class={cn(
        "absolute px-3 py-1.5 whitespace-pre rounded-md bg-zinc-900 text-white text-xs font-black border-2 border-zinc-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-[100]",
        tooltipConfigs[direction as Direction]
      )}
    >
      {title}
      <!-- Caret/Triangle -->
      <div
        class={cn(
          "absolute w-0 h-0 border-transparent",
          caretConfigs[direction as Direction]
        )}
      ></div>
    </div>
  {/if}

  <div
    class="w-12 h-12 aspect-square rounded-full bg-white flex items-center justify-center relative border-2 border-zinc-700 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-200"
  >
    <div class="flex items-center justify-center w-6 h-6">
      <Icon class="h-full w-full text-blue-600 dark:text-blue-400" />
    </div>
  </div>
</a>
