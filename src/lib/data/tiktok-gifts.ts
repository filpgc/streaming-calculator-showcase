import { DIAMOND_VALUE } from './tiktok';

/**
 * TikTok LIVE gift economics, for /tiktok-gift-calculator.
 *
 * The chain is coins to gifts to diamonds to cash:
 *
 *   1. A viewer buys coins with real money, at roughly $0.013 each. The exact
 *      price varies by region and is higher in the iOS app, because Apple's cut
 *      is priced in.
 *   2. They spend coins on a gift.
 *   3. The creator receives diamonds, at roughly two coins to one diamond.
 *   4. Diamonds cash out at $0.005 each.
 *
 * So a 1,000-coin gift costs the viewer about $13 and pays the creator about
 * $2.50. TikTok's own framing is "we keep about 50%", which is true of the
 * nominal coin value but not of what the viewer actually paid.
 *
 * This matters because the calculators currently ranking for these queries get
 * it wrong in the creator's favour. The top result takes the retail coin value
 * and halves it, so it reports 3,000 coins as $19.50 to the creator. The
 * diamond math gives $7.50. Overstating a payout by 2.5x is the one mistake
 * this page cannot make, so the default input is diamonds, which the creator can
 * read directly out of their own balance and needs no conversion assumption at
 * all. Coins are supported for people asking from the viewer's side, with the
 * assumption stated on screen.
 *
 * Sources checked Aug 2026: 1 diamond = $0.005 is near-universally reported and
 * matches TikTok's payout screens; the two-coins-to-one-diamond ratio and the
 * ~$0.013 coin price are the consensus across published conversion charts.
 */

/** What a viewer pays per coin, USD. Higher on iOS, varies by region. */
export const COIN_PRICE_USD = 0.013;

/** Coins a viewer spends per diamond the creator receives. */
export const COINS_PER_DIAMOND = 2;

export type GiftUnit = 'diamonds' | 'coins';

export interface GiftResult {
	/** Diamonds credited to the creator. */
	diamonds: number;
	/** Coins the viewer spent. */
	coins: number;
	/** What the viewer paid, USD. */
	viewerCost: number;
	/** What the creator can withdraw, USD. */
	payout: number;
	/** Share of the viewer's spend that reaches the creator. */
	sharePct: number;
}

export function giftValue(amount: number, unit: GiftUnit): GiftResult {
	const diamonds = unit === 'diamonds' ? amount : amount / COINS_PER_DIAMOND;
	const coins = unit === 'coins' ? amount : amount * COINS_PER_DIAMOND;
	const payout = diamonds * DIAMOND_VALUE;
	const viewerCost = coins * COIN_PRICE_USD;
	return {
		diamonds,
		coins,
		viewerCost,
		payout,
		sharePct: viewerCost > 0 ? (payout / viewerCost) * 100 : 0
	};
}

/**
 * Coin prices for gifts people actually search for. TikTok changes these and
 * runs regional variations, so the page says so rather than presenting them as
 * fixed. Only gifts whose price is consistently published are listed.
 */
export const GIFTS: { name: string; coins: number }[] = [
	{ name: 'Rose', coins: 1 },
	{ name: 'Finger Heart', coins: 5 },
	{ name: 'Perfume', coins: 20 },
	{ name: 'Hand Hearts', coins: 100 },
	{ name: 'Corgi', coins: 299 },
	{ name: 'Money Gun', coins: 500 },
	{ name: 'Galaxy', coins: 1000 },
	{ name: 'Lion', coins: 29999 },
	{ name: 'Universe', coins: 34999 }
];

/** Withdrawal minimum on the creator side, USD. */
export const PAYOUT_MINIMUM = 100;

export const giftFaqs = [
	{
		heading: 'How much is 1,000 TikTok coins worth to the creator?',
		body: 'About $2.50. The viewer pays roughly $13 for 1,000 coins, and the creator receives roughly 500 diamonds, which cash out at half a cent each. Most gift calculators report a much higher figure because they halve the retail coin price instead of converting to diamonds, which overstates the payout by around two and a half times.'
	},
	{
		heading: 'How much is a diamond worth on TikTok?',
		body: 'One diamond is $0.005, so 200 diamonds is $1 and 1,000 diamonds is $5. Diamonds are the number that matters, because they are what actually sits in your creator balance and what you withdraw. Coins are the viewer side of the transaction and never reach you directly.'
	},
	{
		heading: 'How much is 1 million gift points on TikTok?',
		body: 'If your balance shows 1 million diamonds, that is $5,000 before tax and payment fees. TikTok LIVE sometimes labels this figure as points rather than diamonds depending on the region and app version, but the cash rate is the same half a cent each.'
	},
	{
		heading: 'Why does TikTok keep so much of a gift?',
		body: 'TikTok describes its share as roughly 50%, which is accurate against the nominal value of a coin. Measured against what the viewer actually paid, the creator keeps closer to 20%, because the retail price of coins is above their nominal value and is higher again in the iOS app, where Apple takes a cut before TikTok does.'
	},
	{
		heading: 'How much is a Lion gift worth?',
		body: 'A Lion costs 29,999 coins, so the sender pays around $390 and the creator receives roughly 15,000 diamonds, about $75. The Universe gift at 34,999 coins works out at roughly $87 to the creator. Gift prices change and vary by region, so check the current cost in the app.'
	},
	{
		heading: 'When can I withdraw TikTok diamonds?',
		body: 'You need a balance of at least $100 to request a withdrawal, and TikTok applies a processing period before the money reaches your account. Withdrawals go through PayPal or a linked bank account depending on region, and the amount you receive is before income tax, which is yours to declare.'
	}
];
