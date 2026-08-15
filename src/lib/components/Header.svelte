<script lang="ts">
	export let title: string = 'Streaming Calculator';
	export let subtitle: string = 'Free music royalty calculator for every platform';
	export let showLogo: boolean = true;

	/**
	 * The logo sits beside the title as a lockup, with negative margins tuned for
	 * a single line. A title long enough to wrap on a phone leaves it stranded
	 * halfway down a two-line block, so anything past this length stacks instead.
	 *
	 * Measured by character count because CSS cannot ask how wide the text will
	 * be. The cutoff is set where the longest titles that still fit on one line
	 * at 390px sit: "TikTok Money Calculator" stays inline, "Best Music
	 * Distribution Services" stacks.
	 */
	$: stacked = title.length > 24;
</script>

<header class="header">
	<div class="header-top" class:header-top-stacked={stacked}>
		{#if showLogo}
			<img src="/logo.png" alt="Streaming Calculator" class="header-logo" width="84" height="40" fetchpriority="high" />
		{/if}
		<h1 class="header-title">{title}</h1>
	</div>
	<p class="header-subtitle">{subtitle}</p>
</header>

<style>
	.header {
		text-align: center;
		padding: 28px 0 24px;
	}

	/* The logo art has generous transparent padding baked into the PNG, so it
	   is pulled inwards with negative margins to sit optically next to the
	   title. On phones only the right margin is negative: a title long enough
	   to wrap makes this row as wide as the container, and a negative left
	   margin would then push the logo off the edge of the screen. */
	.header-top {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		max-width: 100%;
	}

	.header-logo {
		width: 72px;
		flex-shrink: 0;
		margin-right: -20px;
	}

	/* Stacked: the mark sits above the title, so the negative margin that pulled
	   it into the lockup has to go, and it shrinks since it is no longer sharing
	   a line with 26px type. */
	/* Phones only. A long title wrapping next to the logo left the mark stranded
	   halfway down a two-line block, so it moves above the title instead. Same
	   size as the inline mark, since shrinking it just made it look incidental. */
	.header-top-stacked {
		flex-direction: column;
		gap: 8px;
	}

	.header-top-stacked .header-logo {
		width: 76px;
		margin-right: 0;
		margin-left: 0;
	}

	.header-top-stacked .header-title {
		text-wrap: balance;
		max-width: 18ch;
	}

	.header-title {
		margin: 0;
		min-width: 0;
		font-size: 24px;
		font-weight: 650;
		line-height: 1.15;
		letter-spacing: -0.5px;
		color: var(--text);
		text-wrap: balance;
	}

	/* No width cap on phones: the container is already ~53ch at this size, so
	   capping narrower forces short subtitles onto two lines. text-wrap keeps
	   the longer ones from stranding a single word on the last line. */
	.header-subtitle {
		margin: 10px 0 0;
		font-size: 13px;
		line-height: 1.45;
		color: var(--text-muted);
		text-wrap: pretty;
	}

	@media (min-width: 400px) {
		.header-title {
			font-size: 26px;
		}
	}

	@media (min-width: 640px) {
		.header {
			padding: 40px 0 32px;
		}

		.header-top {
			gap: 12px;
		}

		.header-logo {
			width: 92px;
			margin-right: -28px;
			margin-left: -24px;
		}

		/* Desktop has room for the lockup, so it comes back regardless of length. */
		.header-top-stacked {
			flex-direction: row;
			gap: 12px;
		}

		.header-top-stacked .header-logo {
			width: 92px;
			margin-right: -28px;
			margin-left: -24px;
		}

		.header-top-stacked .header-title {
			max-width: none;
		}

		.header-title {
			font-size: 29px;
		}

		.header-subtitle {
			max-width: 46ch;
			margin-left: auto;
			margin-right: auto;
		}
	}
</style>
