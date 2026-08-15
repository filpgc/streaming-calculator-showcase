// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

/** Cloudflare Worker bindings surfaced through SvelteKit's `platform.env`. */
interface Env {
	SPONSOR_CLICKS?: AnalyticsEngineDataset;
	OFFER_VIEWS?: AnalyticsEngineDataset;
}

interface AnalyticsEngineDataset {
	writeDataPoint(event: {
		blobs?: string[];
		doubles?: number[];
		indexes?: string[];
	}): void;
}

declare global {
	namespace App {
		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties
		}

		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
	}
}

export {};
