/**
 * Ad inventory registry.
 *
 * Before this existed, the only paid unit on the site was the Boost banner
 * hardcoded into the homepage, plus the Boost pill in FloatingNav. Every other
 * page, whether one of the 44 country royalty pages, the 44 YouTube country
 * pages, the comparison pages or the creator calculators, carried no placement
 * at all, and the blog's affiliate links pointed straight at the merchant so
 * their clicks were never counted. This registry replaces the unused
 * RotatingBanner/affiliates pair.
 *
 * A slot is a named zone on a page. A placement is something that can fill one.
 * Paid sponsors outrank affiliate fill, so an unsold slot still earns instead of
 * sitting empty, and every click routes through /go/<id> so each zone
 * accumulates the performance data we quote when selling it.
 */

/** Named zones. Add a slot here, then render <SponsorSlot slot="..." /> in the page. */
export type SlotId =
	| 'home-hero' // Above the main calculator. Currently the Boost banner.
	| 'music-inline' // Music-side pages: platform, comparison, country, goal.
	// Creator calculators. Deliberately unfilled: the only affiliates on the
	// books sell to music producers, and a plugin shop on a TikTok payout page
	// is an advert about nothing. The slot stays wired so a genuine
	// creator-economy partner drops straight in.
	| 'creator-inline'
	| 'distributor-featured' // Top of the distributor calculator results.
	| 'result-offer'; // Directly under the calculated earnings figure.

/**
 * Which audience a page serves. The creator calculators draw a completely
 * different advertiser pool (editing tools, gear, sponsorship marketplaces)
 * than the music pages do, so the two are targeted and sold separately.
 */
export type Audience = 'music' | 'creator';

export interface Placement {
	/** Tracking key. Becomes /go/<id>, and blob1 in the click dataset. */
	id: string;
	/** Paid sponsors render ahead of affiliate fill regardless of priority. */
	kind: 'sponsor' | 'affiliate';
	slots: SlotId[];
	audiences: Audience[];
	/** Tie-break within a kind. Higher wins. */
	priority: number;
	/** Destination. Only ever read server-side by /go, never rendered. */
	url: string;
	/** Visual accent, matched to the advertiser's brand. */
	accent: string;
	/** Brand image for the top row. */
	logo?: string;
	/**
	 * Set when `logo` is a square app icon rather than a wide lockup. The top row
	 * sizes wordmarks by height, which leaves a 1:1 mark looking like a stray dot,
	 * so these get a little more height and a rounded corner instead.
	 */
	logoIcon?: boolean;
	/** Shown in place of a logo when no image file exists yet. */
	wordmark?: string;
	badge?: string;
	/**
	 * Headline and body may contain two tokens, filled in by ResultOffer:
	 *   {amount}  the earnings figure on screen, in the visitor's currency
	 *   {advance} an illustrative advance against it
	 * Everything else renders verbatim.
	 */
	headline: string;
	body: string;
	/**
	 * Copy used only in the result-offer slot, where the visitor's own figure is
	 * on screen and can be named. Kept separate rather than putting {amount} in
	 * the main headline, because the same placement also renders in slots that
	 * have no figure to substitute and the token would print literally.
	 */
	result?: { headline: string; body: string };
	cta: string;
	/**
	 * Earnings band this placement targets, in USD, evaluated against the
	 * calculated figure before currency conversion so the bands don't move when
	 * someone switches to EUR. Only meaningful for the result-offer slot.
	 */
	minUsd?: number;
	maxUsd?: number;
	/**
	 * Multiple of trailing-year earnings used for the {advance} token, set per
	 * partner from their published terms rather than one guess for everyone.
	 * Defaults to 1x.
	 */
	advanceMultiple?: number;
	/**
	 * Flight dates, ISO. Outside them the placement stops rendering. Its /go
	 * key keeps redirecting either way, so links already published in old blog
	 * posts or shared screenshots don't rot when a campaign ends.
	 */
	startsAt?: string;
	endsAt?: string;
	/**
	 * Long-form section a sponsor replaces on the page they have bought. It is
	 * rendered with a Sponsored label and never the word "editorial", because
	 * paid copy presented as an editorial pick is the one thing that would cost
	 * the page the trust its clicks are worth.
	 */
	editorial?: { title: string; content: string };
	/**
	 * Category lock. A page passes the categories it has already placed as
	 * `exclude`, so a sponsor buying exclusivity in their category actually gets
	 * it rather than sitting next to a competitor further down the page.
	 */
	category: string;
}

