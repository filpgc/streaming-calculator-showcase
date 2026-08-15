<script lang="ts">
	import { royaltyPercentage } from '$lib/stores';

	let val = '100';

	function onInput(e: Event) {
		const t = e.target as HTMLInputElement;
		const n = Math.max(0, Math.min(100, parseInt(t.value) || 0));
		// Clamped input means repeated keystrokes at the bounds resolve to the
		// same percentage; skip the recompute of every total when they do.
		if (n !== $royaltyPercentage) royaltyPercentage.set(n);
		val = n.toString();
	}

	$: showDistroKid = $royaltyPercentage < 100;
</script>

<div class="setting-row">
	<label class="setting-label" for="royalty-share">Royalty share</label>
	<div style="display: flex; align-items: center; gap: 6px;">
		<input
			id="royalty-share"
			type="number"
			min="0"
			max="100"
			class="setting-input"
			bind:value={val}
			on:input={onInput}
		/>
		<span style="color: var(--text-muted); font-size: 14px;">%</span>
		{#if showDistroKid}
			<a
				href="https://distrokid.com/vip/seven/3063815"
				target="_blank"
				rel="noopener"
				class="distrokid-pill"
				title="Claim 7% off DistroKid, keep 100% of your royalties"
			>
				Get 100%
			</a>
		{/if}
	</div>
</div>
