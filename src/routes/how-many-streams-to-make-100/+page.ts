import type { PageLoad } from './$types';
import { goalSEO, generateGoalSchema } from '$lib/seo';
import { loadEditorial } from '$lib/data/editorial';

export const prerender = true;

export const load: PageLoad = async () => {
	const amount = 100;
	const label = '$100';
	const url = 'https://streamingcalculator.com/how-many-streams-to-make-100';

	return {
		amount,
		label,
		editorial: await loadEditorial('goal', '100'),
		seo: goalSEO(amount, label),
		schemas: [generateGoalSchema(amount, label, url)]
	};
};
