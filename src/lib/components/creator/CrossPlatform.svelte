<script lang="ts">
	import { CREATOR_ICONS } from './index';
	import { TIKTOK_RPM } from '$lib/data/tiktok';
	import { SHORTS_RPM, ytNiches } from '$lib/data/youtube';

	/**
	 * The same view count, priced on every surface that pays per view.
	 *
	 * This is the most useful thing either creator calculator can say. A payout
	 * figure on its own means nothing to someone with no reference point, but the
	 * spread between platforms for identical work is the whole shape of the
	 * creator economy, and it is the reason to look at the other calculators.
	 *
	 * Twitch is deliberately absent: it pays on subs and bits, not views, so a
	 * per-view comparison would be inventing a number.
	 */
	export let views: number;
	/** Which row belongs to the page we are on, so it reads as the baseline. */
	export let current: 'tiktok' | 'youtube-long' | 'youtube-shorts' = 'tiktok';
	/** Niche slug for the long-form row, so it tracks the visitor's selection. */
	export let nicheSlug = 'entertainment';
	/**
	 * Share of views on videos over a minute, i.e. the ones Creator Rewards pays
	 * on at all. The TikTok page passes the visitor's own setting so this row
	 * agrees with the figure above it; other pages inherit the same default
	 * assumption rather than quietly pricing TikTok as if every video qualified.
	 */
	export let tiktokShare = 0.8;

	$: niche = ytNiches.find((n) => n.slug === nicheSlug) ?? ytNiches[0];

	const mid = (low: number, high: number) => (low + high) / 2;

	$: rows = [
		{
			key: 'tiktok' as const,
			name: 'TikTok',
			detail: `Creator Rewards, ${Math.round(tiktokShare * 100)}% over 1 min`,
			rpm: mid(TIKTOK_RPM.low, TIKTOK_RPM.high) * tiktokShare,
			href: '/tiktok-money-calculator',
			icon: CREATOR_ICONS.tiktok
		},
		{
			key: 'youtube-long' as const,
			name: 'YouTube long-form',
			detail: niche.name,
			rpm: mid(niche.low, niche.high),
			href: '/youtube-money-calculator',
			icon: CREATOR_ICONS.youtube
		},
		{
			key: 'youtube-shorts' as const,
			name: 'YouTube Shorts',
			detail: 'Flat feed-ad rate, all niches',
			rpm: mid(SHORTS_RPM.low, SHORTS_RPM.high),
			href: '/youtube-money-calculator',
			icon: CREATOR_ICONS.youtube
		}
	]
		.map((r) => ({ ...r, total: (views / 1000) * r.rpm }))
		.sort((a, b) => b.total - a.total);

	$: best = rows[0];
	$: worst = rows[rows.length - 1];
	// Ratio between the best and worst surface, which is the point of the whole
	// section. Guarded so an empty calculator doesn't divide by zero.
	$: spread = worst.total > 0 ? best.total / worst.total : 0;

	/**
	 * Cents only below $10. These sit in a column read top to bottom, and the
	 * site's usual two-decimals-under-$100 rule made it ragged: "$275" directly
	 * above "$56.00" reads as two different kinds of number.
	 */
	function money(x: number): string {
		return x.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: x < 10 ? 2 : 0
		});
	}

	function shortViews(n: number): string {
		if (n >= 1_000_000) return `${+(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
		if (n >= 1_000) return `${+(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1)}k`;
		return String(n);
	}
</script>

{#if views > 0}
	<section class="xp" aria-labelledby="xp-title">
		<h2 id="xp-title" class="xp-title">
			What {shortViews(views)} views earns on each platform
		</h2>

		<div class="xp-rows">
			{#each rows as row (row.key)}
				<a href={row.href} class="xp-row" class:xp-row-current={row.key === current}>
					<span class="xp-icon">
						<svg viewBox="0 0 34 34" aria-hidden="true">
							<rect width="34" height="34" rx="10" fill={row.icon.bg} />
							<path d={row.icon.path} fill="#fff" />
						</svg>
					</span>
					<span class="xp-info">
						<span class="xp-name">
							{row.name}
							{#if row.key === current}<span class="xp-you">this page</span>{/if}
						</span>
						<span class="xp-detail">{row.detail}</span>
					</span>
					<span class="xp-amount">{money(row.total)}</span>
				</a>
			{/each}
		</div>

		<!-- The table already says which platform pays what. The only thing worth
		     adding is the size of the gap, in one line. -->
		{#if spread >= 2}
			<p class="xp-note">
				Same footage, <strong>{spread < 10 ? spread.toFixed(1) : Math.round(spread)}x the money</strong>
				depending on where you post it.
			</p>
		{/if}
	</section>
{/if}

<style>
	.xp {
		margin: 0 0 34px;
	}

	.xp-title {
		font-size: 17px;
		font-weight: 700;
		color: var(--text);
		margin-bottom: 12px;
	}

	.xp-rows {
		border-radius: 14px;
		border: 0.5px solid hsl(0, 0%, 19%);
		background: hsl(0, 0%, 10.2%);
		overflow: hidden;
	}

	.xp-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 14px;
		text-decoration: none;
		transition: background 0.15s;
	}

	.xp-row:not(:last-child) {
		border-bottom: 0.5px solid hsl(0, 0%, 15%);
	}

	.xp-row-current {
		background: rgba(52, 211, 153, 0.05);
	}

	@media (hover: hover) {
		.xp-row:hover {
			background: var(--hover-fill);
		}
	}

	.xp-icon {
		width: 30px;
		height: 30px;
		flex-shrink: 0;
	}

	.xp-icon svg {
		width: 100%;
		height: 100%;
		display: block;
	}

	.xp-info {
		flex: 1;
		min-width: 0;
	}

	.xp-name {
		display: block;
		font-size: 14.5px;
		font-weight: 600;
		color: var(--text);
	}

	.xp-you {
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #34d399;
		margin-left: 6px;
		vertical-align: 1px;
	}

	.xp-detail {
		display: block;
		font-size: 12.5px;
		color: #8a8a8a;
		margin-top: 2px;
	}

	.xp-amount {
		font-size: 16px;
		font-weight: 700;
		color: var(--text);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.xp-note {
		font-size: 13px;
		line-height: 1.6;
		color: #8a8a8a;
		margin-top: 10px;
		text-wrap: pretty;
	}

	.xp-note strong {
		color: var(--text);
		font-weight: 600;
	}
</style>
