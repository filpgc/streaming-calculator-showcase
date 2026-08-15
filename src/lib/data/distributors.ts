export type ContentIdSupport = 'included' | 'addon' | 'none';

export interface DistributorPlan {
	id: string;
	name: string;
	annualFee: number;
	perReleaseFee: number;
	royaltyCut: number;
	maxArtists: number; // Use 99 for "unlimited"
	customReleaseDate: boolean;
	youtubeContentId: ContentIdSupport;
	splitPayments: boolean;
}

export interface Distributor {
	id: string;
	name: string;
	color: string;
	logo: string;
	plans: DistributorPlan[];
	marketShareNote?: string;
	established: boolean;
	affiliateUrl?: string;
	homepageUrl: string;
	pitch: string;
	/**
	 * Editorial ranking for the "best music distribution services" list.
	 *
	 * A judgement, not a calculation: value for money, how much of your royalties
	 * you keep, delivery speed, and how much of the ecosystem depends on them.
	 * Held in the data so it is one auditable list rather than something derived
	 * from whichever number was convenient.
	 *
	 * Ranking by price alone put the two distributors that take a permanent
	 * percentage at the top, which is the opposite of the advice on this page.
	 *
	 * Positions are not sold. A sponsor can buy the labelled placement above the
	 * results, and that unit is marked as paid; this list is the owner's view and
	 * changes to it are made independently of who is advertising. A comparison
	 * anyone can pay to win is worth nothing to the artist reading it, and
	 * therefore worth nothing to the advertiser either.
	 */
	editorialRank: number;
	/** One-line summary of who this is the right answer for. */
	bestFor: string;
}

