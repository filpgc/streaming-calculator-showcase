<script lang="ts">
	import type { PageData } from './$types';
	import { SEOHead, Header, FAQ, InternalLinks } from '$lib/components';
	import { resolveSlot } from '$lib/data/placements';
	import { TRENDS, MIN_MONTHLY, estimate } from '$lib/data/advances';

	export let data: PageData;

	/** Opens on a worked example so the page answers before it asks. */
	let monthly = 2000;
	let earningsInput = '2,000';
	let trendValue = 'stable';
	let kind: 'advance' | 'sale' = 'advance';

	function onEarnings(e: Event) {
		const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '').replace(/^0+/, '');
		monthly = parseInt(raw) || 0;
		earningsInput = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	$: trend = TRENDS.find((t) => t.value === trendValue) ?? TRENDS[1];
	$: result = estimate(monthly, trend, kind);
	$: viable = monthly >= MIN_MONTHLY;

	$: offer = viable
		? resolveSlot('result-offer', 'music', {
				usd: monthly,
				seed: 'advance',
				// The partner has to match the deal on screen. Someone pricing an
				// advance is not shopping for a distributor, and someone selling
				// their catalog should not be pitched a lender.
				exclude: ['distribution', kind === 'advance' ? 'catalog-sale' : 'advance']
			})
		: undefined;

	function money(x: number): string {
		return x.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
	}

	function advanceEstimate(monthlyUsd: number, multiple: number): number {
		const value = monthlyUsd * 12 * multiple;
		const step = value >= 50000 ? 10000 : value >= 10000 ? 5000 : 1000;
		return Math.max(step, Math.floor(value / step) * step);
	}

	$: fillTokens = (text: string) =>
		text
			.replace('{amount}', money(monthly))
			.replace('{advance}', money(advanceEstimate(monthly, offer?.advanceMultiple ?? 1)));

	function years(n: number): string {
		if (n < 18) return `${n} months`;
		return `${Math.round((n / 12) * 2) / 2} years`.replace('.5', '½');
	}

	const internalLinks = [
		{ href: '/', label: 'Main Calculator' },
		{ href: '/distributor-calculator', label: 'Distributor Calculator' },
		{ href: '/reverse-royalty-calculator', label: 'Reverse Calculator' },
		{ href: '/streaming-royalty-rates', label: 'Royalty Rates' },
		{ href: '/blog', label: 'Blog & Guides' }
	];
</script>

<SEOHead seo={data.seo} schemas={data.schemas} />

