import type { PageLoad } from './$types';
import { ytNiches } from '$lib/data/youtube';

export const prerender = true;

const url = 'https://streamingcalculator.com/youtube-money-calculator';

const faqs = [
	{
		heading: 'How much does YouTube pay per 1,000 views?',
		body: 'For long-form videos with a US audience, creators typically earn between $1.50 and $35 per 1,000 views depending on niche: gaming and entertainment sit at the low end, finance and business at the top. This figure is your RPM (revenue per mille), and it already reflects YouTube keeping 45% of ad revenue. Shorts pay far less: roughly $0.05 to $0.18 per 1,000 views.'
	},
	{
		heading: 'How much money is 1 million YouTube views?',
		body: 'One million long-form views typically pays between $1,500 and $35,000 depending on your niche and audience geography. A gaming channel might see $2,000 to $4,000 while a finance channel can clear $20,000. One million Shorts views is a very different story: roughly $50 to $180.'
	},
	{
		heading: 'Why does my RPM differ from other channels?',
		body: 'RPM is driven by what advertisers pay to reach your specific audience: niche (finance viewers are worth more than gaming viewers), geography (US and Western European views pay multiples of emerging-market views), viewer age, seasonality (Q4 is the annual peak), and how many of your views actually show ads. Two channels with identical view counts can earn 10x apart.'
	},
	{
		heading: 'How many subscribers do you need to make money on YouTube?',
		body: "To join the YouTube Partner Program for full ad revenue sharing you need 1,000 subscribers plus either 4,000 public watch hours in the past 12 months or 10 million Shorts views in the past 90 days. Subscribers themselves don't generate revenue; views do. A channel with 10,000 subscribers and viral videos out-earns a 100,000-subscriber channel nobody watches."
	}
];

export const load: PageLoad = () => {
	return {
		niches: ytNiches,
		faqs,
		seo: {
			title: 'YouTube Money Calculator: What Views Pay (2026)',
			description:
				'Estimate YouTube ad revenue from your monthly views. Real 2026 RPM by niche, from $1.50 gaming to $35 finance.',
			keywords:
				'youtube money calculator, youtube earnings calculator, how much do youtubers make, youtube rpm by niche, youtube pay per view, how much does youtube pay per 1000 views',
			canonical: url,
			ogImage: '/og-image.png',
			ogType: 'website',
			twitterCard: 'summary_large_image'
		},
		schemas: [
			{
				'@context': 'https://schema.org',
				'@type': 'WebApplication',
				name: 'YouTube Money Calculator',
				description:
					'Free calculator that estimates YouTube ad revenue from monthly views, niche RPM, and video format.',
				url,
				applicationCategory: 'FinanceApplication',
				operatingSystem: 'Any',
				offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
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
