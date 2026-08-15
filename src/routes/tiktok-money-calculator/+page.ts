import type { PageLoad } from './$types';

export const prerender = true;

const url = 'https://streamingcalculator.com/tiktok-money-calculator';

const faqs = [
	{
		heading: 'How much does TikTok pay per 1,000 views?',
		body: 'Through the Creator Rewards Program, roughly $0.40 to $1.00 per 1,000 qualified views, but only videos longer than one minute qualify. The retired Creator Fund paid $0.02 to $0.04 per 1,000, which is why the Rewards switch was a 20 to 25x raise for eligible creators. Views on videos under a minute earn nothing from TikTok directly.'
	},
	{
		heading: 'How much is 1 million TikTok views worth?',
		body: 'For a qualifying video (over one minute, original content, eligible region), 1 million views pays roughly $400 to $1,000. For a video under a minute: $0 from TikTok itself. The value is indirect, through follower growth, LIVE gifting, and brand deals. This is the biggest gap between perception and reality in creator earnings.'
	},
	{
		heading: 'What are the requirements for the Creator Rewards Program?',
		body: 'You need 10,000 followers, 100,000 video views in the last 30 days, an account in an eligible country (including the US, UK, Germany, France, Brazil, Japan, and Korea), and to be 18 or older. Only original videos longer than one minute earn. Duets, stitches, and reposted content are excluded.'
	},
	{
		heading: 'How much do TikTok LIVE gifts pay?',
		body: 'Viewers buy coins, send gifts, and gifts convert to diamonds on your side at a fixed $0.005 each. TikTok takes roughly half upstream when coins are purchased. A "Lion" (the famous big gift) nets the creator around $200. LIVE requires 1,000 followers and pays out from a $100 balance.'
	},
	{
		heading: 'Do TikTok creators earn more from views or brand deals?',
		body: 'Brand deals, by far. Creator Rewards provides a baseline, but a mid-size creator charges more for one sponsored video than a month of qualified views pays. TikTok is best understood as an audience engine: the views build leverage, and the leverage prices the sponsorships, the same dynamic as sponsorships out-earning ads on YouTube and Twitch.'
	}
];

export const load: PageLoad = () => {
	return {
		faqs,
		seo: {
			title: 'TikTok Money Calculator: Views and Gifts (2026)',
			description:
				'Creator Rewards pays $0.40 to $1.00 per 1,000 qualified views, LIVE diamonds convert at $0.005. The honest 2026 math.',
			keywords:
				'tiktok money calculator, how much does tiktok pay, tiktok pay per 1000 views, creator rewards program rates, tiktok live gifts worth, 1 million tiktok views money',
			canonical: url,
			ogImage: '/og-image.png',
			ogType: 'website',
			twitterCard: 'summary_large_image'
		},
		schemas: [
			{
				'@context': 'https://schema.org',
				'@type': 'WebApplication',
				name: 'TikTok Money Calculator',
				description:
					'Free calculator that estimates TikTok earnings from Creator Rewards qualified views and LIVE gift diamonds.',
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
