import type { PageServerLoad } from './$types';
import { blogPosts } from '$lib/data/blog';

export const prerender = true;

export const load: PageServerLoad = () => {
	const posts = blogPosts
		.filter((post) => !post.hidden)
		.map(({ slug, title, excerpt, category, readTime, date }) => ({
			slug,
			title,
			excerpt,
			category,
			readTime,
			date
		}));

	// Resolved at build time for the same reason as the homepage pin: this
	// page is prerendered, so comparing featuredUntil in the component would
	// let the browser reach a different answer during hydration and shift the
	// listing. See src/routes/+page.server.ts.
	const today = new Date().toISOString().slice(0, 10);
	const pinned = blogPosts.find(
		(post) => !post.hidden && post.featuredUntil && post.featuredUntil >= today
	);

	return { posts, pinnedSlug: pinned?.slug ?? null };
};
