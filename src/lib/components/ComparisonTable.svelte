<script lang="ts">
	import type { PlatformData } from '../../data';
	import type { EditorialSection } from '$lib/data/editorial';
	import { platforms, goalAmounts, earningsMilestones, calcStreamsNeeded } from '../../data';
	import InternalLinks from './InternalLinks.svelte';
	import SponsorSlot from './SponsorSlot.svelte';

	export let platformA: PlatformData;
	export let platformB: PlatformData;
	export let editorial: EditorialSection[] = [];

	// Who pays more?
	const higher = platformA.rate >= platformB.rate ? platformA : platformB;
	const lower = platformA.rate >= platformB.rate ? platformB : platformA;
	const pctMore = (((higher.rate - lower.rate) / lower.rate) * 100).toFixed(0);

	// Earnings at milestones
	const milestoneData = earningsMilestones.map((streams) => ({
		streams: streams.toLocaleString(),
		earningsA: (streams * platformA.rate).toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD'
		}),
		earningsB: (streams * platformB.rate).toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD'
		})
	}));

	// Streams to make $1,000
	const streamsA = calcStreamsNeeded(platformA.rate, 1000).toLocaleString();
	const streamsB = calcStreamsNeeded(platformB.rate, 1000).toLocaleString();

	// Internal links
	const links = [
		{ href: `/${platformA.slug}-calculator`, label: `${platformA.name} Calculator` },
		{ href: `/${platformB.slug}-calculator`, label: `${platformB.name} Calculator` },
		{ href: '/', label: 'Main Calculator' },
		{ href: '/distributor-calculator', label: 'Distributor Cost Calculator' },
		{ href: '/blog', label: 'Blog & Guides' },
		...goalAmounts.map((g) => ({
			href: `/how-many-streams-to-make-${g.amount}`,
			label: `Streams to make ${g.label}`
		}))
	];
</script>

<div class="container">
	<!-- Header -->
	<div class="comparison-header">
		<div class="comparison-logos">
			<div class="comparison-logo">
				<img src={platformA.logo} alt="{platformA.name} logo" />
			</div>
			<span class="comparison-vs">vs</span>
			<div class="comparison-logo">
				<img src={platformB.logo} alt="{platformB.name} logo" />
			</div>
		</div>
		<h1 class="comparison-title">{platformA.name} vs {platformB.name}</h1>
		<p class="comparison-subtitle">Streaming Royalties Comparison 2026</p>
	</div>

	<!-- Rate comparison -->
	<div class="comparison-rates">
		<div class="comparison-rate-card">
			<div class="comparison-rate-name">{platformA.name}</div>
			<div class="comparison-rate-value">{platformA.seoRate}</div>
			<div class="comparison-rate-label">per stream</div>
		</div>
		<div class="comparison-rate-card">
			<div class="comparison-rate-name">{platformB.name}</div>
			<div class="comparison-rate-value">{platformB.seoRate}</div>
			<div class="comparison-rate-label">per stream</div>
		</div>
	</div>

	<!-- Verdict -->
	<div class="comparison-verdict">
		<span class="comparison-verdict-label">Who pays more?</span>
		<span class="comparison-verdict-value">{higher.name} pays ~{pctMore}% more per stream than {lower.name}</span>
	</div>

	<!-- Earnings table -->
	<div class="milestone-section">
		<h2 class="milestone-title">Earnings Comparison by Stream Count</h2>
		<div class="milestone-table">
			<div class="milestone-row milestone-header-row comparison-three-col">
				<span>Streams</span>
				<span>{platformA.name}</span>
				<span>{platformB.name}</span>
			</div>
			{#each milestoneData as row}
				<div class="milestone-row comparison-three-col">
					<span>{row.streams}</span>
					<span class="milestone-earnings">{row.earningsA}</span>
					<span class="milestone-earnings">{row.earningsB}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Streams to $1,000 -->
	<div class="comparison-goal">
		<h2 class="milestone-title">Streams Needed to Earn $1,000</h2>
		<div class="comparison-rates">
			<div class="comparison-rate-card">
				<div class="comparison-rate-name">{platformA.name}</div>
				<div class="comparison-rate-value">{streamsA}</div>
				<div class="comparison-rate-label">streams</div>
			</div>
			<div class="comparison-rate-card">
				<div class="comparison-rate-name">{platformB.name}</div>
				<div class="comparison-rate-value">{streamsB}</div>
				<div class="comparison-rate-label">streams</div>
			</div>
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
	<SponsorSlot slot="music-inline" disclose={false} />

	<p class="affiliate-disclosure">This page contains affiliate links. We earn a small commission at no cost to you. This does not influence our data or editorial content.</p>

	<!-- Internal Links -->
	<InternalLinks links={links} />
</div>
