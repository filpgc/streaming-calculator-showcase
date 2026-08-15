<script lang="ts">
	import type { PageData } from './$types';
	import { SEOHead, Header, FAQ, InternalLinks } from '$lib/components';
	import { CREATOR_ICONS, MetricRow, SettingPills, RateTable } from '$lib/components/creator';
	import {
		giftValue,
		GIFTS,
		COIN_PRICE_USD,
		COINS_PER_DIAMOND,
		PAYOUT_MINIMUM,
		type GiftUnit
	} from '$lib/data/tiktok-gifts';

	export let data: PageData;

	/** Opens on a worked example rather than an empty box. */
	let amount = 10_000;
	let unit: GiftUnit = 'diamonds';

	const unitOptions = [
		{ value: 'diamonds', label: 'Diamonds I received' },
		{ value: 'coins', label: 'Coins they spent' }
	];

	$: result = giftValue(amount, unit);
	$: toGo = Math.max(0, PAYOUT_MINIMUM - result.payout);

	function money(x: number): string {
		return x.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: x < 100 ? 2 : 0
		});
	}

	function int(n: number): string {
		return Math.round(n).toLocaleString('en-US');
	}

	/** Every gift priced the way the creator experiences it, not the sender. */
	$: giftRows = GIFTS.map((g) => {
		const r = giftValue(g.coins, 'coins');
		return [g.name, int(g.coins), money(r.viewerCost), money(r.payout)];
	});

	const internalLinks = [
		{ href: '/tiktok-money-calculator', label: 'TikTok Money Calculator' },
		{ href: '/youtube-money-calculator', label: 'YouTube Calculator' },
		{ href: '/twitch-money-calculator', label: 'Twitch Calculator' },
		{ href: '/', label: 'Music Streaming Calculator' }
	];
</script>

<SEOHead seo={data.seo} schemas={data.schemas} />

<div class="container">
	<Header
		title="TikTok Gift Calculator"
		subtitle="What LIVE gifts actually pay you, not what the sender was charged"
	/>

	<div class="service-list">
		<MetricRow
			name={unit === 'diamonds' ? 'Diamonds' : 'Coins'}
			rateLine={unit === 'diamonds' ? 'Your balance in the app' : 'What the sender spent'}
			iconBg={CREATOR_ICONS.tiktok.bg}
			iconPath={CREATOR_ICONS.tiktok.path}
			bind:value={amount}
		/>
	</div>

	<SettingPills
		label="Which number do you have?"
		layout="stacked"
		options={unitOptions}
		bind:value={unit}
	/>

	<div class="result gc-result">
		<div class="result-label">You Receive</div>
		<div class="result-value has-value gc-result-value">{money(result.payout)}</div>
		<div class="result-meta gc-result-meta">
			{int(result.diamonds)} diamonds at half a cent each
		</div>
	</div>

	<!--
		The comparison the incumbents leave out. Every gift calculator ranking for
		this query reports the sender's spend halved, which is not what lands in a
		creator balance. Showing both numbers side by side is the whole point of the
		page, so it sits directly under the answer.
	-->
	<section class="gc-split" aria-label="Where the money goes">
		<div class="gc-split-row">
			<span class="gc-split-label">The sender paid</span>
			<span class="gc-split-value">{money(result.viewerCost)}</span>
		</div>
		<div class="gc-split-row">
			<span class="gc-split-label">TikTok and the app stores keep</span>
			<span class="gc-split-value">{money(result.viewerCost - result.payout)}</span>
		</div>
		<div class="gc-split-row gc-split-row-you">
			<span class="gc-split-label">You keep</span>
			<span class="gc-split-value">{money(result.payout)}</span>
		</div>
		<p class="gc-split-note">
			You keep about {Math.round(result.sharePct)}% of what the sender spent. TikTok describes its
			share as 50%, which is true of a coin's nominal value but not of the price paid for it:
			{int(COINS_PER_DIAMOND)} coins convert to 1 diamond, and coins retail at around ${COIN_PRICE_USD.toFixed(
				3
			)} each, more inside the iOS app where Apple takes a cut first.
		</p>
	</section>

	{#if toGo > 0}
		<p class="gc-threshold">
			TikTok pays out from {money(PAYOUT_MINIMUM)}, so this is {money(toGo)} short of a withdrawal.
		</p>
	{/if}

	<section class="creator-page-section creator-table-breakout" aria-labelledby="gc-gifts">
		<h2 id="gc-gifts" class="faq-title creator-page-section-title">What each TikTok gift pays</h2>
		<RateTable
			columns={['Gift', 'Coins', 'Sender pays', 'You receive']}
			rows={giftRows}
			footnote="Coin prices change and vary by region, so check the current cost in the app. Payout assumes two coins per diamond at $0.005 a diamond, before income tax."
		/>
	</section>

	<FAQ faqs={data.faqs} title="TikTok gifts, answered" id="gift-faq" />

	<InternalLinks links={internalLinks} />
</div>

<style>
	.gc-result {
		padding-bottom: 18px;
	}

	.gc-result-value {
		font-size: 42px;
	}

	.gc-result-meta {
		max-width: 32ch;
		margin-left: auto;
		margin-right: auto;
	}

	.gc-split {
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 16px;
		padding: 4px 16px 14px;
	}

	.gc-split-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		padding: 11px 0;
	}

	.gc-split-row:not(:last-of-type) {
		border-bottom: 0.5px solid var(--divider);
	}

	.gc-split-label {
		font-size: 13.5px;
		color: var(--text-secondary);
		text-wrap: pretty;
	}

	.gc-split-value {
		font-size: 15px;
		font-weight: 600;
		color: var(--text);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.gc-split-row-you .gc-split-label,
	.gc-split-row-you .gc-split-value {
		color: var(--accent);
		font-weight: 600;
	}

	.gc-split-note {
		font-size: 12.5px;
		line-height: 1.65;
		color: var(--text-muted);
		margin-top: 8px;
		text-wrap: pretty;
	}

	.gc-threshold {
		font-size: 13px;
		line-height: 1.6;
		color: var(--text-muted);
		margin: 12px 2px 0;
		text-wrap: pretty;
	}

	.creator-page-section {
		margin-top: 30px;
		margin-bottom: 32px;
	}

	.creator-page-section-title {
		margin-bottom: 12px;
	}
</style>
