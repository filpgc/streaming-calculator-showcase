export const AUTHOR = {
	name: 'Filippo Piggici',
	jobTitle: 'Music Industry Analyst',
	url: 'https://streamingcalculator.com/about',
	bio: 'Filippo Piggici is a music industry analyst who tracks streaming economics, per-stream rates, and platform payout models. His research helps independent artists understand and maximize their streaming revenue.'
};

export const SITE_URL = 'https://streamingcalculator.com';

/**
 * Open Graph and Twitter image URLs must be absolute. Facebook, LinkedIn,
 * WhatsApp, Slack and iMessage all silently drop a relative one and render a
 * blank card, which is the opposite of what a share button is for.
 */
export function absoluteUrl(path: string): string {
	if (/^https?:\/\//i.test(path)) return path;
	return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/**
 * The date the rate data behind the calculators and rate pages last changed,
 * used as sitemap lastmod for every page derived from it. Bump it when the
 * rates in `streamingRates` move; a page that did not change should not claim
 * it did.
 */
export const RATES_UPDATED = '2026-01-01';

/**
 * The year the rate data claims to describe. Titles and descriptions lean on it
 * heavily ("...Pay Per Stream? 2026"), so it is derived from RATES_UPDATED
 * rather than typed out again — a stale year in a title is a ranking problem,
 * and one bump should move all of them.
 */
export const RATE_YEAR = RATES_UPDATED.slice(0, 4);

export interface SEOData {
	title: string;
	description: string;
	keywords?: string;
	canonical?: string;
	ogImage?: string;
	ogType?: string;
	twitterCard?: string;
	/** Emit a robots noindex meta tag (unlisted/preview pages). */
	noindex?: boolean;
}

export const defaultSEO: SEOData = {
	title: 'Music Streaming Royalty Calculator 2026',
	description:
		'Free royalty calculator for Spotify, Apple Music, YouTube Music, Tidal, Deezer and Amazon Music. See what each pays per stream in 2026.',
	keywords:
		'music royalty calculator, streaming royalty calculator, spotify royalty calculator 2026, how much does spotify pay per stream, apple music royalties calculator, music streaming earnings calculator, spotify payout calculator',
	ogImage: '/og-image.png',
	ogType: 'website',
	twitterCard: 'summary_large_image'
};

// Current streaming rates (updated 2026)
export const streamingRates = {
	spotify: { rate: 0.0034, currency: 'USD', updated: '2026-01' },
	appleMusic: { rate: 0.00675, currency: 'USD', updated: '2026-01' },
	youtubeMusic: { rate: 0.00735, currency: 'USD', updated: '2026-01' },
	amazonMusic: { rate: 0.00426, currency: 'USD', updated: '2026-01' },
	tidal: { rate: 0.00876, currency: 'USD', updated: '2026-01' },
	deezer: { rate: 0.00562, currency: 'USD', updated: '2026-01' }
};

export function generateWebAppSchema(url: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: 'Music Streaming Royalty Calculator',
		alternateName: 'Streaming Calculator',
		description:
			'Free music royalty calculator to estimate streaming earnings from Spotify, Apple Music, YouTube Music, Tidal, Deezer, Amazon Music and more. Enter stream counts to see earnings.',
		url,
		applicationCategory: 'FinanceApplication',
		operatingSystem: 'Any',
		browserRequirements: 'Requires JavaScript',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD'
		},
		featureList: [
			'Calculate Spotify royalties',
			'Calculate Apple Music royalties',
			'Calculate YouTube Music royalties',
			'Multi-currency support (USD, GBP, EUR)',
			'Royalty percentage adjustment',
			'Discovery Mode calculation for Spotify'
		],
		creator: {
			'@type': 'Organization',
			name: 'Music Streaming Royalty Calculator'
		}
	};
}

export function generateFAQSchema(faqs: Array<{ heading: string; body: string }>) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.heading,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.body
			}
		}))
	};
}

