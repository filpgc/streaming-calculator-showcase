export const content = `<p>The widest sounding records aren't the ones that pushed everything to the edges. They're the ones that made the center anchor punch and let a few carefully chosen elements breathe outward. That's the whole game with stereo imaging, and it matters more on streaming than on any other format because lossy codecs and phone speakers punish sloppy width choices.</p>

<p>If your mix sounds huge on studio monitors but shrinks or gets weird on AirPods, TVs, or car speakers, stereo imaging is almost always part of the problem. Let me walk through how mid/side processing actually works, the tools that do it well, and the traps that make otherwise good mixes fall apart on streaming.</p>

<h2>Why Stereo Imaging Hits Different on Streaming</h2>

<p>Spotify's Ogg Vorbis, Apple's AAC, and YouTube's Opus codecs all use variations of joint stereo. Joint stereo separates the mix into a mid channel (what's the same in both speakers) and a side channel (what's different). Then it spends most of its bitrate on the mid, because that's what carries the music's main information.</p>

<p>If you shove too much energy into the sides at low frequencies or overdo widening plugins, the codec has to make choices. It smears transients, weakens vocals, or narrows the whole image when it hits its bitrate limit.</p>

<p>Then there's the playback problem. Phone speakers collapse everything to mono. Bluetooth earbuds in noisy environments sum a lot toward mono too. Bar speakers, kitchen speakers, TVs, laptop speakers, mostly mono or near mono.</p>

<div class="callout callout-info"><div class="callout-label">Good to know</div><p>Roughly 70% of streaming happens on mobile devices. A significant chunk of that plays through phone speakers or in mono compatible situations. Your wide mix needs to survive that trip.</p></div>

<h2>Mid vs Side: The Two Signals You're Actually Mixing</h2>

<p>Every stereo track can be split into two things. The mid is the sum of left and right. The side is the difference between them. Your kick, snare, bass, and lead vocal live in the mid. Room mics, stereo synths, backing vocals, reverbs, and stereo guitars live in the sides.</p>

<p>Mid/side processing lets you EQ, compress, and shape those two channels independently. That's a huge unlock, because most mix problems live in one and not the other.</p>

<h2>The Rules That Actually Matter</h2>

<p>Two rules cover most of the good decisions here.</p>

<p><strong>Keep low end mono.</strong> Everything below roughly 120 Hz should be centered. Not close to centered. Actually centered. Low frequencies use huge amounts of energy, and stereo low end creates phase cancellation on any mono system while eating codec bitrate for no audible payoff.</p>

<p><strong>Widen selectively, not globally.</strong> Instead of putting a stereo widener on the master and pushing it to 130 percent, widen specific elements that benefit from air. Overheads, room mics, backing vocals, wide pads, stereo delays. The mix as a whole should stay realistic.</p>

<blockquote class="pull-quote"><p>Width you can't hear in mono isn't width. It's phase problems waiting to embarrass you on someone's kitchen speaker.</p></blockquote>

<h2>Practical Mid/Side EQ Moves</h2>

<p><a href="https://www.pluginboutique.com/product/2-Effects/16-EQ/14125-FabFilter-Pro-Q-4?a_aid=64d179a60ffc7" target="_blank" rel="noopener">FabFilter Pro-Q 4</a> has one of the cleanest M/S workflows in the game. Right click any band, switch it to Side only or Mid only, and you can carve without touching the other channel. A few moves worth stealing:</p>

<ul>
<li>High pass the side channel at 100 to 200 Hz. Cleans up any low frequency clutter hiding in the stereo field without touching your bass or kick.</li>
<li>Cut 200 to 400 Hz on the side channel by 1 to 2 dB when the mix sounds muddy in the room but the tracks solo clean. This is often room mic and reverb build up.</li>
<li>Boost 8 to 12 kHz on the side channel by 1 dB for air on cymbals and vocals without pushing the center vocal into harshness.</li>
<li>If your lead vocal feels buried, cut a narrow 1 dB dip on the mid channel around 2 to 4 kHz and give the same range a tiny lift on the side. The vocal steps forward without a solo boost.</li>
</ul>

<p>For dedicated M/S work at the mastering stage, <a href="https://www.pluginboutique.com/product/2-Effects/16-EQ/10253-bx-digital-V3?a_aid=64d179a60ffc7" target="_blank" rel="noopener">Brainworx bx_digital V3</a> is the specialist. Its Mono Maker button lets you set a mono crossover frequency without any filter smearing, which is the fastest way to guarantee your low end is anchored.</p>

<h2>Widening Tools Without Ruining the Mix</h2>

<p>Widening plugins are where most artists get in trouble. Push them too hard and you end up with a mix that sounds huge in your headphones and vanishes on a phone.</p>

<div class="stat-row">
<div class="stat-card"><span class="stat-value">100 to 120%</span><span class="stat-label">Safe widening for most elements</span></div>
<div class="stat-card"><span class="stat-value">130%+</span><span class="stat-label">Where phase problems usually start</span></div>
<div class="stat-card"><span class="stat-value">&lt;120 Hz</span><span class="stat-label">Frequencies that stay mono</span></div>
</div>

<p>Solid picks:</p>

<ul>
<li><a href="https://www.pluginboutique.com/product/2-Effects/27-Stereo-Width/5997-Ozone-Imager-2?a_aid=64d179a60ffc7" target="_blank" rel="noopener">iZotope Ozone Imager 2</a> is free and does the job for most producers. Four bands, per band width control, and a Stereoize mode that adds width to mono sources without the phasing artifacts of old school stereo doublers.</li>
<li><a href="https://www.pluginboutique.com/product/2-Effects/27-Stereo-Width/13667-S1-Stereo-Imager?a_aid=64d179a60ffc7" target="_blank" rel="noopener">Waves S1 Stereo Imager</a> is the classic. The S1 Shuffler widens bass with mono compatibility built in, which sounds counterintuitive but works because it uses phase relationships rather than pure L/R panning.</li>
</ul>

<h2>The Mono Test That Catches Everything</h2>

<p>This is the most underrated habit in mixing. After every major stereo decision, sum the mix to mono and listen.</p>

<p>If the vocal disappears, your side channel is too loud. If the kick weakens, you have low end sitting in the sides. If a synth suddenly gets thin, that patch has hidden phase issues.</p>

<p>Put a stock utility plugin on your master bus with a mono button and bind it to a keyboard shortcut. Toggle it constantly.</p>

<div class="callout"><div class="callout-label">Pro tip</div><p>Check mono compatibility at three volumes: quiet (background listening level), normal, and loud. Phase problems that hide at one level often reveal themselves at another.</p></div>

<h2>Chain That Actually Works</h2>

<p>For a modern mix that translates cleanly on streaming, a workable order looks like this:</p>

<ol>
<li>On individual tracks, pan instead of widening. Real panning always translates.</li>
<li>On stereo submixes (drums, backing vocals, synths), use narrow M/S EQ moves to clean up problem frequencies in the sides.</li>
<li>On the master bus, one M/S EQ instance for tonal balance, one gentle imager below 15 percent widening if needed, and a mono check switch you hit every 30 seconds.</li>
</ol>

<p>Once your mix translates, the width choices you made pay off across every listening scenario. If you want to see how stream counts translate to real money at your current level, run your numbers on the <a href="/spotify-calculator">Spotify calculator</a> or the <a href="/apple-music-calculator">Apple Music calculator</a>.</p>

<h2>The Bottom Line</h2>

<p>Great stereo imaging isn't about making everything sound huge. It's about deciding what stays center, what breathes outward, and what stays mono. The mixes that translate everywhere are the ones with a strong mid and a controlled side, not the ones that pushed a widener until the meters looked cool.</p>

<p>The rest is just checking your work. Mono buttons and reference tracks catch almost every mistake before it ships.</p>

<p>For distribution, you can <a href="https://distrokid.com/vip/seven/3063815" target="_blank" rel="noopener">get 7% off DistroKid here</a>. You can also <a href="https://www.pluginboutique.com/?a_aid=64d179a60ffc7" target="_blank" rel="noopener">browse more deals on Plugin Boutique</a>.</p>`;