export const placements: Placement[] = [
	{
		id: 'boost',
		kind: 'sponsor',
		slots: ['home-hero'],
		audiences: ['music'],
		priority: 100,
		// /go/boost is a static route and wins over /go/[key], so this URL is a
		// fallback rather than the live destination. Keep the two in sync.
		url: 'https://www.boost-collective.com/?utm_source=streamingcalculator&utm_medium=sponsor&utm_campaign=homepage',
		accent: 'boost',
		logo: '/boost-collective-logo.png',
		badge: '50% OFF',
		headline: 'Get your music on Spotify playlists',
		body: 'Trusted by 100,000+ artists.',
		cta: 'Claim offer',
		startsAt: '2026-05-19',
		category: 'playlist-promo'
	},
	{
		id: 'plugin-boutique',
		kind: 'affiliate',
		slots: ['music-inline'],
		audiences: ['music'],
		priority: 60,
		url: 'https://www.pluginboutique.com/?a_aid=64d179a60ffc7',
		accent: 'violet',
		badge: 'Up to 90% off',
		headline: 'Deals on studio plugins and synths',
		body: 'The same tools most producers already buy, discounted across the store.',
		cta: 'See deals',
		category: 'plugins'
	},
	{
		id: 'loopmasters',
		kind: 'affiliate',
		slots: ['music-inline'],
		audiences: ['music'],
		priority: 50,
		url: 'https://www.loopmasters.com/bundles?utm_source=AFRS&utm_medium=AFRS&utm_campaign=bundles&a_aid=64d179a60ffc7&a_bid=06298f2e',
		accent: 'amber',
		badge: 'Sample packs',
		headline: 'Cut production time in half',
		body: 'Royalty-free loops and one-shots, cleared for commercial release.',
		cta: 'Browse packs',
		category: 'samples'
	},
	/*
	 * The result-offer ladder. What an artist needs depends entirely on what
	 * the calculator just told them, so the slot serves three different offers
	 * against three earnings bands rather than one banner to everyone:
	 *
	 *   under $100  studio deals, framed as making the amount go further
	 *   $100+       distribution, so a percentage cut stops eating the total
	 *   $500+       a royalty advance, once a partner is signed
	 *
	 * Copy in this slot sits directly under a number the visitor may well be
	 * disappointed by, so it talks about their money and never about the
	 * quality of their music. We have no basis for the latter and it reads as
	 * an insult attached to their own earnings.
	 *
	 * The top band is the valuable one. An advance company's qualifying
	 * question is "what do you earn from streaming", which is the number
	 * already on screen, so the lead arrives pre-qualified rather than as a
	 * click. That's worth an order of magnitude more than a distribution
	 * bounty, and it's the one placement here that a generic calculator can't
	 * copy, because it needs the deal behind it.
	 */
	{
		id: 'result-tools',
		kind: 'affiliate',
		slots: ['result-offer'],
		audiences: ['music'],
		priority: 70,
		maxUsd: 100,
		url: 'https://www.pluginboutique.com/?a_aid=64d179a60ffc7',
		accent: 'violet',
		badge: 'Studio deals',
		headline: 'Make your {amount} go further',
		body: 'Discounted plugins, samples and mastering tools.',
		cta: 'See deals',
		category: 'plugins'
	},
	{
		id: 'result-distribution',
		kind: 'affiliate',
		slots: ['result-offer'],
		audiences: ['music'],
		priority: 70,
		minUsd: 100,
		// Deliberately uncapped. The advance placements outrank this on priority
		// inside their own band, so leaving the top open means the highest
		// earners still see an offer while those partners are unsigned.
		url: 'https://distrokid.com/vip/seven/3063815',
		accent: 'teal',
		// The same asset the ranked list and the editor's pick strip use, so the
		// mark is consistent everywhere DistroKid appears on the site.
		logo: '/assets/images/distributors/distrokid.png',
		logoIcon: true,
		wordmark: 'DistroKid',
		headline: 'Keep all of your {amount}',
		body: 'DistroKid charges a flat fee and takes 0% of royalties.',
		cta: 'Claim 7% off',
		category: 'distribution'
	},
	{
		id: 'distrokid-student',
		kind: 'affiliate',
		slots: [],
		audiences: ['music'],
		priority: 0,
		url: 'https://distrokid.com/student/3063815',
		accent: 'violet',
		headline: 'Student or educator? 50% off DistroKid',
		body: 'Unlimited distribution at half price with a valid student email.',
		cta: 'Claim 50% off',
		category: 'distribution'
	}
];

