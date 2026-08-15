<script lang="ts">
	import type { PageData } from './$types';
	import { absoluteUrl } from '$lib/seo';

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
	<header class="py-8 text-center">
		<h1 class="text-2xl font-bold text-text">About Streaming Calculator</h1>
		<p class="text-sm text-text-secondary mt-2">Independent streaming royalty data and tools for musicians</p>
	</header>

	<div class="page-content">
		<h2>About the Author</h2>
		<p>
			Streaming Calculator is written and maintained by <strong>Filippo Piggici</strong>, a music industry analyst who has tracked streaming economics, per-stream rates, and platform payout models since the early days of streaming royalties.
		</p>
		<p>
			Filippo's work focuses on making streaming royalty data transparent and accessible. Every article, calculator, and comparison on this site is researched, written, and fact-checked by Filippo to ensure independent artists have the data they need to make informed decisions about their music careers.
		</p>

		<h2>Our Data</h2>
		<p>
			Per-stream rates on Streaming Calculator are derived from multiple sources:
		</p>
		<ul>
			<li><strong>Distributor reports:</strong> Aggregated payout data from independent distributors including DistroKid, TuneCore, and CD Baby</li>
			<li><strong>Artist earnings disclosures:</strong> Publicly shared royalty statements from independent and signed artists</li>
			<li><strong>Industry publications:</strong> Reports from the RIAA, IFPI, Music Business Worldwide, and platform press releases</li>
			<li><strong>Platform documentation:</strong> Official rate disclosures from Spotify for Artists, Apple Music for Artists, and similar dashboards</li>
		</ul>
		<p>
			Rates are reviewed and updated at the start of each quarter. The current rates reflect data through January 2026. All figures are averages. Actual per-stream earnings vary based on listener geography, subscription tier, and monthly revenue fluctuations.
		</p>

		<h2>Editorial Standards</h2>
		<p>
			All content on Streaming Calculator is written independently. Our editorial process:
		</p>
		<ul>
			<li>Rate data is cross-referenced across at least three independent sources before publication</li>
			<li>Articles are updated when platform policies or rates change materially</li>
			<li>Affiliate partnerships (such as DistroKid) never influence our rate data, rankings, or editorial recommendations</li>
			<li>Comparisons present data objectively: we show the numbers and let artists draw their own conclusions</li>
		</ul>

		<h2>Affiliate Disclosure</h2>
		<p>
			Streaming Calculator participates in affiliate programs, including the DistroKid referral program. When you click an affiliate link and make a purchase, we may earn a small commission at no additional cost to you. This revenue supports the ongoing maintenance and development of our free calculators and guides. Affiliate relationships do not influence our data, rate estimates, or editorial content in any way.
		</p>

		<h2>How It Works</h2>
		<p>
			Enter your stream counts and we instantly estimate your earnings based on the latest publicly
			available per-stream rates. You can adjust your royalty split percentage, switch between currencies,
			and use the reverse calculator to find out how many streams you need to reach a specific income goal.
		</p>

		<h2>Important Disclaimer</h2>
		<p>
			The figures provided by Streaming Calculator are estimates only. Actual royalties depend on many
			factors including your distributor, territory, subscription type, and each platform's payout model.
			We are not affiliated with any streaming platform. Always refer to your distributor's dashboard
			for exact earnings.
		</p>

		<h2>Contact</h2>
		<p>
			Have a question or feedback? Reach out at
			<a href="mailto:thestreamingcalculator@gmail.com">thestreamingcalculator@gmail.com</a>
			or follow us on
			<a href="https://www.instagram.com/streamingcalculator/" target="_blank" rel="noopener">Instagram</a>.
		</p>
	</div>

	<!-- Back link (mobile only) -->
	<div class="back-link-mobile" style="text-align: center; margin-top: 32px;">
		<a href="/" class="link">&larr; Back to Calculator</a>
	</div>
</div>
