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
	const platform = platforms['spotify'];
	const url = 'https://streamingcalculator.com/spotify-calculator';

	return {
		platform,
		editorial: await loadEditorial('platform', 'spotify'),
		seo: platformSEO(platform),
		schemas: [
			generatePlatformCalculatorSchema(platform, url),
			generatePlatformFAQSchema(platform),
			generateBreadcrumbSchema([], `${platform.name} Pay Per Stream`)
		]
	};
};
