<script lang="ts">
	import type { PageData } from './$types';
	import { absoluteUrl } from '$lib/seo';
	import { formatRate } from '$lib/data/countries';

	export let data: PageData;

	// Absolute, or every social scraper renders a blank card.
	$: ogImage = absoluteUrl(data.seo.ogImage ?? '/og-image.png');
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
</svelte:head>

<div class="container">
	<header class="crh-hero">
		<h1 class="crh-title">Streaming Royalty Rates by Country</h1>
		<p class="crh-sub">
			The same stream pays wildly different amounts depending on where the listener lives. Pick a
			country to see estimated per-stream rates for every major platform, plus a local earnings
			calculator.
		</p>
	</header>

	{#each data.tiers as t (t.tier)}
		<section class="crh-tier">
			<div class="crh-tier-head">
				<h2 class="crh-tier-label crh-tier-label-{t.tier}">{t.info.label}s</h2>
				<p class="crh-tier-blurb">{t.info.blurb}</p>
			</div>
			<div class="crh-grid">
				{#each t.countries as c (c.slug)}
					<a class="crh-card" href="/streaming-royalty-rates-{c.slug}">
						<span class="crh-card-name">{c.name}</span>
						<span class="crh-card-rate">Spotify ≈ {formatRate(c.spotifyAvg)}</span>
					</a>
				{/each}
			</div>
		</section>
	{/each}

	<p class="crh-footnote">
		Rates are editorial estimates based on local subscription pricing and premium/free listener
		mix. Read <a href="/blog/how-listener-country-affects-streaming-royalties">how listener
		country affects streaming royalties</a> for the full methodology.
	</p>
</div>

<style>
	.crh-hero {
		text-align: center;
		padding: 32px 8px 24px;
		max-width: 620px;
		margin: 0 auto;
	}

	.crh-title {
		font-size: 27px;
		font-weight: 800;
		color: var(--text);
		text-wrap: balance;
	}

	.crh-sub {
		font-size: 14px;
		line-height: 1.7;
		color: var(--text-secondary, #a3a3a3);
		margin-top: 10px;
		text-wrap: pretty;
	}

	.crh-tier {
		margin-bottom: 30px;
	}

	.crh-tier-head {
		margin-bottom: 12px;
	}

	.crh-tier-label {
		display: inline-block;
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 4px 12px;
		border-radius: 999px;
		margin-bottom: 6px;
	}

	.crh-tier-label-1 { background: rgba(51, 209, 122, 0.1); color: #5fd695; }
	.crh-tier-label-2 { background: rgba(59, 130, 246, 0.1); color: #7db0e6; }
	.crh-tier-label-3 { background: rgba(251, 191, 36, 0.09); color: #d4b254; }
	.crh-tier-label-4 { background: rgba(244, 63, 94, 0.08); color: #d08a96; }

	.crh-tier-blurb {
		font-size: 12.5px;
		color: var(--text-muted);
		text-wrap: pretty;
	}

	.crh-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 8px;
	}

	@media (min-width: 640px) {
		.crh-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.crh-card {
		display: flex;
		flex-direction: column;
		gap: 3px;
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 12px;
		padding: 12px 14px;
		text-decoration: none;
		transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
	}

	/* RAISE */
	.crh-card:hover {
		border-color: var(--hover-edge);
		transform: translateY(-1px);
		box-shadow: var(--hover-shadow);
	}

	.crh-card-name {
		font-size: 13.5px;
		font-weight: 600;
		color: var(--text);
	}

	.crh-card-rate {
		font-size: 11.5px;
		color: var(--text-muted);
		font-variant-numeric: tabular-nums;
	}

	.crh-footnote {
		font-size: 12px;
		line-height: 1.6;
		color: var(--text-muted);
		margin: 6px 0 20px;
		text-wrap: pretty;
	}

	.crh-footnote a {
		color: #5fd695;
		text-decoration: underline;
		text-underline-offset: 2px;
	}
</style>
