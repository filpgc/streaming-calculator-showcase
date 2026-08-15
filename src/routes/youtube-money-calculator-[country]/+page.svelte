<script lang="ts">
	import type { PageData } from './$types';
	import { SEOHead, SponsorSlot } from '$lib/components';
	import {
		MetricRow,
		SettingSelect,
		ResultBlock,
		RateTable,
		FaqSection,
		ChipRow,
		ProseSection,
		CreatorHero,
		CREATOR_ICONS
	} from '$lib/components/creator';
	import { fmtRpm } from '$lib/data/youtube';

	export let data: PageData;

	let views = 0;
	let nicheSlug = 'entertainment';

	$: country = data.country;
	$: row = data.rows.find((r) => r.slug === nicheSlug) ?? data.rows[0];
	$: monthlyLow = (views / 1000) * row.low;
	$: monthlyHigh = (views / 1000) * row.high;
	$: monthlyMid = (monthlyLow + monthlyHigh) / 2;

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

	$: tableRows = data.rows.map((r) => [
		r.name,
		`${fmtRpm(r.low)} to ${fmtRpm(r.high)}`,
		`${money(r.low * 1000)} to ${money(r.high * 1000)}`
	]);

	$: relatedLinks = [
		...data.related.map((rc) => ({
			href: `/youtube-money-calculator-${rc.slug}`,
			label: rc.name
		})),
		{ href: '/youtube-money-calculator', label: 'Main calculator →', accent: true }
	];
</script>

<SEOHead seo={data.seo} schemas={data.schemas} />

<div class="container">
	<CreatorHero
		title="YouTube Money Calculator: {country.name} Audience"
		iconBg={CREATOR_ICONS.youtube.bg}
		iconPath={CREATOR_ICONS.youtube.path}
		subtitle="What views {country.inName} actually pay in 2026, with estimated RPM by niche"
		badge="{data.tier.label} for advertisers"
		badgeTier={country.tier}
	/>

	<ProseSection id="ytc-context" title="How {country.name} views are priced">
		<p>
			YouTube pays creators from advertiser spending, and advertisers price every country
			differently. {country.name} is a {data.tier.label.toLowerCase()}:
			{data.tier.blurb.toLowerCase()} Your real RPM blends every country in your audience; the
			rates below describe what views <em>{country.inName}</em> contribute to that blend.
		</p>
	</ProseSection>

	<div class="service-list">
		<MetricRow
			name="Views {country.inName}"
			rateLine="{fmtRpm(row.low)} to {fmtRpm(row.high)} per 1,000 views"
			iconBg={CREATOR_ICONS.youtube.bg}
			iconPath={CREATOR_ICONS.youtube.path}
			bind:value={views}
			earning={views > 0 ? `$${fmtShort(monthlyMid)}` : null}
		/>
	</div>

	<div class="settings">
		<SettingSelect
			label="Channel niche"
			options={data.rows.map((r) => ({ value: r.slug, label: r.name }))}
			bind:value={nicheSlug}
		/>
	</div>

	<ResultBlock
		label="Estimated Ad Revenue"
		value={monthlyMid}
		meta="{money(monthlyLow)} to {money(monthlyHigh)} range at {fmtRpm(row.low)} to {fmtRpm(row.high)} RPM · Shorts pay {fmtRpm(data.shorts.low)} to {fmtRpm(data.shorts.high)} per 1,000"
		emptyMeta="Enter your monthly views {country.inName} above"
	/>

	<section class="creator-page-section creator-table-breakout" aria-labelledby="ytc-rpm">
		<h2 id="ytc-rpm" class="faq-title creator-page-section-title">
			Estimated RPM by niche {country.inName}
		</h2>
		<RateTable
			columns={['Niche', `RPM ${country.inName}`, '1M views pays']}
			rows={tableRows}
			footnote="Estimates: US-audience niche RPMs scaled by {country.name}'s advertising-market tier. Your YouTube Analytics RPM is the real number for your channel."
		/>
	</section>

	<SponsorSlot slot="creator-inline" audience="creator" />

	<FaqSection id="ytc-faq" faqs={data.faqs} />

	<ChipRow id="ytc-related" title="YouTube rates in other countries" links={relatedLinks} />
</div>

<style>
	.creator-page-section {
		margin-bottom: 32px;
	}

	.creator-page-section-title {
		margin-bottom: 12px;
	}
</style>
