<script lang="ts">
	import { onMount } from 'svelte';
	import { streams, bestPlatform } from '$lib/stores';
	import { formatAmount, groupDigits } from '$lib/format';

	export let name: string;
	export let rate: number;
	export let logo: string;
	export let showDiscoveryMode: boolean = false;
	export let href: string = '';

	// Discovery Mode pays ~30% less than normal rate
	const DISCOVERY_MULTIPLIER = 0.7;

	let inputValue = '';
	let focused = false;
	let inputEl: HTMLInputElement;

	function handleRowClick() {
		inputEl?.focus();
	}

	// Every row observes the whole $streams record, so a keystroke in any one
	// of them wakes all of them. Reading the two fields this row actually
	// cares about into primitives keeps Svelte's dirty-checking from
	// re-running the formatting below for rows whose own value never changed.
	$: rowStreams = $streams[name]?.streams ?? 0;
	$: isDiscovery = $streams[name]?.discoveryMode ?? false;

	$: hasValue = rowStreams > 0;

	/**
	 * The box shows its own formatted string, so a change made anywhere other
	 * than this input (a prefilled URL, a reset) would leave the row reading 0
	 * while the total below it counted the streams. Skipped while focused:
	 * reformatting mid-keystroke fights the person typing.
	 */
	$: if (!focused) inputValue = rowStreams > 0 ? groupDigits(String(rowStreams)) : '';
	$: effectiveRate = isDiscovery ? rate * DISCOVERY_MULTIPLIER : rate;
	$: earning = hasValue ? formatAmount(rowStreams * effectiveRate) : null;
	$: isBest = $bestPlatform === name;

	/**
	 * Prefill from the URL, e.g. ?spotify=400000&tidal=20000, with ?streams= as
	 * shorthand for Spotify. Makes a calculation shareable, and makes a preview
	 * link for a partner land on a real result: a placement that only appears
	 * above an earnings threshold showed nothing on an empty calculator.
	 *
	 * Read here rather than on the page because the page's copy of the store is
	 * not the instance these rows are bound to, so setting it there updated
	 * nothing on screen. Client-side only: the homepage is prerendered and query
	 * params are unreadable during SSR.
	 */
	onMount(() => {
		const params = new URLSearchParams(location.search);
		const raw = params.get(name.toLowerCase().replace(/\s+/g, '-')) ??
			(name === 'Spotify' ? params.get('streams') : null);
		if (raw === null) return;
		const value = parseInt(raw.replace(/\D/g, ''), 10);
		if (Number.isFinite(value) && value > 0) streams.setStreams(name, value);
	});

	function onInput(e: Event) {
		const t = e.target as HTMLInputElement;
		const v = t.value.replace(/\D/g, '').replace(/^0+/, '');
		const next = parseInt(v) || 0;
		// Keystrokes that don't change the number (a stray letter, a typed
		// comma, a leading zero) would otherwise clone the whole store and
		// wake every row and derived total for nothing.
		if (next !== rowStreams) streams.setStreams(name, next);
		inputValue = groupDigits(v);
	}
</script>

<!-- The row click is a pointer convenience; keyboard users reach the labelled input directly. -->
<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
<div
	class="service-row {hasValue || focused ? 'active' : ''} {isBest ? 'best' : ''}"
	role="group"
	aria-label="{name} calculator"
	on:click={handleRowClick}
>
	<div class="service-icon">
		<img src={logo} alt="{name} logo" width="34" height="34" decoding="async" />
	</div>
	<div class="service-info">
		<div class="service-name">{#if href}<a href={href} class="service-name-link">{name}</a>{:else}{name}{/if}</div>
		<div class="service-rate">
			${effectiveRate.toFixed(4)}
			<!--
				The label no longer gains "-30%" when on. The rate immediately to its
				left already drops from $0.0040 to $0.0028, so the figure was stated
				twice, and the longer label reflowed the row on every toggle.
			-->
			{#if showDiscoveryMode}
				<button
					class="dm-btn {isDiscovery ? 'active' : ''}"
					aria-pressed={isDiscovery}
					on:click|stopPropagation={() => streams.toggleDiscoveryMode(name)}
					title="Discovery Mode: a 30% lower rate in exchange for playlist placement"
				>Discovery</button>
			{/if}
		</div>
	</div>
	{#if earning}
		<span class="service-earning {isBest ? 'best' : ''}">{#if isBest}<span class="best-icon">★</span>{/if}${earning}</span>
	{/if}
	<input
		bind:this={inputEl}
		type="text"
		inputmode="numeric"
		aria-label="{name} stream count"
		placeholder="0"
		class="service-input"
		style="width: {Math.max(10, (inputValue?.length || 1) + 2)}ch"
		bind:value={inputValue}
		on:input={onInput}
		on:focus={() => (focused = true)}
		on:blur={() => (focused = false)}
	/>
</div>

<style>
	:global(.service-row) {
		cursor: pointer;
	}

	/*
		Both glyphs sit on one baseline, which leaves the small star low against the
		digits: measured in Inter, $600.00 at 14px/600 paints from -12 to +1 around
		the baseline (optical middle -5.5), and ★ at 10px paints -8 to 0 (middle
		-4). Lifting it 1.5px puts the two middles on the same line.
	*/
	.best-icon {
		margin-right: 3px;
		font-size: 10px;
		line-height: 1;
		position: relative;
		top: -1.5px;
	}

	/*
		Sized like a tag, not a button: at 30px tall with 10px type it was the
		tallest thing on a 12px rate line and pushed the row's two lines apart.
		The pseudo-element supplies a larger touch target without making the tag
		visually heavy.
	*/
	.dm-btn {
		position: relative;
		display: inline-flex;
		align-items: center;
		min-height: 20px;
		padding: 0 8px;
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.01em;
		line-height: 1;
		color: var(--text-muted);
		background: rgba(0, 0, 0, 0.25);
		border: none;
		border-radius: 999px;
		cursor: pointer;
		transition: all 0.15s ease;
		flex-shrink: 0;
		font-family: inherit;
		-webkit-tap-highlight-color: transparent;
	}

	.dm-btn::before {
		content: '';
		position: absolute;
		inset: -12px -8px;
	}

	.dm-btn:hover {
		background: var(--hover-fill);
		color: var(--text);
	}

	/* Solid rather than tinted: this is the one on/off control in the row and it
	   has to read as switched on at 10px. */
	.dm-btn.active {
		color: #04291d;
		background: var(--accent);
		font-weight: 600;
	}

	.service-name-link {
		color: var(--text);
		text-decoration: none;
		transition: color 0.15s;
	}

	/* Underline, not a colour change. Text links across the site behave this way
	   or brighten to --text; none of them turn green. */
	.service-name-link:hover {
		text-decoration: underline;
		text-underline-offset: 2px;
	}
</style>
