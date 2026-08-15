import { platforms, comparisonPairs, goalAmounts } from '../../data';
import { blogPosts } from '$lib/data/blog';
import { countries } from '$lib/data/countries';
import { RATES_UPDATED } from '$lib/seo';

/**
 * Dates the site's non-editorial pages actually changed.
 *
 * This used to stamp `new Date()` on all 171 URLs, so the sitemap claimed
 * every page changed today, every day. Google learns to ignore a lastmod that
 * behaves like that, and the signal is then unavailable for the pages that
 * really did change. Calculator and rate pages derive from the rate data, so
 * they carry its date; the handful of static pages carry their own.
 */
const STATIC_UPDATED = '2026-06-01';

export function GET() {
	const site = 'https://streamingcalculator.com';
	// The listing changes when a post lands, so it inherits the newest date.
	const published = blogPosts.filter((post) => !post.hidden);
	const newestPost = published.reduce(
		(latest, post) => (post.date > latest ? post.date : latest),
		STATIC_UPDATED
	);
	const pages = [
		{ url: '/', priority: '1.0', changefreq: 'weekly', lastmod: RATES_UPDATED },
		{ url: '/reverse-royalty-calculator', priority: '0.8', changefreq: 'weekly', lastmod: RATES_UPDATED },
		{ url: '/distributor-calculator', priority: '0.9', changefreq: 'weekly', lastmod: RATES_UPDATED },
		{
			url: '/royalty-advance-calculator',
			priority: '0.9',
			changefreq: 'weekly',
			lastmod: RATES_UPDATED
		},
		// Platform calculator pages
		...Object.values(platforms).map((p) => ({
			url: `/${p.slug}-calculator`,
			priority: '0.9',
			changefreq: 'weekly',
			lastmod: RATES_UPDATED
		})),
		// Comparison pages
		...comparisonPairs.map(([a, b]) => ({
			url: `/${a}-vs-${b}`,
			priority: '0.8',
			changefreq: 'weekly',
			lastmod: RATES_UPDATED
		})),
		// Creator money pages
		{ url: '/youtube-money-calculator', priority: '0.9', changefreq: 'weekly', lastmod: RATES_UPDATED },
		{ url: '/twitch-money-calculator', priority: '0.9', changefreq: 'weekly', lastmod: RATES_UPDATED },
		{ url: '/tiktok-money-calculator', priority: '0.9', changefreq: 'weekly', lastmod: RATES_UPDATED },
		{ url: '/tiktok-gift-calculator', priority: '0.9', changefreq: 'weekly', lastmod: RATES_UPDATED },
		{ url: '/how-much-does-youtube-pay', priority: '0.8', changefreq: 'monthly', lastmod: RATES_UPDATED },
		...countries.map((c) => ({
			url: `/youtube-money-calculator-${c.slug}`,
			priority: '0.6',
			changefreq: 'monthly',
			lastmod: RATES_UPDATED
		})),
		// Country royalty rate pages
		{ url: '/streaming-royalty-rates', priority: '0.8', changefreq: 'monthly', lastmod: RATES_UPDATED },
		...countries.map((c) => ({
			url: `/streaming-royalty-rates-${c.slug}`,
			priority: '0.7',
			changefreq: 'monthly',
			lastmod: RATES_UPDATED
		})),
		// Goal pages
		...goalAmounts.map((g) => ({
			url: `/how-many-streams-to-make-${g.amount}`,
			priority: '0.8',
			changefreq: 'weekly',
			lastmod: RATES_UPDATED
		})),
		// Blog pages
		{ url: '/blog', priority: '0.8', changefreq: 'weekly', lastmod: newestPost },
		...blogPosts
			.filter((post) => !post.hidden)
			.map((post) => ({
				url: `/blog/${post.slug}`,
				priority: '0.7',
				changefreq: 'monthly',
				lastmod: post.date
			})),
		{ url: '/about', priority: '0.5', changefreq: 'monthly', lastmod: STATIC_UPDATED },
		{ url: '/advertise', priority: '0.4', changefreq: 'monthly', lastmod: STATIC_UPDATED },
		{ url: '/contact', priority: '0.5', changefreq: 'monthly', lastmod: STATIC_UPDATED },
		{ url: '/privacy-policy', priority: '0.3', changefreq: 'monthly', lastmod: STATIC_UPDATED },
		{ url: '/terms', priority: '0.3', changefreq: 'monthly', lastmod: STATIC_UPDATED }
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${site}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
