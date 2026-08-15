import { platforms, type PlatformData } from '../../data';

/**
 * Stream-count milestone pages: "how much is 80 million streams on Apple Music".
 *
 * Search Console showed this intent arriving in volume with nothing to land on.
 * "how much is 80 million streams on apple music" alone drew 424 impressions in
 * a week with zero clicks, plus 184 for the Spotify phrasing and 60 for a rands
 * variant, because the site answers the inverse question and not this one. The
 * goal pages go from money to streams; these go from streams to money.
 *
 * The currency variants are worth noting: people search this in their own
 * money, which the calculator already supports.
 */

export interface Milestone {
	/** URL segment, e.g. '80-million'. */
	slug: string;
	/** Stream count. */
	streams: number;
	/** Written out for prose and headings, e.g. '80 million'. */
	label: string;
}

export const milestones: Milestone[] = [
	{ slug: '1000', streams: 1_000, label: '1,000' },
	{ slug: '10000', streams: 10_000, label: '10,000' },
	{ slug: '50000', streams: 50_000, label: '50,000' },
	{ slug: '100000', streams: 100_000, label: '100,000' },
	{ slug: '500000', streams: 500_000, label: '500,000' },
	{ slug: '1-million', streams: 1_000_000, label: '1 million' },
	{ slug: '5-million', streams: 5_000_000, label: '5 million' },
	{ slug: '10-million', streams: 10_000_000, label: '10 million' },
	{ slug: '50-million', streams: 50_000_000, label: '50 million' },
	{ slug: '80-million', streams: 80_000_000, label: '80 million' },
	{ slug: '100-million', streams: 100_000_000, label: '100 million' },
	{ slug: '1-billion', streams: 1_000_000_000, label: '1 billion' }
];

/** Platforms that get a milestone page. Ordered as they appear on the site. */
export const MILESTONE_PLATFORM_SLUGS = [
	'spotify',
	'apple-music',
	'youtube-music',
	'amazon-music',
	'tidal',
	'deezer'
] as const;

export const milestonePlatforms: PlatformData[] = MILESTONE_PLATFORM_SLUGS.map(
	(slug) => platforms[slug]
);

/** The counts worth surfacing as links from a platform calculator page. */
export const MILESTONE_HIGHLIGHTS = ['100000', '1-million', '10-million', '100-million'] as const;

export function getMilestone(slug: string): Milestone | undefined {
	return milestones.find((m) => m.slug === slug);
}

export function getMilestonePlatform(slug: string): PlatformData | undefined {
	return milestonePlatforms.find((p) => p.slug === slug);
}

/** Gross payout before any distributor or label share. */
export function grossEarnings(streams: number, rate: number): number {
	return streams * rate;
}

export function formatUSD(amount: number): string {
	return amount.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: amount < 100 ? 2 : 0
	});
}

/**
 * The realistic take-home splits an artist actually sees. A gross figure on its
 * own is the number that makes these pages feel dishonest, because almost
 * nobody keeps all of it.
 */
export const SPLITS = [
	{
		label: 'Independent, no cut taken',
		share: 1,
		note: 'A flat-fee distributor such as DistroKid or CD Baby takes 0% of royalties.'
	},
	{
		label: 'Distributor takes 15%',
		share: 0.85,
		note: 'Percentage-based distributors keep a share of everything you earn.'
	},
	{
		label: 'Split with one collaborator',
		share: 0.5,
		note: 'An even split on a track with a feature or a co-writer.'
	},
	{
		label: 'Standard label deal, 20% to artist',
		share: 0.2,
		note: 'A traditional record deal after the advance has recouped.'
	}
];
