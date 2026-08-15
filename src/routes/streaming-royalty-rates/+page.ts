import type { PageLoad } from './$types';
import { countries, countryPlatformRates, TIER_INFO } from '$lib/data/countries';

export const prerender = true;

export const load: PageLoad = () => {
	const url = 'https://streamingcalculator.com/streaming-royalty-rates';

	const tiers = [1, 2, 3, 4].map((t) => ({
		tier: t,
		info: TIER_INFO[t],
		countries: countries
			.filter((c) => c.tier === t)
			.sort((a, b) => b.multiplier - a.multiplier)
			.map((c) => {
				const spotify = countryPlatformRates(c).find((r) => r.slug === 'spotify');
				return { slug: c.slug, name: c.name, spotifyAvg: spotify?.avg ?? 0 };
			})
	}));

	return {
		tiers,
		seo: {
			title: 'Streaming Royalty Rates by Country (2026)',
			description:
				'Per-stream rates for Spotify, Apple Music and more across 44 countries. See why a Norway stream pays 10x an India stream.',
			keywords:
				'streaming royalty rates by country, spotify per stream rate by country, music streaming payouts country comparison',
			canonical: url,
			ogImage: '/og-image.png',
			ogType: 'website',
			twitterCard: 'summary_large_image'
		}
	};
};