export const distributors: Distributor[] = [
	{
		id: 'distrokid',
		name: 'DistroKid',
		color: '#1ABC9C',
		logo: '/assets/images/distributors/distrokid.png',
		marketShareNote: 'Largest indie distributor',
		established: true,
		pitch: 'The default for active independent artists. Largest catalog, fastest delivery, best ecosystem integrations.',
		editorialRank: 1,
		bestFor: 'Most artists, and anyone releasing often',
		affiliateUrl: 'https://distrokid.com/vip/seven/3063815',
		homepageUrl: 'https://distrokid.com',
		plans: [
			{
				id: 'distrokid-musician',
				name: 'Musician',
				annualFee: 24.99,
				perReleaseFee: 0,
				royaltyCut: 0,
				maxArtists: 1,
				customReleaseDate: false,
				youtubeContentId: 'addon',
				splitPayments: true
			},
			{
				id: 'distrokid-plus',
				name: 'Musician Plus',
				annualFee: 44.99,
				perReleaseFee: 0,
				royaltyCut: 0,
				maxArtists: 2,
				customReleaseDate: true,
				youtubeContentId: 'addon',
				splitPayments: true
			},
			{
				id: 'distrokid-ultimate',
				name: 'Ultimate',
				annualFee: 89.99,
				perReleaseFee: 0,
				royaltyCut: 0,
				maxArtists: 99,
				customReleaseDate: true,
				youtubeContentId: 'addon',
				splitPayments: true
			}
		]
	},
	{
		id: 'tunecore',
		name: 'TuneCore',
		color: '#3B82F6',
		logo: '/assets/images/distributors/tunecore.svg',
		established: true,
		pitch: 'Lowest entry-tier price with included Content ID and custom release dates.',
		editorialRank: 5,
		bestFor: 'The cheapest way in with Content ID included',
		homepageUrl: 'https://www.tunecore.com',
		plans: [
			{
				id: 'tunecore-rising',
				name: 'Rising Artist',
				annualFee: 14.99,
				perReleaseFee: 0,
				royaltyCut: 0,
				maxArtists: 1,
				customReleaseDate: true,
				youtubeContentId: 'included',
				splitPayments: true
			},
			{
				id: 'tunecore-breakthrough',
				name: 'Breakthrough',
				annualFee: 29.99,
				perReleaseFee: 0,
				royaltyCut: 0,
				maxArtists: 2,
				customReleaseDate: true,
				youtubeContentId: 'included',
				splitPayments: true
			},
			{
				id: 'tunecore-professional',
				name: 'Professional',
				annualFee: 49.99,
				perReleaseFee: 0,
				royaltyCut: 0,
				maxArtists: 99,
				customReleaseDate: true,
				youtubeContentId: 'included',
				splitPayments: true
			}
		]
	},
	{
		id: 'cdbaby',
		name: 'CD Baby',
		color: '#FF6B35',
		logo: '/assets/images/distributors/cdbaby.svg',
		established: true,
		pitch: 'One-time fee per release with no subscription, but takes 9% of streaming royalties forever.',
		editorialRank: 7,
		bestFor: 'One-off releases you will not renew',
		homepageUrl: 'https://cdbaby.com',
		plans: [
			{
				id: 'cdbaby-standard',
				name: 'Standard',
				annualFee: 0,
				perReleaseFee: 9.99,
				royaltyCut: 9,
				maxArtists: 99,
				customReleaseDate: true,
				youtubeContentId: 'included',
				splitPayments: true
			}
		]
	},
	{
		id: 'amuse',
		name: 'Amuse',
		color: '#7B2FE3',
		logo: '/assets/images/distributors/amuse.svg',
		established: false,
		pitch: 'Mobile-first distributor. Plus tier adds Content ID and split payments.',
		editorialRank: 2,
		bestFor: 'Artists who want funding offered as they grow',
		homepageUrl: 'https://www.amuse.io',
		plans: [
			{
				id: 'amuse-artist',
				name: 'Artist',
				annualFee: 23.99,
				perReleaseFee: 0,
				royaltyCut: 0,
				maxArtists: 1,
				customReleaseDate: true,
				youtubeContentId: 'none',
				splitPayments: false
			},
			{
				id: 'amuse-plus',
				name: 'Artist Plus',
				annualFee: 39.99,
				perReleaseFee: 0,
				royaltyCut: 0,
				maxArtists: 2,
				customReleaseDate: true,
				youtubeContentId: 'included',
				splitPayments: true
			},
			{
				id: 'amuse-pro',
				name: 'Professional',
				annualFee: 59.99,
				perReleaseFee: 0,
				royaltyCut: 0,
				maxArtists: 99,
				customReleaseDate: true,
				youtubeContentId: 'included',
				splitPayments: true
			}
		]
	},
	{
		id: 'ditto',
		name: 'Ditto Music',
		color: '#F4C430',
		logo: '/assets/images/distributors/ditto.svg',
		established: true,
		pitch: 'Cheapest unlimited subscription for solo artists with custom release dates included.',
		editorialRank: 6,
		bestFor: 'Solo artists who want unlimited releases for less',
		homepageUrl: 'https://dittomusic.com',
		plans: [
			{
				id: 'ditto-starter',
				name: 'Starter',
				annualFee: 19,
				perReleaseFee: 0,
				royaltyCut: 0,
				maxArtists: 1,
				customReleaseDate: true,
				youtubeContentId: 'addon',
				splitPayments: false
			},
			{
				id: 'ditto-pro',
				name: 'Pro',
				annualFee: 29,
				perReleaseFee: 0,
				royaltyCut: 0,
				maxArtists: 5,
				customReleaseDate: true,
				youtubeContentId: 'included',
				splitPayments: true
			},
			{
				id: 'ditto-label',
				name: 'Label',
				annualFee: 59,
				perReleaseFee: 0,
				royaltyCut: 0,
				maxArtists: 20,
				customReleaseDate: true,
				youtubeContentId: 'included',
				splitPayments: true
			}
		]
	},
	{
		id: 'symphonic',
		name: 'Symphonic',
		color: '#E0387B',
		/**
		 * Built from Symphonic's own logo pack (sent 11 Aug 2026), replacing an
		 * invented waveform shape. Their pack has no icon-only mark, only a
		 * horizontal wordmark and a three-line stacked lockup, and neither is
		 * legible in a 34px tile, so this is the S from their wordmark on their
		 * brand pink. Their letterform rather than our guess at a logo.
		 */
		logo: '/assets/images/distributors/symphonic.png',
		established: true,
		pitch:
			'Starter at $29.99/yr keeps 100% of DSP royalties with SplitShare included; UGC monetization (YouTube, TikTok, IG, FB) pays out at a 70% share. Invite-only Partner tier swaps fees for a custom royalty split.',
		editorialRank: 3,
		bestFor: 'Artists earning from TikTok and YouTube use',
		homepageUrl: 'https://symphonic.com',
		plans: [
			{
				id: 'symphonic-starter',
				name: 'Starter',
				annualFee: 29.99,
				perReleaseFee: 0,
				royaltyCut: 0,
				maxArtists: 1,
				customReleaseDate: true,
				youtubeContentId: 'included',
				splitPayments: true
			}
			// The Partner tier (application-only) has no subscription fee and a
			// custom percentage-based royalty split, so it can't be modeled as a
			// fixed-price plan here. It's referenced in the pitch and FAQ instead.
		]
	},
	{
		id: 'unitedmasters',
		name: 'UnitedMasters',
		color: '#E63946',
		logo: '/assets/images/distributors/unitedmasters.svg',
		established: true,
		// UnitedMasters sunset the free Debut tier's distribution privileges on
		// 29 Oct 2025; a Debut account now only receives splits and can't release
		// music. Debut+ is the actual entry plan.
		pitch: 'Debut+ at $19.99/yr keeps 100% of royalties with split payments included. Select at $59.99/yr adds brand and sync deal access.',
		editorialRank: 4,
		bestFor: 'A low-cost 0%-cut plan with split payments, or Select for brand and sync deals',
		homepageUrl: 'https://unitedmasters.com',
		plans: [
			{
				id: 'unitedmasters-debutplus',
				name: 'Debut+',
				annualFee: 19.99,
				perReleaseFee: 0,
				royaltyCut: 0,
				// No plan supports multiple artists on one account: a second artist
				// name needs a second paid subscription.
				maxArtists: 1,
				customReleaseDate: true,
				youtubeContentId: 'addon',
				splitPayments: true
			},
			{
				id: 'unitedmasters-select',
				name: 'Select',
				annualFee: 59.99,
				perReleaseFee: 0,
				royaltyCut: 0,
				maxArtists: 1,
				customReleaseDate: true,
				youtubeContentId: 'addon',
				splitPayments: true
			}
		]
	}
];

