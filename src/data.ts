export interface StreamingService {
  name: string;
  rate: number;
  logo: string;
}

export interface PlatformData extends StreamingService {
  slug: string;
  seoRate: string;
  color: string;
  rateRange: string;
  description: string;
  faqs: { heading: string; body: string }[];
}

export const streamingServices: StreamingService[] = [
  {
    name: "Spotify",
    rate: 0.004,
    logo: "/assets/images/spotify.svg",
  },
  {
    name: "Apple Music",
    rate: 0.008,
    logo: "/assets/images/apple-music.svg",
  },
  {
    name: "Amazon Music",
    rate: 0.006,
    logo: "/assets/images/amazon-music.svg",
  },
  {
    name: "YouTube Music",
    rate: 0.007,
    logo: "/assets/images/youtube-music.svg",
  },
  {
    name: "Pandora",
    rate: 0.0013,
    logo: "/assets/images/pandora.png",
  },
  {
    name: "SoundCloud",
    rate: 0.003,
    logo: "/assets/images/soundcloud.svg",
  },
  {
    name: "Tidal",
    rate: 0.013,
    logo: "/assets/images/tidal.svg",
  },
  {
    name: "Deezer",
    rate: 0.006,
    logo: "/assets/images/deezer.svg",
  },
];

interface Paragraph {
  heading: string;
  body: string;
}

export const paragraphs: Paragraph[] = [
  {
    heading: "What are streaming royalties?",
    body: "Streaming royalties are payments made to artists, songwriters, and rights holders each time their music is played on platforms like Spotify, Apple Music, YouTube Music, Tidal, and Amazon Music. These royalties represent the primary income source for most musicians today.",
  },
  {
    heading: "How are streaming royalties calculated?",
    body: "Streaming platforms do not pay a fixed per-stream rate. Instead, each service pools its monthly subscription and advertising revenue, then distributes it proportionally based on each artist's share of total plays. If your streams represent 0.1% of a platform's total monthly streams, you receive 0.1% of the royalty pool. This is why per-stream rates vary month to month and differ between artists.",
  },
  {
    heading: "How much does Spotify pay per stream?",
    body: "Spotify pays an average of $0.003 to $0.005 per stream, though this varies based on listener location, subscription type (free vs premium), and monthly revenue pool size. Premium subscribers generate higher royalties than free-tier listeners. Streams from higher-income countries typically pay more. This calculator uses $0.0034 as the average rate.",
  },
  {
    heading: "What is Spotify Discovery Mode?",
    body: "Spotify Discovery Mode is a promotional tool where artists accept a reduced royalty rate (approximately 30% lower) in exchange for increased algorithmic promotion. Enabled tracks receive boosted placement in Radio, Autoplay, and personalized recommendations. This calculator includes a Discovery Mode toggle to estimate earnings with this trade-off.",
  },
  {
    heading: "Why do some streaming services pay more than others?",
    body: "Platforms appearing to pay higher per-stream rates typically have smaller user bases. Fewer total streams means the same revenue pool is divided among fewer plays, creating a higher per-stream figure, but not necessarily higher artist earnings. What matters is total reach: Spotify pays out more total royalties than any other service because of its scale.",
  },
  {
    heading: "How do I get my music on streaming platforms?",
    body: "You need a digital distributor to upload your music to Spotify, Apple Music, and other platforms. Unlike labels, distributors like <a href=\"https://distrokid.com/vip/seven/3063815\" target=\"_blank\" rel=\"noopener\" class=\"faq-link\">DistroKid</a> let you keep 100% of your royalties. They handle delivery to 150+ stores for a flat annual fee. Use our <a href=\"/distributor-calculator\" class=\"faq-link\">distributor cost calculator</a> to see which distributor is actually cheapest for your release schedule, or <a href=\"https://distrokid.com/vip/seven/3063815\" target=\"_blank\" rel=\"noopener\" class=\"faq-link\">claim 7% off DistroKid here</a>.",
  },
  {
    heading: "How accurate is this calculator?",
    body: "This calculator provides estimates using industry average rates for educational purposes. Actual royalties depend on listener geography, subscription tiers, platform policies, and your specific distributor agreement. Rates fluctuate monthly as revenue pools and total platform streams change. For precise earnings, always check your distributor dashboard. This site is independent and not affiliated with any streaming platform.",
  },
  {
    heading: "Does Spotify have a minimum stream requirement?",
    body: "Yes. As of 2024, Spotify requires tracks to reach at least 1,000 streams within a 12-month period before generating any royalties. Tracks below this threshold won't receive payment, regardless of their actual stream count. This policy was introduced to reduce fraudulent streaming and micro-transactions. Other platforms like Apple Music and Tidal do not currently have similar minimums.",
  },
];

export const currencyMapping = (symbol: string): string => {
	switch (symbol) {
		case 'USD':
			return 'dollars';
		case 'GBP':
			return 'pounds';
		case 'EUR':
			return 'euro';
		default:
			return 'dollars';
	}
};

