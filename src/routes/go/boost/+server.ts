import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Click-tracking redirect for the Boost Collective sponsor placement.
 *
 * Each hit on this route is one click. We write a data point to Cloudflare
 * Workers Analytics Engine (SPONSOR_CLICKS binding, dataset: sponsor_clicks)
 * with the sponsor key as blob1 and as an index, then 302 onward immediately.
 *
 * Counts remain queryable through Cloudflare Analytics Engine. The operational
 * viewer used by the production service is intentionally not in this copy.
 */
const DESTINATION =
	'https://www.boost-collective.com/?utm_source=streamingcalculator&utm_medium=sponsor&utm_campaign=homepage';

export const GET: RequestHandler = ({ platform }) => {
	// Best-effort: never let analytics delay or break the redirect.
	try {
		platform?.env?.SPONSOR_CLICKS?.writeDataPoint({
			blobs: ['boost'],
			indexes: ['boost']
		});
	} catch {
		// Swallow analytics failures.
	}

	throw redirect(302, DESTINATION);
};
