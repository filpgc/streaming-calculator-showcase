<script lang="ts">
	import type { PageData } from './$types';
	import { absoluteUrl } from '$lib/seo';

	export let data: PageData;

	// Absolute, or every social scraper renders a blank card.
	$: ogImage = absoluteUrl(data.seo.ogImage ?? '/og-image.png');

	const CONTACT = 'thestreamingcalculator@gmail.com';
	const mailto = `mailto:${CONTACT}?subject=${encodeURIComponent('Sponsorship inquiry: Streaming Calculator')}`;

	const stats = [
		{ value: '20k+', label: 'Peak monthly pageviews' },
		{ value: '40%', label: 'US audience' },
		{ value: '57%', label: 'Direct & returning' },
		{ value: '101', label: 'Countries' }
	];

	/*
		No rates on the page. Published numbers anchor every negotiation before it
		starts: $400 sat here while the homepage sponsor was being asked for more,
		and "from $350" sat here while the featured slot was quoted at nearly double
		to two distributors. Availability is still worth showing, so the only pill
		left is the reserved state.
	*/
	const slots = [
		{
			name: 'Homepage sponsor banner',
			reserved: true,
			desc: 'Premium banner above the main royalty calculator, the most-viewed placement on the site. One sponsor at a time, category exclusive.'
		},
		{
			name: 'Featured distributor placement',
			reserved: false,
			desc: 'The recommended-pick card at the top of the distributor cost calculator results, seen by artists at the exact moment they choose who distributes their music.'
		},
		{
			name: 'Sponsored review or launch article',
			reserved: false,
			desc: 'An in-depth article about your product with a permanent URL, one month pinned as the featured post on the blog and homepage, and inclusion in our RSS feed.'
		},
		{
			name: 'Custom package',
			reserved: false,
			desc: "A combination of the above, category exclusivity across the site, or something we haven't thought of yet."
		}
	];
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
	<header class="py-8 text-center">
		<h1 class="text-2xl font-bold text-text">Advertise on Streaming Calculator</h1>
		<p class="text-sm text-text-secondary mt-2">
			Reach independent artists at the exact moment they make money decisions
		</p>
	</header>

	<div class="pitch-stats">
		{#each stats as s}
			<div class="pitch-stat">
				<span class="pitch-stat-value">{s.value}</span>
				<span class="pitch-stat-label">{s.label}</span>
			</div>
		{/each}
	</div>

	<section class="pitch-intro">
		<p>
			Streaming Calculator isn't a news site people skim. It's a tool artists use when they're
			actively working out what their streams pay, which distributor to sign with, and where to
			spend their promotion budget. Your placement reaches them
			<strong>inside that decision</strong>, not next to unrelated content.
		</p>
		<p>
			Most of our traffic arrives direct: artists bookmark the calculator and come back to it.
			That returning, tier-one-heavy audience (US, UK, Germany, France) is why sponsors renew
			month after month.
		</p>
	</section>

	<section class="pitch-section" aria-labelledby="pitch-placements">
		<h2 id="pitch-placements" class="faq-title pitch-section-title">Placements</h2>
		<div class="pitch-slots">
			{#each slots as slot}
				<div class="pitch-slot">
					<div class="pitch-slot-top">
						<span class="pitch-slot-name">{slot.name}</span>
						{#if slot.reserved}
							<span class="pitch-slot-rate pitch-slot-rate-reserved">Reserved</span>
						{/if}
					</div>
					<p class="pitch-slot-desc">{slot.desc}</p>
					{#if slot.reserved}
						<p class="pitch-slot-note">Currently occupied. Email us to join the waitlist.</p>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<section class="pitch-section" aria-labelledby="pitch-standards">
		<h2 id="pitch-standards" class="faq-title pitch-section-title">Reporting &amp; standards</h2>
		<div class="pitch-standards">
			<div class="pitch-standard">
				<span class="pitch-standard-label">Real click reporting</span>
				<p>Every placement runs through tracked links. You get actual click numbers, not estimates.</p>
			</div>
			<div class="pitch-standard">
				<span class="pitch-standard-label">Clear disclosure</span>
				<p>Sponsored placements are labeled. Our audience trusts our math, and that trust is what you're renting.</p>
			</div>
			<div class="pitch-standard">
				<span class="pitch-standard-label">Audience fit only</span>
				<p>We only take sponsors relevant to independent artists: distribution, promotion, production tools, and music services.</p>
			</div>
		</div>
	</section>

	<section class="pitch-cta">
		<h2 class="pitch-cta-title">Get in touch</h2>
		<p class="pitch-cta-text">
			Tell us what you'd like to promote and we'll reply within two business days with
			rates, availability and current audience stats.
		</p>
		<a class="pitch-cta-btn" href={mailto}>
			{CONTACT}
			<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
				<path d="M3.5 8h9M9 4.5L12.5 8 9 11.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</a>
	</section>
</div>

<style>
	.pitch-stats {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;
		margin: 4px 0 28px;
	}

	@media (min-width: 640px) {
		.pitch-stats {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.pitch-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
		padding: 18px 8px 15px;
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 14px;
	}

	.pitch-stat-value {
		font-size: 24px;
		font-weight: 700;
		line-height: 1;
		color: var(--text);
		font-variant-numeric: tabular-nums;
	}

	.pitch-stat-label {
		font-size: 11px;
		color: var(--text-muted);
		text-align: center;
	}

	.pitch-intro {
		max-width: 560px;
		margin: 0 auto 36px;
	}

	.pitch-intro p {
		font-size: 14.5px;
		line-height: 1.7;
		color: var(--text-secondary, #a3a3a3);
		margin-bottom: 14px;
		text-wrap: pretty;
	}

	.pitch-intro strong {
		color: var(--text);
		font-weight: 600;
	}

	.pitch-section {
		margin-bottom: 36px;
	}

	.pitch-section-title {
		margin-bottom: 14px;
	}

	.pitch-slots {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.pitch-slot {
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 14px;
		padding: 16px 18px;
	}

	.pitch-slot-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		flex-wrap: wrap;
	}

	.pitch-slot-name {
		font-size: 15px;
		font-weight: 600;
		color: var(--text);
	}

	.pitch-slot-rate {
		font-size: 12px;
		font-weight: 600;
		white-space: nowrap;
		padding: 4px 10px;
		border-radius: 999px;
		background: rgba(51, 209, 122, 0.1);
		color: #5fd695;
		font-variant-numeric: tabular-nums;
	}

	.pitch-slot-rate-reserved {
		background: rgba(251, 191, 36, 0.09);
		color: #d4b254;
	}

	.pitch-slot-desc {
		font-size: 13.5px;
		line-height: 1.65;
		color: var(--text-secondary, #a3a3a3);
		margin-top: 8px;
		text-wrap: pretty;
	}

	.pitch-slot-note {
		font-size: 12px;
		color: var(--text-muted);
		margin-top: 6px;
	}

	.pitch-standards {
		display: grid;
		grid-template-columns: 1fr;
		gap: 10px;
	}

	@media (min-width: 640px) {
		.pitch-standards {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.pitch-standard {
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 14px;
		padding: 15px 16px;
	}

	.pitch-standard-label {
		display: block;
		font-size: 13px;
		font-weight: 600;
		color: var(--text);
		margin-bottom: 5px;
	}

	.pitch-standard p {
		font-size: 12.5px;
		line-height: 1.6;
		color: var(--text-muted);
		text-wrap: pretty;
	}

	.pitch-cta {
		text-align: center;
		padding: 28px 20px 12px;
		margin-bottom: 8px;
	}

	.pitch-cta-title {
		font-size: 18px;
		font-weight: 700;
		color: var(--text);
		margin-bottom: 8px;
	}

	.pitch-cta-text {
		font-size: 13.5px;
		line-height: 1.65;
		color: var(--text-secondary, #a3a3a3);
		max-width: 420px;
		margin: 0 auto 18px;
	}

	.pitch-cta-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		font-weight: 600;
		color: #0c1f14;
		background: #33d17a;
		border-radius: 999px;
		padding: 11px 22px;
		text-decoration: none;
		transition: filter 0.15s ease;
	}

	.pitch-cta-btn:hover {
		filter: brightness(1.08);
	}
</style>
