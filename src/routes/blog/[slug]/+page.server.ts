import type { EntryGenerator, PageServerLoad } from './$types';
import { blogPosts, getBlogPost } from '$lib/data/blog';
import { loadBlogContent } from '$lib/data/blog-content';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const entries: EntryGenerator = () => blogPosts.map((post) => ({ slug: post.slug }));

// Resolving the post here rather than in +page.ts keeps the blog metadata
// index (every post's title, excerpt and date) out of the browser bundle.
// An article page only ever needs its own post.
export const load: PageServerLoad = async ({ params }) => {
	const meta = getBlogPost(params.slug);

	if (!meta) {
		throw error(404, 'Post not found');
	}

	const content = await loadBlogContent(meta.slug);

	if (content === undefined) {
		throw error(404, 'Post not found');
	}

	return { post: { ...meta, content } };
};
