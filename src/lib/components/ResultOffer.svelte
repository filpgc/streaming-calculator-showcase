<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { totalEarnings, currency, getCurrencyInfo } from '$lib/stores';
	import { formatAmount } from '$lib/format';
	import { resolveSlot } from '$lib/data/placements';

	/** Categories already placed higher on this page, i.e. the hero sponsor's. */
	export let exclude: string[] = [];

	// Bands are defined in USD so switching to EUR doesn't move an artist into a
	// different offer. totalEarnings is already converted, so undo that.
	$: info = getCurrencyInfo($currency);
	// Rounded to the cent the visitor can actually see. Comparing the raw float
	// puts someone reading "$1,000.00" on screen into the sub-$1,000 band.
	$: usd = info.rate > 0 ? Math.round(($totalEarnings.raw / info.rate) * 100) / 100 : 0;

	// Nothing to say until they've actually calculated something.
	$: hasValue = $totalEarnings.raw > 0;

	$: fill = hasValue ? resolveSlot('result-offer', 'music', { usd, exclude }) : undefined;

	/**
	 * Report which band the visitor ended up in, once per page view.
	 *
	 * The first version reported once per band, which double counted anyone who
	 * adjusted their number: typing 20,000, then 900,000, logged both an
	 * under-100 and an over-500 visitor. Since people commonly try a round
	 * number before their real one, that inflated the high bands and made the
	 * distribution unusable for quoting an audience size.
	 *
	 * Now the band is tracked continuously and sent once, at the last moment
	 * possible, so one visitor produces exactly one data point reflecting where
	 * they actually settled. pagehide is the primary trigger, with an inactivity
	 * fallback for anyone who leaves the tab open.
	 */
	let currentBand: string | undefined;
	let currentPlacement: string | undefined;
	let sent = false;
	let idleTimer: ReturnType<typeof setTimeout>;

	function bandOf(value: number): string {
		if (value < 100) return 'under-100';
		if (value < 500) return '100-500';
		return 'over-500';
	}

	$: if (fill && usd > 0) {
		currentBand = bandOf(usd);
		currentPlacement = fill.id;
		clearTimeout(idleTimer);
		// They have stopped changing it; treat this as their answer.
		idleTimer = setTimeout(report, 20000);
	}

	function report() {
		if (sent || !currentBand || !currentPlacement) return;
		sent = true;
		const payload = JSON.stringify({ band: currentBand, placement: currentPlacement });
		try {
			if (navigator.sendBeacon) {
				navigator.sendBeacon('/api/offer-view', new Blob([payload], { type: 'application/json' }));
			} else {
				fetch('/api/offer-view', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: payload,
					keepalive: true
				}).catch(() => {});
			}
		} catch {
			// Never let measurement break the calculator.
		}
	}

	onMount(() => {
		// pagehide fires on close, navigation and mobile backgrounding, where
		// unload does not.
		addEventListener('pagehide', report);
		return () => removeEventListener('pagehide', report);
	});

	onDestroy(() => clearTimeout(idleTimer));

	/**
	 * Illustrative figure: a year of the amount on screen times the partner's own
	 * multiple, rounded down hard so it never reads as a quote. The copy states
	 * the "typical month" assumption, because the calculator never asked for a
	 * period.
	 */
	function advanceEstimate(monthly: number, multiple: number): number {
		const value = monthly * 12 * multiple;
		const step = value >= 50000 ? 10000 : value >= 10000 ? 5000 : 1000;
		return Math.max(step, Math.floor(value / step) * step);
	}

	$: amountText = `${info.symbol}${formatAmount($totalEarnings.raw)}`;
	$: advanceText = fill
		? `${info.symbol}${formatAmount(advanceEstimate($totalEarnings.raw, fill.advanceMultiple ?? 1))}`
		: '';

	function fillTokens(text: string): string {
		return text.replace('{amount}', amountText).replace('{advance}', advanceText);
	}
</script>

{#if fill}
	<a
		href="/go/{fill.id}"
		target="_blank"
		rel="noopener sponsored"
		referrerpolicy="origin"
		class="slot slot-result slot-{fill.accent}"
		data-slot="result-offer"
	>
		<div class="slot-top">
			{#if fill.logo}
				<img
					src={fill.logo}
					alt={fill.wordmark ?? ''}
					class="slot-logo"
					class:slot-logo-icon={fill.logoIcon}
				/>
			{:else if fill.wordmark}
				<span class="slot-wordmark">{fill.wordmark}</span>
			{/if}
			{#if fill.badge}
				<span class="slot-badge">{fill.badge}</span>
			{/if}
			<span class="slot-tag">{fill.kind === 'sponsor' ? 'Sponsored' : 'Partner'}</span>
		</div>

		<div class="slot-body">
			<div class="slot-text">
				<div class="slot-headline">{fillTokens(fill.result?.headline ?? fill.headline)}</div>
				<div class="slot-meta">{fillTokens(fill.result?.body ?? fill.body)}</div>
			</div>
			<span class="slot-cta">
				{fill.cta}
				<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
					<path
						d="M3.5 8h9M9 4.5L12.5 8 9 11.5"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
		</div>
	</a>

	<!--
		Sponsors carry no line of their own: the unit is already labelled Sponsored
		in its top corner, which is the disclosure that matters, and a paragraph
		repeating it added nothing. Affiliates keep theirs, because a commission is
		a material connection that has to be stated rather than implied.
	-->
	{#if fill.category === 'advance' || fill.category === 'catalog-sale'}
		<p class="affiliate-disclosure">
			Illustrative only, based on the figure above being a typical month. Amounts and eligibility are
			set by the provider, not by us. Affiliate link.
		</p>
	{:else if fill.kind === 'affiliate'}
		<p class="affiliate-disclosure">
			Affiliate link. We earn a small commission at no cost to you. It does not influence our
			rates or calculator math.
		</p>
	{/if}
{/if}
