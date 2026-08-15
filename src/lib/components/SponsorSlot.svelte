<script lang="ts">
	import { page } from '$app/stores';
	import { resolveSlot, type SlotId, type Audience, type Placement } from '$lib/data/placements';

	export let slot: SlotId;
	export let audience: Audience = 'music';
	/** Set on the highest unit of a page so it doesn't carry a top margin. */
	export let flush = false;
	/**
	 * Affiliate fills carry a disclosure line by default, since a slot can land
	 * on a page that has never had a commercial link before. Set false on pages
	 * that already print their own disclosure so it isn't stated twice.
	 */
	export let disclose = true;

	// Resolved at render time, no client work: the site deliberately runs a
	// small JS bundle, and an ad unit is not worth adding to it. The path seeds
	// affiliate rotation, so a page always shows the same merchant and SSR
	// matches hydration. Flight dates are day-resolution, so both agree.
	$: fill = resolveSlot(slot, audience, { seed: $page.url.pathname }) as
		| Placement
		| undefined;
</script>

{#if fill}
	<a
		href="/go/{fill.id}"
		target="_blank"
		rel="noopener sponsored"
		referrerpolicy="origin"
		class="slot slot-{fill.accent}"
		class:slot-flush={flush}
		data-slot={slot}
	>
		<div class="slot-top">
			{#if fill.logo}
				<img
					src={fill.logo}
					alt={fill.wordmark ?? ''}
					class="slot-logo"
					class:slot-logo-icon={fill.logoIcon}
				/>
			{:else if fill.wordmark}
				<span class="slot-wordmark">{fill.wordmark}</span>
			{/if}
			{#if fill.badge}
				<span class="slot-badge">{fill.badge}</span>
			{/if}
			<span class="slot-tag">{fill.kind === 'sponsor' ? 'Sponsored' : 'Partner'}</span>
		</div>

		<div class="slot-body">
			<div class="slot-text">
				<div class="slot-headline">{fill.headline}</div>
				<div class="slot-meta">{fill.body}</div>
			</div>
			<span class="slot-cta">
				{fill.cta}
				<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
					<path
						d="M3.5 8h9M9 4.5L12.5 8 9 11.5"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
		</div>
	</a>

	{#if disclose && fill.kind === 'affiliate'}
		<p class="affiliate-disclosure">
			This link is an affiliate link. We earn a small commission at no cost to you. It does not
			influence our rates, calculator math, or editorial content.
		</p>
	{/if}
{/if}
