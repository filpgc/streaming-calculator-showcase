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
		<h1 class="text-2xl font-bold text-text">Contact</h1>
		<p class="text-sm text-text-secondary mt-2">Get in touch</p>
	</header>

	<div class="page-content">
		<p>
			Have a question, found a bug, or want to suggest a feature? We'd love to hear from you.
		</p>

		<div class="contact-method">
			<h2>Email</h2>
			<a href="mailto:thestreamingcalculator@gmail.com" class="contact-link">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6L12 13 2 6"/></svg>
				thestreamingcalculator@gmail.com
			</a>
		</div>

		<div class="contact-method">
			<h2>Instagram</h2>
			<a href="https://www.instagram.com/streamingcalculator/" target="_blank" rel="noopener" class="contact-link">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/></svg>
				@streamingcalculator
			</a>
		</div>

		<p class="response-note">We typically respond within 48 hours.</p>

		<h2>Support Us</h2>
		<p>If you find Streaming Calculator useful, you can support us through our affiliate partners at no extra cost to you.</p>
	</div>

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

	<!-- Plugin Boutique Banner -->
	<a
		href="https://www.pluginboutique.com/?a_aid=64d179a60ffc7"
		target="_blank"
		rel="noopener"
		class="affiliate-bottom"
	>
		<div class="affiliate-bottom-text">
			<span class="affiliate-bottom-title">50,000+ producers invested in their sound this year</span>
			<span class="affiliate-bottom-sub">Pro plugins & tools from $29</span>
		</div>
		<span class="affiliate-bottom-cta">See deals</span>
	</a>

	<p class="affiliate-disclosure">These are affiliate links. We earn a small commission at no cost to you.</p>

	<!-- Back link (mobile only) -->
	<div class="back-link-mobile" style="text-align: center; margin-top: 32px;">
		<a href="/" class="link">← Back to Calculator</a>
	</div>
</div>

<style>
	.contact-method {
		margin-bottom: 1.25rem;
	}

	.contact-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--accent);
		text-decoration: none;
		transition: opacity 0.15s;
	}

	.contact-link:hover {
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.response-note {
		color: var(--text-muted);
		font-size: 0.8125rem;
		margin-bottom: 0;
	}
</style>
