<script lang="ts">
	import { SEOHead, PlatformCalculator } from '$lib/components';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<SEOHead seo={data.seo} schemas={data.schemas} />
<PlatformCalculator platform={data.platform} editorial={data.editorial} />
