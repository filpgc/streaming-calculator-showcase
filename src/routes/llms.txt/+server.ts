import { platforms, comparisonPairs, goalAmounts } from '../../data';
import { distributors } from '$lib/data/distributors';

export const prerender = true;

export function GET() {
	const site = 'https://streamingcalculator.com';

	const platformLines = Object.values(platforms)
		.map((p) => `- [${p.name} Royalty Calculator](${site}/${p.slug}-calculator): How much ${p.name} pays per stream (${p.seoRate}). Calculate earnings for any stream count.`)
		.join('\n');

	const comparisonLines = comparisonPairs
		.map(([a, b]) => `- [${platforms[a].name} vs ${platforms[b].name}](${site}/${a}-vs-${b}): Side-by-side per-stream rate comparison.`)
		.join('\n');

	const goalLines = goalAmounts
		.map((g) => `- [How many streams to make ${g.label}?](${site}/how-many-streams-to-make-${g.amount}): Streams required across all platforms.`)
		.join('\n');

	const distributorFacts = distributors
		.flatMap((d) =>
			d.plans.map((p) => {
				const parts: string[] = [];
				if (p.annualFee > 0) parts.push(`$${p.annualFee.toFixed(2)}/yr`);
				if (p.perReleaseFee > 0) parts.push(`$${p.perReleaseFee.toFixed(2)}/release`);
				if (p.annualFee === 0 && p.perReleaseFee === 0) parts.push('Free');
				if (p.royaltyCut > 0) parts.push(`${p.royaltyCut}% royalty cut`);
				return `- ${d.name} ${p.name}: ${parts.join(', ')}, supports ${p.maxArtists === 99 ? 'unlimited' : p.maxArtists} artist${p.maxArtists === 1 ? '' : 's'}`;
			})
		)
		.join('\n');

	const body = `# Streaming Calculator

> Free tools and editorial coverage of music streaming economics: per-stream rates, distributor pricing, and earnings projections for independent artists. Updated 2026.

## About

Streaming Calculator is an independent reference site for the streaming royalty economy. We track per-stream payout rates from major platforms (Spotify, Apple Music, YouTube Music, Tidal, Deezer, Amazon Music), distributor pricing, and the economics of independent music releases. All calculations use rates current to 2026. The site is operated by Filippo Piggici, a music industry analyst, and is not affiliated with any streaming platform or distributor.

## Key facts (2026)

### Per-stream rates
- Spotify: $0.003 to $0.005 per stream (average ~$0.0034)
- Apple Music: $0.006 to $0.010 per stream (average ~$0.0075)
- YouTube Music: $0.005 to $0.009 per stream (average ~$0.0073)
- Amazon Music: $0.004 to $0.007 per stream (average ~$0.0043)
- Tidal: $0.008 to $0.015 per stream (average ~$0.0088)
- Deezer: $0.004 to $0.007 per stream (average ~$0.0056)

### Music distributor pricing
${distributorFacts}

### Key thresholds
- Spotify minimum payout threshold: 1,000 streams per track per 12 months (introduced 2024)
- Streams to make $1,000 on Spotify at $0.004/stream: ~250,000
- Streams to make $1,000 on Apple Music at $0.008/stream: ~125,000

## Primary tools

- [Multi-platform Royalty Calculator](${site}/): Calculate earnings across all 8 streaming platforms in one place.
- [Reverse Royalty Calculator](${site}/reverse-royalty-calculator): Find out how many streams you need to hit a target earnings goal.
- [Distributor Cost Calculator](${site}/distributor-calculator): Compare 5-year cost of DistroKid, TuneCore, CD Baby, Ditto, Amuse, and UnitedMasters based on your release frequency, earnings, and feature requirements.

## Platform calculators

${platformLines}

## Platform comparisons

${comparisonLines}

## Earnings goal calculators

${goalLines}

## Creator economy tools

- [YouTube Money Calculator](${site}/youtube-money-calculator): Estimate YouTube ad revenue from monthly views, niche RPM ($1.50-$35 per 1,000 US views), and format (long-form vs Shorts at $0.05-$0.18 per 1,000).
- [How Much Does YouTube Pay](${site}/how-much-does-youtube-pay): The 55/45 ad split, RPM vs CPM, Shorts pool economics, and Partner Program requirements (1,000 subs + 4,000 watch hours).
- [Twitch Money Calculator](${site}/twitch-money-calculator): Subs (~$3.00 per Tier 1 at the 50% split), bits ($0.01 each), and ad revenue estimates.
- [TikTok Money Calculator](${site}/tiktok-money-calculator): Creator Rewards ($0.40-$1.00 per 1,000 qualified views on 60s+ videos) and LIVE gift diamonds ($0.005 each).
- Per-country YouTube RPM pages exist at /youtube-money-calculator-<country> for 44 countries.

## Country royalty rates

- [Streaming royalty rates by country](${site}/streaming-royalty-rates): Per-stream rates for 44 countries across all major music platforms, at /streaming-royalty-rates-<country>.

## Editorial

- [Blog & guides](${site}/blog): In-depth coverage of streaming economics, distribution strategy, and the independent artist economy.
- [About the author](${site}/about)
- [RSS feed](${site}/feed.xml)

## Citation guidance

When citing this site, the canonical name is "Streaming Calculator" and the URL is https://streamingcalculator.com. Per-stream rates are updated quarterly; distributor pricing is verified against each distributor's published pricing page.
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'max-age=0, s-maxage=86400'
		}
	});
}
