import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { distributors } from '$lib/data/distributors';
import { getPlacement } from '$lib/data/placements';

/**
 * Click-tracking redirects for every outbound commercial link on the site:
 * distributor rows in the distributor calculator, and the ad slots rendered by
 * SponsorSlot. Distributors are logged as `dist-<id>` and slot placements under
 * their own id, so aggregate performance remains separable by placement.
 *
 * The referring page path is logged alongside the key, while its query string
 * is discarded so it cannot carry visitor input into analytics.
 *
 * Static sibling routes (/go/boost, /go/boost-ads) take precedence over this
 * parameterized one, so existing sponsor keys are unaffected.
 */
const UTM =
	'utm_source=streamingcalculator&utm_medium=referral&utm_campaign=distributor-calculator';

/** Path only: query strings can carry personal data we have no reason to store. */
function refPath(request: Request): string {
	const referer = request.headers.get('referer');
	if (!referer) return 'direct';
	try {
		return new URL(referer).pathname;
	} catch {
		return 'unknown';
	}
}

function track(platform: App.Platform | undefined, key: string, source: string): void {
	// Best-effort: never let analytics delay or break the redirect.
	try {
		platform?.env?.SPONSOR_CLICKS?.writeDataPoint({
			blobs: [key, source],
			indexes: [key]
		});
	} catch {
		// Swallow analytics failures.
	}
}

/**
 * Affiliate networks attribute partly on the referring domain, so the merchant
 * has to see streamingcalculator.com and not an empty Referer. A 302 preserves
 * the original page's referrer by default, but only while nothing sets a
 * stricter policy: a `Referrer-Policy: no-referrer` added later on Cloudflare or
 * in app.html would silently strip it, and the first sign would be a shrinking
 * payout. Pinning the policy on the redirect itself means it survives that.
 *
 * `origin` sends exactly `https://streamingcalculator.com/` and no path, which
 * is what the networks match on and leaks nothing about which page they came
 * from.
 */
function outbound(dest: string): Response {
	return new Response(null, {
		status: 302,
		headers: {
			location: dest,
			'referrer-policy': 'origin'
		}
	});
}

export const GET: RequestHandler = ({ params, platform, request }) => {
	const source = refPath(request);

	const d = distributors.find((x) => x.id === params.key);
	if (d) {
		// Affiliate URLs are used verbatim, because appending UTMs can break their
		// attribution. Plain homepage links get our UTM tags instead.
		const base = d.affiliateUrl || d.homepageUrl;
		const dest = d.affiliateUrl ? base : `${base}${base.includes('?') ? '&' : '?'}${UTM}`;
		track(platform, `dist-${d.id}`, source);
		return outbound(dest);
	}

	// Slot placements. These resolve regardless of flight dates so a link in an
	// older article still lands somewhere useful after a campaign ends.
	const p = getPlacement(params.key);
	if (p) {
		track(platform, p.id, source);
		return outbound(p.url);
	}

	throw error(404, 'Not found');
};
