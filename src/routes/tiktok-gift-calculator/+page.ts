import type { PageLoad } from './$types';
import { SITE_URL, generateFAQSchema, generateBreadcrumbSchema, type SEOData } from '$lib/seo';
import { giftFaqs } from '$lib/data/tiktok-gifts';

export const prerender = true;

const url = `${SITE_URL}/tiktok-gift-calculator`;

/**
 * Built for a cluster the site already appears in without a page for it.
 * Search Console, week of 3 to 9 Aug: "tiktok gift calculator" at position 9.6,
 * "tiktok live points to money" at 6.9, "1 million gift points on tiktok" at
 * 11.1, "tiktok gifts calculator" at 10.0, "tiktok live gift calculator" at
 * 16.5, all with zero clicks. The TikTok money calculator has a diamonds input
 * but is titled and written for views, so none of these land anywhere useful.
 *
 * The SERP carries no AI Overview, which is the shape that still pays: a tool
 * query where the visitor has to enter their own number.
 *
 * "gift points" is in the keyword set deliberately. TikTok LIVE labels the
 * balance as points in some regions and versions, and one of the incumbents is
 * named after that phrasing.
 */
const seo: SEOData = {
	title: 'TikTok Gift Calculator: Coins and Diamonds to Real Money',
	description:
		'Work out what TikTok LIVE gifts actually pay you. Enter diamonds or coins and see your real payout, what the sender paid, and how much TikTok keeps.',
	keywords:
		'tiktok gift calculator, tiktok gifts calculator, tiktok live gift calculator, tiktok coins to usd, tiktok diamonds to money, tiktok gift points calculator, how much is 1 million gift points on tiktok',
	canonical: url,
	ogImage: '/og-image.png',
	ogType: 'website',
	twitterCard: 'summary_large_image'
};

export const load: PageLoad = () => ({
	seo,
	faqs: giftFaqs,
	schemas: [
		{
			'@context': 'https://schema.org',
			'@type': 'WebApplication',
			name: 'TikTok Gift Calculator',
			description:
				'Convert TikTok LIVE coins, diamonds and gift points into the creator payout in USD, including what the sender paid and TikTok’s share.',
			url,
			applicationCategory: 'FinanceApplication',
			operatingSystem: 'Any',
			offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
		},
		generateFAQSchema(giftFaqs),
		generateBreadcrumbSchema([], 'TikTok Gift Calculator')
	]
});