export const platforms: Record<string, PlatformData> = {
	spotify: {
		name: 'Spotify',
		rate: 0.004,
		logo: '/assets/images/spotify.svg',
		slug: 'spotify',
		seoRate: '$0.003 to $0.005',
		color: '#1DB954',
		rateRange: '$0.003 to $0.005',
		description:
			'Spotify is the world\'s largest music streaming platform with over 600 million users. Artists earn an average of $0.003 to $0.005 per stream depending on listener location, subscription tier, and monthly revenue pool.',
		faqs: [
			{
				heading: 'How much does Spotify pay per stream in 2026?',
				body: 'Spotify pays an average of $0.003 to $0.005 per stream in 2026. The exact rate depends on the listener\'s country, whether they\'re on a free or premium plan, and the size of the monthly royalty pool. This calculator uses $0.004 as the average rate.'
			},
			{
				heading: 'How many Spotify streams do I need to make $1,000?',
				body: 'At an average rate of $0.004 per stream, you need approximately 250,000 Spotify streams to earn $1,000 before any distributor or label fees. With a typical 80% royalty share, you\'d need around 312,500 streams.'
			},
			{
				heading: 'Does Spotify pay more for premium listeners?',
				body: 'Yes. Streams from Spotify Premium subscribers generate significantly higher royalties than streams from free-tier listeners. Premium streams can pay 2 to 3x more because the subscription revenue pool is larger per user.'
			},
			{
				heading: 'What is Spotify Discovery Mode?',
				body: 'Discovery Mode is a Spotify feature where artists accept approximately 30% lower royalties in exchange for increased algorithmic promotion in Radio, Autoplay, and personalized playlists. It can boost streams but reduces per-stream earnings.'
			},
			{
				heading: 'Does Spotify have a minimum stream threshold?',
				body: 'Yes. Since 2024, Spotify requires tracks to reach at least 1,000 streams within 12 months before generating royalties. Tracks below this threshold earn nothing regardless of play count.'
			}
		]
	},
	'apple-music': {
		name: 'Apple Music',
		rate: 0.008,
		logo: '/assets/images/apple-music.svg',
		slug: 'apple-music',
		seoRate: '$0.006 to $0.010',
		color: '#FC3C44',
		rateRange: '$0.006 to $0.010',
		description:
			'Apple Music consistently pays one of the highest per-stream rates among major platforms. With no free tier, every listener is a paying subscriber, which drives higher royalties for artists.',
		faqs: [
			{
				heading: 'How much does Apple Music pay per stream in 2026?',
				body: 'Apple Music pays an average of $0.006 to $0.010 per stream in 2026, roughly double Spotify\'s rate. Because Apple Music has no free tier, all streams come from paying subscribers, resulting in higher per-stream payouts.'
			},
			{
				heading: 'Why does Apple Music pay more than Spotify?',
				body: 'Apple Music pays more per stream primarily because it has no ad-supported free tier. Every listener pays a subscription fee, creating a larger revenue pool per user. Spotify\'s free tier dilutes the average per-stream payout.'
			},
			{
				heading: 'How many Apple Music streams to make $1,000?',
				body: 'At an average rate of $0.008 per stream, you need approximately 125,000 Apple Music streams to earn $1,000 before any distributor or label fees, roughly half the streams needed on Spotify.'
			},
			{
				heading: 'Does Apple Music have a minimum stream requirement?',
				body: 'No. Unlike Spotify, Apple Music does not currently have a minimum stream threshold. Artists earn royalties from the very first stream, making it more accessible for smaller artists.'
			}
		]
	},
	'youtube-music': {
		name: 'YouTube Music',
		rate: 0.007,
		logo: '/assets/images/youtube-music.svg',
		slug: 'youtube-music',
		seoRate: '$0.005 to $0.009',
		color: '#FF0000',
		rateRange: '$0.005 to $0.009',
		description:
			'YouTube Music is one of the fastest-growing streaming platforms, leveraging YouTube\'s massive user base. It offers competitive per-stream rates that sit between Spotify and Apple Music.',
		faqs: [
			{
				heading: 'How much does YouTube Music pay per stream in 2026?',
				body: 'YouTube Music pays an average of $0.005 to $0.009 per stream in 2026. Rates vary based on whether the listener uses the free ad-supported tier or a paid YouTube Music Premium subscription.'
			},
			{
				heading: 'Is YouTube Music the same as YouTube royalties?',
				body: 'No. YouTube Music streams (audio-only) pay differently from YouTube video views. YouTube Music rates are typically higher per play than standard YouTube video royalties, which average $0.001 to $0.003 per view.'
			},
			{
				heading: 'How many YouTube Music streams to make $1,000?',
				body: 'At an average rate of $0.007 per stream, you need approximately 143,000 YouTube Music streams to earn $1,000 before distributor or label fees.'
			},
			{
				heading: 'Does YouTube Music have a free tier?',
				body: 'Yes. YouTube Music offers both a free ad-supported tier and YouTube Music Premium. Streams from Premium subscribers generate higher royalties, similar to the Spotify free vs premium dynamic.'
			}
		]
	},
	'amazon-music': {
		name: 'Amazon Music',
		rate: 0.006,
		logo: '/assets/images/amazon-music.svg',
		slug: 'amazon-music',
		seoRate: '$0.004 to $0.007',
		color: '#25D1DA',
		rateRange: '$0.004 to $0.007',
		description:
			'Amazon Music is a growing platform bundled with Amazon Prime memberships. Its per-stream rates are competitive, benefiting from Amazon\'s massive subscriber base and diverse revenue streams.',
		faqs: [
			{
				heading: 'How much does Amazon Music pay per stream in 2026?',
				body: 'Amazon Music pays an average of $0.004 to $0.007 per stream in 2026. Rates vary between Amazon Music Unlimited subscribers and Prime members who get limited access as part of their Prime subscription.'
			},
			{
				heading: 'Does Amazon Music Unlimited pay more than Prime Music?',
				body: 'Yes. Amazon Music Unlimited subscribers generate higher per-stream royalties than Prime Music listeners, who only have access to a limited catalog as part of their Amazon Prime membership.'
			},
			{
				heading: 'How many Amazon Music streams to make $1,000?',
				body: 'At an average rate of $0.006 per stream, you need approximately 167,000 Amazon Music streams to earn $1,000 before distributor or label fees.'
			},
			{
				heading: 'Is Amazon Music growing?',
				body: 'Yes. Amazon Music is one of the fastest-growing streaming platforms, leveraging integration with Alexa smart speakers and the Amazon Prime ecosystem to acquire new subscribers.'
			}
		]
	},
	tidal: {
		name: 'Tidal',
		rate: 0.013,
		logo: '/assets/images/tidal.svg',
		slug: 'tidal',
		seoRate: '$0.008 to $0.015',
		color: '#000000',
		rateRange: '$0.008 to $0.015',
		description:
			'Tidal pays the highest per-stream rate among major platforms, thanks to its smaller but dedicated subscriber base and artist-first philosophy. It pioneered direct-to-artist payment models.',
		faqs: [
			{
				heading: 'How much does Tidal pay per stream in 2026?',
				body: 'Tidal pays an average of $0.008 to $0.015 per stream in 2026, the highest rate among major streaming platforms. This is roughly 3x what Spotify pays per stream.'
			},
			{
				heading: 'Why does Tidal pay so much more per stream?',
				body: 'Tidal has a smaller user base of dedicated subscribers with no free tier. A smaller total stream count means the revenue pool is divided among fewer plays, resulting in a higher per-stream rate.'
			},
			{
				heading: 'How many Tidal streams to make $1,000?',
				body: 'At an average rate of $0.013 per stream, you need approximately 77,000 Tidal streams to earn $1,000 before distributor or label fees, far fewer than on any other major platform.'
			},
			{
				heading: 'Does Tidal have a direct artist payment model?',
				body: 'Yes. Tidal introduced a fan-centered royalties model where a subscriber\'s payment goes directly to the artists they actually listen to, rather than being pooled across all artists on the platform.'
			}
		]
	},
	deezer: {
		name: 'Deezer',
		rate: 0.006,
		logo: '/assets/images/deezer.svg',
		slug: 'deezer',
		seoRate: '$0.004 to $0.007',
		color: '#A238FF',
		rateRange: '$0.004 to $0.007',
		description:
			'Deezer is a global streaming platform popular in Europe and emerging markets. It offers competitive per-stream rates and was an early adopter of artist-centric royalty distribution.',
		faqs: [
			{
				heading: 'How much does Deezer pay per stream in 2026?',
				body: 'Deezer pays an average of $0.004 to $0.007 per stream in 2026. Rates vary by market and whether the listener is on a free or premium plan.'
			},
			{
				heading: 'What is Deezer\'s artist-centric payment model?',
				body: 'Deezer pioneered the Artist-Centric Payment System (ACPS) which boosts royalties for professional artists, reduces payouts for noise/ambient content, and weights streams from active listeners more heavily than passive plays.'
			},
			{
				heading: 'How many Deezer streams to make $1,000?',
				body: 'At an average rate of $0.006 per stream, you need approximately 167,000 Deezer streams to earn $1,000 before distributor or label fees.'
			},
			{
				heading: 'Is Deezer popular worldwide?',
				body: 'Deezer has a strong presence in France, Brazil, and several other markets. While smaller than Spotify globally, it\'s a significant platform in European and Latin American markets with over 16 million subscribers.'
			}
		]
	}
};

export const comparisonPairs: [string, string][] = [
	['spotify', 'apple-music'],
	['spotify', 'tidal'],
	['spotify', 'youtube-music'],
	['spotify', 'amazon-music'],
	['spotify', 'deezer'],
	['apple-music', 'tidal'],
	['apple-music', 'youtube-music'],
	['apple-music', 'amazon-music'],
	['tidal', 'deezer'],
	['youtube-music', 'amazon-music']
];

export const goalAmounts: { amount: number; label: string }[] = [
	{ amount: 100, label: '$100' },
	{ amount: 500, label: '$500' },
	{ amount: 1000, label: '$1,000' },
	{ amount: 10000, label: '$10,000' }
];

export const earningsMilestones = [1000, 10000, 100000, 1000000];

export function calcStreamsNeeded(rate: number, amount: number): number {
	return Math.ceil(amount / rate);
}
