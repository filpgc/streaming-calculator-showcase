import { redirect, type Handle } from '@sveltejs/kit';
import { milestonePlatforms } from '$lib/data/milestones';

/**
 * Retired URL patterns, redirected rather than deleted.
 *
 * The 72 "how much is N streams on X" pages are gone. Search Console showed
 * what that page shape is worth now: "how much is 80 million streams on apple
 * music" drew 774 impressions at position 4 and produced zero clicks, because
 * Google's AI Overview quotes the page's own sentence and answers the question
 * in place. Across the whole query set, questions convert at 0.23% while
 * queries containing "calculator" convert at 14% from comparable positions, so
 * the format cannot pay off however many of them exist.
 *
 * They are 301s, not 404s. Google has these indexed and several rank, so the
 * link equity is worth moving to the platform page for the same service rather
 * than throwing away, and a burst of 72 not-founds is a worse signal than a
 * burst of permanent redirects. Reversible: delete this block and restore the
 * route.
 */
const MILESTONE_PATH = /^\/how-much-is-[a-z0-9-]+-streams-on-([a-z-]+)\/?$/;

export const handle: Handle = async ({ event, resolve }) => {
	const match = event.url.pathname.match(MILESTONE_PATH);
	if (match) {
		const platform = milestonePlatforms.find((p) => p.slug === match[1]);
		redirect(301, platform ? `/${platform.slug}-calculator` : '/');
	}

	return resolve(event);
};
