import { writable } from 'svelte/store';

export interface DragState {
	dragging: boolean;
	id: string;
	label: string;
	x: number;
	y: number;
	startX: number;
	startY: number;
	overDock: boolean;
	dockInsertIndex: number | null;
}

const initial: DragState = {
	dragging: false,
	id: '',
	label: '',
	x: 0,
	y: 0,
	startX: 0,
	startY: 0,
	overDock: false,
	dockInsertIndex: null
};

function createDragStore() {
	const { subscribe, set, update } = writable<DragState>(initial);

	return {
		subscribe,
		start: (id: string, label: string, x: number, y: number, startX: number, startY: number) => {
			set({ dragging: true, id, label, x, y, startX, startY, overDock: false, dockInsertIndex: null });
		},
		move: (x: number, y: number) => {
			update((s) => ({ ...s, x, y }));
		},
		setOverDock: (over: boolean, insertIndex: number | null) => {
			update((s) => ({ ...s, overDock: over, dockInsertIndex: insertIndex }));
		},
		end: () => set(initial)
	};
}

export const dragStore = createDragStore();

// Reactive set of IDs currently in the dock — used by desktop to hide those icons
export const dockItemIds = writable<Set<string>>(
	new Set(['finder', 'terminal', 'safari', 'notes', 'mail', 'settings'])
);
