import { derived } from 'svelte/store';
import { streams } from './streams';
import { royaltyPercentage } from './royalties';
import { currency, getCurrencyInfo } from './currency';
import { formatAmount } from '$lib/format';

// Discovery Mode pays ~30% less than normal rate
const DISCOVERY_MODE_MULTIPLIER = 0.7;

export const totalEarnings = derived(
	[streams, royaltyPercentage, currency],
	([$streams, $royaltyPercentage, $currency]) => {
		const currencyInfo = getCurrencyInfo($currency);

		let total = 0;

		Object.values($streams).forEach((service) => {
			const rate = service.discoveryMode ? service.rate * DISCOVERY_MODE_MULTIPLIER : service.rate;
			total += service.streams * rate;
		});

		const withRoyalty = total * ($royaltyPercentage / 100);
		const converted = withRoyalty * currencyInfo.rate;

		return {
			raw: converted,
			formatted: formatEarnings(converted, currencyInfo.symbol)
		};
	}
);

function formatEarnings(amount: number, symbol: string): string {
	// For large amounts, decimals are unnecessary noise
	return `${symbol}${formatAmount(amount)}`;
}

export const earningsPerService = derived(
	[streams, royaltyPercentage, currency],
	([$streams, $royaltyPercentage, $currency]) => {
		const currencyInfo = getCurrencyInfo($currency);

		return Object.entries($streams).map(([name, service]) => {
			const rate = service.discoveryMode ? service.rate * DISCOVERY_MODE_MULTIPLIER : service.rate;
			const earnings = service.streams * rate * ($royaltyPercentage / 100) * currencyInfo.rate;

			return {
				name,
				streams: service.streams,
				earnings,
				formatted: formatEarnings(earnings, currencyInfo.symbol)
			};
		});
	}
);

export const bestPlatform = derived(
	[streams, royaltyPercentage],
	([$streams, $royaltyPercentage]) => {
		let best: string | null = null;
		let maxEarnings = 0;
		let servicesWithStreams = 0;

		Object.entries($streams).forEach(([name, service]) => {
			if (service.streams > 0) {
				servicesWithStreams++;
				const rate = service.discoveryMode
					? service.rate * DISCOVERY_MODE_MULTIPLIER
					: service.rate;
				const earnings = service.streams * rate * ($royaltyPercentage / 100);
				if (earnings > maxEarnings) {
					maxEarnings = earnings;
					best = name;
				}
			}
		});

		// Only show "Top" if multiple services have streams
		return servicesWithStreams > 1 ? best : null;
	}
);
