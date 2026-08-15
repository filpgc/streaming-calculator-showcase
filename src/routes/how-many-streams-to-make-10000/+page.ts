import type { PageLoad } from './$types';
import { goalSEO, generateGoalSchema } from '$lib/seo';
import { loadEditorial } from '$lib/data/editorial';

export const prerender = true;

export const load: PageLoad = async () => {
	const amount = 10000;
	const label = '$10,000';
	const url = 'https://streamingcalculator.com/how-many-streams-to-make-10000';

	return {
		amount,
		label,
		editorial: await loadEditorial('goal', '10000'),
		seo: goalSEO(amount, label),
		schemas: [generateGoalSchema(amount, label, url)]
	};
};