export interface Requirements {
	artists: number;
	customReleaseDate: boolean;
	youtubeContentId: boolean;
	splitPayments: boolean;
}

export interface CostInputs {
	releasesPerYear: number;
	monthlyEarnings: number;
	years: number;
}

export interface CostBreakdown {
	subscription: number;
	perRelease: number;
	royaltyCut: number;
	total: number;
}

export function planCost(plan: DistributorPlan, inputs: CostInputs): CostBreakdown {
	const subscription = plan.annualFee * inputs.years;
	const perRelease = plan.perReleaseFee * inputs.releasesPerYear * inputs.years;
	const royaltyCut = (plan.royaltyCut / 100) * inputs.monthlyEarnings * 12 * inputs.years;
	return {
		subscription,
		perRelease,
		royaltyCut,
		total: subscription + perRelease + royaltyCut
	};
}

export function planMeetsRequirements(plan: DistributorPlan, req: Requirements): boolean {
	if (plan.maxArtists < req.artists) return false;
	if (req.customReleaseDate && !plan.customReleaseDate) return false;
	if (req.youtubeContentId && plan.youtubeContentId !== 'included') return false;
	if (req.splitPayments && !plan.splitPayments) return false;
	return true;
}

export interface DistributorResult {
	distributor: Distributor;
	plan: DistributorPlan | null;
	cost: CostBreakdown | null;
	qualifies: boolean;
	missingReason: string | null;
}

export function evaluateDistributors(inputs: CostInputs, req: Requirements): DistributorResult[] {
	return distributors.map((d) => {
		const qualifyingPlans = d.plans.filter((p) => planMeetsRequirements(p, req));
		if (qualifyingPlans.length === 0) {
			return {
				distributor: d,
				plan: null,
				cost: null,
				qualifies: false,
				missingReason: explainMissing(d, req)
			};
		}
		const ranked = qualifyingPlans
			.map((p) => ({ plan: p, cost: planCost(p, inputs) }))
			.sort((a, b) => a.cost.total - b.cost.total);
		const best = ranked[0];
		return {
			distributor: d,
			plan: best.plan,
			cost: best.cost,
			qualifies: true,
			missingReason: null
		};
	});
}

