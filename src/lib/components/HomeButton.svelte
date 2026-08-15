<script lang="ts">
	import { browser } from '$app/environment';

	function goBack() {
		if (browser) {
			history.back();
		}
	}
</script>

<button class="home-float" on:click={goBack} aria-label="Go back">
	←
</button>
