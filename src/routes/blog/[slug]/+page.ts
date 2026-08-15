import type { PageLoad } from './$types';
import { blogSEO, generateArticleSchema } from '$lib/seo';

export const prerender = true;

export const load: PageLoad = ({ data }) => {
	// `post` comes from +page.server.ts.
	const { post } = data;

	return {
		post,
		seo: blogSEO(post),
		schemas: [
			generateArticleSchema({
				...post,
				lastModified: post.lastModified,
				author: post.author
			})
		]
	};
};
