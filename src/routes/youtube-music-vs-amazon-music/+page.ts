import type { PageLoad } from './$types';
import { platforms } from '../../data';
import { comparisonSEO, generateComparisonSchema, generateBreadcrumbSchema } from '$lib/seo';
import { loadEditorial } from '$lib/data/editorial';

export const prerender = true;

export const load: PageLoad = async () => {
	const a = platforms['youtube-music'];
	const b = platforms['amazon-music'];
	const url = 'https://streamingcalculator.com/youtube-music-vs-amazon-music';

	return {
		platformA: a,
		platformB: b,
		editorial: await loadEditorial('comparison', 'youtube-music-vs-amazon-music'),
		seo: comparisonSEO(a, b),
		schemas: [
			generateComparisonSchema(a, b, url),
			generateBreadcrumbSchema([], `${a.name} vs ${b.name}`)
		]
	};
};
