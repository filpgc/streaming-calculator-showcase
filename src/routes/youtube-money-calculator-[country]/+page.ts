import type { EntryGenerator, PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { countries, getCountry, TIER_INFO } from '$lib/data/countries';
import { ytNiches, ytCountryRange, SHORTS_RPM, fmtRpm } from '$lib/data/youtube';

export const prerender = true;

export const entries: EntryGenerator = () => countries.map((c) => ({ country: c.slug }));

export const load: PageLoad = ({ params }) => {
	const country = getCountry(params.country);
	if (!country) throw error(404, 'Not found');

	const tier = TIER_INFO[country.tier];
	const url = `https://streamingcalculator.com/youtube-money-calculator-${country.slug}`;

	const rows = ytNiches.map((n) => {
		const r = ytCountryRange(n, country);
		return { slug: n.slug, name: n.name, low: r.low, high: r.high };
	});
	const shorts = {
		low: SHORTS_RPM.low * country.multiplier,
		high: SHORTS_RPM.high * country.multiplier
	};

	const mid = rows.find((r) => r.slug === 'entertainment') ?? rows[0];
	const top = rows[0];

	const faqs = [
		{
			heading: `How much does YouTube pay per 1,000 views ${country.inName}?`,
			body: `For long-form videos watched ${country.inName}, creators typically earn between ${fmtRpm(mid.low)} and ${fmtRpm(top.high)} per 1,000 views depending on niche: entertainment content sits near ${fmtRpm(mid.low)} to ${fmtRpm(mid.high)}, while finance content reaches ${fmtRpm(top.low)} to ${fmtRpm(top.high)}. Shorts views ${country.inName} pay roughly ${fmtRpm(shorts.low)} to ${fmtRpm(shorts.high)} per 1,000.`
		},
		{
			heading: `Why do ${country.name} views pay ${country.multiplier >= 0.85 ? 'so well' : 'less than US views'}?`,
			body: `YouTube revenue follows advertiser spending, and ${country.name} is a ${tier.label.toLowerCase()} for ads: ${tier.blurb.toLowerCase()} Your channel's actual RPM blends every country your viewers watch from, so a channel ${country.inName} with a global audience earns global rates, not just local ones.`
		},
		{
			heading: `Can creators ${country.inName} join the YouTube Partner Program?`,
			body: `Yes, the Partner Program is available ${country.inName} with the standard requirements: 1,000 subscribers plus 4,000 public watch hours in 12 months, or 10 million Shorts views in 90 days. Earnings are paid through AdSense once you pass the $100 threshold.`
		}
	];

	const seo = {
		// Without "Audience" the longest country name (United Arab Emirates)
		// still fits under 60 characters. The H1 keeps the fuller phrasing.
		title: `YouTube Money Calculator: ${country.name} (2026)`,
		description: `How much does YouTube pay ${country.inName}? Estimated 2026 RPM by niche, plus an earnings calculator for ${country.name} viewers.`,
		keywords: `youtube money calculator ${country.name.toLowerCase()}, how much does youtube pay ${country.inName.toLowerCase()}, youtube rpm ${country.name.toLowerCase()}, youtube earnings ${country.name.toLowerCase()}`,
		canonical: url,
		ogImage: '/og-image.png',
		ogType: 'website',
		twitterCard: 'summary_large_image'
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

	const related = countries
		.filter((c) => c.slug !== country.slug)
		.sort((a, b) => Math.abs(a.tier - country.tier) - Math.abs(b.tier - country.tier))
		.slice(0, 8);

	return { country, tier, rows, shorts, faqs, related, seo, schemas: [faqSchema] };
};
