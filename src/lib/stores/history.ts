import { writable } from 'svelte/store';

export type HistoryEntry = {
	command: string;
	output: string | null;
	component: string | null;
};

export const history = writable<HistoryEntry[]>([]);

export function addToHistory(entry: HistoryEntry) {
	history.update((h) => [...h, entry]);
}

export function clearHistory() {
	history.set([]);
}
