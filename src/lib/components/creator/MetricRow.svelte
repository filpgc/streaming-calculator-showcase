<script lang="ts">
	/**
	 * One input row in a creator calculator, visually identical to the
	 * homepage StreamingService rows (service-* classes from app.css).
	 */
	export let name: string;
	export let rateLine: string;
	/**
	 * Optional, and omitted on single-platform pages. The homepage rows each carry
	 * a different service logo, which is information; a creator calculator's rows
	 * are all the same platform, so repeating its mark under a hero that already
	 * shows it just prints the logo three or five times down the page.
	 */
	export let iconBg: string | null = null;
	export let iconPath: string | null = null;
	export let value = 0;
	export let earning: string | null = null;

	/**
	 * The input shows its own formatted string rather than `value`, so a page that
	 * prefills a worked example has to seed it here. Without this the maths and
	 * the result read 500,000 while the box the visitor is looking at reads 0.
	 *
	 * Seeded once, not kept in sync with `value`: reformatting mid-keystroke would
	 * fight the person typing.
	 */
	let inputValue = value > 0 ? value.toLocaleString('en-US') : '';
	let inputEl: HTMLInputElement;

	function onInput(e: Event) {
		const t = e.target as HTMLInputElement;
		const raw = t.value.replace(/\D/g, '').replace(/^0+/, '');
		value = parseInt(raw) || 0;
		inputValue = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
</script>

<div
	class="service-row {value > 0 ? 'active' : ''}"
	role="button"
	tabindex="0"
	on:click={() => inputEl?.focus()}
	on:keydown={(e) => e.key === 'Enter' && inputEl?.focus()}
>
	{#if iconBg && iconPath}
		<div class="service-icon creator-icon">
			<svg viewBox="0 0 34 34" aria-hidden="true">
				<rect width="34" height="34" rx="10" fill={iconBg} />
				<path d={iconPath} fill="#fff" />
			</svg>
		</div>
	{/if}
	<div class="service-info">
		<div class="service-name">{name}</div>
		<div class="service-rate">{rateLine}</div>
	</div>
	{#if earning && value > 0}
		<span class="service-earning">{earning}</span>
	{/if}
	<input
		bind:this={inputEl}
		type="text"
		inputmode="numeric"
		placeholder="0"
		class="service-input"
		style="width: {Math.max(10, (inputValue?.length || 1) + 2)}ch"
		bind:value={inputValue}
		on:input={onInput}
		aria-label={name}
	/>
</div>

<style>
	.service-row {
		cursor: pointer;
	}

	.creator-icon svg {
		width: 100%;
		height: 100%;
	}
</style>