const byId = new Map(placements.map((p) => [p.id, p]));

export function getPlacement(id: string): Placement | undefined {
	return byId.get(id);
}

/** A placement is live when today falls inside its flight dates. */
export function isLive(p: Placement, now: Date = new Date()): boolean {
	const t = now.getTime();
	if (p.startsAt && t < Date.parse(p.startsAt)) return false;
	// endsAt is inclusive of the whole final day.
	if (p.endsAt && t > Date.parse(p.endsAt) + 86_400_000 - 1) return false;
	return true;
}

/** Small stable string hash. Same seed always picks the same fill. */
function hash(seed: string): number {
	let h = 2166136261;
	for (let i = 0; i < seed.length; i++) {
		h ^= seed.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}

/** Options narrowing which placements may fill a slot. */
export interface ResolveOptions {
	/** Seeds affiliate rotation. Use the page path. */
	seed?: string;
	/** Calculated earnings in USD, for slots that target an earnings band. */
	usd?: number;
	/** Categories already placed on this page, so a page can't double up. */
	exclude?: string[];
	now?: Date;
}

/**
 * Resolve which placement fills a slot.
 *
 * A live sponsor always wins, because that's what they paid for. Unsold slots fall
 * back to affiliate fill, spread deterministically across every eligible
 * merchant by hashing `seed` (the page path). Strict priority ordering would
 * hand every unsold slot on the site to one merchant and leave the rest as dead
 * config; rotating by page keeps them all earning and makes their per-page
	 * click counts attributable to the page that produced them.
 *
 * Deterministic rather than random so server and client render the same fill,
 * and so a given page's numbers stay attributable to a given merchant.
 */
export function resolveSlot(
	slot: SlotId,
	audience: Audience,
	opts: ResolveOptions = {}
): Placement | undefined {
	const { seed = '', usd, exclude = [], now = new Date() } = opts;

	const eligible = placements.filter((p) => {
		if (!p.slots.includes(slot) || !p.audiences.includes(audience)) return false;
		if (!isLive(p, now)) return false;
		if (exclude.includes(p.category)) return false;
		// An earnings band only filters when we actually have a figure.
		if (usd !== undefined) {
			if (p.minUsd !== undefined && usd < p.minUsd) return false;
			if (p.maxUsd !== undefined && usd >= p.maxUsd) return false;
		} else if (p.minUsd !== undefined || p.maxUsd !== undefined) {
			return false;
		}
		return true;
	});
	if (!eligible.length) return undefined;

	const sponsors = eligible
		.filter((p) => p.kind === 'sponsor')
		.sort((a, b) => b.priority - a.priority);
	if (sponsors.length) return sponsors[0];

	// Sort by priority first so the rotation order itself is stable, then offset
	// into it by the seed. Priority still breaks ties on an unseeded render.
	const affiliates = eligible.sort((a, b) => b.priority - a.priority);
	if (affiliates.length === 1) return affiliates[0];

	// A banded slot has already narrowed to the one offer that fits; rotating
	// there would undo the targeting, so only unbanded fill rotates.
	const banded = affiliates.some((p) => p.minUsd !== undefined || p.maxUsd !== undefined);
	if (banded) return affiliates[0];

	return affiliates[hash(`${slot}:${seed}`) % affiliates.length];
}
