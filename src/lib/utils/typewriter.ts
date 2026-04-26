import { writable } from 'svelte/store';

export function typewriter(text: string, speed = 18): Promise<string> & { store: ReturnType<typeof writable<string>> } {
	const store = writable('');
	let cancelled = false;

	const promise = new Promise<string>((resolve) => {
		let i = 0;
		function next() {
			if (cancelled) return;
			if (i <= text.length) {
				store.set(text.slice(0, i));
				i++;
				setTimeout(next, speed);
			} else {
				resolve(text);
			}
		}
		next();
	}) as Promise<string> & { store: ReturnType<typeof writable<string>> };

	promise.store = store;
	return promise;
}
