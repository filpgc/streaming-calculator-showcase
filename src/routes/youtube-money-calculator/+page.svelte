<script lang="ts">
	import type { PageData } from './$types';
	import { SEOHead, SponsorSlot } from '$lib/components';
	import {
		MetricRow,
		SettingSelect,
		SettingPills,
		ResultBlock,
		RateTable,
		FaqSection,
		ChipRow,
		ProseSection,
		CrossPlatform,
		CreatorHero,
		CREATOR_ICONS
	} from '$lib/components/creator';
	import { SHORTS_RPM, fmtRpm } from '$lib/data/youtube';
	import { countries } from '$lib/data/countries';

	export let data: PageData;

	/**
	 * Opens on a worked example rather than $0.00. A calculator that starts empty
	 * is a blank form: the visitor has to do work before the page does anything.
	 * Starting on a plausible figure means they edit instead of create, and the
	 * answer is already on screen.
	 */
	let views = 100_000;
	let nicheSlug = 'entertainment';
	let format = 'long';

	$: niche = data.niches.find((n) => n.slug === nicheSlug) ?? data.niches[0];
	$: rpmLow = format === 'long' ? niche.low : SHORTS_RPM.low;
	$: rpmHigh = format === 'long' ? niche.high : SHORTS_RPM.high;
	$: monthlyLow = (views / 1000) * rpmLow;
	$: monthlyHigh = (views / 1000) * rpmHigh;
	$: monthlyMid = (monthlyLow + monthlyHigh) / 2;

	/**
	 * The gap the visitor can't see from a single number.
	 *
	 * On Shorts, the comparison that matters is the same views posted long-form.
	 * On long-form it's the niche premium: identical view counts, different
	 * advertisers bidding. Both are the reason RPM ranges exist at all, and
	 * neither is visible from one figure on its own.
	 */
	$: topNiche = data.niches.reduce((a, b) => (a.low + a.high >= b.low + b.high ? a : b));
	$: nicheMid = (views / 1000) * ((niche.low + niche.high) / 2);
	$: altMid =
		format === 'shorts' ? nicheMid : (views / 1000) * ((topNiche.low + topNiche.high) / 2);
	$: gap = monthlyMid > 0 ? altMid / monthlyMid : 0;
	$: showGap = views > 0 && gap >= 1.5 && (format === 'shorts' || niche.slug !== topNiche.slug);

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

	$: tableRows = [
		...data.niches.map((n) => [
			n.name,
			`${fmtRpm(n.low)} to ${fmtRpm(n.high)}`,
			`${money(n.low * 1000)} to ${money(n.high * 1000)}`
		]),
		[
			'Shorts (any niche)',
			`$${SHORTS_RPM.low.toFixed(2)} to $${SHORTS_RPM.high.toFixed(2)}`,
			`${money(SHORTS_RPM.low * 1000)} to ${money(SHORTS_RPM.high * 1000)}`
		]
	];

	// Every country, not a slice: linking only the first ten left 33 pages
	// reachable from the sitemap alone, which is close to not being linked.
	const countryLinks = [
		...countries.map((c) => ({
			href: `/youtube-money-calculator-${c.slug}`,
			label: c.name
		})),
		{ href: '/twitch-money-calculator', label: 'Twitch calculator →', accent: true },
		{ href: '/tiktok-money-calculator', label: 'TikTok calculator →', accent: true }
	];
</script>

<SEOHead seo={data.seo} schemas={data.schemas} />

