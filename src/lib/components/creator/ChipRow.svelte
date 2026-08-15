<script lang="ts">
	export let id = 'related';
	export let title: string;
	export let links: { href: string; label: string; accent?: boolean }[];
</script>

<section class="creator-section" aria-labelledby={id}>
	<h2 {id} class="faq-title creator-section-title">{title}</h2>
	<div class="creator-chips">
		{#each links as l (l.href)}
			<a class="creator-chip" class:accent={l.accent} href={l.href}>{l.label}</a>
		{/each}
	</div>
</section>

<style>
	.creator-section {
		margin-bottom: 32px;
	}

	.creator-section-title {
		margin-bottom: 12px;
	}

	.creator-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.creator-chip {
		font-size: 12.5px;
		font-weight: 500;
		color: var(--text-secondary, #a3a3a3);
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 999px;
		padding: 6px 14px;
		text-decoration: none;
		transition: border-color 0.15s ease, color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
	}

	/* RAISE */
	.creator-chip:hover {
		color: var(--text);
		border-color: var(--hover-edge);
		transform: translateY(-1px);
		box-shadow: var(--hover-shadow);
	}

	.creator-chip.accent {
		color: #5fd695;
	}
</style>