function explainMissing(d: Distributor, req: Requirements): string {
	const reasons: string[] = [];
	const maxArtists = Math.max(...d.plans.map((p) => p.maxArtists));
	if (maxArtists < req.artists) {
		reasons.push(`only supports up to ${maxArtists} artist${maxArtists === 1 ? '' : 's'}`);
	}
	const anyCustomDate = d.plans.some((p) => p.customReleaseDate);
	if (req.customReleaseDate && !anyCustomDate) {
		reasons.push('no custom release dates');
	}
	const anyContentId = d.plans.some((p) => p.youtubeContentId === 'included');
	if (req.youtubeContentId && !anyContentId) {
		reasons.push('no YouTube Content ID included');
	}
	const anySplits = d.plans.some((p) => p.splitPayments);
	if (req.splitPayments && !anySplits) {
		reasons.push('no split payments');
	}
	return reasons.join(' · ');
}

export const distributorEditorial: { title: string; content: string }[] = [
	{
		title: 'Why DistroKid Is Our Editorial Pick',
		content: `<p>On pure entry-level cost, TuneCore Rising ($14.99/yr) and Ditto Starter ($19/yr) beat DistroKid Musician ($24.99/yr). But cost isn't the whole picture, and DistroKid earns its premium for three reasons that matter once your career starts moving.</p>
<p>First, <strong>scale and ecosystem</strong>. DistroKid distributes more independent music than any other service. Over a third of all new music on Spotify in any given week comes through DistroKid. That scale translates into faster delivery times to stores, more reliable issue resolution, and tighter integrations with tools like Spotify for Artists.</p>
<p>Second, <strong>longevity</strong>. Distributors occasionally pivot, get acquired, or fail. When that happens, your catalog can be stranded. DistroKid has been operating consistently since 2013 and has the largest indie market share, which makes it the lowest-risk option for a multi-year catalog.</p>
<p>Third, <strong>the affiliate discount</strong>. Through our link, DistroKid Musician drops from $24.99/yr to $23.24/yr, within $4/yr of Ditto Starter and only $8/yr more than TuneCore Rising. At that price gap, the brand and ecosystem advantages clearly outweigh the cost difference for most active artists. <a href="https://distrokid.com/vip/seven/3063815" target="_blank" rel="noopener sponsored">Claim 7% off DistroKid here</a>.</p>`
	},
	{
		title: 'When Cheaper Distributors Actually Win',
		content: `<p>Despite the brand advantages, several scenarios make cheaper distributors the rational choice.</p>
<p><strong>Solo artist, just starting, earning under $20/month from streaming</strong>: TuneCore Rising or Ditto Starter is genuinely fine. The DistroKid premium isn't justified yet because you don't have catalog scale or feature requirements that demand DistroKid's tier. Use the cheap option, switch later if needed.</p>
<p><strong>You only ever release one or two songs total, then stop</strong>: CD Baby's per-release model wins. The 9% cut compounds slowly when total earnings are small, and you avoid annual subscription fees forever.</p>
<p><strong>You strictly need YouTube Content ID at the lowest tier</strong>: TuneCore and CD Baby include it at no extra charge. DistroKid charges $4.95/song/yr as an add-on, and UnitedMasters charges $4.99/release, either of which can flip the math if you have a deep catalog.</p>
<p><strong>You want the cheapest plan that still keeps 100% of your royalties</strong>: TuneCore Rising ($14.99/yr) undercuts UnitedMasters Debut+ ($19.99/yr) on pure price and throws in split payments and Content ID at no extra charge. If cost is the only thing that matters, take TuneCore. UnitedMasters still ranks ahead of it on the main list, because Select's brand and sync deal access is a revenue path none of the price-focused options offer, and for artists chasing that, the $5/yr gap at entry tier is a rounding error.</p>
<p>The honest takeaway: for most active artists planning a multi-year catalog, DistroKid's reliability is worth the small premium. For first-time releasers or pure-cost optimizers, the cheaper options work fine.</p>`
	},

];

