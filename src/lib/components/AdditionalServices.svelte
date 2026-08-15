<script lang="ts">
	import { streamingServices } from '../../data';
	import StreamingService from './StreamingService.svelte';

	let open = false;
	$: extra = streamingServices.slice(4);
</script>

<div>
	<button
		class="w-full py-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center justify-center gap-1"
		on:click={() => (open = !open)}
	>
		{open ? 'Less' : 'More platforms'}
		<span class="text-[10px] {open ? 'rotate-180' : ''} transition-transform">▼</span>
	</button>

	{#if open}
		<div class="space-y-2 mt-2 animate-in">
			{#each extra as s}
				<StreamingService name={s.name} rate={s.rate} logo={s.logo} />
			{/each}
		</div>
	{/if}
</div>
