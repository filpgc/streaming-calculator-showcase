import type { EntryGenerator, PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import {
	countries,
	getCountry,
	countryPlatformRates,
	formatRate,
	TIER_INFO
} from '$lib/data/countries';

export const prerender = true;

export const entries: EntryGenerator = () => countries.map((c) => ({ country: c.slug }));

export const load: PageLoad = ({ params }) => {
	const country = getCountry(params.country);
	if (!country) throw error(404, 'Not found');

	const rates = countryPlatformRates(country);
	const tier = TIER_INFO[country.tier];
	const url = `https://streamingcalculator.com/streaming-royalty-rates-${country.slug}`;

	const spotify = rates.find((r) => r.slug === 'spotify');
	const highest = [...rates].sort((a, b) => b.avg - a.avg)[0];

	const faqs = [
		{
			heading: `How much does Spotify pay per stream ${country.inName}?`,
			body: `Spotify streams ${country.inName} generate an estimated ${formatRate(spotify?.low ?? 0)} to ${formatRate(spotify?.high ?? 0)} per stream, with a typical figure around ${formatRate(spotify?.avg ?? 0)}. The exact amount changes monthly with the size of the local royalty pool and the mix of premium and ad-supported listeners.`
		},
		{
			heading: `Why are streaming rates ${country.inName} ${country.multiplier >= 0.9 ? 'among the highest in the world' : 'different from US rates'}?`,
			body: `Per-stream value follows local revenue, not a global tariff. ${country.name} is a ${tier.label.toLowerCase()}: ${tier.blurb.toLowerCase()} Subscription pricing in local currency, the premium/free listener split, and exchange rates all feed the royalty pool your streams are paid from.`
		},
		{
			heading: `Which platform pays the most per stream ${country.inName}?`,
			body: `Among the major platforms, ${highest.name} has the highest estimated per-stream rate ${country.inName} at around ${formatRate(highest.avg)}. Remember that a higher rate on a smaller platform usually means fewer total streams. Total payout depends on where listeners actually are.`
		}
	];

	const seo = {
		// Kept under 60 characters so it is not truncated in results. The long
		// countries (United Arab Emirates, Dominican Republic) are what set the
		// ceiling, so there is no room for a trailing clause.
		title: `Streaming Royalty Rates ${country.inName.replace(/^in /, 'in ')} (2026)`,
		description: `What Spotify, Apple Music and YouTube Music pay per stream ${country.inName}. Estimated 2026 rates plus a local earnings calculator.`,
		keywords: `spotify per stream rate ${country.name.toLowerCase()}, streaming royalties ${country.name.toLowerCase()}, how much does spotify pay ${country.name.toLowerCase()}, music streaming rates ${country.name.toLowerCase()}`,
		canonical: url,
		ogImage: '/og-image.png',
		ogType: 'website',
		twitterCard: 'summary_large_image'
	};

	const datasetSchema = {
		'@context': 'https://schema.org',
		'@type': 'Dataset',
		name: `Streaming Royalty Rates ${country.inName} 2026`,
		description: `Estimated per-stream royalty rates for major music streaming platforms ${country.inName}.`,
		temporalCoverage: '2026',
		creator: { '@type': 'Organization', name: 'Streaming Calculator' },
		variableMeasured: rates.map((r) => ({
			'@type': 'PropertyValue',
			name: `${r.name} per-stream rate ${country.inName}`,
			value: `${formatRate(r.low)} to ${formatRate(r.high)}`
		}))
	};

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((f) => ({
			'@type': 'Question',
			name: f.heading,
			acceptedAnswer: { '@type': 'Answer', text: f.body }
		}))
	};

	// Related countries: same tier first, then fill with neighbors in the list
	const related = countries
		.filter((c) => c.slug !== country.slug)
		.sort((a, b) => Math.abs(a.tier - country.tier) - Math.abs(b.tier - country.tier))
		.slice(0, 8);

	return { country, rates, tier, faqs, related, seo, schemas: [datasetSchema, faqSchema] };
};
