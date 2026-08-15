<script lang="ts">
	import { SEOHead } from '$lib/components';
	import InternalLinks from '$lib/components/InternalLinks.svelte';
	import { AUTHOR } from '$lib/seo';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const links = [
		{ href: '/', label: 'Main Calculator' },
		{ href: '/blog', label: 'All Articles' },
		{ href: '/spotify-calculator', label: 'Spotify Calculator' },
		{ href: '/apple-music-calculator', label: 'Apple Music Calculator' },
		{ href: '/tidal-calculator', label: 'Tidal Calculator' },
		{ href: '/how-many-streams-to-make-1000', label: 'Streams to make $1,000' }
	];

	const categoryColors: Record<string, { bg: string; text: string; border: string; soft: string }> = {
		Guides:    { bg: 'rgba(59, 130, 246, 0.07)',  text: '#7db0e6', border: 'rgba(59, 130, 246, 0.18)',  soft: 'rgba(125, 176, 230, 0.08)' },
		Industry:  { bg: 'rgba(168, 85, 247, 0.07)',  text: '#b496d4', border: 'rgba(168, 85, 247, 0.18)',  soft: 'rgba(180, 150, 212, 0.08)' },
		Strategy:  { bg: 'rgba(251, 191, 36, 0.07)',  text: '#d4b254', border: 'rgba(251, 191, 36, 0.18)',  soft: 'rgba(212, 178, 84, 0.08)' },
		Producing: { bg: 'rgba(244, 63, 94, 0.07)',   text: '#d08a96', border: 'rgba(244, 63, 94, 0.18)',   soft: 'rgba(208, 138, 150, 0.08)' }
	};

	$: catColor = categoryColors[data.post.category] || categoryColors.Guides;

	$: authorName = data.post.author || AUTHOR.name;
	$: authorInitial = (authorName || 'A').trim().charAt(0).toUpperCase();

	// Show Plugin Boutique on Producing category posts and select strategy posts
	const showPluginBoutique =
		data.post.category === 'Producing' ||
		['how-to-make-1000-from-streaming', 'independent-artist-streaming-revenue-guide'].includes(data.post.slug);

	// Show student discount banner on DistroKid-focused articles
	const showStudentBanner = [
		'distrokid-review-independent-artists',
		'distrokid-vs-tunecore-vs-cd-baby'
	].includes(data.post.slug);

	// Sponsored articles carry their sponsor's banner in the content itself;
	// suppress the house DistroKid banner so promos don't stack.
	const hideDistroBanner = ['boost-collective-music-ads-launch'].includes(data.post.slug);

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
	}

	let readProgress = 0;

	onMount(() => {
		const onScroll = () => {
			const el = document.querySelector('.blog-content');
			if (!el) return;
			const rect = el.getBoundingClientRect();
			const total = el.scrollHeight;
			const visible = window.innerHeight;
			const scrolled = -rect.top;
			readProgress = Math.min(100, Math.max(0, (scrolled / (total - visible)) * 100));
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<SEOHead seo={data.seo} schemas={data.schemas} />

<!-- Reading progress bar -->
<div class="blog-progress" style="--progress: {readProgress}%"></div>

<div class="container-wide">
	<a href="/blog" class="blog-back">
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
		All articles
	</a>

	<div
		class="blog-header"
		style="--cat-color: {catColor.text}; --cat-color-soft: {catColor.soft};"
	>
		<div class="blog-header-meta">
			<span
				class="blog-category"
				style="background: {catColor.bg}; color: {catColor.text}; border-color: {catColor.border};"
			>{data.post.category}</span>
			<span class="blog-header-dot"></span>
			<span class="blog-header-date">{formatDate(data.post.date)}</span>
		</div>
		<h1 class="blog-title">{data.post.title}</h1>
		<div class="blog-header-bottom">
			<span class="blog-author-avatar" aria-hidden="true">{authorInitial}</span>
			<span class="blog-header-author">By {authorName}</span>
			<span class="blog-header-dot"></span>
			<span class="blog-header-readtime">{data.post.readTime}</span>
		</div>
	</div>

	<div class="blog-content" style="--cat-color: {catColor.text};">
		{@html data.post.content}
	</div>

	<div class="blog-end-mark" style="--cat-color: {catColor.text};" aria-hidden="true">
		<span class="blog-end-mark-dot"></span>
	</div>

	<!-- DistroKid Banner -->
	{#if !hideDistroBanner}
		<a
			href="/go/distrokid"
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
	{/if}

	<!-- Student discount (DistroKid articles only) -->
	{#if showStudentBanner}
		<div class="student-banner">
			<div class="student-banner-text">
				<span class="student-banner-title"><span class="student-icon">🎓</span>Student or educator?<br/>Get <span class="student-highlight">50% off</span> DistroKid</span>
				<span class="student-banner-sub">Distribute unlimited music to every platform at half price with a valid student email.</span>
			</div>
			<a
				href="/go/distrokid-student"
				target="_blank"
				rel="noopener sponsored"
				class="student-banner-cta"
			>Claim 50% off</a>
		</div>
	{/if}

	<!-- Plugin Boutique Affiliate (strategy/production posts only) -->
	{#if showPluginBoutique}
		<a
			href="/go/plugin-boutique"
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
	{/if}
	{#if !hideDistroBanner || showStudentBanner || showPluginBoutique}
		<p class="affiliate-disclosure">This page contains affiliate links. We earn a small commission at no cost to you. This does not influence our data or editorial content.</p>
	{/if}

	<!-- About the Author -->
	<div class="author-box">
		<div class="author-box-label">About the Author</div>
		<div class="author-box-name">{data.post.author || AUTHOR.name}</div>
		<div class="author-box-role">{AUTHOR.jobTitle}</div>
		<p class="author-box-bio">{AUTHOR.bio}</p>
	</div>

	<InternalLinks {links} title="Related Calculators" />

</div>
