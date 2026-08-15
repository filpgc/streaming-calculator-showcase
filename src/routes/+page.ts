import type { PageLoad } from './$types';
import {
	defaultSEO,
	generateWebAppSchema,
	generateFAQSchema,
	generateDatasetSchema,
	generateHowToSchema,
	generateSpeakableSchema,
	generateWebSiteSchema,
	generateOrganizationSchema
} from '$lib/seo';
import { paragraphs } from '../data';

// Prerender as static HTML: served instantly from CDN
export const prerender = true;

export const load: PageLoad = ({ data }) => {
	// Trailing slash: the root's canonical must match the URL Google actually
	// indexes, and it serves and links as "/" everywhere else on the site.
	const url = 'https://streamingcalculator.com/';

	// latestPosts / featuredSlug come from +page.server.ts so the blog
	// metadata module never reaches the browser.
	return {
		...data,
		seo: {
			...defaultSEO,
			canonical: url
		},
		schemas: [
			generateWebAppSchema(url),
			generateFAQSchema(paragraphs),
			generateDatasetSchema(),
			generateHowToSchema(),
			generateSpeakableSchema(url),
			// Site-level entities, homepage only.
			generateWebSiteSchema(),
			generateOrganizationSchema()
		]
	};
};
