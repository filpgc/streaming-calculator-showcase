import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Click-tracking redirect for Boost Collective links inside the Music Ads
 * blog article. Same mechanism as /go/boost, logged under its own sponsor
 * key so article clicks and homepage banner clicks remain separable.
 */
const DESTINATION =
	'https://www.boost-collective.com/music-ads?utm_source=streamingcalculator&utm_medium=blog&utm_campaign=music-ads-article';

export const GET: RequestHandler = ({ platform }) => {
	// Best-effort: never let analytics delay or break the redirect.
	try {
		platform?.env?.SPONSOR_CLICKS?.writeDataPoint({
			blobs: ['boost-ads'],
			indexes: ['boost-ads']
		});
	} catch {
		// Swallow analytics failures.
	}

	throw redirect(302, DESTINATION);
};
