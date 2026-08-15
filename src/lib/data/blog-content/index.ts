// Generated container for blog article bodies. Each post's HTML lives in
// its own module so that pages which only need metadata (the homepage, the
// blog listing, the feed and the sitemap) never pull article text into the
// client bundle, and an individual article page downloads only its own body.
//
// To edit a post's text, edit ./<slug>.ts directly.

const bodies = import.meta.glob<{ content: string }>('./*.ts');

/** Resolves a post's HTML body, or undefined when the slug has no module. */
export async function loadBlogContent(slug: string): Promise<string | undefined> {
	const load = bodies[`./${slug}.ts`];
	if (!load) return undefined;
	return (await load()).content;
}
