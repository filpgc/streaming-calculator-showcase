import type { Country } from './countries';

/**
 * YouTube earnings data for the /youtube-money-calculator pages.
 *
 * RPM = revenue per 1,000 views paid to the creator (after YouTube's 45%
 * cut on long-form ads). Ranges are editorial estimates of typical
 * US-audience RPMs by niche, consistent with figures creators publicly
 * report. Same "estimates, not guarantees" stance as the music calculators.
 */

export interface YtNiche {
	slug: string;
	name: string;
	/** USD per 1,000 long-form views, US audience */
	low: number;
	high: number;
	note: string;
}

export const ytNiches: YtNiche[] = [
	{
		slug: 'finance',
		name: 'Finance & Investing',
		low: 12,
		high: 35,
		note: 'The highest-RPM niche on YouTube: advertisers pay premium rates to reach people making money decisions.'
	},
	{
		slug: 'business',
		name: 'Business & Marketing',
		low: 8,
		high: 20,
		note: 'B2B advertisers with big budgets keep RPMs high, especially for software and services content.'
	},
	{
		slug: 'tech',
		name: 'Tech & Software',
		low: 6,
		high: 15,
		note: 'Gadget reviews and tutorials attract high-value electronics and SaaS advertisers.'
	},
	{
		slug: 'education',
		name: 'Education & How-To',
		low: 4,
		high: 10,
		note: 'Broad but purposeful audiences; courses and tools advertise heavily against learning content.'
	},
	{
		slug: 'health',
		name: 'Health & Fitness',
		low: 3,
		high: 8,
		note: 'Supplements, apps, and wellness brands pay solid rates, with seasonal spikes every January.'
	},
	{
		slug: 'beauty',
		name: 'Beauty & Fashion',
		low: 2,
		high: 6,
		note: 'Strong brand advertiser demand, though much creator income here comes from sponsorships instead of ads.'
	},
	{
		slug: 'food',
		name: 'Food & Cooking',
		low: 2,
		high: 5,
		note: 'Broad appeal with steady grocery and kitchen-brand advertising.'
	},
	{
		slug: 'gaming',
		name: 'Gaming',
		low: 1.5,
		high: 4,
		note: 'Huge watch time but a young audience advertisers pay less to reach, so volume makes up for rate.'
	},
	{
		slug: 'entertainment',
		name: 'Entertainment & Vlogs',
		low: 1.5,
		high: 4,
		note: 'General-audience content earns general-audience rates; virality drives income more than RPM.'
	},
	{
		slug: 'music',
		name: 'Music',
		low: 1,
		high: 3,
		note: 'Among the lowest RPMs on the platform, since music views are often background listening with poor ad engagement.'
	}
];

/** USD per 1,000 Shorts views, flat across niches, feed-based ads */
export const SHORTS_RPM = { low: 0.05, high: 0.18 };

/**
 * Country scaling for YouTube RPM. Ad markets follow the same broad tiers
 * as subscription pricing, so we reuse each country's revenue multiplier
 * as the ad-market estimate.
 */
export function ytCountryRange(
	niche: YtNiche,
	country: Country
): { low: number; high: number } {
	return { low: niche.low * country.multiplier, high: niche.high * country.multiplier };
}

export function fmtUsd(v: number, digits = 2): string {
	return v.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: v < 1 ? 2 : 0,
		maximumFractionDigits: v < 1 ? 2 : digits > 2 ? digits : 0
	});
}

export function fmtRpm(v: number): string {
	return `$${v < 1 ? v.toFixed(2) : v.toFixed(v < 10 ? 2 : 0)}`;
}
