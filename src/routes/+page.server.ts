import type { PageServerLoad } from './$types';
import { blogPosts } from '$lib/data/blog';

export const prerender = true;

export const load: PageServerLoad = () => {
	// Only the lightweight preview fields, never article bodies.
	// Five posts so an active featured pin (full-width card) still leaves
	// a balanced 2x2 grid; without a pin only the first four render.
	const latestPosts = blogPosts
		.filter((post) => !post.hidden)
		.slice(0, 5)
		.map(({ slug, title, excerpt, category, readTime, date }) => ({
			slug,
			title,
			excerpt,
			category,
			readTime,
			date
		}));

	// The featured pin is resolved here rather than in the component because
	// this page is prerendered: a server load runs only at build time, so the
	// browser can never re-evaluate the date and reach a different answer.
	// Deciding it in the component (or in a universal load, which re-runs
	// during hydration) meant that once featuredUntil lapsed, hydration
	// dropped a full-width card that the prerendered HTML still contained and
	// collapsed the whole grid, shifting the page body.
	const today = new Date().toISOString().slice(0, 10);
	const featured = blogPosts.find(
		(post) => !post.hidden && post.featuredUntil && post.featuredUntil >= today
	);

	return {
		latestPosts,
		featuredSlug: featured?.slug ?? null
	};
};
