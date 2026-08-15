// Number formatting for the calculators.
//
// `n.toLocaleString(...)` builds a fresh Intl.NumberFormat on every call, and
// constructing one is far more expensive than formatting with it. The
// calculators reformat every visible figure on each keystroke, so on a low-end
// phone that construction cost showed up directly in interaction latency.
// These cached instances are built once and reused.

let integerFmt: Intl.NumberFormat | undefined;
let decimalFmt: Intl.NumberFormat | undefined;
let wholeFmt: Intl.NumberFormat | undefined;

/** Thousands-separated integer, e.g. `1,250,000`. */
export function formatInteger(n: number): string {
	integerFmt ??= new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
	return integerFmt.format(n);
}

/**
 * Money-style amount: two decimals up to 10,000 and none above it, where
 * cents are just noise. Matches the rounding the calculators already used.
 */
export function formatAmount(n: number): string {
	if (n >= 10000) {
		wholeFmt ??= new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});
		return wholeFmt.format(n);
	}
	decimalFmt ??= new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
	return decimalFmt.format(n);
}

/** Inserts thousands separators into a run of digits, e.g. `1250000` → `1,250,000`. */
export function groupDigits(digits: string): string {
	return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
