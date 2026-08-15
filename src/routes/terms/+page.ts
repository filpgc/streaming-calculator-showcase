import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
	const url = 'https://streamingcalculator.com/terms';

	return {
		seo: {
			title: 'Terms of Service | Streaming Calculator',
			description:
				'Terms of Service for Streaming Calculator. Read the terms and conditions governing the use of our streaming royalty calculator.',
			keywords: 'terms of service, streaming calculator, terms and conditions',
			canonical: url,
			ogImage: '/og-image.png',
			ogType: 'website',
			twitterCard: 'summary_large_image'
		}
	};
};
