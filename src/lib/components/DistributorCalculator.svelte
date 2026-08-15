<script lang="ts">
	import {
		distributors,
		evaluateDistributors,
		planCost,
		type Distributor,
		type DistributorResult,
		type Requirements,
		type CostInputs
	} from '$lib/data/distributors';
	import { slide } from 'svelte/transition';
	import SponsorSlot from './SponsorSlot.svelte';
	import { resolveSlot } from '$lib/data/placements';
	import { flip } from 'svelte/animate';

	let releasesPerYear = 4;
	let monthlyEarnings = 50;
	let years = 1;
	let releasesInput = '4';
	let earningsInput = '50';

	const MIN_RELEASES = 0;
	const MAX_RELEASES = 100;

	function setReleases(n: number) {
		const clamped = Math.max(MIN_RELEASES, Math.min(MAX_RELEASES, n));
		releasesPerYear = clamped;
		releasesInput = String(clamped);
	}

	let artists = 1;
	let needCustomDate = false;
	let needContentId = false;
	let needSplits = false;

	let showExcluded = false;

	$: inputs = { releasesPerYear, monthlyEarnings, years } as CostInputs;
	$: requirements = {
		artists,
		customReleaseDate: needCustomDate,
		youtubeContentId: needContentId,
		splitPayments: needSplits
	} as Requirements;

	$: results = evaluateDistributors(inputs, requirements);
	$: qualifying = results
		.filter((r) => r.qualifies)
		.sort((a, b) => (a.cost?.total ?? Infinity) - (b.cost?.total ?? Infinity));
	$: excluded = results.filter((r) => !r.qualifies);
	$: cheapest = qualifying[0] ?? null;

	$: distrokid = distributors.find((d) => d.id === 'distrokid') as Distributor;
	$: distrokidResult = results.find((r) => r.distributor.id === 'distrokid') ?? null;

	/**
	 * The house DistroKid strip is affiliate fill, not editorial inventory that
	 * has to be there. It earns a few dollars a month, so a paying sponsor in the
	 * featured slot should simply take the position: the strip steps aside
	 * whenever one is live, and comes back if the sponsor lapses.
	 * This governs the banner only. DistroKid keeps its place in the ranking
	 * below regardless, because a distributor comparison missing the largest
	 * indie distributor is not a comparison, and the ranking's independence is
	 * the reason its outbound clicks are worth selling at all.
	 */
	$: featured = resolveSlot('distributor-featured', 'music');
	$: hideHousePick = featured?.kind === 'sponsor';
	$: distrokidIsCheapest = cheapest?.distributor.id === 'distrokid';
	$: distrokidCostDiff =
		distrokidResult?.cost && cheapest?.cost
			? distrokidResult.cost.total - cheapest.cost.total
			: 0;

	function onReleasesInput(e: Event) {
		const t = e.target as HTMLInputElement;
		const v = t.value.replace(/[^\d]/g, '').slice(0, 3);
		releasesInput = v;
		releasesPerYear = Math.min(parseInt(v) || 0, 100);
	}

	function onEarningsInput(e: Event) {
		const t = e.target as HTMLInputElement;
		const v = t.value.replace(/[^\d]/g, '').slice(0, 7);
		earningsInput = v;
		monthlyEarnings = parseInt(v) || 0;
	}

	function fmt(n: number): string {
		return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
	}

	function fmtPrecise(n: number): string {
		return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
	}

	function feeSummary(plan: typeof distrokid.plans[0]): string {
		const parts: string[] = [];
		if (plan.annualFee > 0) parts.push(`${fmtPrecise(plan.annualFee)}/yr`);
		if (plan.perReleaseFee > 0) parts.push(`${fmtPrecise(plan.perReleaseFee)}/release`);
		if (plan.annualFee === 0 && plan.perReleaseFee === 0) parts.push('Free');
		if (plan.royaltyCut > 0) parts.push(`${plan.royaltyCut}% royalty cut`);
		return parts.join(' · ');
	}

	$: dkDiscountedPrice = distrokid ? distrokidResult?.plan?.annualFee || 24.99 : 24.99;
