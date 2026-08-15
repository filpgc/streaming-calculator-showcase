<script lang="ts">
	import type { PlatformData } from '../../data';
	import type { EditorialSection } from '$lib/data/editorial';
	import { platforms, comparisonPairs, goalAmounts, calcStreamsNeeded, earningsMilestones } from '../../data';
	import { StreamingService, RoyaltiesPercentage, CurrencySelector, Result, ReverseWidget } from '$lib/components';
	import InternalLinks from './InternalLinks.svelte';
	import SponsorSlot from './SponsorSlot.svelte';
	import { slide } from 'svelte/transition';

	export let platform: PlatformData;
	export let editorial: EditorialSection[] = [];

	let faqOpen: number | null = null;

	// Build internal links
	const relatedComparisons = comparisonPairs
		.filter(([a, b]) => a === platform.slug || b === platform.slug)
		.map(([a, b]) => ({
			href: `/${a}-vs-${b}`,
			label: `${platforms[a].name} vs ${platforms[b].name}`
		}));

	const goalLinks = goalAmounts.map((g) => ({
		href: `/how-many-streams-to-make-${g.amount}`,
		label: `Streams to make ${g.label}`
	}));

	$: allLinks = [
		{ href: '/', label: 'Main Calculator' },
		{ href: '/distributor-calculator', label: 'Distributor Cost Calculator' },
		{ href: '/blog', label: 'Blog & Guides' },
		...relatedComparisons,
		...goalLinks
	];

	// Earnings milestones for this platform
	const milestoneData = earningsMilestones.map((streams) => ({
		streams: streams.toLocaleString(),
		earnings: (streams * platform.rate).toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		})
	}));

	const streamsFor1000 = calcStreamsNeeded(platform.rate, 1000).toLocaleString();
</script>

<div class="container">
	<!-- Platform Header -->
	<div class="platform-header">
		<div class="platform-header-icon">
			<img src={platform.logo} alt="{platform.name} logo" />
		</div>
		<h1 class="platform-header-title">{platform.name} Royalty Calculator 2026</h1>
		<p class="platform-header-sub">{platform.description}</p>
	</div>

	<!-- Single platform calculator -->
	<div class="service-list">
		<StreamingService
			name={platform.name}
			rate={platform.rate}
			logo={platform.logo}
			showDiscoveryMode={platform.slug === 'spotify'}
		/>
	</div>

	<!-- Settings -->
	<div class="settings">
		<RoyaltiesPercentage />
		<CurrencySelector />
	</div>

	<!-- Result -->
	<Result />

	<!-- Earnings milestones -->
	<div class="milestone-section">
		<h2 class="milestone-title">{platform.name} Earnings by Stream Count</h2>
		<div class="milestone-table">
			<div class="milestone-row milestone-header-row">
				<span>Streams</span>
				<span>Estimated Earnings</span>
			</div>
			{#each milestoneData as row}
				<div class="milestone-row">
					<span>{row.streams}</span>
					<span class="milestone-earnings">{row.earnings}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Reverse section -->
	<div class="reverse-section">
		<h2 class="reverse-title">How many {platform.name} streams to make $1,000?</h2>
		<div class="reverse-card">
			<p class="reverse-answer">
				At ${platform.rate.toFixed(4)} per stream, you need approximately <strong>{streamsFor1000}</strong> {platform.name} streams to earn $1,000.
			</p>
			<ReverseWidget platformFilter={platform.name} />
		</div>
	</div>

	<!-- Editorial Content -->
	{#if editorial.length > 0}
		<div class="editorial-section">
			{#each editorial as section}
				<div class="editorial-card">
					<h2>{section.title}</h2>
					{@html section.content}
				</div>
			{/each}
		</div>
	{/if}

	<!-- FAQ -->
	{#if platform.faqs.length > 0}
		<div class="faq-list">
			<div class="faq-title mb-4">Frequently Asked Questions</div>
			<div class="faq-container">
				{#each platform.faqs as faq, i}
					<button
						class="faq-item {faqOpen === i ? 'open' : ''}"
						on:click={() => (faqOpen = faqOpen === i ? null : i)}
					>
						<div class="faq-question">
							<span>{faq.heading}</span>
							<span class="faq-icon">+</span>
						</div>
						{#if faqOpen === i}
							<div class="faq-answer" transition:slide={{ duration: 200 }}>{@html faq.body}</div>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<!-- DistroKid Banner -->
	<a
		href="https://distrokid.com/vip/seven/3063815"
		target="_blank"
		rel="noopener sponsored"
		class="distro-banner"
	>
		<div class="distro-banner-content">
			<div class="distro-banner-headline">Keep <span class="distro-highlight">100%</span> of Your Royalties</div>
			<div class="distro-banner-sub">Get your music on {platform.name} & 150+ stores with <strong>DistroKid</strong></div>
		</div>
		<span class="distro-banner-cta">Claim 7% off</span>
	</a>
	<SponsorSlot slot="music-inline" disclose={false} />

	<p class="affiliate-disclosure">This page contains affiliate links. We earn a small commission at no cost to you. This does not influence our data or editorial content.</p>

	<!-- Internal Links -->
	<InternalLinks links={allLinks} />
</div>
