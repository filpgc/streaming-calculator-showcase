<script lang="ts">
	import { paragraphs } from '../../data';

	/**
	 * The site's one FAQ implementation. The creator pages used to render their
	 * own always-open cards, which meant two different FAQ designs on the same
	 * site — so this takes the list as a prop and everything routes through it.
	 */
	export let faqs: { heading: string; body: string }[] = paragraphs;
	export let title = 'Frequently Asked Questions';
	/** Heading id, for aria-labelledby and as an in-page anchor. */
	export let id: string | undefined = undefined;

	let openIdx: number | null = null;
</script>

<section class="faq-list" aria-labelledby={id}>
	<h2 {id} class="faq-title mb-4">{title}</h2>
	<div class="faq-container">
		{#each faqs as faq, i}
			<button
				class="faq-item {openIdx === i ? 'open' : ''}"
				aria-expanded={openIdx === i}
				on:click={() => (openIdx = openIdx === i ? null : i)}
			>
				<div class="faq-question">
					<span>{faq.heading}</span>
					<span class="faq-icon" aria-hidden="true">+</span>
				</div>
				<!--
					Always rendered, opened and closed with CSS rather than {#if}.
					Mounting the answer on click keeps it out of the served HTML
					entirely, which cost the creator pages a few hundred words of
					crawlable copy each when they moved onto this component. The
					grid-rows trick animates height without measuring anything.
				-->
				<div class="faq-answer-wrap" class:open={openIdx === i}>
					<div class="faq-answer">{@html faq.body}</div>
				</div>
			</button>
		{/each}
	</div>
</section>
