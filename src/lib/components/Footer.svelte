<script lang="ts">
	function openCookieSettings() {
		if (typeof window !== 'undefined' && (window as any).ezCMP) {
			(window as any).ezCMP.generateCMPFromPrivacyCenter();
		}
	}
</script>

<footer class="footer">
	<p>
		<a href="/blog" class="footer-link">Blog</a>
		<span class="footer-dot">·</span>
		<a href="/about" class="footer-link">About</a>
		<span class="footer-dot">·</span>
		<a href="/contact" class="footer-link">Contact</a>
		<span class="footer-dot">·</span>
		<a href="/advertise" class="footer-link">Advertise</a>
		<span class="footer-dot">·</span>
		<a href="/privacy-policy" class="footer-link">Privacy</a>
		<span class="footer-dot">·</span>
		<a href="/terms" class="footer-link">Terms</a>
		<span class="footer-dot">·</span>
		<button class="footer-link cookie-btn" on:click={openCookieSettings}>Cookies</button>
	</p>
	<p class="footer-copy">© {new Date().getFullYear()} Streaming Calculator</p>
</footer>

<style>
	.cookie-btn {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
	}
</style>
