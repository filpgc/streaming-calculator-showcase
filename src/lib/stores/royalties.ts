import { writable } from 'svelte/store';

function createRoyaltiesStore() {
	const { subscribe, set } = writable<number>(100);

	return {
		subscribe,
		set: (percentage: number) => {
			const clamped = Math.max(0, Math.min(100, percentage));
			set(clamped);
		}
	};
}

export const royaltyPercentage = createRoyaltiesStore();
