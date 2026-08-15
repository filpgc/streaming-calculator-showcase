<script lang="ts">
	import type { PageData } from './$types';
	import { absoluteUrl } from '$lib/seo';
	import { formatRate } from '$lib/data/countries';
	import { SponsorSlot } from '$lib/components';

	export let data: PageData;

	// Absolute, or every social scraper renders a blank card.
	$: ogImage = absoluteUrl(data.seo.ogImage ?? '/og-image.png');

	let streams = 100000;

	$: country = data.country;
	$: rates = data.rates;

	function earnings(avg: number, n: number): string {
		const v = avg * (Number.isFinite(n) ? Math.max(0, n) : 0);
		return v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
	}
</script>

<svelte:head>
	<title>{data.seo.title}</title>
	<meta name="description" content={data.seo.description} />
	<meta name="keywords" content={data.seo.keywords} />
	<link rel="canonical" href={data.seo.canonical} />
	<meta property="og:title" content={data.seo.title} />
	<meta property="og:description" content={data.seo.description} />
	<meta property="og:type" content={data.seo.ogType} />
	<meta property="og:url" content={data.seo.canonical} />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content={data.seo.twitterCard} />
	<meta name="twitter:title" content={data.seo.title} />
	<meta name="twitter:description" content={data.seo.description} />
	<meta name="twitter:image" content={ogImage} />
	{#each data.schemas as schema}
		{@html `<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`}
	{/each}
</svelte:head>

<div class="container">
	<header class="cr-hero">
		<h1 class="cr-title">Streaming Royalty Rates {country.inName}</h1>
		<p class="cr-sub">
			Estimated per-stream payouts {country.inName} for 2026, and what your streams there are worth
		</p>
		<span class="cr-tier cr-tier-{country.tier}">{data.tier.label}</span>
	</header>

	<section class="cr-note">
		<p>{country.note}</p>
	</section>

	<section class="cr-section" aria-labelledby="cr-rates">
		<h2 id="cr-rates" class="faq-title cr-section-title">Per-stream rates {country.inName}</h2>
		<div class="cr-table-wrap">
			<table class="cr-table">
				<thead>
					<tr>
						<th>Platform</th>
						<th>Estimated rate</th>
						<th>Typical</th>
					</tr>
				</thead>
				<tbody>
					{#each rates as r (r.slug)}
						<tr>
							<td>
								<a href="/{r.slug}-calculator" class="cr-platform">
									<img src={r.logo} alt="" loading="lazy" />
									{r.name}
								</a>
							</td>
							<td class="cr-range">{formatRate(r.low)} to {formatRate(r.high)}</td>
							<td class="cr-avg">{formatRate(r.avg)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="cr-disclaimer">
			Estimates derived from global platform averages adjusted for {country.name}'s subscription
			pricing and premium/free listener mix. Actual payouts vary monthly, so check your distributor
			statement for real figures.
		</p>
	</section>

	<section class="cr-section" aria-labelledby="cr-calc">
		<h2 id="cr-calc" class="faq-title cr-section-title">What would your streams {country.inName} earn?</h2>
		<div class="cr-calc-card">
			<label class="cr-calc-label" for="cr-streams">Monthly streams {country.inName}</label>
			<input
				id="cr-streams"
				class="cr-input"
				type="number"
				min="0"
				step="1000"
				bind:value={streams}
			/>
			<div class="cr-results">
				{#each rates as r (r.slug)}
					<div class="cr-result-row">
						<span class="cr-result-name">
							<img src={r.logo} alt="" loading="lazy" />
							{r.name}
						</span>
						<span class="cr-result-value">{earnings(r.avg, streams)}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<SponsorSlot slot="music-inline" />

	<section class="cr-section cr-editorial">
		<h2 class="faq-title cr-section-title">Why {country.name} rates are what they are</h2>
		<p>
			No streaming platform pays a fixed global rate. Each service pools the subscription and
			advertising revenue it earns in a market, then splits that pool across all streams played
			there. {country.name} is a {data.tier.label.toLowerCase()}: {data.tier.blurb.toLowerCase()}
		</p>
		<p>
			For artists, the takeaway isn't to chase high-rate countries. It's to know what your
			audience is worth. A fanbase {country.inName} pays differently than the same play counts
			elsewhere, which changes what a realistic revenue goal looks like. Run your own numbers in
			our <a href="/">streaming royalty calculator</a>, see
			<a href="/blog/how-listener-country-affects-streaming-royalties">how listener country changes your payouts</a>,
			or compare rates in other markets below.
		</p>
	</section>

	<section class="cr-section" aria-labelledby="cr-faq">
		<h2 id="cr-faq" class="faq-title cr-section-title">Frequently asked questions</h2>
		<div class="cr-faqs">
			{#each data.faqs as faq}
				<div class="cr-faq">
					<h3>{faq.heading}</h3>
					<p>{faq.body}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="cr-section" aria-labelledby="cr-related">
		<h2 id="cr-related" class="faq-title cr-section-title">Rates in other countries</h2>
		<div class="cr-related">
			{#each data.related as rc (rc.slug)}
				<a class="cr-chip" href="/streaming-royalty-rates-{rc.slug}">{rc.name}</a>
			{/each}
			<a class="cr-chip cr-chip-all" href="/streaming-royalty-rates">All countries →</a>
		</div>
	</section>
</div>

<style>
	.cr-hero {
		text-align: center;
		padding: 32px 8px 20px;
	}

	.cr-title {
		font-size: 26px;
		font-weight: 800;
		color: var(--text);
		text-wrap: balance;
	}

	@media (min-width: 640px) {
		.cr-title {
			font-size: 30px;
		}
	}

	.cr-sub {
		font-size: 14px;
		color: var(--text-secondary, #a3a3a3);
		margin-top: 8px;
		text-wrap: pretty;
	}

	.cr-tier {
		display: inline-block;
		margin-top: 12px;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 4px 12px;
		border-radius: 999px;
	}

	.cr-tier-1 { background: rgba(51, 209, 122, 0.1); color: #5fd695; }
	.cr-tier-2 { background: rgba(59, 130, 246, 0.1); color: #7db0e6; }
	.cr-tier-3 { background: rgba(251, 191, 36, 0.09); color: #d4b254; }
	.cr-tier-4 { background: rgba(244, 63, 94, 0.08); color: #d08a96; }

	.cr-note {
		max-width: 620px;
		margin: 0 auto 32px;
	}

	.cr-note p {
		font-size: 14.5px;
		line-height: 1.7;
		color: var(--text-secondary, #a3a3a3);
		text-wrap: pretty;
	}

	.cr-section {
		margin-bottom: 34px;
	}

	.cr-section-title {
		margin-bottom: 12px;
	}

	.cr-table-wrap {
		overflow-x: auto;
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 14px;
	}

	.cr-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13.5px;
	}

	.cr-table th {
		text-align: left;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--text-muted);
		padding: 12px 16px;
		border-bottom: 0.5px solid var(--border);
	}

	.cr-table td {
		padding: 11px 16px;
		border-bottom: 0.5px solid var(--border);
		color: var(--text-secondary, #a3a3a3);
	}

	.cr-table tr:last-child td {
		border-bottom: none;
	}

	.cr-platform {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		color: var(--text);
		font-weight: 600;
		text-decoration: none;
	}

	.cr-platform:hover {
		text-decoration: underline;
	}

	.cr-platform img {
		width: 18px;
		height: 18px;
		object-fit: contain;
	}

	.cr-range {
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
	}

	.cr-avg {
		font-weight: 600;
		color: #5fd695;
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
	}

	.cr-disclaimer {
		font-size: 11.5px;
		line-height: 1.6;
		color: var(--text-muted);
		margin-top: 10px;
		text-wrap: pretty;
	}

	.cr-calc-card {
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 14px;
		padding: 18px;
	}

	.cr-calc-label {
		display: block;
		font-size: 12px;
		font-weight: 600;
		color: var(--text-muted);
		margin-bottom: 8px;
	}

	.cr-input {
		width: 100%;
		background: hsl(0, 0%, 8%);
		border: 0.5px solid var(--border);
		border-radius: 10px;
		padding: 11px 14px;
		font-size: 15px;
		color: var(--text);
		outline: none;
		font-variant-numeric: tabular-nums;
	}

	.cr-input:focus {
		border-color: #33d17a;
	}

	.cr-results {
		margin-top: 14px;
		display: flex;
		flex-direction: column;
	}

	.cr-result-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 9px 2px;
		border-bottom: 0.5px solid var(--border);
	}

	.cr-result-row:last-child {
		border-bottom: none;
	}

	.cr-result-name {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		font-size: 13.5px;
		font-weight: 500;
		color: var(--text);
	}

	.cr-result-name img {
		width: 16px;
		height: 16px;
		object-fit: contain;
	}

	.cr-result-value {
		font-size: 13.5px;
		font-weight: 600;
		color: #5fd695;
		font-variant-numeric: tabular-nums;
	}

	.cr-editorial p {
		font-size: 14px;
		line-height: 1.7;
		color: var(--text-secondary, #a3a3a3);
		margin-bottom: 12px;
		max-width: 640px;
		text-wrap: pretty;
	}

	.cr-editorial a {
		color: #5fd695;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.cr-faqs {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.cr-faq {
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 14px;
		padding: 15px 18px;
	}

	.cr-faq h3 {
		font-size: 14px;
		font-weight: 600;
		color: var(--text);
		margin-bottom: 6px;
		text-wrap: pretty;
	}

	.cr-faq p {
		font-size: 13px;
		line-height: 1.65;
		color: var(--text-secondary, #a3a3a3);
		text-wrap: pretty;
	}

	.cr-related {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.cr-chip {
		font-size: 12.5px;
		font-weight: 500;
		color: var(--text-secondary, #a3a3a3);
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 999px;
		padding: 6px 14px;
		text-decoration: none;
		transition: border-color 0.15s ease, color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
	}

	/* RAISE */
	.cr-chip:hover {
		color: var(--text);
		border-color: var(--hover-edge);
		transform: translateY(-1px);
		box-shadow: var(--hover-shadow);
	}

	.cr-chip-all {
		color: #5fd695;
	}
</style>
