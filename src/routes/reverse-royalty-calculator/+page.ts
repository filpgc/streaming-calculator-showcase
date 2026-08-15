import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
	const url = 'https://streamingcalculator.com/reverse-royalty-calculator';

	return {
		seo: {
			title: 'How Many Spotify Streams to Make $1,000? (2026)',
			description:
				'Free calculator: find out exactly how many Spotify, Apple Music, or YouTube streams you need to earn $100, $1000, or $10,000. Updated 2026 streaming rates.',
			keywords:
				'how many spotify streams to make 1000, streams needed calculator, spotify streams to dollars, how many streams to earn money, reverse royalty calculator 2026, streams to reach goal',
			canonical: url,
			ogImage: '/og-image.png',
			ogType: 'website',
			twitterCard: 'summary_large_image'
		},
		schema: {
			'@context': 'https://schema.org',
			'@type': 'WebApplication',
			name: 'Reverse Streaming Royalty Calculator',
			alternateName: 'Streams Needed Calculator',
			description:
				'Calculate exactly how many streams you need on Spotify, Apple Music, YouTube Music, Tidal, and other platforms to reach your earnings goal.',
			url,
			applicationCategory: 'FinanceApplication',
			operatingSystem: 'Any',
			browserRequirements: 'Requires JavaScript',
			offers: {
				'@type': 'Offer',
				price: '0',
				priceCurrency: 'USD'
			},
			featureList: [
				'Calculate streams needed for any earnings goal',
				'Support for Spotify, Apple Music, YouTube Music, Tidal, Deezer',
				'Multi-currency support (USD, GBP, EUR, CAD)',
				'Royalty percentage adjustment',
				'Real-time calculations'
			]
		}
	};
};
