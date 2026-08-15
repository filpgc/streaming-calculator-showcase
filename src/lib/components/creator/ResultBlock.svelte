<script lang="ts">
	export let label = 'Estimated Earnings';
	export let value = 0;
	/**
	 * Either one string, or the parts of a "a · b · c" line.
	 *
	 * Passing the parts matters on phones: as a single string the browser breaks
	 * wherever it runs out of room, so "$0.56 per 1,000 views" splits across two
	 * lines and the separators end up orphaned. Each part is kept whole and the
	 * line wraps between them instead.
	 */
	export let meta: string | string[] = '';
	export let emptyMeta = 'Enter your numbers above';

	$: hasValue = value > 0;
	$: parts = hasValue ? (Array.isArray(meta) ? meta : [meta]) : [emptyMeta];

	function fmt(n: number): string {
		const decimals = n >= 10000 ? 0 : 2;
		return n.toLocaleString('en-US', {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals
		});
	}
</script>

<div class="result">
	<div class="result-label">{label}</div>
	<div class="result-value {hasValue ? 'has-value' : ''}">
		<span class="symbol">$</span>{fmt(value)}
	</div>
	<div class="result-meta result-meta-parts">
		{#each parts.filter(Boolean) as part, i (part)}
			<!--
				The separator belongs to the part that follows it, not to the one
				before. As its own flex item it stays behind when the line wraps,
				leaving a dot dangling off the end of the first line.
			-->
			<span class="result-meta-item">
				{#if i > 0}<span class="result-meta-sep" aria-hidden="true">·</span>{/if}{part}
			</span>
		{/each}
	</div>
</div>

<style>
	.result-meta-parts {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: center;
		gap: 2px 7px;
	}

	.result-meta-item {
		white-space: nowrap;
	}

	.result-meta-sep {
		opacity: 0.45;
		margin-right: 7px;
	}
</style>
