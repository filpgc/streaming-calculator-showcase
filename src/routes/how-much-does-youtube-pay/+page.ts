import type { PageLoad } from './$types';
import { ytNiches } from '$lib/data/youtube';

export const prerender = true;

const url = 'https://streamingcalculator.com/how-much-does-youtube-pay';

const faqs = [
	{
		heading: 'How much does YouTube pay per view?',
		body: 'Roughly $0.0015 to $0.035 per long-form view depending on niche and audience country. Creators think in RPM (revenue per 1,000 views) because single views round to fractions of a cent. A typical entertainment channel with a US audience earns around $2 to $4 per 1,000 views; finance channels can earn $12 to $35 per 1,000.'
	},
	{
		heading: 'How much does YouTube pay for 1 million views?',
		body: 'Between roughly $1,500 and $35,000 for long-form views, depending on niche and geography. For Shorts, 1 million views pays about $50 to $180. This spread is why "how much do YouTubers make" has no single answer: the same view count is worth 20x more on one channel than another.'
	},
	{
		heading: 'What percentage does YouTube take?',
		body: 'YouTube keeps 45% of ad revenue on long-form videos, paying creators 55%. For Shorts, ad revenue from the Shorts feed is pooled, a music licensing share is deducted, and creators receive 45% of their allocated pool. For channel memberships, Supers, and Shopping, the splits differ again. Memberships pay creators roughly 70%.'
	},
	{
		heading: 'How do YouTubers actually get paid?',
		body: 'Through Google AdSense: revenue accrues in your account and pays out monthly once you pass the $100 threshold, by bank transfer in most countries. To earn at all you must first join the YouTube Partner Program: 1,000 subscribers plus 4,000 public watch hours in 12 months, or 10 million Shorts views in 90 days.'
	},
	{
		heading: 'Do YouTubers earn more from ads or sponsorships?',
		body: 'Established creators usually earn more from sponsorships, affiliate deals, and their own products than from AdSense. Ad revenue is the floor, a reliable baseline that scales with views, while a single sponsorship integration often pays what tens or hundreds of thousands of views would. Most full-time creators treat AdSense as one of three or four income streams.'
	}
];

export const load: PageLoad = () => {
	return {
		niches: ytNiches,
		faqs,
		seo: {
			title: 'How Much Does YouTube Pay Per View? (2026)',
			description:
				'The 55/45 ad split, RPM by niche, what Shorts pay, and why identical view counts earn wildly different money.',
			keywords:
				'how much does youtube pay, youtube pay per view, youtube pay per 1000 views, how much does youtube pay for 1 million views, youtube shorts pay, youtube partner program requirements',
			canonical: url,
			ogImage: '/og-image.png',
			ogType: 'article',
			twitterCard: 'summary_large_image'
		},
		schemas: [
			{
				'@context': 'https://schema.org',
				'@type': 'Article',
				headline: 'How Much Does YouTube Pay? The 2026 Numbers',
				description:
					'RPM by niche, the 55/45 split, Shorts economics, and Partner Program requirements.',
				datePublished: '2026-07-24',
				dateModified: '2026-07-24',
				publisher: {
					'@type': 'Organization',
					name: 'Streaming Calculator',
					url: 'https://streamingcalculator.com'
				},
				mainEntityOfPage: { '@type': 'WebPage', '@id': url }
			},
			{
				'@context': 'https://schema.org',
				'@type': 'FAQPage',
				mainEntity: faqs.map((f) => ({
					'@type': 'Question',
					name: f.heading,
					acceptedAnswer: { '@type': 'Answer', text: f.body }
				}))
			}
		]
	};
};
