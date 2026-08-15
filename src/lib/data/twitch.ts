/**
 * Twitch earnings data for /twitch-money-calculator.
 *
 * Sub prices are US list prices; the creator share is 50% on the standard
 * agreement (Partner Plus programs pay 60 to 70% up to a cap, noted in copy).
 * Bits pay a fixed $0.01 per bit. Editorial estimates, same disclaimer
 * stance as the rest of the site.
 */

export interface TwitchStream {
	slug: string;
	name: string;
	rateLine: string;
	/** USD the creator receives per unit */
	perUnit: number;
}

export const twitchStreams: TwitchStream[] = [
	{
		slug: 'tier1',
		name: 'Tier 1 subs',
		rateLine: '≈ $3.00 each at the standard 50% split',
		perUnit: 3.0
	},
	{
		slug: 'tier2',
		name: 'Tier 2 subs',
		rateLine: '≈ $5.00 each at the standard 50% split',
		perUnit: 5.0
	},
	{
		slug: 'tier3',
		name: 'Tier 3 subs',
		rateLine: '≈ $12.50 each at the standard 50% split',
		perUnit: 12.5
	},
	{
		slug: 'bits',
		name: 'Bits cheered/month',
		rateLine: '$0.01 per bit, so 100 bits = $1.00',
		perUnit: 0.01
	}
];

export const twitchFacts: string[][] = [
	['Tier 1 sub ($5.99/mo)', '≈ $3.00 to you', 'Standard 50% split; Partner Plus pays 60 to 70%'],
	['Tier 2 sub ($9.99/mo)', '≈ $5.00 to you', 'Same split rules as Tier 1'],
	['Tier 3 sub ($24.99/mo)', '≈ $12.50 to you', 'Rare, but loyal fans use it as a tip'],
	['Prime Gaming sub', '≈ $2.50 to you', 'Free for the viewer with Amazon Prime, paid to you'],
	['100 bits', '$1.00 to you', 'Viewers pay ~$1.40 for 100 bits; you always get $0.01/bit'],
	['Ads (per 1,000 views)', '≈ $2 to $6', '55% share; varies with geography and season']
];
