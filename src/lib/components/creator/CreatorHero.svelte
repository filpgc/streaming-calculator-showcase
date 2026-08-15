<script lang="ts">
	export let title: string;
	export let subtitle = '';
	export let badge = '';
	export let badgeTier: 1 | 2 | 3 | 4 | 0 = 0;
	/** Platform mark, from CREATOR_ICONS. Omitted and the hero renders as before. */
	export let iconBg = '';
	export let iconPath = '';
</script>

<header class="creator-hero">
	{#if iconBg && iconPath}
		<div class="creator-hero-icon">
			<svg viewBox="0 0 34 34" aria-hidden="true">
				<rect width="34" height="34" rx="10" fill={iconBg} />
				<path d={iconPath} fill="#fff" />
			</svg>
		</div>
	{/if}
	<h1 class="creator-hero-title">{title}</h1>
	{#if subtitle}
		<p class="creator-hero-sub">{subtitle}</p>
	{/if}
	{#if badge}
		<span class="creator-hero-badge tier-{badgeTier}">{badge}</span>
	{/if}
</header>

<style>
	.creator-hero {
		text-align: center;
		padding: 28px 4px 20px;
	}

	.creator-hero-icon {
		width: 46px;
		height: 46px;
		margin: 0 auto 12px;
	}

	.creator-hero-icon svg {
		width: 100%;
		height: 100%;
		display: block;
	}

	.creator-hero-title {
		font-size: 25px;
		font-weight: 800;
		line-height: 1.15;
		letter-spacing: -0.02em;
		color: var(--text);
		text-wrap: balance;
	}

	@media (min-width: 400px) {
		.creator-hero-title {
			font-size: 27px;
		}
	}

	@media (min-width: 640px) {
		.creator-hero {
			padding: 32px 8px 22px;
		}

		.creator-hero-title {
			font-size: 29px;
		}
	}

	.creator-hero-sub {
		font-size: 14px;
		line-height: 1.45;
		color: var(--text-secondary, #a3a3a3);
		margin-top: 10px;
		max-width: 520px;
		margin-left: auto;
		margin-right: auto;
		text-wrap: pretty;
	}

	.creator-hero-badge {
		display: inline-block;
		margin-top: 12px;
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		padding: 4px 12px;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.06);
		color: var(--text-muted);
	}

	.creator-hero-badge.tier-1 { background: rgba(51, 209, 122, 0.1); color: #5fd695; }
	.creator-hero-badge.tier-2 { background: rgba(59, 130, 246, 0.1); color: #7db0e6; }
	.creator-hero-badge.tier-3 { background: rgba(251, 191, 36, 0.09); color: #d4b254; }
	.creator-hero-badge.tier-4 { background: rgba(244, 63, 94, 0.08); color: #d08a96; }
</style>
