import type { PageLoad } from './$types';
import { platforms } from '../../data';
import { comparisonSEO, generateComparisonSchema, generateBreadcrumbSchema } from '$lib/seo';
import { loadEditorial } from '$lib/data/editorial';

export const prerender = true;

export const load: PageLoad = async () => {
	const a = platforms['apple-music'];
	const b = platforms['amazon-music'];
	const url = 'https://streamingcalculator.com/apple-music-vs-amazon-music';

	return {
		platformA: a,
		platformB: b,
		editorial: await loadEditorial('comparison', 'apple-music-vs-amazon-music'),
		seo: comparisonSEO(a, b),
		schemas: [
			generateComparisonSchema(a, b, url),
			generateBreadcrumbSchema([], `${a.name} vs ${b.name}`)
		]
	};
};
