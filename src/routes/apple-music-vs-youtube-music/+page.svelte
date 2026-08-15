<script lang="ts">
	import { SEOHead, ComparisonTable } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<SEOHead seo={data.seo} schemas={data.schemas} />
<ComparisonTable platformA={data.platformA} platformB={data.platformB} editorial={data.editorial} />
