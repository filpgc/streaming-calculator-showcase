<script lang="ts">
	import { SEOHead, GoalTable } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<SEOHead seo={data.seo} schemas={data.schemas} />
<GoalTable amount={data.amount} label={data.label} editorial={data.editorial} />