</script>

<!-- Section: Your Music -->
<div class="dc-section">
	<div class="dc-section-label">Your music</div>
	<div class="dc-card">
		<div class="dc-field">
			<label class="dc-field-label" for="dc-releases">Releases per year</label>
			<div class="dc-stepper">
				<button
					type="button"
					class="dc-step-btn"
					aria-label="Decrease releases"
					on:click={() => setReleases(releasesPerYear - 1)}
					disabled={releasesPerYear <= MIN_RELEASES}
				>
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
						<path d="M2.5 6h7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
					</svg>
				</button>
				<input
					id="dc-releases"
					type="text"
					inputmode="numeric"
					class="dc-step-input"
					bind:value={releasesInput}
					on:input={onReleasesInput}
				/>
				<button
					type="button"
					class="dc-step-btn"
					aria-label="Increase releases"
					on:click={() => setReleases(releasesPerYear + 1)}
					disabled={releasesPerYear >= MAX_RELEASES}
				>
					<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
						<path d="M6 2.5v7M2.5 6h7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
					</svg>
				</button>
			</div>
		</div>

		<div class="dc-field">
			<label class="dc-field-label" for="dc-earnings">Monthly streaming earnings</label>
			<div class="dc-field-control dc-field-control-money">
				<span class="dc-money-symbol">$</span>
				<input
					id="dc-earnings"
					type="text"
					inputmode="numeric"
					class="dc-input-text"
					bind:value={earningsInput}
					on:input={onEarningsInput}
				/>
			</div>
		</div>

		<div class="dc-field">
			<span class="dc-field-label">Time horizon</span>
			<div class="dc-pill-group">
				{#each [1, 3, 5, 10] as y}
					<button
						type="button"
						class="dc-pill"
						class:active={years === y}
						on:click={() => (years = y)}
					>{y}y</button>
				{/each}
			</div>
		</div>
	</div>
</div>

<!-- Section: What You Need -->
<div class="dc-section">
	<div class="dc-section-label">What you need</div>
	<div class="dc-card">
		<div class="dc-field">
			<span class="dc-field-label">Artists you manage</span>
			<div class="dc-pill-group">
				<button type="button" class="dc-pill" class:active={artists === 1} on:click={() => (artists = 1)}>Just me</button>
				<button type="button" class="dc-pill" class:active={artists === 2} on:click={() => (artists = 2)}>2 to 4</button>
				<button type="button" class="dc-pill" class:active={artists === 5} on:click={() => (artists = 5)}>5+</button>
			</div>
		</div>

		<div class="dc-checkboxes">
			<label class="dc-check">
				<input type="checkbox" bind:checked={needCustomDate} />
				<span class="dc-check-box"></span>
				<span class="dc-check-content">
					<span class="dc-check-title">Custom release dates</span>
					<span class="dc-check-desc">Friday drops, pre-save campaigns</span>
				</span>
			</label>
			<label class="dc-check">
				<input type="checkbox" bind:checked={needContentId} />
				<span class="dc-check-box"></span>
				<span class="dc-check-content">
					<span class="dc-check-title">YouTube Content ID included</span>
					<span class="dc-check-desc">Monetize unauthorized YouTube uses</span>
				</span>
			</label>
			<label class="dc-check">
				<input type="checkbox" bind:checked={needSplits} />
				<span class="dc-check-box"></span>
				<span class="dc-check-content">
					<span class="dc-check-title">Built-in split payments</span>
					<span class="dc-check-desc">Auto-pay collaborators their share</span>
				</span>
			</label>
		</div>
	</div>
</div>

<!-- DistroKid Editorial Strip -->
{#if distrokid && distrokidResult && !hideHousePick}
	<a
		href={distrokid.affiliateUrl}
		target="_blank"
		rel="noopener sponsored"
		class="dc-editorial-pick"
	>
		<div class="dc-ed-icon">
			<img src={distrokid.logo} alt="DistroKid" />
		</div>
		<div class="dc-ed-text">
			<div class="dc-ed-title">
				DistroKid
				<span class="dc-ed-badge">Editor's pick</span>
			</div>
			<!--
				The claim lives in the badge and the discount lives in the button, so
				this line only carries what neither of them says: which plan, and how it
				compares on price.
			-->
			<div class="dc-ed-sub">
				{#if !distrokidResult.qualifies}
					Not a match · {distrokidResult.missingReason ?? 'outside your filters'}
				{:else if distrokidIsCheapest}
					{distrokidResult.plan?.name} · cheapest match for your setup
				{:else if distrokidCostDiff <= 30}
					{distrokidResult.plan?.name} · {fmt(distrokidCostDiff)} above cheapest
				{:else}
					{distrokidResult.plan?.name} · most reliable long term
				{/if}
			</div>
		</div>
		<span class="dc-ed-cta">
			{distrokidResult.qualifies ? '7% off' : 'View'}
			<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
				<path d="M3.5 8h9M9 4.5L12.5 8 9 11.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</span>
	</a>
{/if}

<!--
	Paid featured placement, above the ranked results and clearly labelled as
	sponsored. The ranking itself is never for sale: it is the reason the page
	is trusted, and the reason its outbound clicks are worth quoting to the
	companies in it.
-->
<SponsorSlot slot="distributor-featured" disclose={false} />

<!-- Qualifying Distributors -->
{#if qualifying.length > 0}
	<div class="dc-section">
		<div class="dc-section-label">Cost over {years} {years === 1 ? 'year' : 'years'}</div>
		<div class="dc-rank-list">
			{#each qualifying as result, i (result.distributor.id)}
				{@const d = result.distributor}
				{@const p = result.plan}
				{@const c = result.cost}
				<div
					class="dc-rank-row"
					class:dc-rank-row-dk={d.id === 'distrokid'}
					animate:flip={{ duration: 380 }}
				>
					<div class="dc-rank-icon">
						<img src={d.logo} alt="{d.name} logo" />
					</div>
					<div class="dc-rank-info">
						<div class="dc-rank-name">
							<a href="/go/{d.id}" target="_blank" rel="noopener nofollow" class="dc-rank-link">
								{d.name}
								<svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M4 2.5h5.5V8M9.5 2.5L2.5 9.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
							</a>
						</div>
						<div class="dc-rank-meta">
							{#if p}<span class="dc-rank-plan">{p.name}</span> · {feeSummary(p)}{/if}
						</div>
					</div>
					<div class="dc-rank-cost">
						<div class="dc-rank-total">{fmt(c?.total ?? 0)}</div>
						{#if c && c.royaltyCut > 0}
							<div class="dc-rank-detail">incl. {fmt(c.royaltyCut)} cut</div>
						{:else if c && c.perRelease > 0}
							<div class="dc-rank-detail">{releasesPerYear * years} releases</div>
						{:else if c && c.subscription > 0}
							<div class="dc-rank-detail">{years}× annual</div>
						{:else}
							<div class="dc-rank-detail">No fees</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div class="dc-empty">
		<p>No distributor meets all your requirements at any tier. Try relaxing one. Most artists don't need all four.</p>
	</div>
{/if}

<!-- Excluded Distributors -->
{#if excluded.length > 0}
	<div class="dc-section">
		<button class="dc-excluded-toggle" on:click={() => (showExcluded = !showExcluded)}>
			<span>{excluded.length} distributor{excluded.length === 1 ? '' : 's'} excluded</span>
			<svg width="12" height="12" viewBox="0 0 12 12" fill="none" style="transition: transform 0.2s; transform: rotate({showExcluded ? 180 : 0}deg)">
				<path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>

		{#if showExcluded}
			<div class="dc-excluded-list" transition:slide={{ duration: 200 }}>
				{#each excluded as result (result.distributor.id)}
					<div class="dc-excluded-row">
						<div class="dc-rank-icon dc-excluded-icon">
							<img src={result.distributor.logo} alt="{result.distributor.name} logo" />
						</div>
						<div class="dc-rank-info">
							<div class="dc-rank-name">{result.distributor.name}</div>
							<div class="dc-rank-meta">{result.missingReason}</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}

<style>
	.dc-section {
		margin-top: 22px;
	}

	.dc-section:first-of-type {
		margin-top: 12px;
	}

	.dc-section-label {
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-muted);
		margin: 0 4px 8px;
	}

	.dc-card {
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 16px;
		overflow: hidden;
	}

	/* Fields */
	/* Compact by removing dead space rather than shrinking type. Each row was 60px
	   tall to hold a 44px control; a 40px control in a 54px row keeps the same 7px
	   of breathing space and gives back 6px per field. */
	.dc-field {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 7px 14px;
		min-height: 54px;
	}

	.dc-field:not(:last-child) {
		border-bottom: 0.5px solid var(--divider);
	}

	.dc-field-label {
		font-size: 14px;
		line-height: 1.35;
		color: var(--text-secondary);
		flex: 1;
		min-width: 0;
		text-wrap: pretty;
	}

	.dc-field-control {
		display: inline-flex;
		align-items: center;
		gap: 2px;
		background: rgba(0, 0, 0, 0.3);
		border: 0.5px solid transparent;
		border-radius: 10px;
		padding: 0 12px;
		height: 40px;
		flex-shrink: 0;
		transition: border-color 0.15s ease, background 0.15s ease;
	}

	.dc-field-control:focus-within {
		border-color: var(--accent);
		background: rgba(0, 0, 0, 0.4);
	}

	/* The money control is sized to its widest realistic value rather than
	   flexing, so a long label ("Monthly streaming earnings") keeps enough
	   room to stay on one or two lines instead of collapsing to one word
	   per line on narrow phones. */
	.dc-field-control-money {
		width: 116px;
		gap: 6px;
	}

	/* Stepper (releases per year) */
	.dc-stepper {
		display: inline-flex;
		align-items: center;
		background: rgba(0, 0, 0, 0.3);
		border: 0.5px solid transparent;
		border-radius: 10px;
		overflow: hidden;
		flex-shrink: 0;
		transition: border-color 0.15s ease, background 0.15s ease;
	}

	.dc-stepper:focus-within {
		border-color: var(--accent);
		background: rgba(0, 0, 0, 0.4);
	}

	.dc-step-btn {
		width: 38px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;
		transition: color 0.15s ease, background 0.15s ease;
		font-family: inherit;
		-webkit-tap-highlight-color: transparent;
	}

	@media (hover: hover) {
		.dc-step-btn:hover:not(:disabled) {
			color: var(--text);
			background: var(--hover-fill);
		}
	}

	.dc-step-btn:active:not(:disabled) {
		background: rgba(255, 255, 255, 0.08);
	}

	.dc-step-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.dc-step-input {
		width: 34px;
		height: 40px;
		text-align: center;
		font-size: 15px;
		font-weight: 600;
		color: var(--text);
		background: transparent;
		border: none;
		outline: none;
		font-variant-numeric: tabular-nums;
		padding: 0;
		font-family: inherit;
	}

	.dc-money-symbol {
		font-size: 15px;
		font-weight: 600;
		color: var(--text-muted);
	}

	.dc-input-text {
		flex: 1;
		min-width: 0;
		height: 40px;
		font-size: 15px;
		font-weight: 600;
		color: var(--text);
		background: transparent;
		border: none;
		outline: none;
		font-variant-numeric: tabular-nums;
		text-align: right;
		font-family: inherit;
	}

	/* Pill group */
	.dc-pill-group {
		display: flex;
		gap: 2px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 11px;
		padding: 3px;
		flex-shrink: 0;
	}

	.dc-pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 38px;
		height: 36px;
		padding: 0 10px;
		font-size: 13px;
		font-weight: 600;
		color: var(--text-secondary);
		background: transparent;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: color 0.15s ease, background 0.15s ease;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
		font-family: inherit;
		-webkit-tap-highlight-color: transparent;
	}

	.dc-pill.active {
		color: hsl(0, 0%, 8%);
		background: var(--accent);
	}

	@media (hover: hover) {
		.dc-pill:hover:not(.active) {
			color: var(--text);
		}
	}

	/* Checkboxes */
	.dc-checkboxes {
		display: flex;
		flex-direction: column;
	}

	.dc-check {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		padding: 12px 14px;
		cursor: pointer;
		border-top: 0.5px solid var(--divider);
		transition: background 0.15s ease;
		-webkit-tap-highlight-color: transparent;
	}

	@media (hover: hover) {
		.dc-check:hover {
			background: var(--hover-fill);
		}
	}

	.dc-check input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.dc-check-box {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border: 1.5px solid var(--border);
		border-radius: 7px;
		background: rgba(0, 0, 0, 0.3);
		flex-shrink: 0;
		transition: background 0.15s ease, border-color 0.15s ease;
	}

	.dc-check input:checked ~ .dc-check-box {
		background: var(--accent);
		border-color: var(--accent);
	}

	.dc-check input:checked ~ .dc-check-box::after {
		content: '';
		width: 5px;
		height: 9px;
		border: solid hsl(0, 0%, 8%);
		border-width: 0 2px 2px 0;
		transform: rotate(45deg) translate(-1px, -1px);
	}

	.dc-check-content {
		display: flex;
		flex-direction: column;
		gap: 3px;
		min-width: 0;
	}

	.dc-check-title {
		font-size: 14.5px;
		line-height: 1.3;
		color: var(--text);
		font-weight: 500;
		text-wrap: pretty;
	}

	.dc-check-desc {
		font-size: 12.5px;
		line-height: 1.35;
		color: var(--text-muted);
		text-wrap: pretty;
	}

	/* Editor's Pick (DistroKid affiliate strip) */
	/*
		Shares the sponsor slot's palette (see the ad slot block in app.css): a
		near-black card with a tinted edge and a solid button. The old version was
		a flat green wash under a full-strength green border, which shouted louder
		than the paid units below it and made the mark on the left look pasted on.
	*/
	.dc-editorial-pick {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-top: 24px;
		padding: 11px 12px;
		background:
			radial-gradient(130% 140% at 0% 0%, rgba(16, 185, 129, 0.12), transparent 55%),
			hsl(0, 0%, 10.2%);
		border: 0.5px solid rgba(16, 185, 129, 0.28);
		border-radius: 16px;
		text-decoration: none;
		transition: border-color 0.15s ease;
	}

	@media (hover: hover) {
		/* RAISE, the site's card hover. Not a green edge: the accent's job here is
		   the badge and the button, and repeating it on hover made the whole card
		   read as selected. */
		.dc-editorial-pick:hover {
			border-color: var(--hover-edge);
			transform: translateY(-1px);
			box-shadow: var(--hover-shadow);
		}
	}

	.dc-ed-icon {
		width: 34px;
		height: 34px;
		border-radius: 10px;
		overflow: hidden;
		flex-shrink: 0;
	}

	.dc-ed-icon img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.dc-ed-text {
		flex: 1;
		min-width: 0;
	}

	.dc-ed-title {
		font-size: 14px;
		font-weight: 600;
		color: #efefef;
		letter-spacing: -0.005em;
		display: flex;
		align-items: center;
		gap: 7px;
		flex-wrap: wrap;
	}

	.dc-ed-badge {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #6ee7b7;
		background: rgba(16, 185, 129, 0.18);
		padding: 2px 7px;
		border-radius: 999px;
	}

	.dc-ed-sub {
		font-size: 12.5px;
		color: #a3a3a3;
		margin-top: 3px;
		line-height: 1.35;
		text-wrap: pretty;
	}

	.dc-ed-cta {
		display: inline-flex;
		align-items: center;
		gap: 3px;
		padding: 7px 12px;
		font-size: 13px;
		font-weight: 600;
		border-radius: 9px;
		color: #04291d;
		background: linear-gradient(180deg, #34d399, #10a271);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.35),
			0 1px 3px rgba(0, 0, 0, 0.22);
		white-space: nowrap;
		flex-shrink: 0;
		transition: transform 0.15s ease;
	}

	/* Ranked list */
	.dc-rank-list {
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 16px;
		overflow: hidden;
	}

	.dc-rank-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 14px;
		min-height: 60px;
		transition: background 0.15s ease;
	}

	.dc-rank-row:not(:last-child) {
		border-bottom: 0.5px solid var(--divider);
	}

	.dc-rank-icon {
		width: 34px;
		height: 34px;
		border-radius: 10px;
		overflow: hidden;
		flex-shrink: 0;
	}

	.dc-rank-icon img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.dc-rank-info {
		flex: 1;
		min-width: 0;
	}

	.dc-rank-link {
		color: inherit;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 3px;
		/* Widen the touch area to ~44px tall without changing the row rhythm */
		padding: 6px 2px;
		margin: -6px -2px;
	}

	.dc-rank-link svg {
		opacity: 0.4;
	}

	.dc-rank-link:hover {
		text-decoration: underline;
	}

	.dc-rank-link:hover svg {
		opacity: 0.8;
	}

	.dc-rank-name {
		font-size: 15px;
		font-weight: 600;
		color: var(--text);
		line-height: 1.25;
		display: flex;
		align-items: center;
		gap: 7px;
	}

	.dc-rank-plan {
		font-weight: 500;
		color: var(--text-secondary);
	}

	.dc-rank-meta {
		font-size: 12px;
		line-height: 1.4;
		color: var(--text-muted);
		margin-top: 3px;
		font-variant-numeric: tabular-nums;
		text-wrap: pretty;
	}

	.dc-rank-cost {
		text-align: right;
		flex-shrink: 0;
	}

	.dc-rank-total {
		font-size: 16px;
		font-weight: 700;
		color: var(--accent);
		font-variant-numeric: tabular-nums;
		line-height: 1.2;
	}

	.dc-rank-detail {
		font-size: 11px;
		color: var(--text-muted);
		margin-top: 2px;
		white-space: nowrap;
	}

	/* Empty state */
	.dc-empty {
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 16px;
		padding: 20px;
		text-align: center;
	}

	.dc-empty p {
		font-size: 13px;
		color: var(--text-secondary);
		margin: 0;
		text-wrap: pretty;
	}

	/* Excluded */
	.dc-excluded-toggle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		min-height: 46px;
		padding: 11px 14px;
		background: transparent;
		border: 0.5px solid var(--border);
		border-radius: 12px;
		color: var(--text-muted);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		font-family: inherit;
		transition: color 0.15s ease, border-color 0.15s ease;
		-webkit-tap-highlight-color: transparent;
	}

	@media (hover: hover) {
		.dc-excluded-toggle:hover {
			color: var(--text-secondary);
			border-color: var(--text-muted);
		}
	}

	.dc-excluded-list {
		margin-top: 8px;
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 12px;
		overflow: hidden;
	}

	.dc-excluded-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 11px 14px;
		opacity: 0.7;
	}

	.dc-excluded-row:not(:last-child) {
		border-bottom: 0.5px solid var(--divider);
	}

	.dc-excluded-icon {
		filter: saturate(0.4);
	}
</style>
