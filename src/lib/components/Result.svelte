<script lang="ts">
	import { totalEarnings, totalStreams, currency, getCurrencyInfo, royaltyPercentage, showShareCard } from '$lib/stores';
	import { page } from '$app/stores';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { formatAmount, formatInteger } from '$lib/format';

	const val = tweened(0, { duration: 400, easing: cubicOut });

	let showSplit = false;
	let members = 2;

	$: info = getCurrencyInfo($currency);
	$: hasValue = $totalEarnings.raw > 0;
	$: val.set($totalEarnings.raw);
	$: perPerson = $val / members;

	// On the homepage Boost Collective owns the sponsor slot, so the DistroKid
	// banner is suppressed by default. We bring it back the moment the user
	// drops the royalty percentage below 100. At that point they're already
	// thinking about distribution cuts and DistroKid is the relevant offer.
	$: isHomepage = $page.url.pathname === '/';
	$: showDistroBanner = !isHomepage || $royaltyPercentage < 100;

	// The counter is tweened, so this runs once per animation frame while the
	// value settles, so it has to stay cheap.
	const fmt = formatAmount;

	function handleShare() {
		showShareCard.set(true);
	}
</script>

<div class="result">
	<div class="result-label">Estimated Earnings</div>
	<div class="result-value {hasValue ? 'has-value' : ''}">
		<span class="symbol">{info.symbol}</span>{fmt($val)}
	</div>
	<div class="result-meta">
		{#if hasValue}
			{formatInteger($totalStreams)} streams · {$royaltyPercentage}% royalty
		{:else}
			Enter stream counts above
		{/if}
	</div>
	<!--
		The offer belongs inside this block, not after it. Rendered as a sibling it
		sat below the Share button, so a secondary action physically separated the
		number from the thing that responds to it and the unit read as unrelated
		page furniture. Share moves under it: it is the lesser action of the two.
	-->
	<slot />

	{#if hasValue}
		<button class="share-toggle" on:click={handleShare}>
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
				<polyline points="16 6 12 2 8 6" />
				<line x1="12" y1="2" x2="12" y2="15" />
			</svg>
			Share
		</button>
	{/if}
</div>

{#if showDistroBanner}
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
{/if}

<style>
	.share-toggle {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-top: 14px;
		padding: 8px 14px;
		font-size: 13px;
		font-weight: 500;
		color: var(--color-text-secondary);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.share-toggle:hover {
		color: var(--color-text);
		border-color: var(--hover-edge);
	}

	.share-toggle svg {
		color: var(--color-accent, #00ffc8);
	}

</style>
