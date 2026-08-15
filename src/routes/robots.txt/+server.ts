export function GET() {
	const robotsTxt = `User-agent: *
Allow: /
Disallow: /go/

Sitemap: https://streamingcalculator.com/sitemap.xml`;

	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
}
