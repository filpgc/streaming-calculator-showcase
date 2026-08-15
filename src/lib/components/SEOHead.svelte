<script lang="ts">
	import { absoluteUrl, type SEOData } from '$lib/seo';

	export let seo: SEOData;
	export let schemas: object[] = [];

	// Absolute, because every social scraper drops a relative image URL.
	$: ogImage = seo.ogImage ? absoluteUrl(seo.ogImage) : undefined;
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	{#if seo.noindex}<meta name="robots" content="noindex, nofollow" />{/if}
	{#if seo.keywords}<meta name="keywords" content={seo.keywords} />{/if}
	{#if seo.canonical}<link rel="canonical" href={seo.canonical} />{/if}
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:type" content={seo.ogType || 'website'} />
	{#if seo.canonical}<meta property="og:url" content={seo.canonical} />{/if}
	{#if ogImage}<meta property="og:image" content={ogImage} />{/if}
	<meta name="twitter:card" content={seo.twitterCard || 'summary_large_image'} />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	{#if ogImage}<meta name="twitter:image" content={ogImage} />{/if}
	{#each schemas as schema}
		{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
	{/each}
</svelte:head>
