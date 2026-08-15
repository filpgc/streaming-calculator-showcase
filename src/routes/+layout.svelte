<script lang="ts">
	import '../app.css';
	import { Footer } from '$lib/components';
	import FloatingNav from '$lib/components/FloatingNav.svelte';
	import { afterNavigate } from '$app/navigation';
	import { streams } from '$lib/stores';

	afterNavigate(({ from }) => {
		// `from` is null on the first load, and clearing the calculator there is
		// wrong twice over: there is nothing to clear, and it wipes any state the
		// page arrived with. A ?spotify=400000 link set its value in onMount and
		// this reset erased it a moment later, so shared and preview links landed
		// on an empty calculator. Between pages the reset still applies.
		if (from) streams.reset();
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
		window.scrollTo({ top: 0, behavior: 'instant' });
	});
</script>

<svelte:head>
	{@html `<script>
		(function() {
			try {
				var q = new URLSearchParams(location.search);
				// The public sponsor query swaps the homepage banner and nav pill.
				if (q.get('sponsor') === 'boost') {
					document.documentElement.classList.add('sponsor-preview-mode');
				}
			} catch (e) {}
		})();
	</` + `script>`}
</svelte:head>

<div class="min-h-screen site-content">
	<slot />
	<div class="container">
		<Footer />
	</div>
</div>

<FloatingNav />
