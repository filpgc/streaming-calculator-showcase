<script lang="ts">
	import { currency, currencies } from '$lib/stores';
</script>

<div class="setting-row">
	<span class="setting-label">Currency</span>
	<div class="currency-pills" role="group" aria-label="Currency">
		{#each currencies as c}
			<button
				class="currency-pill {$currency === c.code ? 'active' : ''}"
				aria-pressed={$currency === c.code}
				on:click={() => currency.set(c.code)}
			>
				{c.code}
			</button>
		{/each}
	</div>
</div>
