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
		<h1 class="text-2xl font-bold text-text">Privacy Policy</h1>
		<p class="text-sm text-text-secondary mt-2">Last updated: January 2026</p>
	</header>

	<div class="page-content">
		<h2>1. Introduction</h2>
		<p>
			Streaming Calculator ("we", "us", or "our") operates the website
			<a href="https://streamingcalculator.com">streamingcalculator.com</a>. This Privacy Policy
			explains how we collect, use, and protect your information when you use our Service.
		</p>

		<h2>2. Information We Collect</h2>
		<p>We collect minimal information to provide and improve our Service:</p>
		<ul>
			<li><strong>Usage data:</strong> Pages visited, time spent, browser type, device type, and referring URL, collected automatically via analytics tools.</li>
			<li><strong>Local storage:</strong> Your currency preference is stored locally on your device. This data never leaves your browser.</li>
			<li><strong>No account or personal data:</strong> We do not require registration and do not collect names, emails, or any personally identifiable information through the calculator itself.</li>
		</ul>

		<h2>3. Cookies and Tracking</h2>
		<p>Our site uses cookies and similar technologies for the following purposes:</p>
		<ul>
			<li><strong>Essential cookies:</strong> Required for basic site functionality.</li>
			<li><strong>Analytics cookies:</strong> Help us understand how visitors use the site (e.g., Cloudflare Web Analytics).</li>
		</ul>
		<p>
			You can manage your cookie preferences through the consent banner shown on your first visit.
			You may also disable cookies in your browser settings, though this may affect site functionality.
		</p>

		<h2>4. Third-Party Services</h2>
		<p>We use the following third-party services that may collect data:</p>
		<ul>
			<li><strong>Cloudflare:</strong> Hosting and privacy-focused website analytics. See <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">Cloudflare's Privacy Policy</a>.</li>
		</ul>
		<p>
			Our site also contains affiliate links to third-party services (e.g., DistroKid, Plugin Boutique).
			Clicking these links may allow those services to collect data according to their own privacy policies.
		</p>

		<h2>5. Data Retention</h2>
		<p>
			We do not store personal data on our servers. Analytics data is retained by our third-party
			analytics providers according to their respective policies. Cookies expire according to the
			durations set by each provider.
		</p>

		<h2>6. Your Rights</h2>
		<p>Depending on your location, you may have the right to:</p>
		<ul>
			<li>Access the personal data we hold about you</li>
			<li>Request deletion of your data</li>
			<li>Opt out of personalized advertising</li>
			<li>Withdraw consent at any time via the cookie consent banner</li>
		</ul>
		<p>
			<strong>For EU/EEA residents (GDPR):</strong> You have the right to access, rectify, or erase
			your personal data, as well as the right to restrict or object to processing.
		</p>
		<p>
			<strong>For California residents (CCPA):</strong> You have the right to know what personal
			information is collected and to opt out of the sale of your personal information.
		</p>

		<h2>7. Children's Privacy</h2>
		<p>
			Our Service is not directed at children under 13. We do not knowingly collect personal
			information from children.
		</p>

		<h2>8. Changes to This Policy</h2>
		<p>
			We may update this Privacy Policy from time to time. Changes will be posted on this page with
			an updated revision date. Continued use of the Service after changes constitutes acceptance of
			the updated policy.
		</p>

		<h2>9. Contact</h2>
		<p>
			If you have questions about this Privacy Policy, contact us at
			<a href="mailto:thestreamingcalculator@gmail.com">thestreamingcalculator@gmail.com</a>.
		</p>
	</div>

	<!-- Back link (mobile only) -->
	<div class="back-link-mobile" style="text-align: center; margin-top: 32px;">
		<a href="/" class="link">← Back to Calculator</a>
	</div>

</div>

<style>
	.page-content :global(h3) {
		color: var(--text);
		font-size: 1rem;
		font-weight: 500;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}
</style>
