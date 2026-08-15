export interface EditorialSection {
	title: string;
	content: string; // HTML string
}

// Platform editorial content, keyed by platform slug

// Each page's prose lives in its own module under ./sections so that a
// calculator or comparison page ships only the few paragraphs it renders
// instead of the prose for all 21 pages.
//
// To edit a page's copy, edit ./sections/<kind>-<key>.ts directly.

const sectionModules = import.meta.glob<{ sections: EditorialSection[] }>('./sections/*.ts');

export type EditorialKind = 'platform' | 'comparison' | 'goal';

/** Resolves one page's editorial sections, or [] when there are none. */
export async function loadEditorial(kind: EditorialKind, key: string): Promise<EditorialSection[]> {
	const load = sectionModules[`./sections/${kind}-${key}.ts`];
	if (!load) return [];
	return (await load()).sections;
}
