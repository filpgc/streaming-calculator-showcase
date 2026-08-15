import { blogPosts } from '$lib/data/blog';

export const prerender = true;

export function GET() {
	const site = 'https://streamingcalculator.com';

	const visiblePosts = blogPosts.filter((post) => !post.hidden);

	const items = visiblePosts
		.map(
			(post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${site}/blog/${post.slug}</link>
      <guid isPermaLink="true">${site}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <category>${post.category}</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
		)
		.join('\n');

	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Streaming Calculator Blog</title>
    <description>Expert guides on streaming royalties, platform comparisons, and strategies to maximize your music streaming revenue.</description>
    <link>${site}/blog</link>
    <atom:link href="${site}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en</language>
    <lastBuildDate>${new Date(visiblePosts[0].date).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
