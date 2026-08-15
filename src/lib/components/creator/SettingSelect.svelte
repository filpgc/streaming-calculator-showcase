<script lang="ts">
	export let label: string;
	export let options: { value: string; label: string }[];
	export let value: string;
</script>

<div class="setting-row">
	<span class="setting-label">{label}</span>
	<select class="creator-select" bind:value aria-label={label}>
		{#each options as o (o.value)}
			<option value={o.value}>{o.label}</option>
		{/each}
	</select>
</div>

<style>
	/* The native control draws its own arrow hard against the right edge, so
	   the label ended up crowding it however much padding we set. Drawing the
	   chevron ourselves puts the spacing back under our control and matches
	   the other pill controls on these pages. */
	.creator-select {
		appearance: none;
		-webkit-appearance: none;
		max-width: 62%;
		height: 44px;
		background-color: var(--surface);
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2.5 4.5L6 8L9.5 4.5' stroke='%23a3a3a3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 13px center;
		border: 0.5px solid var(--border);
		border-radius: 10px;
		padding: 0 36px 0 14px;
		font-size: 14px;
		font-family: inherit;
		color: var(--text);
		outline: none;
		cursor: pointer;
		text-overflow: ellipsis;
		transition: border-color 0.15s ease;
	}

	/* FILL. A control, so it brightens in place rather than lifting like a card. */
	.creator-select:hover {
		background: var(--hover-fill);
	}

	.creator-select:focus-visible {
		border-color: var(--accent, #33d17a);
	}
</style>
