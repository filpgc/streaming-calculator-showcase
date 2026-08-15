<script lang="ts">
	import type { EditorialSection } from '$lib/data/editorial';
	import { platforms, goalAmounts, calcStreamsNeeded } from '../../data';
	import { ReverseWidget } from '$lib/components';
	import InternalLinks from './InternalLinks.svelte';
	import SponsorSlot from './SponsorSlot.svelte';

	export let amount: number;
	export let label: string;
	export let editorial: EditorialSection[] = [];

	// Sort platforms by fewest streams needed (highest rate first)
	const sortedPlatforms = Object.values(platforms).sort((a, b) => b.rate - a.rate);

	const tableData = sortedPlatforms.map((p) => ({
		name: p.name,
		logo: p.logo,
		slug: p.slug,
		rate: `$${p.rate.toFixed(4)}`,
		streams: calcStreamsNeeded(p.rate, amount).toLocaleString()
	}));

	// Internal links
	const platformLinks = sortedPlatforms.map((p) => ({
		href: `/${p.slug}-calculator`,
		label: `${p.name} Calculator`
	}));

	const otherGoals = goalAmounts
		.filter((g) => g.amount !== amount)
		.map((g) => ({
			href: `/how-many-streams-to-make-${g.amount}`,
			label: `Streams to make ${g.label}`
		}));

	const links = [
		{ href: '/', label: 'Main Calculator' },
		{ href: '/distributor-calculator', label: 'Distributor Cost Calculator' },
		{ href: '/blog', label: 'Blog & Guides' },
		...platformLinks,
		...otherGoals
	];
</script>

<div class="container">
	<!-- Header -->
	<div class="goal-header">
		<h1 class="goal-title">How Many Streams to Make {label}?</h1>
		<p class="goal-subtitle">See how many streams you need on each platform to earn {label} in 2026</p>
	</div>

	<!-- Goal table -->
	<div class="goal-table">
		<div class="milestone-table">
			<div class="milestone-row milestone-header-row goal-grid">
				<span>Platform</span>
				<span class="text-right">Rate</span>
				<span class="text-right">Streams</span>
			</div>
			{#each tableData as row}
				<a href="/{row.slug}-calculator" class="milestone-row goal-grid goal-row-link">
					<span class="goal-platform">
						<img src={row.logo} alt="{row.name}" class="goal-platform-icon" />
						{row.name}
					</span>
					<span class="milestone-earnings text-right">{row.rate}</span>
					<span class="milestone-earnings text-right">{row.streams}</span>
				</a>
			{/each}
		</div>
	</div>

	<!-- Custom Goal Calculator -->
	<div class="reverse-section">
		<h2 class="reverse-title">Custom Goal Calculator</h2>
		<div class="reverse-card">
			<ReverseWidget initialTarget={amount} />
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
