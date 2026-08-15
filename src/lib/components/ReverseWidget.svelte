<script lang="ts">
	import { streamingServices } from '../../data';
	import { currency, getCurrencyInfo, royaltyPercentage } from '$lib/stores';
	import RoyaltiesPercentage from './RoyaltiesPercentage.svelte';
	import CurrencySelector from './CurrencySelector.svelte';

	export let platformFilter: string = '';
	/** Seeds the goal so a "$500" page opens on $500, not the generic $1,000. */
	export let initialTarget: number = 1000;

	let target = initialTarget;
	let inputValue = initialTarget.toLocaleString('en-US');

	$: info = getCurrencyInfo($currency);
	$: filteredServices = platformFilter
		? streamingServices.filter((s) => s.name === platformFilter)
		: streamingServices;

	function onInput(e: Event) {
		const t = e.target as HTMLInputElement;
		let v = t.value.replace(/[^\d]/g, '').replace(/^0+/, '');
		target = parseInt(v) || 0;
		inputValue = v.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	$: results = filteredServices.map((s) => ({
		...s,
		streamsNeeded: Math.ceil((target / info.rate) / s.rate / (($royaltyPercentage || 100) / 100)).toLocaleString()
	}));
</script>

<!-- Target Input -->
<div class="target-section">
	<div class="target-row">
		<span class="target-label">I want to earn</span>
		<div class="target-input-wrapper">
			<span class="target-symbol">{info.symbol}</span>
			<input
				id="target"
				type="text"
				inputmode="numeric"
				class="target-input"
				style="width: {Math.max(2, inputValue?.length || 1)}ch"
				bind:value={inputValue}
				on:input={onInput}
			/>
		</div>
	</div>
</div>

<!-- Settings -->
<div class="settings" style="margin-top: 4px;">
	<RoyaltiesPercentage />
	<CurrencySelector />
</div>

<!-- Results -->
<div class="service-list" style="margin-top: 12px;">
	{#each results as s}
		<div class="service-row">
			<div class="service-icon">
				<img src={s.logo} alt="{s.name} logo" />
			</div>
			<div class="service-info">
				<div class="service-name">{s.name}</div>
				<div class="service-rate">${s.rate.toFixed(4)} per stream</div>
			</div>
			<span class="streams-needed">{s.streamsNeeded} streams</span>
		</div>
	{/each}
</div>

<style>
	.target-section {
		padding: 16px 0 12px;
	}

	.target-row {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 10px;
	}

	.target-label {
		font-size: 14px;
		color: var(--text-secondary);
	}

	.target-input-wrapper {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		min-height: 48px;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 10px;
		padding: 0 14px;
		transition: border-color 0.15s ease;
	}

	.target-input-wrapper:focus-within {
		border-color: var(--accent);
	}

	.target-symbol {
		font-size: 18px;
		font-weight: 600;
		color: var(--accent);
	}

	.target-input {
		align-self: stretch;
		min-width: 0;
		font-size: 18px;
		font-weight: 600;
		font-family: inherit;
		color: var(--text);
		background: transparent;
		border: none;
		outline: none;
		font-variant-numeric: tabular-nums;
	}

	.target-input::placeholder {
		color: var(--text-muted);
	}

	.streams-needed {
		font-size: 14px;
		font-weight: 600;
		color: var(--accent);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

</style>
