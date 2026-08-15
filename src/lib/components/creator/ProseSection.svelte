<script lang="ts">
	export let id = 'about';
	export let title: string;
</script>

<section class="creator-section" aria-labelledby={id}>
	<h2 {id} class="faq-title creator-section-title">{title}</h2>
	<div class="creator-prose">
		<slot />
	</div>
</section>

<style>
	.creator-section {
		margin-bottom: 32px;
	}

	.creator-section-title {
		margin-bottom: 12px;
	}

	.creator-prose :global(p) {
		font-size: 14px;
		line-height: 1.7;
		color: var(--text-secondary, #a3a3a3);
		margin-bottom: 12px;
		max-width: 640px;
		text-wrap: pretty;
	}

	.creator-prose :global(ul) {
		padding-left: 20px;
		list-style: disc;
		margin-bottom: 12px;
		max-width: 640px;
	}

	.creator-prose :global(li) {
		font-size: 14px;
		line-height: 1.7;
		color: var(--text-secondary, #a3a3a3);
		margin-bottom: 6px;
	}

	.creator-prose :global(strong) {
		color: var(--text);
		font-weight: 600;
	}

	.creator-prose :global(a) {
		color: #5fd695;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.creator-prose :global(em) {
		font-style: italic;
	}
</style>
