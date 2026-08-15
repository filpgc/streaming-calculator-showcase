/**
 * Site navigation. One bar, identical on every page.
 *
 * This used to define four "sections" (music, youtube, twitch, tiktok) and swap
 * the nav links depending on which one the visitor was in. That was dropped: the
 * links moved under you as you browsed, so the same site read as several
 * different ones and nothing in the bar could be relied on to stay put. The
 * grouped calculator menus already cover every vertical, which is what the
 * section switching was really for.
 *
 * The sponsor pill is the one remaining path-dependent piece, and it is
 * commercial rather than navigational. See showSponsorPill below.
 */

export interface SectionLink {
	href: string;
	label: string;
}

/**
 * Every calculator on the site, grouped by what the visitor came to work out.
 *
 * One list feeding both navs. The site had grown to nine calculators reachable
 * only from whichever page happened to link to them, so someone on the TikTok
 * page had no way of knowing the gift calculator or the advance calculator
 * existed. Grouped rather than flat because "Spotify" and "TikTok gifts" are not
 * the same kind of thing and a single column of nine links reads as a sitemap.
 */
export interface CalculatorGroup {
	name: string;
	/**
	 * Label for the desktop trigger, where the group is a nav item rather than a
	 * heading inside a panel. "By platform" reads as a column header but not as
	 * something you click, so that group is "Platforms" in the bar.
	 */
	navLabel?: string;
	links: (SectionLink & { note?: string })[];
}

export const calculatorGroups: CalculatorGroup[] = [
	{
		name: 'Music',
		links: [
			{ href: '/', label: 'Streaming royalties', note: 'What your streams paid' },
			{ href: '/reverse-royalty-calculator', label: 'Reverse', note: 'Streams to hit a target' },
			{ href: '/distributor-calculator', label: 'Distributors', note: 'Real cost compared' },
			{ href: '/royalty-advance-calculator', label: 'Royalty advance', note: 'Your catalog as cash' },
			{ href: '/streaming-royalty-rates', label: 'Rates by country' }
		]
	},
	{
		name: 'By platform',
		navLabel: 'Platforms',
		links: [
			{ href: '/spotify-calculator', label: 'Spotify' },
			{ href: '/apple-music-calculator', label: 'Apple Music' },
			{ href: '/youtube-music-calculator', label: 'YouTube Music' },
			{ href: '/amazon-music-calculator', label: 'Amazon Music' },
			{ href: '/tidal-calculator', label: 'Tidal' },
			{ href: '/deezer-calculator', label: 'Deezer' }
		]
	},
	{
		name: 'Creator',
		links: [
			{ href: '/youtube-money-calculator', label: 'YouTube money', note: 'RPM by niche' },
			{ href: '/tiktok-money-calculator', label: 'TikTok money', note: 'Views and Creator Rewards' },
			{ href: '/tiktok-gift-calculator', label: 'TikTok gifts', note: 'Coins and diamonds' },
			{ href: '/twitch-money-calculator', label: 'Twitch', note: 'Subs and bits' },
			// Not a calculator, but the only nav route to it was the YouTube
			// section's left-hand link, which no longer exists. Left out, the page
			// would have no internal link outside body copy.
			{ href: '/how-much-does-youtube-pay', label: 'How YouTube pays', note: 'Rates explained' }
		]
	}
];

/** Right-hand pill. Privacy lives in the footer, where people look for it. */
export const desktopRightLinks: SectionLink[] = [
	{ href: '/blog', label: 'Blog' },
	{ href: '/about', label: 'About' },
	{ href: '/contact', label: 'Contact' }
];

/**
 * Left of the grouped menus. Empty: every calculator is in those menus, the
 * logo goes home and highlights when you are there, and a "Calculator" link
 * beside "Calculators" was two words for one idea.
 */
export const desktopLeftLinks: SectionLink[] = [];

/**
 * The mobile panel, below the grouped calculator accordions. Anything already
 * in `calculatorGroups` is filtered out by the nav, so this is the non-tool
 * list only. Privacy stays here because the panel has room for it.
 */
export const mobileLinks: SectionLink[] = [
	{ href: '/blog', label: 'Blog' },
	{ href: '/about', label: 'About' },
	{ href: '/contact', label: 'Contact' },
	{ href: '/privacy-policy', label: 'Privacy' }
];

/**
 * Boost's pill is the one thing in the nav that still depends on the path,
 * because it is inventory rather than navigation: the flight was sold for the
 * music context, so it does not render on the creator calculators.
 *
 * These are exactly the paths that used to resolve to the youtube, twitch and
 * tiktok sections, so the pill appears in precisely the same places as before
 * this file stopped switching the nav. Note that /tiktok-gift-calculator is not
 * in the list and never was, so it does show the pill.
 *
 * If the flight is ever renegotiated to run site-wide, this becomes `true`.
 */
const NON_MUSIC_PATHS = [
	'/youtube-money-calculator',
	'/how-much-does-youtube-pay',
	'/twitch-money-calculator',
	'/tiktok-money-calculator'
];

export function showSponsorPill(pathname: string): boolean {
	return !NON_MUSIC_PATHS.some((p) => pathname.startsWith(p));
}
