import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Currency = 'USD' | 'GBP' | 'EUR';

export interface CurrencyInfo {
	code: Currency;
	symbol: string;
	rate: number;
}

/**
 * Rates per 1 USD, checked 11 August 2026.
 *
 * GBP/USD was quoting 1.3487 to 1.3503 across that day and the previous close,
 * so 1 USD buys about 0.741 GBP. EUR/USD was 1.1542 to 1.1554, so about 0.866
 * EUR. The previous values (0.73 and 0.84) were roughly 1.5% and 3% out.
 *
 * These are hardcoded, so they drift. Three decimal places rather than two
 * because the rounding at two was itself worth a few tenths of a percent, and
 * this is a site people trust for numbers. Worth re-checking every few months,
 * or reading from a rates API at build time if it ever matters more than that.
 */
export const currencies: CurrencyInfo[] = [
	{ code: 'USD', symbol: '$', rate: 1 },
	{ code: 'GBP', symbol: '£', rate: 0.741 },
	{ code: 'EUR', symbol: '€', rate: 0.866 }
];

function createCurrencyStore() {
	const stored = browser ? localStorage.getItem('currency') : null;
	const initial: Currency = (stored as Currency) || 'USD';

	const { subscribe, set } = writable<Currency>(initial);

	return {
		subscribe,
		set: (currency: Currency) => {
			if (browser) {
				localStorage.setItem('currency', currency);
			}
			set(currency);
		}
	};
}

export const currency = createCurrencyStore();

export function getCurrencyInfo(code: Currency): CurrencyInfo {
	return currencies.find((c) => c.code === code) || currencies[0];
}

export function formatCurrency(amount: number, currencyCode: Currency): string {
	const info = getCurrencyInfo(currencyCode);
	const converted = amount * info.rate;

	if (converted >= 1000000) {
		return `${info.symbol}${(converted / 1000000).toFixed(2)}M`;
	} else if (converted >= 1000) {
		return `${info.symbol}${(converted / 1000).toFixed(2)}K`;
	}

	return `${info.symbol}${converted.toFixed(2)}`;
}
