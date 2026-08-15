<script lang="ts">
	import type { PageData } from './$types';
	import { absoluteUrl } from '$lib/seo';

	export let data: PageData;

	// Absolute, or every social scraper renders a blank card.
	$: ogImage = absoluteUrl(data.seo.ogImage ?? '/og-image.png');
</script>

<svelte:head>
	<title>{data.seo.title}</title>
	<meta name="description" content={data.seo.description} />
	<meta name="keywords" content={data.seo.keywords} />
	<link rel="canonical" href={data.seo.canonical} />
	<meta property="og:title" content={data.seo.title} />
	<meta property="og:description" content={data.seo.description} />
	<meta property="og:type" content={data.seo.ogType} />
	<meta property="og:url" content={data.seo.canonical} />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content={data.seo.twitterCard} />
	<meta name="twitter:title" content={data.seo.title} />
	<meta name="twitter:description" content={data.seo.description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<div class="container">
	<header class="py-8 text-center">
		<h1 class="text-2xl font-bold text-text">Terms of Service</h1>
		<p class="text-sm text-text-secondary mt-2">Last updated: February 2026</p>
	</header>

	<div class="page-content">
		<h2>1. Acceptance of Terms</h2>
		<p>
			By accessing and using Streaming Calculator ("the Service"), you agree to be bound by these
			Terms of Service. If you do not agree to these terms, please do not use the Service.
		</p>

		<h2>2. Description of Service</h2>
		<p>
			Streaming Calculator is a free online tool that provides estimates of music streaming royalties
			across various platforms. The Service is provided "as is" for informational and educational
			purposes only.
		</p>

		<h2>3. Disclaimer of Accuracy</h2>
		<p>
			All royalty calculations are estimates based on publicly available per-stream rate data.
			Actual payouts vary by distributor, territory, listener subscription type, and each platform's
			proprietary payout model. Streaming Calculator is not affiliated with any streaming platform
			or music distributor. We make no guarantees regarding the accuracy, completeness, or
			timeliness of any calculation or data displayed.
		</p>

		<h2>4. Use of the Service</h2>
		<p>You agree to use the Service only for lawful purposes and in accordance with these terms. You agree not to:</p>
		<ul>
			<li>Use the Service in any way that could damage, disable, or impair it</li>
			<li>Attempt to gain unauthorized access to any part of the Service</li>
			<li>Use automated systems or software to extract data from the Service for commercial purposes</li>
		</ul>

		<h2>5. Intellectual Property</h2>
		<p>
			All content, design, and code of Streaming Calculator are the property of their respective
			owners. Streaming platform logos and names are trademarks of their respective companies and
			are used for identification purposes only.
		</p>

		<h2>6. Third-Party Links</h2>
		<p>
			The Service may contain links to third-party websites or services, including affiliate links.
			We are not responsible for the content or practices of any third-party sites. Affiliate
			relationships do not influence our calculations or editorial content.
		</p>

		<h2>7. Advertising</h2>
		<p>
			The Service displays advertisements provided by third-party ad networks. These ad partners
			may use cookies and similar technologies to serve relevant ads. For more information, see our
			<a href="/privacy-policy">Privacy Policy</a>.
		</p>

		<h2>8. Limitation of Liability</h2>
		<p>
			To the fullest extent permitted by law, Streaming Calculator shall not be liable for any
			indirect, incidental, special, or consequential damages arising from your use of the Service.
			You should not rely solely on our estimates for financial decisions.
		</p>

		<h2>9. Changes to Terms</h2>
		<p>
			We reserve the right to modify these terms at any time. Changes will be effective immediately
			upon posting. Continued use of the Service after changes constitutes acceptance of the
			updated terms.
		</p>

		<h2>10. Contact</h2>
		<p>
			If you have questions about these terms, contact us at
			<a href="mailto:thestreamingcalculator@gmail.com">thestreamingcalculator@gmail.com</a>.
		</p>
	</div>

	<!-- Back link (mobile only) -->
	<div class="back-link-mobile" style="text-align: center; margin-top: 32px;">
		<a href="/" class="link">← Back to Calculator</a>
	</div>
</div>
