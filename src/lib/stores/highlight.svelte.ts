class HighlightStore {
	hoveredTech = $state<string | null>(null);
}

export const highlightStore = new HighlightStore();
