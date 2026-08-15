<script lang="ts">
	export let label: string;
	export let options: { value: string; label: string }[];
	export let value: string;

	/**
	 * `inline` puts the label and pills on one row, which only works when both are
	 * short — two options and a one-word label, like Format or Currency.
	 *
	 * `stacked` gives the label its own line and turns the options into a
	 * full-width segmented control. Anything with a descriptive label or three
	 * options needs this: on one row a phrase like "Videos over 1 minute" wraps
	 * mid-label and shoves the pills into the container edge.
	 */
	export let layout: 'inline' | 'stacked' = 'inline';
</script>

{#if layout === 'stacked'}
	<div class="pill-stack">
		<span class="pill-stack-label">{label}</span>
		<div class="segmented" role="group" aria-label={label}>
			{#each options as o (o.value)}
				<button
					class="segment"
					class:active={value === o.value}
					aria-pressed={value === o.value}
					on:click={() => (value = o.value)}
				>
					{o.label}
				</button>
			{/each}
		</div>
	</div>
{:else}
	<div class="setting-row">
		<span class="setting-label">{label}</span>
		<div class="currency-pills" role="group" aria-label={label}>
			{#each options as o (o.value)}
				<button
					class="currency-pill"
					class:active={value === o.value}
					aria-pressed={value === o.value}
					on:click={() => (value = o.value)}
				>
					{o.label}
				</button>
			{/each}
		</div>
	</div>
{/if}

<style>
	.pill-stack {
		margin-top: 14px;
	}

	.pill-stack-label {
		display: block;
		font-size: 13px;
		color: #8a8a8a;
		margin-bottom: 8px;
	}

	/*
		One bordered track holding equal segments, rather than free-floating pills.
		Equal widths mean the control keeps its shape whatever the option labels
		say, which is the whole reason the inline row broke.
	*/
	.segmented {
		display: flex;
		gap: 4px;
		padding: 4px;
		border-radius: 12px;
		border: 0.5px solid hsl(0, 0%, 19%);
		background: hsl(0, 0%, 10.2%);
	}

	.segment {
		flex: 1 1 0;
		min-width: 0;
		min-height: 40px;
		padding: 0 6px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 13px;
		font-weight: 500;
		line-height: 1.25;
		color: #8a8a8a;
		background: transparent;
		border: none;
		border-radius: 9px;
		cursor: pointer;
		transition:
			background 0.15s,
			color 0.15s;
		-webkit-tap-highlight-color: transparent;
	}

	@media (hover: hover) {
		.segment:not(.active):hover {
			background: var(--hover-fill);
			color: var(--text);
		}
	}

	.segment.active {
		color: var(--bg);
		background: var(--accent);
		font-weight: 600;
	}

	/* Narrow phones: two words per segment is the tightest this can get before
	   the labels start truncating, so let them run to two lines instead. */
	@media (max-width: 380px) {
		.segment {
			font-size: 12.5px;
			padding: 6px 4px;
		}
	}
</style>
