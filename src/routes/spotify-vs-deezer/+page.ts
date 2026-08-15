import type { PageLoad } from './$types';
import { platforms } from '../../data';
import { comparisonSEO, generateComparisonSchema, generateBreadcrumbSchema } from '$lib/seo';
import { loadEditorial } from '$lib/data/editorial';

export const prerender = true;

export const load: PageLoad = async () => {
	const a = platforms['spotify'];
	const b = platforms['deezer'];
	const url = 'https://streamingcalculator.com/spotify-vs-deezer';

	return {
		platformA: a,
		platformB: b,
		editorial: await loadEditorial('comparison', 'spotify-vs-deezer'),
		seo: comparisonSEO(a, b),
		schemas: [
			generateComparisonSchema(a, b, url),
			generateBreadcrumbSchema([], `${a.name} vs ${b.name}`)
		]
	};
};
