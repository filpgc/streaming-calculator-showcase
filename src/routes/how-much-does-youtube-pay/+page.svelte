<script lang="ts">
	import type { PageData } from './$types';
	import { SEOHead } from '$lib/components';
	import { RateTable } from '$lib/components/creator';
	import { fmtRpm, SHORTS_RPM } from '$lib/data/youtube';

	export let data: PageData;
</script>

<SEOHead seo={data.seo} schemas={data.schemas} />

<div class="container">
	<header class="hyp-hero">
		<h1 class="hyp-title">How Much Does YouTube Pay?</h1>
		<p class="hyp-sub">The 2026 numbers: per view, per thousand, per million, without the influencer-course inflation</p>
	</header>

	<div class="hyp-stats">
		<div class="hyp-stat"><span class="hyp-stat-value">55%</span><span class="hyp-stat-label">Your share of long-form ad revenue</span></div>
		<div class="hyp-stat"><span class="hyp-stat-value">$1.5 to $35</span><span class="hyp-stat-label">Typical RPM range per 1,000 views (US)</span></div>
		<div class="hyp-stat"><span class="hyp-stat-value">$0.05 to $0.18</span><span class="hyp-stat-label">Per 1,000 Shorts views</span></div>
	</div>

	<div class="hyp-content">
		<h2>The short answer</h2>
		<p>
			YouTube pays creators <strong>55% of the ad revenue</strong> their long-form videos generate,
			which works out to roughly <strong>$1.50 to $35 per 1,000 views</strong> for a US audience
			depending on niche. There is no fixed per-view rate: advertisers bid to reach your specific
			viewers, so the same million views pays a gaming channel around $2,000 to $4,000 and a personal
			finance channel $12,000 to $35,000. Estimate your own channel with our
			<a href="/youtube-money-calculator">YouTube money calculator</a>.
		</p>

		<h2>RPM: the only number that matters</h2>
		<p>
			Creators measure earnings in <strong>RPM, revenue per 1,000 views</strong>, which is what
			lands in your pocket after YouTube's 45% cut. Don't confuse it with CPM, the advertiser-side
			price you'll see quoted in bigger numbers: CPM is what advertisers pay per 1,000 <em>ad
			impressions</em>, before YouTube's share, and not every view shows an ad. Your real RPM in
			YouTube Analytics is always lower than your CPM, and that's normal.
		</p>
		<p>Three things drive RPM more than anything else:</p>
		<ul>
			<li><strong>Niche.</strong> Advertisers pay for buying intent. Finance, business, and tech viewers are researching purchases; entertainment viewers are passing time.</li>
			<li><strong>Audience geography.</strong> A US or Swiss view is worth several times an Indian or Filipino view. See our <a href="/youtube-money-calculator-united-states">per-country YouTube pages</a>.</li>
			<li><strong>Seasonality.</strong> Ad budgets peak in Q4 and reset in January, and most channels see RPM swing 30 to 50% across the year.</li>
		</ul>

		<h2>What Shorts actually pay</h2>
		<p>
			Shorts monetize from a pooled feed model: ad revenue from the whole Shorts feed is collected,
			music licensing costs come off the top, and creators get <strong>45% of their view-weighted
			share</strong>. In practice that's <strong>{fmtRpm(SHORTS_RPM.low)} to {fmtRpm(SHORTS_RPM.high)} per
			1,000 views</strong>. A viral Short with 10 million views typically pays $500 to $1,800. Shorts
			are an audience machine, not a revenue machine; the money comes when Shorts viewers convert to
			long-form watchers.
		</p>

		<h2>Getting paid: the requirements</h2>
		<p>
			To earn ad revenue you need the <strong>YouTube Partner Program</strong>: 1,000 subscribers
			plus either 4,000 public watch hours in the past 12 months or 10 million Shorts views in the
			past 90 days. Revenue pays out through AdSense monthly once you cross $100. Below those
			thresholds, a smaller "fan funding" tier (500 subscribers) unlocks memberships and Supers, but
			not ad revenue sharing.
		</p>

		<h2>The part the calculators can't show</h2>
		<p>
			Ads are the floor of creator income, not the ceiling. Established channels routinely earn more
			from sponsorships, affiliate revenue, and their own products than from AdSense. A mid-size
			channel might make $2,000/month from ads and $8,000 from everything else. Treat the numbers on
			this page as your predictable baseline that scales automatically with views, and everything
			else as the upside you negotiate.
		</p>
	</div>

	<section class="hyp-section" aria-labelledby="hyp-table">
		<h2 id="hyp-table" class="faq-title hyp-section-title">RPM by niche (US audience, 2026)</h2>
		<RateTable
			columns={['Niche', 'RPM', 'Why']}
			rows={data.niches.map((n) => [n.name, `${fmtRpm(n.low)} to ${fmtRpm(n.high)}`, n.note])}
		/>
	</section>

	<section class="hyp-section" aria-labelledby="hyp-faq">
		<h2 id="hyp-faq" class="faq-title hyp-section-title">Frequently asked questions</h2>
		<div class="hyp-faqs">
			{#each data.faqs as faq}
				<div class="hyp-faq">
					<h3>{faq.heading}</h3>
					<p>{faq.body}</p>
				</div>
			{/each}
		</div>
	</section>
</div>

<style>
	.hyp-hero {
		text-align: center;
		padding: 28px 4px 20px;
	}

	.hyp-title {
		font-size: 25px;
		font-weight: 800;
		line-height: 1.15;
		letter-spacing: -0.02em;
		color: var(--text);
		text-wrap: balance;
	}

	@media (min-width: 400px) {
		.hyp-title {
			font-size: 28px;
		}
	}

	.hyp-sub {
		font-size: 14px;
		line-height: 1.45;
		color: var(--text-secondary, #a3a3a3);
		margin-top: 10px;
		max-width: 520px;
		margin-left: auto;
		margin-right: auto;
		text-wrap: pretty;
	}

	.hyp-stats {
		display: grid;
		grid-template-columns: 1fr;
		gap: 10px;
		margin: 4px 0 28px;
	}

	@media (min-width: 640px) {
		.hyp-stats {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.hyp-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		padding: 18px 14px 15px;
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 14px;
		text-align: center;
	}

	.hyp-stat-value {
		font-size: 24px;
		font-weight: 700;
		line-height: 1;
		color: var(--text);
		font-variant-numeric: tabular-nums;
	}

	.hyp-stat-label {
		font-size: 11.5px;
		line-height: 1.45;
		color: var(--text-muted);
		max-width: 210px;
	}

	.hyp-content {
		max-width: 640px;
		margin-bottom: 32px;
	}

	.hyp-content h2 {
		font-size: 18px;
		font-weight: 700;
		color: var(--text);
		margin: 24px 0 10px;
	}

	.hyp-content h2:first-child {
		margin-top: 0;
	}

	.hyp-content p {
		font-size: 14px;
		line-height: 1.7;
		color: var(--text-secondary, #a3a3a3);
		margin-bottom: 12px;
		text-wrap: pretty;
	}

	.hyp-content ul {
		padding-left: 20px;
		list-style: disc;
		margin-bottom: 12px;
	}

	.hyp-content li {
		font-size: 14px;
		line-height: 1.7;
		color: var(--text-secondary, #a3a3a3);
		margin-bottom: 6px;
	}

	.hyp-content strong {
		color: var(--text);
		font-weight: 600;
	}

	.hyp-content a {
		color: #5fd695;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.hyp-section {
		margin-bottom: 32px;
	}

	.hyp-section-title {
		margin-bottom: 12px;
	}

	.hyp-faqs {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.hyp-faq {
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 14px;
		padding: 15px 18px;
	}

	.hyp-faq h3 {
		font-size: 14px;
		font-weight: 600;
		color: var(--text);
		margin-bottom: 6px;
		text-wrap: pretty;
	}

	.hyp-faq p {
		font-size: 13px;
		line-height: 1.65;
		color: var(--text-secondary, #a3a3a3);
		text-wrap: pretty;
	}
</style>
