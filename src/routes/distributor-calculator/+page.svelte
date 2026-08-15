<script lang="ts">
	import { SEOHead, DistributorCalculator, InternalLinks, Header } from '$lib/components';
	import { slide } from 'svelte/transition';
	import { platforms, goalAmounts } from '../../data';
	import { distributors } from '$lib/data/distributors';
	import type { PageData } from './$types';
	import { resolveSlot } from '$lib/data/placements';

	export let data: PageData;

	let faqOpen: number | null = null;

	/**
	 * A sponsor holding the featured slot replaces the house recommendation with
	 * their own section. Deliberately not called an editorial pick when it is
	 * paid: the section carries a Sponsored label instead, because paid copy
	 * dressed as an editorial verdict is what would cost this page the trust its
	 * outbound clicks are worth.
	 */
	$: featured = resolveSlot('distributor-featured', 'music');
	$: sponsorSection = featured?.kind === 'sponsor' ? featured.editorial : undefined;

	$: sections = sponsorSection
		? [
				...data.editorial
					.filter((s) => !s.title.includes('Editorial Pick'))
					.slice(0, 1)
					.map((s) => ({ ...s, sponsored: false, partner: '' })),
				{ ...sponsorSection, sponsored: true, partner: featured?.wordmark ?? '' },
				...data.editorial
					.filter((s) => !s.title.includes('Editorial Pick'))
					.slice(1)
					.map((s) => ({ ...s, sponsored: false, partner: '' }))
			]
		: data.editorial.map((s) => ({ ...s, sponsored: false, partner: '' }));

	/**
	 * The editorial ranking, held in the distributor data so it is one auditable
	 * list. Price is shown but does not set the order: sorting on cost put the two
	 * distributors that take a permanent percentage at the top, which is the
	 * opposite of what the rest of the page says. The calculator underneath still
	 * answers "cheapest for me", which is a different question from "best".
	 */
	const ranked = [...distributors]
		.sort((a, b) => a.editorialRank - b.editorialRank)
		.map((d) => {
			const cheapest = d.plans.reduce((x, y) => (x.annualFee <= y.annualFee ? x : y));
			const fee = cheapest.annualFee === 0 ? 'Free tier' : `From $${cheapest.annualFee.toFixed(2)}/yr`;
			return {
				name: d.name,
				bestFor: d.bestFor,
				priceLine: cheapest.royaltyCut > 0 ? `${fee}, ${cheapest.royaltyCut}% of royalties` : `${fee}, 0% cut`,
				pitch: d.pitch
			};
		});

	const internalLinks = [
		{ href: '/', label: 'Main Calculator' },
		{ href: '/reverse-royalty-calculator', label: 'Reverse Calculator' },
		{ href: '/blog', label: 'Blog & Guides' },
		...Object.values(platforms).map((p) => ({
			href: `/${p.slug}-calculator`,
			label: `${p.name} Calculator`
		})),
		...goalAmounts.map((g) => ({
			href: `/how-many-streams-to-make-${g.amount}`,
			label: `Streams to make ${g.label}`
		}))
	];
</script>

<SEOHead seo={data.seo} schemas={data.schemas} />

