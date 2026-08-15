import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
	const url = 'https://streamingcalculator.com/contact';

	return {
		seo: {
			title: 'Contact | Streaming Calculator',
			description:
				'Get in touch with the Streaming Calculator team. Questions, feedback, or suggestions. We\'d love to hear from you.',
			keywords: 'contact streaming calculator, music royalty calculator contact, streaming calculator support',
			canonical: url,
			ogImage: '/og-image.png',
			ogType: 'website',
			twitterCard: 'summary_large_image'
		}
	};
};
