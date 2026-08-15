import { platforms } from '../../data';

/**
 * Country-level streaming royalty data for the programmatic
 * /streaming-royalty-rates-<country> pages.
 *
 * Rates are estimates derived from each platform's global average rate
 * (src/data.ts) scaled by a per-country multiplier. Multipliers reflect
 * blended revenue per listener: local subscription pricing, premium vs
 * ad-supported mix, and currency effects. They are editorial estimates in
 * line with the rest of the site. Every page carries the same
 * "estimates, not guarantees" disclaimer as the calculators.
 */

export interface Country {
	slug: string;
	name: string;
	/** Prepositional form for copy: "in the United States", "in Germany" */
	inName: string;
	tier: 1 | 2 | 3 | 4;
	/** Scale factor applied to each platform's global average rate */
	multiplier: number;
	/** Unique market context, 1 to 3 sentences, shown on the page */
	note: string;
}

export const TIER_INFO: Record<number, { label: string; blurb: string }> = {
	1: {
		label: 'Premium market',
		blurb: 'High subscription prices and strong premium adoption push per-stream rates at or above the global average.'
	},
	2: {
		label: 'Strong market',
		blurb: 'Mature streaming market with solid premium adoption; rates sit somewhat below the top tier.'
	},
	3: {
		label: 'Growth market',
		blurb: 'Large and growing listenership, but lower local pricing and a bigger free-tier share pull rates down.'
	},
	4: {
		label: 'Emerging market',
		blurb: 'Huge listening volume at very low local price points; per-stream rates are a fraction of US levels.'
	}
};

