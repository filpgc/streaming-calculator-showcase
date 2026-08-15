import type { PageLoad } from './$types';

export const prerender = true;

const url = 'https://streamingcalculator.com/twitch-money-calculator';

const faqs = [
	{
		heading: 'How much do Twitch streamers make per sub?',
		body: 'On the standard agreement, streamers keep 50% of the subscription price: about $3.00 for a Tier 1 sub ($5.99/month), $5.00 for Tier 2, and $12.50 for Tier 3. Partners in the Plus program keep 60 to 70% of net sub revenue up to an annual cap. Prime Gaming subs, free for viewers with Amazon Prime, pay you like a regular Tier 1 sub at roughly $2.50.'
	},
	{
		heading: 'How much is 1,000 bits on Twitch?',
		body: 'Exactly $10 to the streamer, because bits always convert at one cent each, no split applied. Viewers pay slightly more than that when buying bits (around $14 per 1,000 at list price); the difference is how Twitch takes its share upstream.'
	},
	{
		heading: 'What are the requirements to make money on Twitch?',
		body: 'Affiliate, the first monetization tier, requires 50 followers plus, in the last 30 days: 8 hours streamed, 7 different stream days, and an average of 3 concurrent viewers. Partner requires 25 hours over 12 days with 75 average viewers, plus an application. Affiliates and Partners both unlock subs, bits, and ads; payouts process once your balance passes $50.'
	},
	{
		heading: 'How much does Twitch pay for ads?',
		body: 'Streamers receive 55% of ad revenue, which typically works out to $2 to $6 per 1,000 ad views depending on audience geography and season. Most streamers earn far more from subs and bits than from ads. Ads are a supplement, not the engine.'
	},
	{
		heading: 'How many viewers do you need to make a living on Twitch?',
		body: 'A rough rule: average concurrent viewers × $8 to $12 ≈ monthly income from subs, bits, and ads combined. A streamer averaging 100 concurrent viewers typically earns $800 to $1,200/month before sponsorships and donations. Followers matter far less than concurrent viewers: 100,000 followers with 20 people watching pays like 20 viewers, not 100,000.'
	}
];

export const load: PageLoad = () => {
	return {
		faqs,
		seo: {
			title: 'Twitch Money Calculator: Subs, Bits and Ads (2026)',
			description:
				'What Twitch subs, bits and ads actually pay after the 50/50 split, plus Affiliate and Partner requirements for 2026.',
			keywords:
				'twitch money calculator, how much do twitch streamers make, twitch sub payout, how much is 1000 bits, twitch affiliate requirements, twitch earnings per sub',
			canonical: url,
			ogImage: '/og-image.png',
			ogType: 'website',
			twitterCard: 'summary_large_image'
		},
		schemas: [
			{
				'@context': 'https://schema.org',
				'@type': 'WebApplication',
				name: 'Twitch Money Calculator',
				description:
					'Free calculator that estimates Twitch streamer earnings from subscriptions, bits, and ads.',
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
