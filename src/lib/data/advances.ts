/**
 * Royalty advances and catalogue sales, for /royalty-advance-calculator.
 *
 * Two different transactions that artists constantly conflate:
 *
 *   Advance      Cash now against future royalties. You keep your masters. The
 *                money is recouped from your streaming income until it is paid
 *                back, then the income reverts to you in full.
 *   Catalogue    You sell the rights. One payment, and the income is no longer
 *   sale         yours - permanently, or for a fixed term.
 *
 * Both are priced as a multiple of what the catalogue currently earns in a
 * year, which is why one number drives the whole page.
 *
 * Sources for the ranges below (checked Aug 2026):
 * - beatBread publicly describes non-recourse advances of roughly 1.5x to 3x
 *   trailing twelve-month earnings, recouped over 6 to 30 months, with the
 *   artist retaining master ownership.
 * - Duetti acquires independent catalogues in deals typically worth $10,000 to
 *   $10m, and reports 80+ deals a month.
 * - Catalogue multiples vary enormously with trend and genre; the strongest
 *   publishing catalogues have reached ~9.8x net revenue, which is the top of
 *   the market and not what a typical independent master catalogue fetches.
 *
 * These are estimates for orientation, not offers. Every real deal is priced on
 * the actual per-track decay curve, and no calculator can see that.
 */

export type Trend = 'growing' | 'stable' | 'declining';

export interface TrendBand {
	value: Trend;
	label: string;
	/** Shown under the result, so the multiple never appears unexplained. */
	note: string;
	/** Multiple of annual net earnings, as an advance against future income. */
	advance: { low: number; high: number };
	/** Multiple of annual net earnings, to buy the rights outright. */
	sale: { low: number; high: number };
}

export const TRENDS: TrendBand[] = [
	{
		value: 'growing',
		label: 'Growing',
		note: 'Rising streams price at the top of the range: the buyer is betting the income is bigger next year than this year.',
		advance: { low: 2.0, high: 3.0 },
		sale: { low: 4, high: 6.5 }
	},
	{
		value: 'stable',
		label: 'Flat',
		note: 'A flat catalogue is the easiest to price, so offers cluster tightly around the middle of the market.',
		advance: { low: 1.5, high: 2.5 },
		sale: { low: 3, high: 5 }
	},
	{
		value: 'declining',
		label: 'Declining',
		note: 'Falling streams are discounted hard, because the buyer has to assume the decline continues after they have paid.',
		advance: { low: 1.0, high: 1.8 },
		sale: { low: 2, high: 3.5 }
	}
];

export interface AdvanceEstimate {
	annual: number;
	/** Midpoint, which is the figure the page actually shows. */
	mid: number;
	low: number;
	high: number;
	/** Midpoint multiple, so the headline number can explain itself. */
	multiple: number;
	/** Months to recoup, advances only. Zero for a sale, which never recoups. */
	recoupMonths: number;
}

/**
 * One estimate at a time.
 *
 * The page used to show an advance and a sale side by side, each as a range.
 * Two answers is no answer, and five ranges on one screen reads as hedging.
 * The visitor picks which deal they are considering and gets a single number,
 * with the range demoted to the line underneath.
 *
 * Recoupment assumes all streaming income goes to paying the advance back,
 * which is the default shape of these deals. Letting the visitor tune that only
 * moved the recoup estimate, never the money, so it was a third control earning
 * nothing.
 */
export function estimate(monthly: number, trend: TrendBand, kind: 'advance' | 'sale'): AdvanceEstimate {
	const annual = monthly * 12;
	const band = kind === 'advance' ? trend.advance : trend.sale;
	const multiple = (band.low + band.high) / 2;
	const mid = annual * multiple;
	return {
		annual,
		mid,
		low: annual * band.low,
		high: annual * band.high,
		multiple,
		recoupMonths: kind === 'advance' && monthly > 0 ? Math.round(mid / monthly) : 0
	};
}

/**
 * The minimum monthly income worth modelling.
 *
 * Below roughly $100 a month there is no advance market: the deal costs more to
 * underwrite than it is worth, and showing someone a $1,800 "advance" they
 * cannot actually get would be the calculator lying politely.
 */
export const MIN_MONTHLY = 100;

export const advanceFaqs = [
	{
		heading: 'How much can I get as a royalty advance?',
		body: 'Typically 1.5 to 3 times what your catalogue earned over the last twelve months, paid up front and recouped from your streaming income over roughly 6 to 30 months. A catalogue with rising streams prices at the top of that range and a declining one at the bottom. Advances of this kind are usually non-recourse, meaning if the streams never materialise you do not owe the shortfall.'
	},
	{
		heading: 'Is a royalty advance a loan?',
		body: 'Not in the usual sense. A non-recourse advance is repaid only out of the royalties it was written against, so there is no personal liability if the income falls short and no interest rate in the way a bank loan has one. What you are giving up is the use of your streaming income until the advance is recouped. Read the terms carefully: recourse deals do exist, and they behave much more like debt.'
	},
	{
		heading: 'Should I take an advance or sell my catalogue?',
		body: 'An advance is temporary and a sale is permanent. Once the advance recoups, the income comes back to you in full; once you sell, it never does. A sale makes sense when you need materially more cash than an advance can produce, or when you think your catalogue has peaked. An advance makes sense when you need funding for something that will grow the catalogue, because you keep the upside.'
	},
	{
		heading: 'What multiple is a music catalogue worth?',
		body: 'Independent master catalogues commonly change hands at around 3 to 5 times annual net earnings, higher for growing catalogues and lower for declining ones. The very top of the market, for premium publishing catalogues, has reached roughly 9.8 times net revenue, but that is not the rate a typical independent artist is offered. The multiple is a judgement about how long your income will last, so anything that makes future income more predictable raises it.'
	},
	{
		heading: 'What do advance companies look at?',
		body: 'Your trailing twelve months of streaming income, the shape of it month to month, how much of it comes from a single track, and whether you control the rights cleanly. A catalogue earning steadily across many tracks prices better than the same total concentrated in one song that went viral last year, because the second one is far more likely to fall away.'
	},
	{
		heading: 'Do I lose my masters if I take an advance?',
		body: 'With a non-recourse streaming advance, no. You keep ownership and you keep publishing and sync income unless the deal explicitly includes them. That is the main difference from a catalogue sale, where the rights themselves change hands. Always check exactly which income streams a deal recoups against before signing.'
	}
];
