<script lang="ts">
	import type { PageData } from './$types';
	import { SEOHead, SponsorSlot } from '$lib/components';
	import {
		MetricRow,
		ResultBlock,
		RateTable,
		FaqSection,
		ChipRow,
		ProseSection,
		SettingPills,
		CrossPlatform,
		CreatorHero,
		CREATOR_ICONS
	} from '$lib/components/creator';
	import { TIKTOK_RPM, DIAMOND_VALUE, tiktokFacts } from '$lib/data/tiktok';

	export let data: PageData;

	/**
	 * Starts on a realistic figure rather than zero. A calculator that opens on
	 * $0.00 is a blank form: the visitor has to do work before the page does
	 * anything, and most won't. Opening on a worked example means they edit
	 * rather than create, and the answer is on screen immediately.
	 */
	let views = 500_000;
	let diamonds = 0;

	/**
	 * Asks for total views, not "qualified views". Nobody knows their qualified
	 * count, because qualification is TikTok's rule about video length, not a
	 * number in anyone's analytics. So take what creators do know and apply the
	 * rule here, visibly.
	 */
	let eligibleShare = '0.8';
	const eligibleOptions = [
		{ value: '0.8', label: 'Most over 1 min' },
		{ value: '0.5', label: 'About half' },
		{ value: '0.15', label: 'Mostly short' }
	];

	$: qualified = views * Number(eligibleShare);
	$: viewsLow = (qualified / 1000) * TIKTOK_RPM.low;
	$: viewsHigh = (qualified / 1000) * TIKTOK_RPM.high;
	$: viewsMid = (viewsLow + viewsHigh) / 2;
	$: giftUsd = diamonds * DIAMOND_VALUE;
	$: total = viewsMid + giftUsd;
	// What a thousand views is worth once the length rule is applied, which is
	// the number that lets someone judge whether the total is good or bad.
	$: perThousand = views > 0 ? (total / views) * 1000 : 0;

	function money(x: number): string {
		return x.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: x < 100 ? 2 : 0
		});
	}

	function fmtShort(n: number): string {
		const decimals = n >= 10000 ? 0 : 2;
		return n.toLocaleString('en-US', {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals
		});
	}

	const crossLinks = [
		{ href: '/tiktok-gift-calculator', label: 'TikTok gift calculator', accent: true },
		{ href: '/youtube-money-calculator', label: 'YouTube calculator' },
		{ href: '/twitch-money-calculator', label: 'Twitch calculator' },
		{ href: '/how-much-does-youtube-pay', label: 'How YouTube pays' },
		{ href: '/', label: 'Music streaming calculator →', accent: true }
	];
</script>

<SEOHead seo={data.seo} schemas={data.schemas} />

<div class="container">
	<CreatorHero
		title="TikTok Money Calculator"
		iconBg={CREATOR_ICONS.tiktok.bg}
		iconPath={CREATOR_ICONS.tiktok.path}
		subtitle="Creator Rewards views, LIVE gifts, and the part everyone skips: what pays zero"
	/>

	<div class="service-list">
		<MetricRow
			name="Monthly views"
			rateLine="Every video, any length"
			bind:value={views}
			earning={views > 0 ? `$${fmtShort(viewsMid)}` : null}
		/>
		<MetricRow
			name="LIVE gift diamonds"
			rateLine="Optional · $0.005 each"
			bind:value={diamonds}
			earning={diamonds > 0 ? `$${fmtShort(giftUsd)}` : null}
		/>
	</div>

	<SettingPills
		label="How many of your videos are over 1 minute?"
		layout="stacked"
		options={eligibleOptions}
		bind:value={eligibleShare}
	/>

	<ResultBlock
		label="Estimated Monthly Earnings"
		value={total}
		meta={[
			`${money(viewsLow + giftUsd)} to ${money(viewsHigh + giftUsd)} range`,
			`${money(perThousand)} per 1,000 views`,
			`≈${money(total * 12)}/year`
		]}
		emptyMeta="Enter your monthly views above"
	/>

	<CrossPlatform {views} current="tiktok" tiktokShare={Number(eligibleShare)} />

	<section class="creator-page-section creator-table-breakout" aria-labelledby="tt-rates">
		<h2 id="tt-rates" class="faq-title creator-page-section-title">What TikTok pays (2026)</h2>
		<RateTable
			columns={['Revenue stream', 'Rate', 'Notes']}
			rows={tiktokFacts}
			footnote="Creator Rewards rates vary with region, watch time, and TikTok's opaque 'search value' factor. Estimates, not guarantees."
		/>
	</section>

	<ProseSection id="tt-how" title="The one-minute rule that decides everything">
		<p>
			TikTok's Creator Rewards Program only pays for <strong>original videos longer than one
			minute</strong>. That single rule explains most confusion about TikTok money: a viral
			45-second clip with 5 million views earns exactly $0 from the program, while a 90-second video
			with 500,000 qualified views earns $200 to $500. If direct payouts matter to you, format length
			is a monetization decision, not a creative one.
		</p>
		<p>
			The second engine is <strong>LIVE gifting</strong>: diamonds convert at a flat half-cent
			each, and for creators with engaged communities LIVE can out-earn views entirely. But the real
			money on TikTok has always been leverage: audience size prices your brand deals, which is
			where mid-size creators make multiples of their Rewards payouts. Compare the same audience's
			value on <a href="/youtube-money-calculator">YouTube</a> and
			<a href="/twitch-money-calculator">Twitch</a>. Cross-posting is the highest-ROI move in the
			creator economy.
		</p>
	</ProseSection>

	<SponsorSlot slot="creator-inline" audience="creator" />

	<FaqSection id="tt-faq" faqs={data.faqs} />

	<ChipRow id="tt-related" title="More creator calculators" links={crossLinks} />
</div>

<style>
	.creator-page-section {
		margin-bottom: 32px;
	}

	.creator-page-section-title {
		margin-bottom: 12px;
	}
</style>
