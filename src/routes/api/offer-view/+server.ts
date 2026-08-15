import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { placements } from '$lib/data/placements';

/**
 * Records which earnings band a visitor calculated into, whether or not they
 * clicked the offer.
 *
 * /go only fires on a click, so the site could say how many people clicked an
 * advance offer but not how many qualified to see one. That second number is
 * what an advance or catalog partner asks for first, since it is the size of
 * the audience they would be buying, and "20,000 monthly visitors" does not
 * answer it.
 *
 * Deliberately narrow: the band, the placement, and nothing else. No stream
 * count, no earnings figure, no identifier, no cookie. Aggregate counts are
 * all that is needed to quote a rate, and anything more would be recording a
 * stranger's income.
 */
const BANDS = new Set(['under-100', '100-500', 'over-500']);

const validIds = new Set(placements.map((p) => p.id));

export const POST: RequestHandler = async ({ request, platform }) => {
	let body: { band?: unknown; placement?: unknown };
	try {
		body = await request.json();
	} catch {
		throw error(400, 'Bad request');
	}

	const band = String(body.band ?? '');
	const placement = String(body.placement ?? '');

	// Reject anything not in the known sets, so the dataset cannot be filled
	// with arbitrary strings by anyone who finds the endpoint.
	if (!BANDS.has(band) || !validIds.has(placement)) {
		throw error(400, 'Bad request');
	}

	try {
		platform?.env?.OFFER_VIEWS?.writeDataPoint({
			blobs: [band, placement],
			indexes: [band]
		});
	} catch {
		// Analytics must never break the page it is measuring.
	}

	return json({ ok: true });
};
