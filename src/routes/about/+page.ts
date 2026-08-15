import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
	const url = 'https://streamingcalculator.com/about';

	return {
		seo: {
			title: 'About | Streaming Calculator',
			description:
				'Streaming Calculator is a free tool that helps artists and musicians estimate their streaming royalties across Spotify, Apple Music, YouTube Music, and more.',
			keywords: 'about streaming calculator, music royalty calculator, streaming royalties tool',
			canonical: url,
			ogImage: '/og-image.png',
			ogType: 'website',
			twitterCard: 'summary_large_image'
		}
	};
};