<div class="container">
	<CreatorHero
		title="YouTube Money Calculator"
		iconBg={CREATOR_ICONS.youtube.bg}
		iconPath={CREATOR_ICONS.youtube.path}
		subtitle="What your views actually pay: honest RPM math by niche, not influencer-course fantasy numbers"
	/>

	<div class="service-list">
		<MetricRow
			name="Monthly views"
			rateLine="{fmtRpm(rpmLow)} to {fmtRpm(rpmHigh)} per 1k views"
			bind:value={views}
			earning={views > 0 ? `$${fmtShort(monthlyMid)}` : null}
		/>
	</div>

	<div class="settings">
		<SettingSelect
			label="Channel niche"
			options={data.niches.map((n) => ({ value: n.slug, label: n.name }))}
			bind:value={nicheSlug}
		/>
		<SettingPills
			label="Format"
			options={[
				{ value: 'long', label: 'Long-form' },
				{ value: 'shorts', label: 'Shorts' }
			]}
			bind:value={format}
		/>
	</div>

	<ResultBlock
		label="Estimated Ad Revenue"
		value={monthlyMid}
		meta={[
			`${money(monthlyLow)} to ${money(monthlyHigh)} range`,
			`${fmtRpm(rpmLow)} to ${fmtRpm(rpmHigh)} RPM`,
			`≈${money(monthlyMid * 12)}/year`
		]}
		emptyMeta="Enter your monthly views above"
	/>

	{#if showGap}
		<p class="yt-callout">
			{#if format === 'shorts'}
				<strong>The same views long-form would pay {money(altMid)}.</strong>
				Shorts pay from a pooled feed, at pennies per thousand.
			{:else}
				<strong>The same views in {topNiche.name} would pay {money(altMid)}.</strong>
				Advertisers bid on who is watching, not how many.
			{/if}
		</p>
	{/if}

	<CrossPlatform {views} current={format === 'shorts' ? 'youtube-shorts' : 'youtube-long'} {nicheSlug} />

	<section class="creator-page-section creator-table-breakout" aria-labelledby="yt-rpm">
		<h2 id="yt-rpm" class="faq-title creator-page-section-title">YouTube RPM by niche (2026)</h2>
		<RateTable
			columns={['Niche', 'RPM range', '1M views pays']}
			rows={tableRows}
			footnote="RPM = what lands in the creator's pocket per 1,000 views, after YouTube's 45% ad-revenue cut. Ranges assume a majority-US audience. Estimates, not guarantees. Your Analytics RPM is the real number."
		/>
	</section>

	<ProseSection id="yt-why" title="Why the same views pay wildly different money">
		<p>
			YouTube doesn't pay for views. Advertisers do, and they bid on <em>who's watching</em>. A
			thousand people researching index funds are worth more to advertisers than a thousand people
			watching gameplay, which is the entire gap between a $2 RPM and a $30 RPM. Format matters just
			as much: Shorts monetize from a pooled feed model at pennies per thousand, which is why a
			viral Short with 5 million views can pay less than a long-form video with 50,000.
		</p>
		<p>
			Geography is the third lever: a US or Norwegian view pays several times an Indian or Filipino
			view, for the same reason your <a href="/streaming-royalty-rates">streaming royalties vary by country</a>.
			And remember ads are the floor, not the ceiling: established channels typically earn more from
			sponsorships, affiliates, and their own products than from AdSense. For the full breakdown of
			how the Partner Program pays, read <a href="/how-much-does-youtube-pay">how much YouTube actually pays</a>.
		</p>
	</ProseSection>

	<SponsorSlot slot="creator-inline" audience="creator" />

	<ChipRow id="yt-countries" title="YouTube earnings by audience country" links={countryLinks} />

	<FaqSection id="yt-faq" faqs={data.faqs} />
</div>

<style>
	.creator-page-section {
		margin-bottom: 32px;
	}

	.creator-page-section-title {
		margin-bottom: 12px;
	}

	/*
		Amber rather than the page accent: this is money the visitor is leaving on
		the table, not a result. Pulled up tight under the result block so it reads
		as a footnote to the figure rather than a new section.
	*/
	.yt-callout {
		margin: -14px 0 34px;
		padding: 12px 14px;
		border-radius: 12px;
		border: 0.5px solid rgba(251, 191, 36, 0.28);
		background: rgba(251, 191, 36, 0.06);
		font-size: 13.5px;
		line-height: 1.6;
		color: #a8a8a8;
		text-wrap: pretty;
	}

	.yt-callout strong {
		color: #fbbf24;
		font-weight: 600;
	}
</style>
