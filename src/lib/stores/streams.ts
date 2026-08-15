import { writable, derived } from 'svelte/store';
import { streamingServices } from '../../data';

export interface StreamData {
	name: string;
	streams: number;
	rate: number;
	discoveryMode: boolean;
}

function createStreamsStore() {
	const initial: Record<string, StreamData> = {};

	streamingServices.forEach((service) => {
		initial[service.name] = {
			name: service.name,
			streams: 0,
			rate: service.rate,
			discoveryMode: false
		};
	});

	const { subscribe, set, update } = writable<Record<string, StreamData>>(initial);

	return {
		subscribe,
		setStreams: (name: string, streams: number) =>
			update((state) => ({
				...state,
				[name]: { ...state[name], streams }
			})),
		toggleDiscoveryMode: (name: string) =>
			update((state) => ({
				...state,
				[name]: { ...state[name], discoveryMode: !state[name].discoveryMode }
			})),
		reset: () => set(initial),
		resetService: (name: string) =>
			update((state) => ({
				...state,
				[name]: { ...state[name], streams: 0, discoveryMode: false }
			}))
	};
}

export const streams = createStreamsStore();

export const totalStreams = derived(streams, ($streams) =>
	Object.values($streams).reduce((sum, service) => sum + service.streams, 0)
);