// Dataset schema for streaming rates: helps AI understand the data
export function generateDatasetSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Dataset',
		name: 'Music Streaming Platform Pay Rates 2026',
		description:
			'Current pay-per-stream rates for major music streaming platforms including Spotify, Apple Music, YouTube Music, Amazon Music, Tidal, and Deezer.',
		temporalCoverage: '2026',
		creator: {
			'@type': 'Organization',
			name: 'Streaming Calculator'
		},
		distribution: {
			'@type': 'DataDownload',
			encodingFormat: 'application/json',
			contentUrl: 'https://streamingcalculator.com/api/rates'
		},
		variableMeasured: [
			{
				'@type': 'PropertyValue',
				name: 'Spotify pay per stream',
				value: '$0.003 to $0.005'
			},
			{
				'@type': 'PropertyValue',
				name: 'Apple Music pay per stream',
				value: '$0.006 to $0.008'
			},
			{
				'@type': 'PropertyValue',
				name: 'YouTube Music pay per stream',
				value: '$0.006 to $0.009'
			}
		]
	};
}

// HowTo schema for AI to understand the calculator usage
export function generateHowToSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name: 'How to Calculate Music Streaming Royalties',
		description:
			'Step-by-step guide to calculate your music streaming earnings from platforms like Spotify and Apple Music.',
		step: [
			{
				'@type': 'HowToStep',
				position: 1,
				name: 'Enter stream counts',
				text: 'Enter the number of streams for each platform (Spotify, Apple Music, YouTube Music, etc.)'
			},
			{
				'@type': 'HowToStep',
				position: 2,
				name: 'Adjust royalty percentage',
				text: 'Set your royalty share percentage (100% if independent, less if signed to a label)'
			},
			{
				'@type': 'HowToStep',
				position: 3,
				name: 'Select currency',
				text: 'Choose your preferred currency (USD, GBP, or EUR)'
			},
			{
				'@type': 'HowToStep',
				position: 4,
				name: 'View earnings',
				text: 'See your estimated total earnings and per-platform breakdown'
			}
		],
		tool: {
			'@type': 'HowToTool',
			name: 'Music Streaming Royalty Calculator'
		}
	};
}

/**
 * Site-level WebSite entity, tying the pages to one named publisher so Google
 * has an explicit site identity rather than one inferred from the markup.
 *
 * Homepage only: it describes the site, not the page, and repeating it on 244
 * pages says nothing extra. No SearchAction — that requires a real search
 * endpoint, and the site has none.
 */
export function generateWebSiteSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${SITE_URL}/#website`,
		url: `${SITE_URL}/`,
		name: 'Streaming Calculator',
		alternateName: 'Music Streaming Royalty Calculator',
		description: defaultSEO.description,
		inLanguage: 'en',
		publisher: { '@id': `${SITE_URL}/#organization` }
	};
}

/**
 * Breadcrumb trail for a page below the root.
 *
 * Two jobs: Google replaces the raw URL in the result with the trail, which
 * reads better and lifts CTR, and it states the site's hierarchy explicitly
 * rather than leaving it to be inferred from links. Pass the path from the
 * homepage down to, but not including, the current page — the current page is
 * appended as the last, unlinked crumb.
 */
export function generateBreadcrumbSchema(
	trail: Array<{ name: string; path: string }>,
	current: string
) {
	const crumbs = [{ name: 'Home', path: '/' }, ...trail];
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			...crumbs.map((c, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: c.name,
				item: absoluteUrl(c.path)
			})),
			// Last crumb carries no `item`: it is the page being viewed, and Google
			// treats a self-link here as a malformed trail.
			{ '@type': 'ListItem', position: crumbs.length + 1, name: current }
		]
	};
}

export function generateOrganizationSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': `${SITE_URL}/#organization`,
		name: 'Music Streaming Royalty Calculator',
		url: `${SITE_URL}/`,
		logo: `${SITE_URL}/logo.png`,
		description:
			'Free tools for musicians to calculate music streaming royalties and understand their earnings.',
		foundingDate: '2024',
		founder: {
			'@type': 'Person',
			name: AUTHOR.name,
			jobTitle: AUTHOR.jobTitle,
			url: AUTHOR.url
		},
		sameAs: ['https://www.instagram.com/streamingcalculator/']
	};
}

// Speakable schema for voice assistants
export function generateSpeakableSchema(url: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: 'Music Streaming Royalty Calculator',
		speakable: {
			'@type': 'SpeakableSpecification',
			cssSelector: ['.header-title', '.header-subtitle', '.result-value', '.result-meta']
		},
		url
	};
}

