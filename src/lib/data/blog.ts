export interface BlogPostMeta {
	slug: string;
	title: string;
	/** Shown in search results when the post title runs past ~60 characters. */
	seoTitle?: string;
	excerpt: string;
	/** Meta description. Defaults to the excerpt, trimmed to fit a snippet. */
	metaDescription?: string;
	category: 'Guides' | 'Industry' | 'Strategy' | 'Producing';
	readTime: string;
	date: string;
	author: string;
	lastModified?: string;
	/** Hidden posts render at their URL but are excluded from the blog
	 *  listing, homepage, sitemap, RSS feed, and get a noindex meta tag.
	 *  Used for sponsor preview before public release. */
	hidden?: boolean;
	/** Pins the post in the featured slot on /blog through this date
	 *  (inclusive, ISO format). After it passes, the slot reverts to the
	 *  newest post. Used for sponsored placements with a fixed run. */
	featuredUntil?: string;
}

/** A post together with its HTML body, as an article page consumes it. */
export type BlogPost = BlogPostMeta & { content: string };

// Metadata only. Article bodies live in ./blog-content/<slug>.ts and are
// loaded on demand via loadBlogContent() so that listing pages never ship
// article text to the browser.
export const blogPosts: BlogPostMeta[] = [
	{
		slug: 'spotify-ai-persona-badge-royalties-explained',
		seoTitle: 'Spotify AI Persona Badge: What It Means for Royalties',
		title: "Spotify's AI Persona Badge: What It Actually Changes for Your Royalties",
		excerpt:
			'Spotify will label AI-generated artist identities from mid September and cut them out of recommendations by default, and self-disclosure is already open in Spotify for Artists. Here is what the badge does, how a profile gets one, and the honest answer to the only question that matters for your income: whether it changes what you get paid.',
		metaDescription:
			'Spotify’s AI Persona badge arrives mid September and removes AI artists from recommendations. What it changes for your streaming royalties, and what it does not.',
		category: 'Industry',
		readTime: '6 min read',
		date: '2026-08-11',
		author: 'Filippo Piggici'
	},
	{
		slug: 'soundexchange-digital-performance-royalties-guide',
		seoTitle: 'SoundExchange Royalties: How to Claim Yours',
		title: 'SoundExchange Explained: The Digital Royalty Most Indie Artists Never Claim',
		excerpt:
			'SoundExchange pays out over a billion dollars a year for digital radio plays, and your distributor will never mention it. Here is what SoundExchange collects, why it is separate from your Spotify and PRO money, and the exact steps to register and claim what you are owed.',
		category: 'Guides',
		readTime: '5 min read',
		date: '2026-08-10',
		author: 'Filippo Piggici'
	},
	{
		slug: 'how-much-does-bandcamp-pay-vs-streaming',
		seoTitle: 'How Much Does Bandcamp Pay vs Streaming?',
		title: 'How Much Does Bandcamp Pay? Why One Sale Beats Thousands of Streams',
		excerpt:
			'Most artists know their Spotify per-stream rate by heart but ignore the platform that pays them the most per fan. Here is what Bandcamp actually pays, why a single sale can beat thousands of streams, and how to run direct sales and streaming together.',
		category: 'Strategy',
		readTime: '5 min read',
		date: '2026-07-27',
		author: 'Filippo Piggici'
	},
	{
		slug: 'boost-collective-music-ads-launch',
		seoTitle: 'Boost Collective Music Ads: What Artists Get',
		title:
			'Boost Collective Opens Music Ads to Everyone: Label-Grade Ad Campaigns for Independent Artists',
		excerpt:
			'The done-for-you ad campaign service Boost Collective has run for major label clients for the past three years is now open to every artist. Here is what Music Ads does, the numbers behind the launch, and our honest take on when it is worth your budget.',
		category: 'Industry',
		readTime: '5 min read',
		date: '2026-07-22',
		author: 'Filippo Piggici',
		featuredUntil: '2026-08-22'
	},
	{
		slug: 'mlc-unclaimed-royalties-how-to-claim',
		seoTitle: 'MLC Unclaimed Royalties: How to Find and Claim Yours',
		title: 'MLC Unclaimed Royalties: How to Find and Claim the Money the MLC Is Holding for You',
		excerpt:
			'There is likely money with your name on it sitting in the MLC black box right now, and your distributor will never tell you. Here is how the Mechanical Licensing Collective ends up holding your royalties, how to check what is unclaimed, and the exact steps to claim it before it gets redistributed to the majors.',
		category: 'Guides',
		readTime: '6 min read',
		date: '2026-07-21',
		author: 'Filippo Piggici'
	},
	{
		slug: 'auto-tune-vs-melodyne-vocal-tuning-workflow',
		seoTitle: 'Auto-Tune vs Melodyne: Which Fits Your Track?',
		title: 'Auto-Tune vs Melodyne: Which Vocal Tuning Workflow Actually Fits Your Track',
		excerpt:
			'Both fix pitch, but they think about your voice in completely different ways. Here is how to decide between Auto-Tune and Melodyne, the one setting that separates natural from robotic, and the pro workflow that uses both without you ever hearing either.',
		category: 'Producing',
		readTime: '7 min read',
		date: '2026-07-21',
		author: 'Filippo Piggici'
	},
	{
		slug: 'isrc-iswc-metadata-streaming-royalties-guide',
		seoTitle: 'ISRC, ISWC and Split Sheets: The Metadata Explained',
		title: 'ISRC, ISWC, and Split Sheets: The Metadata That Decides If You Get Paid on Streaming',
		excerpt:
			'Metadata is the least sexy part of releasing music and the most expensive to get wrong. Here is how ISRC codes, ISWC codes, and split sheets actually determine whether your streaming royalties reach you or vanish into a black box account.',
		category: 'Guides',
		readTime: '7 min read',
		date: '2026-07-17',
		author: 'Filippo Piggici'
	},
	{
		slug: 'streaming-exclusives-why-they-died',
		seoTitle: 'Why Streaming Exclusives Died',
		title: 'Why Streaming Exclusives Died: The Economics That Killed the Platform Wars',
		excerpt:
			"Remember when Tidal had Lemonade and Apple Music had Frank Ocean's Blonde? That whole era ended fast, and the reasons aren't what most people think. Here's the actual economics behind why platform exclusives failed and what quietly replaced them.",
		category: 'Industry',
		readTime: '6 min read',
		date: '2026-07-06',
		author: 'Filippo Piggici'
	},
	{
		slug: 'stereo-imaging-mid-side-processing-streaming',
		seoTitle: 'Stereo Imaging and Mid/Side Processing for Streaming',
		title:
			'Stereo Imaging and Mid/Side Processing: How to Get Wide Mixes That Translate on Streaming',
		excerpt:
			"Wide mixes that sound huge in your headphones and collapse on phone speakers are a stereo imaging problem. Here's how mid/side processing actually works, the plugins that do it well, and the mono test that catches every mistake before it ships.",
		category: 'Producing',
		readTime: '6 min read',
		date: '2026-07-06',
		author: 'Filippo Piggici'
	},
	{
		slug: 'distributor-bankruptcy-streaming-royalties',
		seoTitle: 'What Happens If Your Distributor Goes Out of Business',
		title: 'What Happens to Your Streaming Royalties When Your Distributor Goes Out of Business',
		excerpt:
			"Distributors aren't banks. When one fails, your unpaid royalties can sit in a bankruptcy estate for years. Here's how the risk actually works, where your money really sits, and the three concrete moves that cut your exposure.",
		category: 'Strategy',
		readTime: '6 min read',
		date: '2026-06-30',
		author: 'Filippo Piggici'
	},
	{
		slug: 'major-labels-better-streaming-royalty-deals',
		seoTitle: 'Why Major Labels Get Better Streaming Royalty Deals',
		title: 'Why Major Labels Get Better Streaming Royalty Deals (And What Indie Artists Lose)',
		excerpt:
			"Universal, Sony, and Warner sign Spotify deals that include minimum guarantees, equity stakes, and Most Favored Nation clauses indie artists never see. Here's how those private contracts quietly drain the royalty pool and what it costs your monthly payout.",
		category: 'Industry',
		readTime: '6 min read',
		date: '2026-06-29',
		author: 'Filippo Piggici'
	},
	{
		slug: 'sync-licensing-pricing-negotiation-guide',
		seoTitle: 'How to Price Your Music for Sync Licensing',
		title: 'How to Price Your Music for Sync Licensing: A Negotiation Guide for Indie Artists',
		excerpt:
			"Most indie artists say yes to the first sync offer they get and leave thousands on the table. Here's how sync fees actually break down by placement tier, the five variables that drive pricing, and the negotiation moves that protect your catalog.",
		category: 'Strategy',
		readTime: '6 min read',
		date: '2026-06-24',
		author: 'Filippo Piggici'
	},
	{
		slug: 'spotify-marquee-showcase-paid-promotion-guide',
		seoTitle: 'Spotify Marquee and Showcase: Worth the $100?',
		title: 'Spotify Marquee and Showcase Paid Promotion: What Indie Artists Actually Get for $100',
		excerpt:
			"Spotify Marquee and Showcase let indie artists buy in app promotion for $100, but most who try come out red. Here's the actual math on follower acquisition cost, when paid Spotify ads pay off, and the three scenarios where they quietly drain your budget.",
		category: 'Industry',
		readTime: '6 min read',
		date: '2026-06-08',
		author: 'Filippo Piggici'
	},
	{
		slug: 'saturation-harmonic-enhancement-streaming-mixes',
		seoTitle: 'Saturation and Harmonic Enhancement for Streaming',
		title: 'Saturation and Harmonic Enhancement: How to Make Mixes Translate on Streaming',
		excerpt:
			"Saturation is what lets a streaming mix sound full on phone speakers and AirPods. Here's how the four flavors work, where they belong in the chain, and which plugins actually survive lossy codecs and loudness normalization.",
		category: 'Producing',
		readTime: '6 min read',
		date: '2026-06-08',
		author: 'Filippo Piggici'
	},
	{
		slug: 'spotify-discovery-mode-royalty-tradeoff-explained',
		seoTitle: 'Spotify Discovery Mode: Is the Tradeoff Worth It?',
		title: 'Spotify Discovery Mode: Is Trading Royalties for Algorithmic Reach Worth It?',
		excerpt:
			"Spotify Discovery Mode promises algorithmic reach in exchange for a 30 percent royalty cut. Here's exactly what that costs at different stream levels, when it actually pays off, and when it just quietly bleeds your earnings.",
		category: 'Industry',
		readTime: '6 min read',
		date: '2026-06-05',
		author: 'Filippo Piggici'
	},
	{
		slug: 'bass-mixing-streaming-low-end-guide',
		seoTitle: 'How to Mix Bass for Streaming',
		title: 'How to Mix Bass for Streaming: Low End That Translates on Every Speaker',
		excerpt:
			"Bass is where amateur mixes get exposed. Phone speakers, AirPods, and car audio all hear your low end differently. Here's how to mix bass that holds up on Spotify, Apple Music, and YouTube Music across every device.",
		category: 'Producing',
		readTime: '5 min read',
		date: '2026-06-01',
		author: 'Filippo Piggici'
	},
	{
		slug: 'reverb-delay-techniques-streaming-mixes',
		seoTitle: 'Reverb and Delay Techniques for Streaming Mixes',
		title: 'Reverb and Delay Techniques That Translate on Streaming Platforms',
		excerpt:
			"Lossy codecs eat reverb tails and delay returns for breakfast. Here's how to design wet effects that survive Spotify, Apple Music, and YouTube Music without losing their character.",
		category: 'Producing',
		readTime: '5 min read',
		date: '2026-05-30',
		author: 'Filippo Piggici'
	},
	{
		slug: 'parallel-multiband-serial-compression-guide',
		seoTitle: 'Parallel, Multiband and Serial Compression Explained',
		title:
			'Parallel, Multiband, and Serial Compression: Advanced Techniques Every Producer Should Know',
		excerpt:
			"Basic compression is just the warm up. Once you understand parallel, multiband, and serial techniques, your mixes start sounding like records instead of demos. Here's when and how to use each.",
		category: 'Producing',
		readTime: '5 min read',
		date: '2026-05-24',
		author: 'Filippo Piggici'
	},
	{
		slug: 'ai-generated-music-streaming-royalties-impact',
		seoTitle: 'How AI Music Is Draining the Royalty Pool',
		title: 'How AI Generated Music Is Draining the Streaming Royalty Pool',
		excerpt:
			"Around 50,000 AI tracks hit streaming platforms every day. They don't need to be popular to cost you money. Here's how the flood is diluting royalties for real artists and what you can do about it.",
		category: 'Industry',
		readTime: '4 min read',
		date: '2026-05-19',
		author: 'Filippo Piggici'
	},
	{
		slug: 'tiktok-short-form-video-streaming-revenue',
		seoTitle: 'How TikTok Drives Streaming Revenue',
		title: 'How TikTok and Short Form Video Actually Drive Streaming Revenue',
		excerpt:
			"For every viral TikTok success story, thousands of artists post clips that go nowhere. Here's how the pipeline from 15 second clips to real streaming income actually works, and how to build a system around it.",
		category: 'Strategy',
		readTime: '4 min read',
		date: '2026-05-13',
		author: 'Filippo Piggici'
	},
	{
		slug: 'spotify-pre-save-campaign-guide',
		seoTitle: 'How to Build a Spotify Pre-Save Campaign',
		title: 'How to Build a Spotify Pre-Save Campaign That Actually Converts',
		excerpt:
			"Pre-saves guarantee Day 1 engagement and signal Spotify's algorithm that your release matters. Here's how to build a pre-save campaign that drives real streams, not just clicks.",
		category: 'Strategy',
		readTime: '4 min read',
		date: '2026-05-12',
		author: 'Filippo Piggici'
	},
	{
		slug: 'sync-licensing-guide-independent-artists',
		seoTitle: 'Sync Licensing for Independent Artists: A Guide',
		title: 'Sync Licensing for Independent Artists: How to Earn More Than Streaming Royalties',
		excerpt:
			"A single TV sync placement can pay more than a year of streaming royalties. Here's how independent artists can break into sync licensing, what makes a song placement ready, and where the real money is.",
		category: 'Strategy',
		readTime: '5 min read',
		date: '2026-05-12',
		author: 'Filippo Piggici'
	},
	{
		slug: 'eq-techniques-muddy-mixes-guide',
		seoTitle: 'How to Fix a Muddy Mix: EQ Techniques',
		title: 'How to Fix a Muddy Mix: EQ Techniques Every Producer Should Know',
		excerpt:
			'A muddy mix kills your music before anyone hears the song. Here are the EQ techniques that actually clear up low mid buildup, from high pass filters to dynamic EQ, with specific frequencies and settings for every instrument.',
		category: 'Producing',
		readTime: '5 min read',
		date: '2026-05-07',
		author: 'Filippo Piggici'
	},
	{
		slug: 'streaming-fraud-fake-streams-real-artists',
		seoTitle: 'How Streaming Fraud Costs Real Artists Money',
		title: 'How Streaming Fraud and Fake Streams Are Costing Real Artists Money',
		excerpt:
			"Billions of fake streams drain the royalty pool every year. Here's exactly how streaming fraud works, how much it costs legitimate artists, and what platforms are actually doing about it.",
		category: 'Industry',
		readTime: '5 min read',
		date: '2026-04-29',
		author: 'Filippo Piggici'
	},
	{
		slug: 'music-release-strategy-calendar',
		seoTitle: 'How to Build a Music Release Strategy',
		title: 'How to Build a Music Release Strategy That Actually Grows Your Streams',
		excerpt:
			"Most indie artists release music randomly and wonder why streams flatline. Here's how to build a release calendar that compounds growth, trains the algorithm, and turns every single into a long term asset.",
		category: 'Strategy',
		readTime: '5 min read',
		date: '2026-04-15',
		author: 'Filippo Piggici'
	},
	{
		slug: 'distrokid-review-independent-artists',
		seoTitle: 'DistroKid Review 2026: Is It Worth It for Artists?',
		title: 'DistroKid Review: Is It the Right Distributor for Independent Artists in 2026?',
		excerpt:
			"An honest breakdown of DistroKid's pricing, features, and trade-offs compared to TuneCore, CD Baby, and going through a label. What matters, what doesn't, and who it's actually best for.",
		category: 'Strategy',
		readTime: '9 min read',
		date: '2026-03-18',
		author: 'Filippo Piggici'
	},
	{
		slug: 'sidechain-compression-guide-producers',
		seoTitle: 'How to Use Sidechain Compression Effectively',
		title: "How to Use Sidechain Compression Effectively: A Producer's Guide",
		excerpt:
			"Sidechain compression is the secret weapon behind every punchy mix. Here's how to set it up properly, when to use real compression vs volume shaping, and the settings that actually work.",
		category: 'Producing',
		readTime: '6 min read',
		date: '2026-03-27',
		author: 'Filippo Piggici'
	},
	{
		slug: 'publishing-royalties-vs-streaming-royalties',
		seoTitle: 'Publishing Royalties vs Streaming Royalties',
		title: 'Publishing Royalties vs Streaming Royalties: What Every Artist Needs to Know',
		excerpt:
			"Most artists only collect one type of royalty from their streams. Here's how publishing royalties work, why they're separate from streaming payouts, and how to make sure you're not leaving money uncollected.",
		category: 'Industry',
		readTime: '5 min read',
		date: '2026-03-23',
		author: 'Filippo Piggici'
	},
	{
		slug: 'home-studio-setup-budget-2026',
		title: 'How to Set Up a Home Studio on a Budget in 2026',
		excerpt:
			'Everything you need to start producing professional sounding music from your bedroom. Gear recommendations, software picks, and the mistakes that waste money.',
		category: 'Producing',
		readTime: '6 min read',
		date: '2026-03-20',
		author: 'Filippo Piggici'
	},
	{
		slug: 'best-free-plugins-music-production-2026',
		title: 'Best Free Plugins for Music Production in 2026',
		excerpt:
			'The best free VST plugins that actually compete with paid tools. From synths to EQs to reverbs, these are the ones worth installing right now.',
		category: 'Producing',
		readTime: '7 min read',
		date: '2026-03-19',
		author: 'Filippo Piggici'
	},
	{
		slug: 'how-to-read-streaming-royalty-statements',
		seoTitle: 'How to Read Your Streaming Royalty Statements',
		title: "How to Read Your Streaming Royalty Statements (And Spot What's Wrong)",
		excerpt:
			"Royalty statements are confusing by design. Learn what every line item actually means, which numbers matter, how to spot errors, and what to do when the math doesn't add up.",
		category: 'Guides',
		readTime: '5 min read',
		date: '2026-03-18',
		author: 'Filippo Piggici'
	},
	{
		slug: 'how-to-split-streaming-royalties-with-collaborators',
		seoTitle: 'How to Split Streaming Royalties with Collaborators',
		title: 'How to Split Streaming Royalties with Collaborators (Without Ruining the Relationship)',
		excerpt:
			'Collaboration drives great music, but splitting royalties fairly is where things get messy. Learn the standard split structures, how to set them up through your distributor, and what to do before you release a single note together.',
		category: 'Strategy',
		readTime: '4 min read',
		date: '2026-03-17',
		author: 'Filippo Piggici'
	},
	{
		slug: 'fan-centric-vs-pro-rata-streaming-royalties',
		seoTitle: 'Fan Centric vs Pro Rata Streaming Royalties',
		title: 'Fan Centric vs Pro Rata: The Battle Over How Streaming Royalties Get Divided',
		excerpt:
			'The way streaming platforms split royalty pools directly affects how much you earn. Learn how the pro rata and fan centric models work, which platforms use which, and what it means for your bottom line as an independent artist.',
		category: 'Industry',
		readTime: '6 min read',
		date: '2026-03-16',
		author: 'Filippo Piggici'
	},
	{
		slug: 'mixing-vocals-for-streaming',
		seoTitle: 'Mixing Vocals for Streaming: A Practical Guide',
		title: 'Mixing Vocals for Streaming Platforms: A Practical Guide for Producers',
		excerpt:
			'Streaming platforms treat vocals differently than you might expect. Learn how to EQ, compress, de-ess, and add effects to your vocals so they translate perfectly on Spotify, Apple Music, and every other platform.',
		category: 'Producing',
		readTime: '7 min read',
		date: '2026-03-15',
		author: 'Filippo Piggici'
	},
	{
		slug: 'tidal-royalties-explained',
		seoTitle: 'Tidal Royalties: Pay Per Stream 2026',
		title: 'Tidal Royalties Explained: How Much Does Tidal Pay Per Stream in 2026?',
		excerpt:
			'Tidal pays between $0.008 and $0.012 per stream, making it the highest-paying major streaming platform. Learn how Tidal calculates royalties, why it pays so much more than Spotify, and how to make the most of it as an independent artist.',
		category: 'Guides',
		readTime: '7 min read',
		date: '2026-03-15',
		author: 'Filippo Piggici'
	},
	{
		slug: 'deezer-royalties-explained',
		seoTitle: 'Deezer Royalties: Pay Per Stream 2026',
		title: 'Deezer Royalties Explained: How Much Does Deezer Pay Per Stream in 2026?',
		excerpt:
			'Deezer pays between $0.004 and $0.007 per stream in 2026. Unlike Spotify, Deezer uses an artist-centric payment model that rewards real artists with genuine fanbases. Learn how the system works and how to earn more.',
		category: 'Guides',
		readTime: '8 min read',
		date: '2026-03-12',
		author: 'Filippo Piggici'
	},
	{
		slug: 'how-to-master-music-for-streaming',
		title: 'How to Master Your Music for Streaming Platforms in 2026',
		excerpt:
			'Streaming platforms like Spotify and Apple Music use loudness normalization, which means mastering too loud actually hurts your music. Learn the right LUFS targets, format specs, and mastering techniques to make your tracks sound their best on every platform.',
		category: 'Producing',
		readTime: '11 min read',
		date: '2026-03-11',
		author: 'Filippo Piggici'
	},
	{
		slug: 'spotify-royalties-explained',
		seoTitle: 'Spotify Royalties Explained: Pay Per Stream 2026',
		title: 'Spotify Royalties Explained: How Much Does Spotify Pay Per Stream in 2026?',
		excerpt:
			"Spotify pays artists between $0.003 and $0.005 per stream on average. Learn exactly how Spotify calculates royalties, what affects your per-stream rate, and proven strategies to earn more from the world's biggest streaming platform.",
		category: 'Guides',
		readTime: '10 min read',
		date: '2026-03-11',
		author: 'Filippo Piggici'
	},
	{
		slug: 'apple-music-royalties-explained',
		seoTitle: 'Apple Music Royalties: Pay Per Stream 2026',
		title: 'Apple Music Royalties Explained: How Much Does Apple Music Pay Per Stream?',
		excerpt:
			'Apple Music pays artists roughly $0.007 to $0.01 per stream, among the highest in the industry. Learn how Apple Music calculates royalties, what affects your per-stream rate, and how to maximize your earnings on the platform.',
		category: 'Guides',
		readTime: '9 min read',
		date: '2026-03-11',
		author: 'Filippo Piggici'
	},
	{
		slug: 'amazon-music-royalties-explained',
		seoTitle: 'Amazon Music Royalties: Pay Per Stream 2026',
		title: 'Amazon Music Royalties Explained: How Much Does Amazon Pay Per Stream?',
		excerpt:
			'Amazon Music pays between $0.003 and $0.005 per stream depending on the tier. Learn how Amazon Music Unlimited and Prime Music differ for artist payouts, and how to grow your earnings on the platform.',
		category: 'Guides',
		readTime: '9 min read',
		date: '2026-03-11',
		author: 'Filippo Piggici'
	},
	{
		slug: 'youtube-music-royalties-explained',
		seoTitle: 'YouTube Music Royalties: What It Pays Artists',
		title: 'YouTube Music Royalties Explained: How Much Does It Pay Artists?',
		excerpt:
			'YouTube Music pays between $0.002 and $0.005 per stream. Learn how its dual-revenue model works, how it compares to Spotify, and how to maximize your YouTube Music earnings.',
		category: 'Guides',
		readTime: '8 min read',
		date: '2026-03-10',
		author: 'Filippo Piggici'
	},
	{
		slug: 'how-listener-country-affects-streaming-royalties',
		title: "How Your Listeners' Country Affects Streaming Royalties",
		excerpt:
			'Not all streams are worth the same. Learn why a play from Norway can pay 10x more than one from India, and how geography shapes your real earnings.',
		category: 'Guides',
		readTime: '7 min read',
		date: '2026-03-09',
		author: 'Filippo Piggici'
	},
	{
		slug: 'how-streaming-royalties-work',
		title: 'How Streaming Royalties Actually Work',
		excerpt:
			'A clear breakdown of the pro-rata payment model, royalty pools, per-stream rates, and why your payout fluctuates every month.',
		category: 'Guides',
		readTime: '8 min read',
		date: '2026-02-28',
		author: 'Filippo Piggici',
		lastModified: '2026-03-05'
	},
	{
		slug: 'spotify-vs-apple-music-artists-2026',
		title: 'Spotify vs Apple Music for Artists: 2026',
		excerpt:
			'A detailed comparison of Spotify and Apple Music from an artist perspective: payment rates, playlist ecosystem, analytics, and which platform deserves your focus.',
		category: 'Industry',
		readTime: '6 min read',
		date: '2026-02-20',
		author: 'Filippo Piggici',
		lastModified: '2026-03-05'
	},
	{
		slug: 'how-to-make-1000-from-streaming',
		title: 'How to Make $1,000/Month from Streaming',
		excerpt:
			'A practical roadmap to earning $1,000 per month from streaming royalties: the exact stream counts needed, multi-platform strategies, and how to build sustainable income.',
		category: 'Strategy',
		readTime: '7 min read',
		date: '2026-02-15',
		author: 'Filippo Piggici',
		lastModified: '2026-03-05'
	},
	{
		slug: 'distrokid-vs-tunecore-vs-cd-baby',
		title: 'Music Distribution: DistroKid vs TuneCore vs CD Baby',
		excerpt:
			'An honest comparison of the three biggest music distributors: pricing, royalty splits, features, speed, and which one is right for your situation.',
		category: 'Guides',
		readTime: '7 min read',
		date: '2026-02-10',
		author: 'Filippo Piggici',
		lastModified: '2026-03-05'
	},
	{
		slug: 'why-tidal-pays-most-per-stream',
		title: 'Why Tidal Pays the Most Per Stream',
		excerpt:
			"Tidal consistently pays artists more per stream than any other major platform. Here's exactly why, and what it means for your streaming strategy.",
		category: 'Industry',
		readTime: '5 min read',
		date: '2026-02-05',
		author: 'Filippo Piggici',
		lastModified: '2026-03-05'
	},
	{
		slug: 'streaming-royalty-rates-2026',
		title: 'Streaming Royalty Rates in 2026: Every Platform Compared',
		excerpt:
			'A comprehensive comparison of per-stream royalty rates across all major streaming platforms in 2026, with analysis of what drives the differences.',
		category: 'Industry',
		readTime: '6 min read',
		date: '2026-01-28',
		author: 'Filippo Piggici',
		lastModified: '2026-03-05'
	},
	{
		slug: 'independent-artist-streaming-revenue-guide',
		title: "Independent Artist's Guide to Streaming Revenue",
		excerpt:
			'A complete guide to building streaming income as an independent artist: choosing a distributor, release strategy, playlist pitching, and revenue diversification.',
		category: 'Strategy',
		readTime: '8 min read',
		date: '2026-01-20',
		author: 'Filippo Piggici',
		lastModified: '2026-03-05'
	},
	{
		slug: 'how-to-get-on-spotify-playlists',
		title: 'How to Get on Spotify Playlists in 2026: A Realistic Guide',
		excerpt:
			"A no-BS breakdown of editorial, algorithmic, and independent playlists: what actually works and what's a waste of money.",
		category: 'Strategy',
		readTime: '7 min read',
		date: '2026-01-10',
		author: 'Filippo Piggici',
		lastModified: '2026-03-05'
	},
	{
		slug: 'why-you-need-a-split-sheet-before-releasing-music',
		seoTitle: 'Why You Need a Split Sheet Before You Release',
		title: 'Why You Need a Split Sheet Before Releasing Music (And What Happens Without One)',
		excerpt:
			"Every royalty dispute starts the same way: no written agreement. Here's what a split sheet is, why verbal deals fall apart, and how to lock in your splits in 60 seconds.",
		category: 'Strategy',
		readTime: '5 min read',
		date: '2026-03-23',
		author: 'Filippo Piggici'
	}
];

export function getBlogPost(slug: string): BlogPostMeta | undefined {
	return blogPosts.find((post) => post.slug === slug);
}
