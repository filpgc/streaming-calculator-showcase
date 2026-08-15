import type { PageLoad } from './$types';
import { blogListingSEO } from '$lib/seo';

export const prerender = true;

export const load: PageLoad = ({ data }) => {
	// posts / pinnedSlug come from +page.server.ts so the blog metadata
	// module never reaches the browser.
	return {
		...data,
		seo: blogListingSEO()
	};
};