// --- SEO factories for traffic pages ---

import type { PlatformData } from '../data';

export function platformSEO(platform: PlatformData): SEOData {
	return {
		/**
		 * Leads with "Royalty Calculator" and never with the rate question, even
		 * though these pages rank poorly for the calculator cluster.
		 *
		 * Search Console, 22 Jul - 8 Aug, split by what the searcher typed:
		 *
		 *   queries containing "calculator"   12,842 impr -> 1,794 clicks (13.97%)
		 *   queries phrased as a question      5,655 impr ->     13 clicks (0.23%)
		 *
		 * Restricted to page-one positions so ranking is not the variable, it is
		 * 14.45% against 0.27% - a 53x gap on intent alone. The reason is visible
		 * in the SERP: for "how much is 80 million streams on apple music" Google's
		 * AI Overview quotes this site's own sentence, cites it, and answers the
		 * question in place. Rate questions are harvested; a calculator cannot be,
		 * because the visitor has to come here and type a number.
		 *
		 * A previous pass retargeted these at the rate question to stop them
		 * competing with the homepage. That fixed the wrong problem: the homepage
		 * does out-rank them, but the destination pays nothing. Losing to your own
		 * best page beats winning dead inventory.
		 *
		 * Longest platform name fits at 52 characters.
		 */
		title: `${platform.name} Royalty Calculator: Pay Per Stream ${RATE_YEAR}`,
		description: `${platform.name} pays ${platform.seoRate} per stream in ${RATE_YEAR}. Enter your stream count to estimate what you have earned.`,
		keywords: `${platform.name.toLowerCase()} royalty calculator 2026, how much does ${platform.name.toLowerCase()} pay per stream, ${platform.slug} streams to dollars, ${platform.slug} earnings calculator`,
		canonical: `https://streamingcalculator.com/${platform.slug}-calculator`,
		ogImage: '/og-image.png',
		ogType: 'website',
		twitterCard: 'summary_large_image'
	};
}

export function comparisonSEO(a: PlatformData, b: PlatformData): SEOData {
	return {
		title: `${a.name} vs ${b.name} Royalties: Which Pays More?`,
		description: `${a.name} pays ${a.seoRate} per stream, ${b.name} pays ${b.seoRate}. Compare 2026 payouts and see which earns you more.`,
		keywords: `${a.name.toLowerCase()} vs ${b.name.toLowerCase()} royalties, ${a.slug} vs ${b.slug} pay per stream, streaming royalties comparison 2026`,
		canonical: `https://streamingcalculator.com/${a.slug}-vs-${b.slug}`,
		ogImage: '/og-image.png',
		ogType: 'website',
		twitterCard: 'summary_large_image'
	};
}

export function goalSEO(amount: number, label: string): SEOData {
	return {
		title: `How Many Streams to Make ${label}? (2026)`,
		description: `How many Spotify, Apple Music, YouTube Music and Tidal streams you need to earn ${label}, at 2026 per-stream rates.`,
		keywords: `how many streams to make ${label}, streams needed to earn ${label}, spotify streams ${label}, streaming earnings goal calculator 2026`,
		canonical: `https://streamingcalculator.com/how-many-streams-to-make-${amount}`,
		ogImage: '/og-image.png',
		ogType: 'website',
		twitterCard: 'summary_large_image'
	};
}

export function generatePlatformCalculatorSchema(platform: PlatformData, url: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		name: `${platform.name} Royalty Calculator`,
		description: `Calculate your ${platform.name} streaming royalties. ${platform.name} pays ${platform.seoRate} per stream in 2026.`,
		url,
		applicationCategory: 'FinanceApplication',
		operatingSystem: 'Any',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD'
		}
	};
}

export function generatePlatformFAQSchema(platform: PlatformData) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: platform.faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.heading,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.body
			}
		}))
	};
}

export function generateComparisonSchema(a: PlatformData, b: PlatformData, url: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: `${a.name} vs ${b.name} Streaming Royalties Comparison`,
		description: `Side-by-side comparison of ${a.name} and ${b.name} pay-per-stream rates in 2026.`,
		url,
		mainEntity: {
			'@type': 'Table',
			about: `${a.name} vs ${b.name} streaming royalty rates`
		}
	};
}

