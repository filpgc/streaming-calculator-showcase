import type { PageLoad } from './$types';
import {
	RATE_YEAR,
	SITE_URL,
	generateFAQSchema,
	generateBreadcrumbSchema,
	type SEOData
} from '$lib/seo';
import { advanceFaqs } from '$lib/data/advances';

export const prerender = true;

const url = `${SITE_URL}/royalty-advance-calculator`;

/**
 * Titled as a calculator, deliberately.
 *
 * Search Console shows queries containing "calculator" converting at 14% while
 * questions phrased as questions convert at 0.23% at comparable positions,
 * because Google answers the question in an AI Overview and keeps the click. A
 * tool cannot be answered in place, so every page built for traffic from here
 * on is shaped like one.
 */
const seo: SEOData = {
	title: `Royalty Advance Calculator: What Your Catalog Is Worth`,
	description: `Estimate a music royalty advance or catalog sale from your monthly streaming income. See the multiple, the range, and how long an advance takes to recoup.`,
	keywords: `royalty advance calculator, music advance calculator, music catalog value calculator, how much is my music catalog worth, streaming advance ${RATE_YEAR}`,
	canonical: url,
	ogImage: '/og-image.png',
	ogType: 'website',
	twitterCard: 'summary_large_image'
};

export const load: PageLoad = () => ({
	seo,
	faqs: advanceFaqs,
	schemas: [
		{
			'@context': 'https://schema.org',
			'@type': 'WebApplication',
			name: 'Royalty Advance Calculator',
			description:
				'Estimate a music royalty advance or catalog sale value from monthly streaming income, including the multiple applied and the time to recoup.',
			url,
			applicationCategory: 'FinanceApplication',
			operatingSystem: 'Any',
			offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
		},
		generateFAQSchema(advanceFaqs),
		generateBreadcrumbSchema([], 'Royalty Advance Calculator')
	]
});
