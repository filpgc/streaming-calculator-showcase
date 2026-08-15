/**
 * TikTok earnings data for /tiktok-money-calculator.
 *
 * Creator Rewards Program pays roughly $0.40 to $1.00 per 1,000 qualified
 * views (videos over one minute, original content, eligible regions).
 * LIVE gifts convert through diamonds at $0.005 each after TikTok's cut
 * of the coin purchase. Editorial estimates.
 */

export const TIKTOK_RPM = { low: 0.4, high: 1.0 };
export const DIAMOND_VALUE = 0.005;

export const tiktokFacts: string[][] = [
	['Creator Rewards', '$0.40 to $1.00 / 1k', 'Qualified views only: original videos over 1 minute. Rate varies with region, engagement, and "search value"'],
	['Old Creator Fund', '$0.02 to $0.04 / 1k', 'Replaced by Creator Rewards, whose 20 to 25x raise is why the switch mattered'],
	['LIVE gift diamonds', '$0.005 each', 'TikTok takes ~50% when viewers buy coins; diamonds convert at a fixed rate'],
	['Videos under 60s', '$0', 'Not eligible for Creator Rewards. Length is the gate'],
	['Payout threshold', '$10 / $100', 'Rewards pays out from $10, LIVE from $100, via the Creator tools wallet']
];
