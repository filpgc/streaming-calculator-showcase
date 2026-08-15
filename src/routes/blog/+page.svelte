<script lang="ts">
	import { SEOHead } from '$lib/components';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;

	let activeFilter: string = 'All';

	const categories = ['All', 'Guides', 'Industry', 'Strategy', 'Producing'];

	const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
		Guides: { bg: 'rgba(59, 130, 246, 0.07)', text: '#7db0e6', dot: '#6898cc' },
		Industry: { bg: 'rgba(168, 85, 247, 0.07)', text: '#b496d4', dot: '#9a7aba' },
		Strategy: { bg: 'rgba(251, 191, 36, 0.07)', text: '#d4b254', dot: '#bfa045' },
		Producing: { bg: 'rgba(244, 63, 94, 0.07)', text: '#d08a96', dot: '#b5727e' }
	};

	// Which post is pinned is decided at build time in +page.server.ts, so
	// hydration always agrees with the prerendered HTML.
	$: pinned = data.pinnedSlug
		? filteredPosts.find((p) => p.slug === data.pinnedSlug)
		: undefined;
	$: featured = pinned ?? filteredPosts[0];
	$: rest = filteredPosts.filter((p) => p !== featured);
	$: filteredPosts =
		activeFilter === 'All'
			? data.posts
			: data.posts.filter((p) => p.category === activeFilter);

	function formatDate(dateStr: string) {
		const d = new Date(dateStr);
		return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}
</script>

<SEOHead seo={data.seo} schemas={[]} />

<div class="container-wide" style="padding-bottom: 2rem;">
	<div class="blog-header">
		<h1 class="blog-title">Blog & Guides</h1>
		<p class="blog-meta">Expert guides on streaming royalties, platform comparisons, and artist revenue strategies.</p>
	</div>

	<div class="blog-filters">
		{#each categories as cat}
			<button
				class="blog-filter-btn"
				class:active={activeFilter === cat}
				on:click={() => (activeFilter = cat)}
			>
				{#if cat !== 'All'}
					<span class="blog-filter-dot" style="background: {categoryColors[cat]?.dot}"></span>
				{/if}
				{cat}
			</button>
		{/each}
	</div>

	{#if featured}
		{#key featured.slug}
			<a href="/blog/{featured.slug}" class="blog-featured" in:fade={{ duration: 200 }}>
				<div class="blog-featured-inner">
					<div class="blog-featured-content">
						<span
							class="blog-card-category"
							style="background: {categoryColors[featured.category]?.bg}; color: {categoryColors[featured.category]?.text};"
						>{featured.category}</span>
						<h2 class="blog-featured-title">{featured.title}</h2>
						<p class="blog-featured-excerpt">{featured.excerpt}</p>
						<div class="blog-card-meta">
							{featured.readTime} &middot; {formatDate(featured.date)}
						</div>
					</div>
					<div class="blog-featured-aside">
						<span class="blog-featured-label">{pinned ? 'Featured' : 'Latest'}</span>
					</div>
				</div>
			</a>
		{/key}
	{/if}

	{#if rest.length > 0}
		<div class="blog-grid">
			{#each rest as post (post.slug)}
				<a
					href="/blog/{post.slug}"
					class="blog-card"
					animate:flip={{ duration: 300 }}
					in:fade={{ duration: 200 }}
				>
					<div class="blog-card-top">
						<span
							class="blog-card-category"
							style="background: {categoryColors[post.category]?.bg}; color: {categoryColors[post.category]?.text};"
						>{post.category}</span>
						<span class="blog-card-date">{formatDate(post.date)}</span>
					</div>
					<div class="blog-card-title">{post.title}</div>
					<div class="blog-card-excerpt">{post.excerpt}</div>
					<div class="blog-card-meta">{post.readTime}</div>
				</a>
			{/each}
		</div>
	{/if}


</div>
