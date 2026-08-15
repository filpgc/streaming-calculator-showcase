export { default as MetricRow } from './MetricRow.svelte';
export { default as SettingSelect } from './SettingSelect.svelte';
export { default as SettingPills } from './SettingPills.svelte';
export { default as ResultBlock } from './ResultBlock.svelte';
export { default as RateTable } from './RateTable.svelte';
export { default as FaqSection } from './FaqSection.svelte';
export { default as ChipRow } from './ChipRow.svelte';
export { default as ProseSection } from './ProseSection.svelte';
export { default as CreatorHero } from './CreatorHero.svelte';
export { default as CrossPlatform } from './CrossPlatform.svelte';

/** Icon paths + brand colors for MetricRow tiles */
export const CREATOR_ICONS = {
	youtube: { bg: '#e0453a', path: 'M13.5 11.5v11l9-5.5-9-5.5z' },
	twitch: {
		bg: '#8b5cf6',
		path: 'M10 8v13h4v3l3-3h3.5L25 16.5V8H10zm13 7.5-2.5 2.5H18l-2.2 2.2V18H13V10h10v5.5zM20.5 12H19v4h1.5v-4zm-4 0H15v4h1.5v-4z'
	},
	tiktok: {
		bg: '#0f0f0f',
		path: 'M21.5 9.5c.8 1.6 2.1 2.7 4 2.9v3c-1.6-.05-3-.5-4.2-1.4v6.3c0 3.9-2.6 6.2-5.9 6.2-3.2 0-5.6-2.3-5.6-5.4 0-3 2.3-5.3 5.5-5.3.3 0 .7 0 1 .1v3.1c-.3-.1-.7-.2-1-.2-1.5 0-2.6 1-2.6 2.4 0 1.4 1.1 2.4 2.6 2.4 1.6 0 2.9-1 2.9-3.2V8h3.3v1.5z'
	}
} as const;