export const countries: Country[] = [
	{
		slug: 'united-states',
		name: 'United States',
		inName: 'in the United States',
		tier: 1,
		multiplier: 1.0,
		note: 'The US is the largest recorded-music market in the world and accounts for roughly 40% of global streaming revenue. Mechanical rates for songwriters are set by the Copyright Royalty Board, and premium subscriptions start at $11.99/month, the benchmark every other market gets compared against.'
	},
	{
		slug: 'united-kingdom',
		name: 'United Kingdom',
		inName: 'in the United Kingdom',
		tier: 1,
		multiplier: 0.95,
		note: 'The UK is the third-largest music market globally and one of the biggest music exporters per capita. Strong premium adoption keeps rates close to US levels, and songwriters collect performance royalties through PRS for Music.'
	},
	{
		slug: 'canada',
		name: 'Canada',
		inName: 'in Canada',
		tier: 1,
		multiplier: 0.9,
		note: 'Canadian subscription prices sit slightly below US levels in USD terms, but premium adoption is strong. SOCAN handles performance royalties, and Canadian-content rules give domestic artists meaningful radio and editorial support that feeds streaming discovery.'
	},
	{
		slug: 'australia',
		name: 'Australia',
		inName: 'in Australia',
		tier: 1,
		multiplier: 0.95,
		note: 'Australia consistently ranks among the top-ten music markets despite its small population, thanks to very high premium adoption. APRA AMCOS collects composition royalties and is one of the more efficient PROs for international collections.'
	},
	{
		slug: 'new-zealand',
		name: 'New Zealand',
		inName: 'in New Zealand',
		tier: 1,
		multiplier: 0.9,
		note: 'New Zealand mirrors Australia in listener behavior and premium adoption, just with a smaller pool. Its market is often used by labels as a test territory for release strategies before wider English-language rollouts.'
	},
	{
		slug: 'ireland',
		name: 'Ireland',
		inName: 'in Ireland',
		tier: 1,
		multiplier: 0.95,
		note: 'Ireland combines EU-level subscription pricing with one of the youngest populations in Western Europe, which shows up as high streaming volume per capita. IMRO handles performance collections.'
	},
	{
		slug: 'germany',
		name: 'Germany',
		inName: 'in Germany',
		tier: 1,
		multiplier: 0.9,
		note: "Germany is the world's fourth-largest music market. GEMA is one of the strongest collection societies anywhere, which matters for the publishing side of your royalties, and physical sales still carry unusual weight, but streaming now drives the majority of revenue."
	},
	{
		slug: 'france',
		name: 'France',
		inName: 'in France',
		tier: 2,
		multiplier: 0.8,
		note: "France is the fifth-largest music market and Deezer's home turf, where it still holds meaningful share alongside Spotify and Apple Music. SACEM collects composition royalties, and France's fan-centric payment experiments (led by Deezer) started here."
	},
	{
		slug: 'netherlands',
		name: 'Netherlands',
		inName: 'in the Netherlands',
		tier: 1,
		multiplier: 0.95,
		note: 'The Netherlands has some of the highest premium adoption in Europe and a dance/electronic export industry far larger than the country itself. BUMA/STEMRA handles both performance and mechanical collections in one organization.'
	},
	{
		slug: 'belgium',
		name: 'Belgium',
		inName: 'in Belgium',
		tier: 2,
		multiplier: 0.85,
		note: 'Belgium is a solid mid-size European market split across French- and Dutch-language audiences, which effectively doubles the playlist and radio ecosystems an artist can target. SABAM handles collections.'
	},
	{
		slug: 'sweden',
		name: 'Sweden',
		inName: 'in Sweden',
		tier: 1,
		multiplier: 0.9,
		note: "Sweden is Spotify's home market and reached streaming saturation earlier than anywhere else, and premium adoption is near-universal. It's also a songwriting export superpower, and STIM is among the most efficient PROs for getting international money home."
	},
	{
		slug: 'norway',
		name: 'Norway',
		inName: 'in Norway',
		tier: 1,
		multiplier: 1.15,
		note: 'Norway delivers some of the highest per-stream payouts in the world: subscriptions are priced in strong kroner, the free tier barely exists, and streaming replaced ownership earlier than in any other market. A thousand Norwegian streams can be worth three or four thousand streams from emerging markets.'
	},
	{
		slug: 'denmark',
		name: 'Denmark',
		inName: 'in Denmark',
		tier: 1,
		multiplier: 1.1,
		note: 'Denmark pairs high subscription prices with near-total premium adoption, making Danish streams among the most valuable in Europe. KODA handles composition royalties.'
	},
	{
		slug: 'finland',
		name: 'Finland',
		inName: 'in Finland',
		tier: 1,
		multiplier: 0.9,
		note: 'Finland is a compact, fully premium-converted market with an outsized metal and electronic scene. Teosto handles performance collections and is known for fast, transparent reporting.'
	},
	{
		slug: 'switzerland',
		name: 'Switzerland',
		inName: 'in Switzerland',
		tier: 1,
		multiplier: 1.25,
		note: 'Switzerland has the most expensive music subscriptions in Europe, priced in francs, which translates directly into some of the highest per-stream rates anywhere. SUISA handles collections across three language regions.'
	},
	{
		slug: 'austria',
		name: 'Austria',
		inName: 'in Austria',
		tier: 1,
		multiplier: 0.95,
		note: 'Austria behaves like a smaller Germany in streaming terms: strong premium adoption, solid pricing, and AKM handling performance royalties. German-language releases circulate freely across both markets.'
	},
	{
		slug: 'japan',
		name: 'Japan',
		inName: 'in Japan',
		tier: 2,
		multiplier: 0.85,
		note: "Japan is the world's second-largest music market, but uniquely physical: CDs still matter, and streaming took off late. Premium pricing is solid, JASRAC handles collections, and domestic platforms like AWA coexist with Spotify and Apple Music, which dominates among paying listeners."
	},
	{
		slug: 'singapore',
		name: 'Singapore',
		inName: 'in Singapore',
		tier: 2,
		multiplier: 0.7,
		note: "Singapore is Southeast Asia's premium outlier: high incomes and strong subscription adoption in a small population. It's also the regional hub where platforms set their Southeast Asian strategy, making it a disproportionately useful market to chart in."
	},
	{
		slug: 'south-korea',
		name: 'South Korea',
		inName: 'in South Korea',
		tier: 2,
		multiplier: 0.6,
		note: 'South Korea is a top-ten market where domestic platforms like Melon, Genie, and FLO still command most listening, with Spotify and Apple Music growing from a late start. K-pop economics mean charts are fiercely contested and fan-driven bulk streaming is a real phenomenon.'
	},
	{
		slug: 'united-arab-emirates',
		name: 'United Arab Emirates',
		inName: 'in the UAE',
		tier: 2,
		multiplier: 0.6,
		note: 'The UAE combines high incomes with a huge expat population, so listening spans Arabic, South Asian, and Western catalogs. Regional platform Anghami competes with Spotify, and premium adoption is the strongest in the Middle East.'
	},
	{
		slug: 'spain',
		name: 'Spain',
		inName: 'in Spain',
		tier: 2,
		multiplier: 0.55,
		note: 'Spain streams enormously but skews toward ad-supported and family plans, which drags blended rates below Northern Europe. It is also the gateway market for Latin releases breaking into Europe. SGAE handles collections.'
	},
	{
		slug: 'italy',
		name: 'Italy',
		inName: 'in Italy',
		tier: 2,
		multiplier: 0.55,
		note: 'Italy is a major music culture with streaming adoption that lagged the rest of Western Europe and still leans on free tiers. Domestic repertoire dominates the charts, and SIAE handles collections.'
	},
	{
		slug: 'portugal',
		name: 'Portugal',
		inName: 'in Portugal',
		tier: 2,
		multiplier: 0.5,
		note: 'Portugal is a smaller European market with growing premium adoption and strong cultural ties to Brazilian and Lusophone African repertoire, which travel in both directions. SPA handles collections.'
	},
	{
		slug: 'poland',
		name: 'Poland',
		inName: 'in Poland',
		tier: 2,
		multiplier: 0.4,
		note: "Poland is Central Europe's biggest streaming growth story, with premium adoption climbing fast from a low base. Local pricing sits well below Western Europe, but the market's size and growth make it increasingly relevant for touring decisions. ZAiKS handles collections."
	},
	{
		slug: 'greece',
		name: 'Greece',
		inName: 'in Greece',
		tier: 2,
		multiplier: 0.45,
		note: 'Greece rebuilt its music economy around streaming after a long recession, with domestic repertoire taking most of the chart. Pricing sits below the Western European average.'
	},
	{
		slug: 'brazil',
		name: 'Brazil',
		inName: 'in Brazil',
		tier: 3,
		multiplier: 0.3,
		note: "Brazil is Latin America's biggest music market and one of Spotify's largest countries by users. Sertanejo and funk dominate domestic streaming at volumes that rival US numbers, but local pricing is a third of US levels, so rates follow. ECAD handles performance collections."
	},
	{
		slug: 'mexico',
		name: 'Mexico',
		inName: 'in Mexico',
		tier: 3,
		multiplier: 0.3,
		note: 'Mexico City routinely ranks among the top streaming cities on earth, and música mexicana has become a global export on the back of Mexican listening volume. ARPU is low, but the sheer scale makes Mexico a market that moves global chart positions.'
	},
	{
		slug: 'argentina',
		name: 'Argentina',
		inName: 'in Argentina',
		tier: 3,
		multiplier: 0.2,
		note: 'Argentina has one of the most engaged listening cultures in Latin America and a trap/urbano scene with global reach, but peso volatility means USD-denominated payouts per stream are among the lowest in the region despite subscriptions being repriced repeatedly.'
	},
	{
		slug: 'colombia',
		name: 'Colombia',
		inName: 'in Colombia',
		tier: 3,
		multiplier: 0.25,
		note: 'Colombia punches far above its weight as a music exporter: reggaeton and Latin pop written and produced in Medellín dominate global playlists. Domestic rates stay low on emerging-market pricing, but the industry infrastructure is the strongest in the Andean region.'
	},
	{
		slug: 'chile',
		name: 'Chile',
		inName: 'in Chile',
		tier: 3,
		multiplier: 0.35,
		note: 'Chile has the highest streaming ARPU in Latin America after Uruguay, with premium adoption well ahead of its neighbors. Its charts are unusually open to international repertoire.'
	},
	{
		slug: 'peru',
		name: 'Peru',
		inName: 'in Peru',
		tier: 3,
		multiplier: 0.25,
		note: 'Peru is a fast-growing streaming market where cumbia and salsa share the charts with global reggaeton. Pricing and premium mix keep rates at typical Andean levels.'
	},
	{
		slug: 'dominican-republic',
		name: 'Dominican Republic',
		inName: 'in the Dominican Republic',
		tier: 3,
		multiplier: 0.2,
		note: 'The Dominican Republic streams far above its population weight. Dembow and bachata are streaming-native genres with passionate domestic audiences. Most listening happens on ad-supported and family plans, which keeps per-stream rates low.'
	},
	{
		slug: 'india',
		name: 'India',
		inName: 'in India',
		tier: 4,
		multiplier: 0.1,
		note: 'India has the cheapest music subscriptions in the world, a fraction of US pricing, plus enormous free-tier listening across Spotify, JioSaavn, and Wynk. The volume is staggering and growing, but a thousand Indian streams currently pay roughly what a hundred US streams do. Bollywood and regional-language catalogs dominate.'
	},
	{
		slug: 'indonesia',
		name: 'Indonesia',
		inName: 'in Indonesia',
		tier: 4,
		multiplier: 0.13,
		note: "Indonesia is Southeast Asia's biggest streaming population, overwhelmingly on free tiers and low local pricing. Its pop and dangdut scenes are streaming-native, and the market's scale makes it a major source of global stream counts even at low per-stream value."
	},
	{
		slug: 'philippines',
		name: 'Philippines',
		inName: 'in the Philippines',
		tier: 4,
		multiplier: 0.15,
		note: 'The Philippines has some of the highest music engagement per capita in the world. Filipino listeners spend more hours streaming than almost anyone. Most of it is ad-supported, so rates stay low, but OPM (Original Pilipino Music) has ridden this engagement to a streaming renaissance.'
	},
	{
		slug: 'thailand',
		name: 'Thailand',
		inName: 'in Thailand',
		tier: 3,
		multiplier: 0.2,
		note: 'Thailand is a maturing Southeast Asian market with premium adoption growing off the back of T-pop and a strong domestic industry. Rates sit above the regional emerging-market floor but well below Singapore.'
	},
	{
		slug: 'vietnam',
		name: 'Vietnam',
		inName: 'in Vietnam',
		tier: 4,
		multiplier: 0.12,
		note: 'Vietnam splits its listening between global platforms and the domestic Zing MP3, with V-pop driving most volume. Local pricing is among the lowest in the region, keeping per-stream rates near the emerging-market floor.'
	},
	{
		slug: 'malaysia',
		name: 'Malaysia',
		inName: 'in Malaysia',
		tier: 3,
		multiplier: 0.25,
		note: 'Malaysia sits between Singapore and its emerging-market neighbors: premium adoption is respectable, pricing is moderate, and listening spans Malay, Chinese, Tamil, and English repertoire in one market.'
	},
	{
		slug: 'turkey',
		name: 'Turkey',
		inName: 'in Turkey',
		tier: 4,
		multiplier: 0.12,
		note: "Turkey's lira depreciation forced some of the lowest subscription prices in the world, which crushed USD-denominated per-stream rates despite a huge and passionate listening audience. Domestic pop and arabesk dominate, and local platforms Muud and Fizy still hold share."
	},
	{
		slug: 'nigeria',
		name: 'Nigeria',
		inName: 'in Nigeria',
		tier: 4,
		multiplier: 0.1,
		note: "Nigeria is the engine of afrobeats' global takeover, but domestic payouts are tiny: local pricing is among the world's lowest and Boomplay and Audiomack carry much of the volume. Most Nigerian artists earn the bulk of their streaming income from diaspora listeners in the US and UK, not from home."
	},
	{
		slug: 'south-africa',
		name: 'South Africa',
		inName: 'in South Africa',
		tier: 3,
		multiplier: 0.22,
		note: "South Africa is the most developed streaming market in Africa, with amapiano exporting globally the way afrobeats did before it. SAMRO is the continent's most established PRO, and premium adoption leads the region even though pricing remains low by global standards."
	},
	{
		slug: 'kenya',
		name: 'Kenya',
		inName: 'in Kenya',
		tier: 4,
		multiplier: 0.12,
		note: 'Kenya is East Africa\'s streaming leader, helped by mobile-money payment rails that make subscriptions accessible without credit cards. Boomplay has significant share alongside Spotify, and gengetone drives domestic volume.'
	},
	{
		slug: 'ghana',
		name: 'Ghana',
		inName: 'in Ghana',
		tier: 4,
		multiplier: 0.1,
		note: 'Ghana shares the afrobeats corridor with Nigeria and adds its own highlife and hiplife traditions. Like its neighbor, domestic per-stream value is minimal, and Ghanaian artists build streaming income through diaspora audiences and playlist placement abroad.'
	},
	{
		slug: 'egypt',
		name: 'Egypt',
		inName: 'in Egypt',
		tier: 4,
		multiplier: 0.1,
		note: "Egypt anchors the Arabic-language streaming market. Mahraganat and Egyptian pop travel across the whole region. Anghami holds strong regional share alongside Spotify, and local pricing keeps rates at emerging-market levels while volume grows fast."
	}
];

export interface CountryPlatformRate {
	slug: string;
	name: string;
	color: string;
	logo: string;
	low: number;
	avg: number;
	high: number;
}

/** Per-platform estimated rates for a country, derived from global averages. */
export function countryPlatformRates(country: Country): CountryPlatformRate[] {
	return Object.values(platforms).map((p) => {
		const avg = p.rate * country.multiplier;
		return {
			slug: p.slug,
			name: p.name,
			color: p.color,
			logo: p.logo,
			low: avg * 0.75,
			avg,
			high: avg * 1.25
		};
	});
}

export function formatRate(rate: number): string {
	// 0.0034 -> "$0.0034", 0.00045 -> "$0.00045"
	const decimals = rate >= 0.001 ? 4 : 5;
	return `$${rate.toFixed(decimals)}`;
}

export function getCountry(slug: string): Country | undefined {
	return countries.find((c) => c.slug === slug);
}
