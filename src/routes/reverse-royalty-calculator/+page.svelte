<script lang="ts">
	import { Header, ReverseWidget } from '$lib/components';
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
	{@html `<script type="application/ld+json">${JSON.stringify(data.schema)}</script>`}
</svelte:head>

<div class="container">
	<Header title="Reverse Calculator" subtitle="See how many streams you need to reach your goal" />

	<!-- Calculator -->
	<ReverseWidget />

	<!-- DistroKid Banner -->
	<a
		href="https://distrokid.com/vip/seven/3063815"
		target="_blank"
		rel="noopener sponsored"
		class="distro-banner"
	>
		<div class="distro-banner-content">
			<div class="distro-banner-headline">Keep <span class="distro-highlight">100%</span> of Your Royalties</div>
			<div class="distro-banner-sub">Get your music on Spotify, Apple Music & 150+ stores with <strong>DistroKid</strong></div>
		</div>
		<span class="distro-banner-cta">Claim 7% off</span>
	</a>

	<!-- Back link (mobile only) -->
	<div class="back-link-mobile" style="text-align: center; margin-top: 32px;">
		<a href="/" class="link">← Back to Calculator</a>
	</div>

</div>
