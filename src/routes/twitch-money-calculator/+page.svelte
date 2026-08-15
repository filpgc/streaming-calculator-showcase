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
		CreatorHero,
		CREATOR_ICONS
	} from '$lib/components/creator';
	import { twitchStreams, twitchFacts } from '$lib/data/twitch';

	export let data: PageData;

	let values: Record<string, number> = {};
	twitchStreams.forEach((s) => (values[s.slug] = 0));

	$: total = twitchStreams.reduce((sum, s) => sum + (values[s.slug] || 0) * s.perUnit, 0);
	$: subCount =
		(values['tier1'] || 0) + (values['tier2'] || 0) + (values['tier3'] || 0);

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
		{ href: '/youtube-money-calculator', label: 'YouTube calculator' },
		{ href: '/tiktok-money-calculator', label: 'TikTok calculator' },
		{ href: '/how-much-does-youtube-pay', label: 'How YouTube pays' },
		{ href: '/', label: 'Music streaming calculator →', accent: true }
	];
</script>

<SEOHead seo={data.seo} schemas={data.schemas} />

<div class="container">
	<CreatorHero
		title="Twitch Money Calculator"
		iconBg={CREATOR_ICONS.twitch.bg}
		iconPath={CREATOR_ICONS.twitch.path}
		subtitle="Subs, bits, and the real 50/50 split: what streaming on Twitch actually pays"
	/>

	<div class="service-list">
		{#each twitchStreams as s (s.slug)}
			<MetricRow
				name={s.name}
				rateLine={s.rateLine}
				bind:value={values[s.slug]}
				earning={values[s.slug] > 0 ? `$${fmtShort(values[s.slug] * s.perUnit)}` : null}
			/>
		{/each}
	</div>

	<ResultBlock
		label="Estimated Monthly Earnings"
		value={total}
		meta="{subCount.toLocaleString()} subs · {(values['bits'] || 0).toLocaleString()} bits · ≈{money(total * 12)}/year before ads and sponsorships"
		emptyMeta="Enter your subs and bits above"
	/>

	<section class="creator-page-section creator-table-breakout" aria-labelledby="tw-rates">
		<h2 id="tw-rates" class="faq-title creator-page-section-title">What each revenue stream pays (2026)</h2>
		<RateTable
			columns={['Revenue stream', 'You receive', 'Notes']}
			rows={twitchFacts}
			footnote="US list prices with the standard 50% creator share. Partner Plus levels pay 60 to 70% of net sub revenue up to an annual cap. Estimates, not guarantees."
		/>
	</section>

	<ProseSection id="tw-how" title="How Twitch money actually works">
		<p>
			Twitch income stacks four streams: <strong>subscriptions</strong> (the core: recurring,
			predictable, split 50/50 on the standard agreement), <strong>bits</strong> (micro-tips at a
			flat cent each), <strong>ads</strong> (a 55% share that pays $2 to $6 per 1,000 ad views), and
			everything off-platform: sponsorships, donations through third-party tools, and merch, which
			for established streamers usually out-earn all of the above combined.
		</p>
		<p>
			The metric that matters is <strong>average concurrent viewers</strong>, not followers. Subs
			convert from people who actually watch: a channel holding 100 concurrent viewers typically
			sustains 250 to 400 subs. That's why the honest rule of thumb is concurrent viewers × $8 to $12 for
			monthly platform earnings. Compare that with what the same audience pays on
			<a href="/youtube-money-calculator">YouTube</a> or
			<a href="/tiktok-money-calculator">TikTok</a>. Most full-time creators run all three.
		</p>
	</ProseSection>

	<SponsorSlot slot="creator-inline" audience="creator" />

	<FaqSection id="tw-faq" faqs={data.faqs} />

	<ChipRow id="tw-related" title="More creator calculators" links={crossLinks} />
</div>

<style>
	.creator-page-section {
		margin-bottom: 32px;
	}

	.creator-page-section-title {
		margin-bottom: 12px;
	}
</style>
