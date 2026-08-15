import type { PageLoad } from './$types';
import { distributors, distributorEditorial, distributorFAQs } from '$lib/data/distributors';
import { AUTHOR } from '$lib/seo';

export const prerender = true;

const LAST_MODIFIED = '2026-08-12';

export const load: PageLoad = () => {
	const url = 'https://streamingcalculator.com/distributor-calculator';

	/**
	 * Targets the distribution-choice cluster, not "distrokid vs tunecore".
	 *
	 * Keyword data puts "music distribution services", "best music distribution
	 * companies", "free music distribution", "digital music distribution" and a
	 * dozen close variants at roughly 5,000 US searches a month each. Search
	 * Console has this page appearing for two distributor queries in total, five
	 * impressions, while the page itself draws 712 impressions at position 9.8
	 * for a 0.56% CTR. It answers the cluster and was named for something nobody
	 * searches.
	 *
	 * These queries survive AI Overviews in a way the rate questions do not:
	 * the overview lists options, but choosing still means comparing prices
	 * against your own release volume, which is what the tool does. "music
	 * distribution services" currently shows no overview at all, only a featured
	 * snippet holding a numbered list.
	 */
	const seo = {
		title: 'Best Music Distribution Services 2026: Real Cost Compared',
		description:
			'Compare every major music distribution service on real cost: DistroKid, TuneCore, CD Baby, Ditto, Amuse, Symphonic, UnitedMasters.',
		keywords:
			'music distribution services, best music distribution companies, free music distribution, digital music distribution, music distributor comparison, best music distributor for independent artists, cheapest music distributor 2026',
		canonical: url,
		ogImage: '/og-image.png',
		ogType: 'website',
		twitterCard: 'summary_large_image'
	};

	const webAppSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Music Distributor Cost Calculator',
		alternateName: 'Distributor Comparison Calculator',
		description:
			'Compare the true 5-year cost of DistroKid, TuneCore, CD Baby, Ditto, Amuse, and UnitedMasters based on your release frequency and streaming income.',
		url,
		applicationCategory: 'FinanceApplication',
		operatingSystem: 'Any',
		browserRequirements: 'Requires JavaScript',
		dateModified: LAST_MODIFIED,
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		featureList: [
			'Compare cost of 6+ music distributors',
			'Account for per-release fees, annual fees, and royalty cuts',
			'Project costs over 1, 3, 5, or 10 years',
			'Ranked recommendations based on your inputs',
			'Updated 2026 distributor pricing'
		],
		creator: {
			'@type': 'Person',
			name: AUTHOR.name,
			jobTitle: AUTHOR.jobTitle,
			url: AUTHOR.url
		}
	};

	// Flatten distributor plans into a single list for schema generation
	const allPlans = distributors.flatMap((d) => d.plans.map((p) => ({ distributor: d, plan: p })));

	const datasetSchema = {
		'@context': 'https://schema.org',
		'@type': 'Dataset',
		name: 'Music Distributor Pricing 2026',
		description:
			'Current annual fees, per-release fees, and royalty cut percentages for major music distributors including DistroKid, TuneCore, CD Baby, Ditto, Amuse, and UnitedMasters.',
		temporalCoverage: '2026',
		dateModified: LAST_MODIFIED,
		creator: { '@type': 'Organization', name: 'Streaming Calculator' },
		variableMeasured: allPlans.map(({ distributor, plan }) => {
			const priceParts: string[] = [];
			if (plan.annualFee > 0) priceParts.push(`$${plan.annualFee.toFixed(2)}/yr`);
			if (plan.perReleaseFee > 0) priceParts.push(`$${plan.perReleaseFee.toFixed(2)} per release`);
			if (plan.annualFee === 0 && plan.perReleaseFee === 0) priceParts.push('Free');
			if (plan.royaltyCut > 0) priceParts.push(`${plan.royaltyCut}% royalty cut`);
			return {
				'@type': 'PropertyValue',
				name: `${distributor.name} ${plan.name}`,
				value: priceParts.join(', ')
			};
		})
	};

	// Product schema per plan: canonical e-commerce format LLMs pull from
	const productSchemas = allPlans.map(({ distributor, plan }) => {
		const planUrl = `${url}#${plan.id}`;
		const isSubscription = plan.annualFee > 0;
		return {
			'@context': 'https://schema.org',
			'@type': 'Product',
			'@id': planUrl,
			name: `${distributor.name} ${plan.name}`,
			brand: { '@type': 'Brand', name: distributor.name },
			category: 'Music Distribution Service',
			description:
				distributor.pitch +
				(plan.royaltyCut > 0
					? ` ${plan.name} keeps ${plan.royaltyCut}% of your streaming royalties.`
					: ` ${plan.name} keeps 0% of your streaming royalties.`),
			url: distributor.homepageUrl,
			offers: {
				'@type': 'Offer',
				price: isSubscription ? plan.annualFee.toFixed(2) : plan.perReleaseFee.toFixed(2),
				priceCurrency: 'USD',
				priceSpecification: {
					'@type': 'UnitPriceSpecification',
					price: isSubscription ? plan.annualFee.toFixed(2) : plan.perReleaseFee.toFixed(2),
					priceCurrency: 'USD',
					referenceQuantity: {
						'@type': 'QuantitativeValue',
						value: 1,
						unitText: isSubscription ? 'year' : 'release'
					}
				},
				priceValidUntil: '2026-12-31',
				availability: 'https://schema.org/InStock',
				url: distributor.affiliateUrl || distributor.homepageUrl
			}
		};
	});

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		dateModified: LAST_MODIFIED,
		mainEntity: distributorFAQs.map((faq) => ({
			'@type': 'Question',
			name: faq.heading,
			acceptedAnswer: { '@type': 'Answer', text: faq.body }
		}))
	};

	const articleSchema = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: 'How to Pick the Cheapest Music Distributor in 2026',
		description: seo.description,
		datePublished: '2026-05-20',
		dateModified: LAST_MODIFIED,
		author: {
			'@type': 'Person',
			name: AUTHOR.name,
			jobTitle: AUTHOR.jobTitle,
			url: AUTHOR.url
		},
		publisher: {
			'@type': 'Organization',
			name: 'Streaming Calculator',
			url: 'https://streamingcalculator.com'
		},
		mainEntityOfPage: { '@type': 'WebPage', '@id': url }
	};

	return {
		editorial: distributorEditorial,
		faqs: distributorFAQs,
		seo,
		schemas: [webAppSchema, datasetSchema, ...productSchemas, faqSchema, articleSchema]
	};
};
