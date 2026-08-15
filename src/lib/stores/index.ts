export { streams, totalStreams, type StreamData } from './streams';
export { currency, currencies, getCurrencyInfo, formatCurrency, type Currency } from './currency';
export { royaltyPercentage } from './royalties';
export { totalEarnings, earningsPerService, bestPlatform } from './earnings';

import { writable } from 'svelte/store';
export const showShareCard = writable(false);
