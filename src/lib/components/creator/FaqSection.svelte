<script lang="ts">
	import FAQ from '../FAQ.svelte';

	/**
	 * Kept only as the name the creator pages already import. All rendering is
	 * the homepage accordion — same markup, same classes, same open/close
	 * behaviour — so there is one FAQ on the site rather than two that look
	 * nothing alike.
	 */
	export let id = 'faq';
	export let title = 'Frequently asked questions';
	export let faqs: { heading: string; body: string }[];
</script>

<div class="creator-faq-section">
	<FAQ {faqs} {title} {id} />
</div>

<style>
	/* The shared .faq-list carries its own top margin but no bottom one, since on
	   the homepage it's the last thing on the page. The creator pages put related
	   links after it. */
	.creator-faq-section {
		margin-bottom: 32px;
	}
</style>
