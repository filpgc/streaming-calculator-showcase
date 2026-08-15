import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
	const url = 'https://streamingcalculator.com/advertise';

	return {
		seo: {
			title: 'Advertise | Streaming Calculator',
			description:
				'Reach independent artists at the moment they make money decisions. Sponsorship slots, featured placements, and sponsored reviews on Streaming Calculator.',
			keywords:
				'advertise music industry, sponsor music website, reach independent artists, music distributor advertising',
			canonical: url,
			ogImage: '/og-image.png',
			ogType: 'website',
			twitterCard: 'summary_large_image'
		}
	};
};