<div class="container">
	<Header
		title="Royalty Advance Calculator"
		subtitle="What your catalog is worth as cash today"
	/>

	<div class="rac-inputs">
		<div class="rac-field">
			<label class="rac-field-label" for="rac-earnings">Monthly streaming earnings</label>
			<div class="rac-field-control">
				<span class="rac-money-symbol">$</span>
				<input
					id="rac-earnings"
					type="text"
					inputmode="numeric"
					class="rac-input"
					bind:value={earningsInput}
					on:input={onEarnings}
				/>
			</div>
		</div>

		<div class="rac-field">
			<span class="rac-field-label">Your streams</span>
			<div class="rac-pills" role="group" aria-label="Catalog trend">
				{#each TRENDS as t (t.value)}
					<button
						class="rac-pill"
						class:active={trendValue === t.value}
						aria-pressed={trendValue === t.value}
						on:click={() => (trendValue = t.value)}>{t.label}</button
					>
				{/each}
			</div>
		</div>
	</div>

	<!--
		One control, two deals, one number. Showing an advance and a sale side by
		side gave the visitor two answers, which is none: the point of the page is
		that these are alternatives, so the page makes you pick.
	-->
	<div class="rac-switch" role="group" aria-label="Deal type">
		<button class="rac-switch-btn" class:active={kind === 'advance'} on:click={() => (kind = 'advance')}>
			Take an advance
		</button>
		<button class="rac-switch-btn" class:active={kind === 'sale'} on:click={() => (kind = 'sale')}>
			Sell the catalog
		</button>
	</div>

	{#if viable}
		<div class="result rac-result">
			<div class="result-value has-value rac-result-value">{money(result.mid)}</div>
			<div class="result-meta rac-result-meta">
				{#if kind === 'advance'}
					{money(result.low)}–{money(result.high)} · paid back in about {years(result.recoupMonths)},
					then the income is yours again
				{:else}
					{money(result.low)}–{money(result.high)} · {result.multiple}× a year, and the rights stop
					being yours
				{/if}
			</div>
		</div>

		{#if offer}
			<a
				href="/go/{offer.id}"
				target="_blank"
				rel="noopener sponsored"
				referrerpolicy="origin"
				class="slot slot-result slot-{offer.accent}"
				data-slot="result-offer"
			>
				<div class="slot-top">
					{#if offer.logo}
						<img src={offer.logo} alt={offer.wordmark ?? ''} class="slot-logo" />
					{:else if offer.wordmark}
						<span class="slot-wordmark">{offer.wordmark}</span>
					{/if}
					<span class="slot-tag">{offer.kind === 'sponsor' ? 'Sponsored' : 'Partner'}</span>
				</div>
				<div class="slot-body">
					<div class="slot-text">
						<div class="slot-headline">{fillTokens(offer.result?.headline ?? offer.headline)}</div>
						<div class="slot-meta">{fillTokens(offer.result?.body ?? offer.body)}</div>
					</div>
					<span class="slot-cta">{offer.cta}</span>
				</div>
			</a>
			<p class="affiliate-disclosure">
				Illustrative only. Amounts and eligibility are set by the provider. Affiliate link.
			</p>
		{/if}
	{:else}
		<div class="result rac-result">
			<div class="result-meta rac-result-meta">
				{#if monthly > 0}
					Below {money(MIN_MONTHLY)} a month there's no advance market to speak of.
					<a href="/">Work out what your streams pay</a> first.
				{:else}
					Enter what your catalog earns in a typical month.
				{/if}
			</div>
		</div>
	{/if}

	<section class="rac-section">
		<h2 class="faq-title rac-section-title">Advance or sale?</h2>
		<p class="rac-prose">
			An advance is temporary and a sale is permanent. That's the whole decision. Both are priced
			off the same number, what your catalog earned over the last twelve months, and direction moves
			it more than size: {trend.note.charAt(0).toLowerCase() + trend.note.slice(1)}
		</p>
		<p class="rac-prose rac-caveat">
			Estimates built from publicly stated market ranges, not offers. Real pricing comes from your
			per-track decay curve, which no calculator can see.
		</p>
	</section>

	<FAQ faqs={data.faqs} title="Royalty advances, answered" id="advance-faq" />

	<InternalLinks links={internalLinks} />
</div>

<style>
	.rac-inputs {
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 16px;
		overflow: hidden;
	}

	.rac-field {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 8px 14px;
		min-height: 60px;
	}

	.rac-field:not(:last-child) {
		border-bottom: 0.5px solid var(--divider);
	}

	.rac-field-label {
		font-size: 14px;
		line-height: 1.35;
		color: var(--text-secondary);
		flex-shrink: 0;
	}

	.rac-field-control {
		display: inline-flex;
		align-items: center;
		gap: 2px;
		background: rgba(0, 0, 0, 0.3);
		border: 0.5px solid transparent;
		border-radius: 10px;
		padding: 0 12px;
		height: 44px;
		width: 140px;
		flex-shrink: 0;
		transition:
			border-color 0.15s ease,
			background 0.15s ease;
	}

	.rac-field-control:focus-within {
		border-color: var(--accent);
		background: rgba(0, 0, 0, 0.4);
	}

	.rac-money-symbol {
		font-size: 15px;
		color: var(--text-muted);
	}

	.rac-input {
		width: 100%;
		min-width: 0;
		background: none;
		border: none;
		outline: none;
		color: var(--text);
		font-size: 15px;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		text-align: right;
	}

	.rac-pills {
		display: flex;
		gap: 6px;
	}

	.rac-pill {
		min-height: 40px;
		padding: 0 12px;
		font-size: 13px;
		font-weight: 500;
		color: var(--text-muted);
		background: rgba(0, 0, 0, 0.3);
		border: 0.5px solid transparent;
		border-radius: 10px;
		cursor: pointer;
		white-space: nowrap;
		transition:
			background 0.15s,
			color 0.15s;
		-webkit-tap-highlight-color: transparent;
	}

	@media (hover: hover) {
		.rac-pill:not(.active):hover {
			color: var(--text);
		}
	}

	.rac-pill.active {
		color: var(--bg);
		background: var(--accent);
		font-weight: 600;
	}

	/* Deal switch: wider and quieter than the input pills, because it changes
	   what the number below means rather than feeding into it. */
	.rac-switch {
		display: flex;
		gap: 4px;
		margin-top: 14px;
		padding: 4px;
		border-radius: 12px;
		background: rgba(0, 0, 0, 0.3);
		border: 0.5px solid var(--border);
	}

	.rac-switch-btn {
		flex: 1 1 0;
		min-height: 40px;
		font-size: 13.5px;
		font-weight: 500;
		color: var(--text-muted);
		background: transparent;
		border: none;
		border-radius: 9px;
		cursor: pointer;
		transition:
			background 0.15s,
			color 0.15s;
		-webkit-tap-highlight-color: transparent;
	}

	.rac-switch-btn.active {
		color: var(--text);
		background: hsl(0, 0%, 17%);
		font-weight: 600;
	}

	.rac-result {
		padding-top: 30px;
		padding-bottom: 30px;
	}

	.rac-result-value {
		font-size: 46px;
	}

	.rac-result-meta {
		max-width: 34ch;
		margin-left: auto;
		margin-right: auto;
		text-wrap: pretty;
	}

	.rac-result-meta a {
		color: var(--accent);
	}

	.rac-section {
		margin-top: 30px;
	}

	.rac-section-title {
		margin-bottom: 12px;
	}

	.rac-prose {
		font-size: 14px;
		line-height: 1.75;
		color: var(--text-secondary);
		text-wrap: pretty;
		margin-bottom: 12px;
	}

	.rac-caveat {
		font-size: 12.5px;
		color: var(--text-muted);
	}
</style>
