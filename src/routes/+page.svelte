<script lang="ts">
	import { streamingServices, platforms } from '../data';
	import {
		Header,
		StreamingService,
		RoyaltiesPercentage,
		CurrencySelector,
		Result,
		FAQ,
		ShareCard,
		ResultOffer
	} from '$lib/components';
	import { AUTHOR, absoluteUrl } from '$lib/seo';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';

	export let data: PageData;

	// Sponsor preview state. Boost Collective is the live paying sponsor and
	// renders by default below. If a `?sponsor=<key>` param is present, the
	// page is noindexed (preview URL) and future preview branches can render
	// in place of Boost. Read on the client only because the page is
	// prerendered (accessing $page.url.searchParams during SSR throws).
	let sponsorParam: string | null = null;

	const categoryColors: Record<string, { bg: string; text: string }> = {
		Guides: { bg: 'rgba(59, 130, 246, 0.07)', text: '#7db0e6' },
		Industry: { bg: 'rgba(168, 85, 247, 0.07)', text: '#b496d4' },
		Strategy: { bg: 'rgba(251, 191, 36, 0.07)', text: '#d4b254' },
		Producing: { bg: 'rgba(244, 63, 94, 0.07)', text: '#d08a96' }
	};

	let showAll = false;
	const initialServices = streamingServices.slice(0, 4);
	const additionalServices = streamingServices.slice(4);

	// Featured pin: a post pinned via featuredUntil gets a full-width card at
	// the top of the Latest Guides grid (same rule as the /blog featured
	// slot). Which post that is gets decided in +page.server.ts at build time.
	// Comparing the date here would make the browser reach a different
	// answer than the prerendered HTML and shift the page during hydration.
	$: featuredPost = data.featuredSlug
		? data.latestPosts.find((p) => p.slug === data.featuredSlug)
		: undefined;
	$: gridPosts = featuredPost
		? data.latestPosts.filter((p) => p !== featuredPost)
		: data.latestPosts.slice(0, 4);

	// Map service names to their calculator page URLs
	const platformHrefs: Record<string, string> = {};
	for (const p of Object.values(platforms)) {
		platformHrefs[p.name] = `/${p.slug}-calculator`;
	}

	// Absolute, or every social scraper renders a blank card.
	$: ogImage = absoluteUrl(data.seo.ogImage ?? '/og-image.png');

	onMount(() => {
		if (browser && typeof window !== 'undefined') {
			sponsorParam = new URL(window.location.href).searchParams.get('sponsor');
		}
	});
</script>