export function generateArticleSchema(article: {
	title: string;
	excerpt: string;
	date: string;
	lastModified?: string;
	author?: string;
	slug: string;
	category: string;
	readTime: string;
	content?: string;
}) {
	const wordCount = article.content
		? article.content
				.replace(/<[^>]*>/g, ' ')
				.replace(/\s+/g, ' ')
				.trim()
				.split(/\s+/).length
		: parseInt(article.readTime.replace(/\D/g, '')) * 200;
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: article.title,
		description: article.excerpt,
		datePublished: article.date,
		dateModified: article.lastModified || article.date,
		image: 'https://streamingcalculator.com/og-image.png',
		inLanguage: 'en',
		author: {
			'@type': 'Person',
			name: article.author || AUTHOR.name,
			jobTitle: AUTHOR.jobTitle,
			url: AUTHOR.url
		},
		publisher: {
			'@type': 'Organization',
			name: 'Streaming Calculator',
			url: 'https://streamingcalculator.com'
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `https://streamingcalculator.com/blog/${article.slug}`
		},
		articleSection: article.category,
		wordCount
	};
}

/** Roughly where Google truncates a title in results. */
const TITLE_LIMIT = 60;
/** Roughly where it truncates a description. */
const DESCRIPTION_LIMIT = 155;

/**
 * Append the brand only when it still fits. Post titles are descriptive and
 * often long on their own, and a suffix that pushes the whole thing past the
 * limit costs the end of the actual headline to buy nothing.
 */
function withBrand(title: string): string {
	const suffixed = `${title} | Streaming Calculator`;
	return suffixed.length <= TITLE_LIMIT ? suffixed : title;
}

/**
 * Excerpts are written for the blog listing card and run to 300 characters, so
 * using one verbatim as a meta description guarantees a truncated snippet. Cut
 * at the last sentence that fits, falling back to the last whole word, so the
 * snippet still ends somewhere deliberate. Posts that need an exact snippet set
 * metaDescription instead.
 */
function trimToLimit(text: string, limit = DESCRIPTION_LIMIT): string {
	if (text.length <= limit) return text;

	const head = text.slice(0, limit);
	const lastSentence = Math.max(
		head.lastIndexOf('. '),
		head.lastIndexOf('? '),
		head.lastIndexOf('! ')
	);
	if (lastSentence > limit * 0.6) return head.slice(0, lastSentence + 1);

	const lastWord = head.lastIndexOf(' ');
	return `${head.slice(0, lastWord > 0 ? lastWord : limit).replace(/[,;:.\s]+$/, '')}...`;
}

export function blogSEO(article: {
	title: string;
	excerpt: string;
	slug: string;
	hidden?: boolean;
	/** Overrides the post title in search results when it runs long. */
	seoTitle?: string;
	/** Overrides the trimmed excerpt as the meta description. */
	metaDescription?: string;
}): SEOData {
	return {
		title: withBrand(article.seoTitle ?? article.title),
		description: article.metaDescription ?? trimToLimit(article.excerpt),
		keywords:
			'streaming royalties, music streaming, artist earnings, spotify royalties, music industry',
		canonical: `https://streamingcalculator.com/blog/${article.slug}`,
		ogImage: '/og-image.png',
		ogType: 'article',
		twitterCard: 'summary_large_image',
		noindex: article.hidden === true
	};
}

export function blogListingSEO(): SEOData {
	return {
		title: 'Blog & Guides | Streaming Calculator',
		description:
			'Guides on streaming royalties, platform payouts, and how independent artists earn more from their music in 2026.',
		keywords:
			'streaming royalties blog, music streaming guides, artist earnings tips, spotify royalties guide',
		canonical: 'https://streamingcalculator.com/blog',
		ogImage: '/og-image.png',
		ogType: 'website',
		twitterCard: 'summary_large_image'
	};
}

export function generateGoalSchema(amount: number, label: string, url: string) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: `How Many Streams to Make ${label}`,
		description: `Calculate streams needed to earn ${label} on each streaming platform.`,
		url,
		speakable: {
			'@type': 'SpeakableSpecification',
			cssSelector: ['.goal-header', '.goal-table']
		}
	};
}