<main class="container">
	<Header
		title="Best Music Distribution Services"
		subtitle="Every major distributor compared on what it actually costs you"
	/>

	<!-- Calculator -->
	<section aria-label="Distributor cost calculator">
		<DistributorCalculator />
	</section>

	<!--
		Ordered list aimed at the featured snippet on "music distribution services",
		currently held by a competitor's listicle. Snippets of this kind are a
		heading matching the query followed by a clean ordered list, so that is
		what this is. Ranked by real entry price rather than opinion, and it says
		so, because an unexplained "best" ordering on a page whose whole claim is
		cost transparency would be the one thing to undermine it.
	-->
	<section class="dc-ranked" aria-labelledby="dc-ranked-heading">
		<h2 id="dc-ranked-heading" class="dc-ranked-title">
			The best music distribution services in 2026
		</h2>
		<ol class="dc-ranked-list">
			{#each ranked as d}
				<li>
					<strong>{d.name}:</strong>
					{d.bestFor}.
					<span class="dc-ranked-price">{d.priceLine}</span>
				</li>
			{/each}
		</ol>
		<p class="dc-ranked-note">
			Our ranking, weighing value, how much of your royalties you keep, delivery speed and how much
			of the ecosystem is built around them. Cheapest is a different question, and it depends on how
			often you release and what you earn. The calculator above answers that one.
		</p>
	</section>

	<!-- Editorial Content -->
	{#if sections.length > 0}
		<section class="editorial-section" aria-label="In-depth analysis">
			{#each sections as section}
				<article class="editorial-card" class:editorial-card-sponsored={section.sponsored}>
					{#if section.sponsored}
						<!--
							Disclosure has to stay: paid copy in an editorial slot without it
							is a banned practice under Schedule 1 of the UK CPRs, and the
							site's US readers bring FTC rules too. Worded as a partnership
							rather than an ad slug so it reads as a collaboration, which is
							both accurate and less corrosive to the copy underneath.
						-->
						<span class="editorial-sponsored-tag">In partnership with {section.partner}</span>
					{/if}
					<h2>{section.title}</h2>
					{@html section.content}
				</article>
			{/each}
		</section>
	{/if}

	<!-- FAQ -->
	{#if data.faqs.length > 0}
		<section class="faq-list" aria-labelledby="dc-faq-heading">
			<h2 id="dc-faq-heading" class="faq-title mb-4">Frequently Asked Questions</h2>
			<div class="faq-container">
				{#each data.faqs as faq, i}
					<button
						class="faq-item {faqOpen === i ? 'open' : ''}"
						on:click={() => (faqOpen = faqOpen === i ? null : i)}
					>
						<div class="faq-question">
							<span>{faq.heading}</span>
							<span class="faq-icon">+</span>
						</div>
						{#if faqOpen === i}
							<div class="faq-answer" transition:slide={{ duration: 200 }}>{@html faq.body}</div>
						{/if}
					</button>
				{/each}
			</div>
		</section>
	{/if}

	<!--
		Cut to the legal minimum rather than removed. This page carries affiliate
		links, and a paid-link disclosure is required by the DMCC Act in the UK and
		the FTC in the US, which is 45% of the traffic. The long version was three
		sentences of throat-clearing; one clause does the same job.
	-->
	<p class="affiliate-disclosure">Some links are affiliate links.</p>

	<!-- Internal Links -->
	<InternalLinks links={internalLinks} />
</main>

<style>
	.dc-ranked {
		margin: 28px 0 8px;
	}

	.dc-ranked-title {
		font-size: 17px;
		font-weight: 700;
		color: var(--text);
		margin-bottom: 12px;
		text-wrap: pretty;
	}

	.dc-ranked-list {
		list-style: decimal;
		margin: 0;
		background: var(--surface);
		border: 0.5px solid var(--border);
		border-radius: 14px;
		padding: 14px 16px 14px 34px;
	}

	.dc-ranked-list li {
		font-size: 13.5px;
		line-height: 1.65;
		color: var(--text-secondary);
		text-wrap: pretty;
	}

	.dc-ranked-list li:not(:last-child) {
		margin-bottom: 10px;
	}

	.dc-ranked-list strong {
		color: var(--text);
		font-weight: 600;
	}

	.dc-ranked-note {
		font-size: 12.5px;
		line-height: 1.65;
		color: var(--text-muted);
		margin-top: 10px;
		text-wrap: pretty;
	}

	.dc-ranked-price {
		display: block;
		font-size: 12px;
		color: var(--text-muted);
		margin-top: 2px;
		font-variant-numeric: tabular-nums;
	}
</style>
