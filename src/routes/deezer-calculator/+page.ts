import type { PageLoad } from './$types';
import { platforms } from '../../data';
import {
	platformSEO,
	generatePlatformCalculatorSchema,
	generatePlatformFAQSchema,
	generateBreadcrumbSchema
} from '$lib/seo';
import { loadEditorial } from '$lib/data/editorial';

export const prerender = true;

export const load: PageLoad = async () => {
	const platform = platforms['deezer'];
	const url = 'https://streamingcalculator.com/deezer-calculator';

	return {
		platform,
		editorial: await loadEditorial('platform', 'deezer'),
		seo: platformSEO(platform),
		schemas: [
			generatePlatformCalculatorSchema(platform, url),
			generatePlatformFAQSchema(platform),
			generateBreadcrumbSchema([], `${platform.name} Pay Per Stream`)
		]
	};
};
