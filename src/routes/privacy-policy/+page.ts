import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
	const url = 'https://streamingcalculator.com/privacy-policy';

	return {
		seo: {
			title: 'Privacy Policy | Streaming Calculator',
			description:
				'Privacy Policy for Streaming Calculator. Learn how we collect, use, and protect your information when you use our streaming royalty calculator.',
			keywords: 'privacy policy, streaming calculator, data protection, cookies',
			canonical: url,
			ogImage: '/og-image.png',
			ogType: 'website',
			twitterCard: 'summary_large_image'
		}
	};
};