<svelte:head>
	{#if sponsorParam}
		<!-- Preview URLs for sponsor mockups should never get indexed. -->
		<meta name="robots" content="noindex, nofollow" />
	{/if}
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
		{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
	{/each}
</svelte:head>

<div class="container">
	<Header />

	<!--
		Sponsor placement. Boost Collective is the live paying sponsor (since
		2026-05-19) and renders by default below.

		To run a preview for a different prospect, wrap with sponsorParam:
		    {#if sponsorParam === 'their-key'}
		        <a href="/go/their-key" ...> ...preview banner... </a>
		    {:else}
		        <a href="/go/boost" ...> ...Boost banner... </a>
		    {/if}
	-->
	<a href="/go/boost" target="_blank" rel="noopener" class="sponsor-banner sponsor-banner-boost">
		<div class="sponsor-banner-top">
			<img src="/boost-collective-logo.png" alt="Boost Collective" class="sponsor-banner-logo-img sponsor-banner-logo-boost" />
			<span class="sponsor-banner-tag">Sponsored</span>
		</div>
		<div class="sponsor-banner-body">
			<div class="sponsor-banner-text">
				<div class="sponsor-banner-headline">Get your music on Spotify playlists</div>
				<div class="sponsor-banner-meta">Trusted by 100,000+ artists.</div>
			</div>
			<span class="sponsor-banner-cta sponsor-banner-cta-boost">
				50% OFF
				<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
					<path d="M3.5 8h9M9 4.5L12.5 8 9 11.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</span>
		</div>
	</a>

	<!-- Services -->
	<div class="service-list">
		{#each initialServices as s (s.name)}
			<StreamingService
				name={s.name}
				rate={s.rate}
				logo={s.logo}
				showDiscoveryMode={s.name === 'Spotify'}
				href={platformHrefs[s.name] || ''}
			/>
		{/each}

		{#if showAll}
			<!-- fly, not slide: slide animates height, so every frame of the
			     reveal forced a layout of the whole list while the extra rows
			     were still mounting. transform and opacity are composited. -->
			<div transition:fly={{ y: -6, duration: 180 }}>
				{#each additionalServices as s (s.name)}
					<StreamingService
						name={s.name}
						rate={s.rate}
						logo={s.logo}
						showDiscoveryMode={s.name === 'Spotify'}
						href={platformHrefs[s.name] || ''}
					/>
				{/each}
			</div>
		{/if}

		{#if additionalServices.length > 0}
			<button
				class="expand-btn"
				aria-expanded={showAll}
				on:click={() => (showAll = !showAll)}
			>
				{showAll ? 'Show less' : `Show ${additionalServices.length} more`}
				<svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="transition: transform 0.2s; transform: rotate({showAll ? 180 : 0}deg)">
					<path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
		{/if}
	</div>

	<!-- Settings -->
	<div class="settings">
		<RoyaltiesPercentage />
		<CurrencySelector />
	</div>

	<!-- Result -->
	<!--
		The offer under the number. This is the highest-intent moment on the
		site, the point where the visitor has just seen what their streams are
		actually worth, and it stayed empty while the hero banner above got all
		the attention.
		Nested inside Result rather than placed after it, so it sits directly
		beneath the figure instead of below the Share button.
		Boost's category is excluded so the sponsor who bought the hero never
		shares a page with a competitor.
	-->
	<Result>
		<ResultOffer exclude={['playlist-promo']} />
	</Result>

	<!-- Share Card -->
	<ShareCard />

	<!-- Latest from the blog -->
	<div class="home-blog-section">
		<div class="home-blog-header">
			<div class="faq-title">Latest Guides</div>
			<a href="/blog" class="home-blog-view-all">
				View all
				<svg width="14" height="14" viewBox="0 0 16 16" fill="none">
					<path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</a>
		</div>
		<div class="home-blog-grid">
			{#if featuredPost}
				<a href="/blog/{featuredPost.slug}" class="home-blog-card home-blog-card-featured">
					<div class="home-blog-card-top">
						<span
							class="home-blog-card-category"
							style="background: {categoryColors[featuredPost.category]?.bg}; color: {categoryColors[featuredPost.category]?.text};"
						>{featuredPost.category}</span>
						<span class="home-blog-card-featured-label">Featured</span>
					</div>
					<div class="home-blog-card-title home-blog-card-featured-title">{featuredPost.title}</div>
					<div class="home-blog-card-excerpt home-blog-card-featured-excerpt">{featuredPost.excerpt}</div>
					<div class="home-blog-card-readtime home-blog-card-featured-readtime">{featuredPost.readTime}</div>
				</a>
			{/if}
			{#each gridPosts as post}
				<a href="/blog/{post.slug}" class="home-blog-card">
					<div class="home-blog-card-top">
						<span
							class="home-blog-card-category"
							style="background: {categoryColors[post.category]?.bg}; color: {categoryColors[post.category]?.text};"
						>{post.category}</span>
						<span class="home-blog-card-readtime">{post.readTime}</span>
					</div>
					<div class="home-blog-card-title">{post.title}</div>
					<div class="home-blog-card-excerpt">{post.excerpt}</div>
				</a>
			{/each}
		</div>
	</div>

	<!-- More Tools -->
	<div class="home-tools-section">
		<div class="faq-title home-tools-title">More Tools</div>
		<div class="home-tools-grid">
			<a href="/distributor-calculator" class="home-tool-card">
				<div class="home-tool-card-mark home-tool-card-mark-distros" aria-hidden="true">
					<img src="/assets/images/distributors/distrokid.png" alt="" />
					<img src="/assets/images/distributors/tunecore.svg" alt="" />
					<img src="/assets/images/distributors/cdbaby.svg" alt="" />
				</div>
				<div class="home-tool-card-text">
					<div class="home-tool-card-title">Distributor Cost Calculator</div>
					<div class="home-tool-card-desc">Compare DistroKid, TuneCore, CD Baby &amp; more for your setup</div>
				</div>
			</a>
			<a href="/royalty-advance-calculator" class="home-tool-card">
				<div class="home-tool-card-mark home-tool-card-mark-advance" aria-hidden="true">
					<svg viewBox="0 0 32 32" fill="none">
						<rect x="3" y="8" width="26" height="17" rx="4" stroke="currentColor" stroke-width="1.5" opacity="0.45"/>
						<circle cx="16" cy="16.5" r="4.2" stroke="currentColor" stroke-width="1.5"/>
						<path d="M7.5 12.5v8M24.5 12.5v8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.75"/>
					</svg>
				</div>
				<div class="home-tool-card-text">
					<div class="home-tool-card-title">Royalty Advance Calculator</div>
					<div class="home-tool-card-desc">What your catalog is worth as cash, up front</div>
				</div>
			</a>
			<a href="/reverse-royalty-calculator" class="home-tool-card">
				<div class="home-tool-card-mark home-tool-card-mark-target" aria-hidden="true">
					<svg viewBox="0 0 32 32" fill="none">
						<circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="1.5" opacity="0.35"/>
						<circle cx="16" cy="16" r="9" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
						<circle cx="16" cy="16" r="4" fill="currentColor"/>
					</svg>
				</div>
				<div class="home-tool-card-text">
					<div class="home-tool-card-title">Reverse Calculator</div>
					<div class="home-tool-card-desc">Find out how many streams you need to hit your goal</div>
				</div>
			</a>
			<a href="/youtube-money-calculator" class="home-tool-card">
				<div class="home-tool-card-mark home-tool-card-mark-youtube" aria-hidden="true">
					<svg viewBox="0 0 34 34" fill="none">
						<rect width="34" height="34" rx="10" fill="#e0453a"/>
						<path d="M13.5 11.5v11l9-5.5-9-5.5z" fill="#fff"/>
					</svg>
				</div>
				<div class="home-tool-card-text">
					<div class="home-tool-card-title">YouTube Money Calculator</div>
					<div class="home-tool-card-desc">See what your views really pay, by niche and country</div>
				</div>
			</a>
			<a href="/tiktok-money-calculator" class="home-tool-card">
				<div class="home-tool-card-mark home-tool-card-mark-tiktok" aria-hidden="true">
					<!-- The note is drawn three times, offset, to get TikTok's
					     chromatic split without shipping a logo file. -->
					<svg viewBox="0 0 24 24">
						<defs>
							<path
								id="tiktok-note"
								d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"
							/>
						</defs>
						<use href="#tiktok-note" x="-1" y="-0.8" fill="#25f4ee" />
						<use href="#tiktok-note" x="1" y="0.8" fill="#fe2c55" />
						<use href="#tiktok-note" fill="#f5f5f5" />
					</svg>
				</div>
				<div class="home-tool-card-text">
					<div class="home-tool-card-title">TikTok Money Calculator</div>
					<div class="home-tool-card-desc">Work out what Creator Rewards views and LIVE gifts pay</div>
				</div>
			</a>
		</div>
	</div>

	<!-- FAQ -->
	<FAQ />

	<!-- Plugin Boutique affiliate hidden on homepage while Boost Collective
	     is the live paying sponsor. The affiliate still runs inside blog
	     articles (src/routes/blog/[slug]/+page.svelte). -->

	<!-- Author credit -->
	<p class="home-author-credit">By <a href="/about">{AUTHOR.name}</a></p>

</div>