export const distributorFAQs: { heading: string; body: string }[] = [
	{
		heading: 'Why does the calculator pick different plans based on my preferences?',
		body: 'Each distributor offers multiple plan tiers. The calculator picks the cheapest plan from each distributor that actually meets your requirements. If you check "I manage 2 artists," for example, DistroKid\'s row automatically switches to Musician Plus ($44.99/yr) because the entry Musician plan only supports one artist. This gives you a real apples-to-apples comparison instead of misleading entry-tier prices.'
	},
	{
		heading: 'Is DistroKid worth more than TuneCore?',
		body: 'On entry-tier pricing alone, no. TuneCore Rising ($14.99/yr) is genuinely cheaper than DistroKid Musician ($24.99/yr). DistroKid earns its premium through scale (largest indie market share), longevity (operating since 2013), and ecosystem integrations. Through our affiliate link, DistroKid drops to $23.24/yr, within $8/yr of TuneCore. For most active artists, that small premium is worth it.'
	},
	{
		heading: 'Which distributor is cheapest for a solo artist who just wants to release music?',
		body: 'TuneCore Rising at $14.99/yr is the cheapest unlimited-release option with included Content ID and custom release dates. Ditto Starter ($19/yr) and DistroKid Musician ($24.99/yr) are close runners-up. If you genuinely only release one or two songs total, CD Baby\'s per-release model ($9.99/release one-time, 9% cut) can come out cheaper.'
	},
	{
		heading: 'Does CD Baby really take 9% of my royalties forever?',
		body: 'Yes. CD Baby charges a one-time fee per release ($9.99 single / $14.99 album) and then keeps 9% of streaming and download revenue indefinitely, including on tracks you uploaded years ago. This compounds significantly. A catalog earning $200/month means CD Baby takes $216/year, every year, in perpetuity. Switching distributors later only stops the cut on future earnings from new releases.'
	},
	{
		heading: 'What if I manage multiple artists or a small label?',
		body: 'Once you need 2+ artists, the entry-tier comparison breaks down. Multi-artist plans: DistroKid Musician Plus ($44.99/yr, 2 artists), TuneCore Breakthrough ($29.99/yr, 2 artists), Amuse Artist Plus ($39.99/yr, 2 artists), Ditto Pro ($29/yr, up to 5 artists). For label-sized operations (5+ artists), look at DistroKid Ultimate, TuneCore Professional, Ditto Label, or Amuse Professional.'
	},
	{
		heading: 'How important is YouTube Content ID?',
		body: 'It matters more than most artists realize. Content ID claims revenue from unauthorized uses of your music on YouTube: random reaction videos, dance trends, or fan content. For active artists, this can become a meaningful income stream. TuneCore and CD Baby include it at entry tier for no extra charge. DistroKid charges $4.95/song/year and UnitedMasters $4.99/release as an add-on. Amuse and Ditto require upgrading to higher tiers.'
	},
	{
		heading: 'How does Symphonic compare, and how do its payouts work?',
		body: "Symphonic Starter costs $29.99/yr for one primary artist with no per-release fees. You keep 100% of standard distribution royalties from DSPs (Spotify, Apple Music, Amazon Music, Deezer, and others) and 70% of UGC monetization revenue from YouTube, TikTok, Instagram, and Facebook. SplitShare royalty splits are included at no extra cost, and Beatport delivery is available as a $10/month add-on. There's also an application-only Partner tier with no subscription fee and a custom percentage-based royalty split, aimed at labels and established artists. Payouts: royalties are reported monthly and can be requested once your balance hits $50, via ACH, PayPal, wire transfer, or check through Tipalti (processing fees vary by method). Balances below the threshold roll over, and requested payments typically arrive within three to five business days."
	},
	{
		heading: 'Can I switch distributors later?',
		body: 'Yes, but it\'s not free. You either keep the old distributor active (paying their annual fee) to keep existing releases live, or take them down and re-upload through the new service, which loses accumulated stream counts, playlist placements, and editorial momentum. This is why picking the right distributor upfront matters more than chasing small short-term savings.'
	}
];
