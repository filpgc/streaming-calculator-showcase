export const content = `<h2>Why Reverb and Delay Hit Different on Streaming</h2>
<p>Every reverb and delay decision you make ends up traveling through Spotify, Apple Music, and YouTube Music codecs. Those codecs are lossy. They look for perceptually unimportant information and throw it away. The first thing they target is soft, sustained content that sits below the main signal. Translation: your reverb tails and delay returns are exactly the audio data streaming algorithms compress hardest.</p>

<p>That doesn't mean ditching reverb. It means designing your wet effects so they survive the trip. Producers who understand this build space and dimension into mixes that still sound rich on lossy streams. Everyone else loses their carefully crafted ambience to a 128 kbps Ogg file.</p>

<h2>Reverb That Survives Streaming Compression</h2>
<p>The single biggest reverb mistake on a streaming mix is too much low end in the tail. Anything below 200 Hz in your reverb return creates buildup that codecs handle poorly. A high pass filter on every reverb send around 250 to 400 Hz instantly cleans up the mix and gives the codec less low frequency mush to wrestle with.</p>

<p>The second move is predelay. A short gap between the dry signal and the reverb onset (typically 20 to 60 milliseconds) keeps the source intelligible and prevents the wet signal from smearing into the dry. On vocals especially, predelay is the difference between a vocal that sits forward in the mix and one that gets buried in its own reverb.</p>

<div class="callout"><div class="callout-label">Pro tip</div><p>Set predelay to match the tempo. At 120 BPM, a 1/32 note is roughly 62 ms. Sync predelay to a musical subdivision and reverb tails feel rhythmically locked instead of randomly hanging behind the beat.</p></div>

<p>For algorithm choice, <a href="https://www.pluginboutique.com/product/2-Effects/17-Reverb/11576-FabFilter-Pro-R-2?a_aid=64d179a60ffc7" target="_blank" rel="noopener">FabFilter Pro-R 2</a> has become the default for streaming work because its Decay Rate EQ lets you shape how each frequency band decays. You can set the highs to die quickly while letting mids ring, which mimics natural rooms and codecs handle the resulting tail better than a flat, lush decay.</p>

<p>If your budget is zero, Valhalla Supermassive (free) handles long, ambient tails surprisingly well, while <a href="https://www.pluginboutique.com/product/2-Effects/17-Reverb/13784-H-Reverb-Hybrid-Reverb?a_aid=64d179a60ffc7" target="_blank" rel="noopener">Waves H-Reverb</a> is the workhorse for plate-style vocal reverbs that translate cleanly across platforms.</p>

<h2>Delay Settings That Hold Up</h2>
<p>Delay is more forgiving on streaming than reverb because each repeat is a discrete transient rather than a continuous tail. That said, three things make or break a streaming ready delay chain.</p>

<p>First, filter both ends of the feedback path. Roll off lows below 200 Hz and highs above 8 kHz on the delay return. Each repeat sounds slightly darker, like a natural acoustic echo, and the codec has less to chew on.</p>

<p>Second, sync to tempo for rhythmic content and free time for atmospheric content. Quarter and dotted eighth delays are classic for vocals because they reinforce the groove. Free time delays in the 350 to 500 ms range work great on textural pads where you want shimmer without a metronome feel.</p>

<p>Third, get the wet level right. A delay that's clearly audible in solo will disappear after codec compression. Push it slightly louder than feels comfortable in the dry room, then check on phone speakers and earbuds. The sweet spot is usually 3 to 6 dB louder than you'd instinctively set it.</p>

<table class="data-table"><thead><tr><th>Material</th><th>Delay Type</th><th>Wet Level</th></tr></thead><tbody><tr><td>Lead vocal</td><td class="table-highlight">1/4 note slapback</td><td>10 to 15%</td></tr><tr><td>Vocal ad lib</td><td class="table-highlight">Dotted 1/8 ping pong</td><td>20 to 30%</td></tr><tr><td>Synth lead</td><td class="table-highlight">1/8 with feedback</td><td>15 to 25%</td></tr><tr><td>Atmospheric pad</td><td class="table-highlight">Free time, 400 ms</td><td>30 to 40%</td></tr></tbody></table>

<p>For vibe heavy delay work, <a href="https://www.pluginboutique.com/product/2-Effects/49-Echo/1798-EchoBoy?a_aid=64d179a60ffc7" target="_blank" rel="noopener">Soundtoys EchoBoy</a> is the standard. Its tape, tube, and analog modes add coloration that survives encoding because the saturation pushes the repeats into perceptually important frequency ranges. <a href="https://www.pluginboutique.com/product/2-Effects/10-Delay/13813-H-Delay-Hybrid-Delay?a_aid=64d179a60ffc7" target="_blank" rel="noopener">Waves H-Delay</a> is a cheaper alternative with similar character and a lo-fi mode that's perfect for hip hop and indie productions.</p>

<h2>Sidechain Your Wet Effects</h2>
<p>Here's the move most mixes miss. Sidechain your reverb and delay sends to the dry signal so the wet tails duck when the source is active. The reverb only fills the spaces between words. The delay only kicks in after the phrase ends.</p>

<blockquote class="pull-quote"><p>Sidechained reverb is what makes commercial vocal mixes sound impossibly clean while still feeling huge.</p></blockquote>

<p>Setup is simple. Drop a compressor on the reverb return. Set the sidechain input to the dry vocal or instrument. Fast attack, medium release, ratio around 4:1. Pull the threshold until you see 4 to 6 dB of gain reduction when the dry signal is playing. The result is a reverb that breathes with the performance instead of fighting it.</p>

<p>This technique is especially valuable on streaming because it reduces the constant overlap of dry and wet content that codecs handle worst. Less simultaneous masking means cleaner playback at 96 kbps.</p>

<h2>Common Mistakes That Wreck the Translation</h2>
<div class="callout callout-warning"><div class="callout-label">Watch out</div><p>Stacking three reverbs on one vocal almost always creates a smeary mess after codec compression. Pick one short room or plate, one longer hall or chamber, blend them in parallel, and stop there.</p></div>

<p>Other common errors: using stereo width on reverb returns wider than 100% (collapses to mono badly on phone speakers), forgetting to high pass the reverb return so the low mids stay muddy, and using long predelays on slow songs where the reverb arrives noticeably late.</p>

<p>Also keep an eye on total wet content. If you bypass all reverbs and delays and your mix feels weak, you're using effects to compensate for arrangement problems. Fix the arrangement first.</p>

<h2>Putting It All Together</h2>
<p>Here's a vocal chain that consistently translates across platforms. Short plate reverb at 1.2 second decay with 30 ms predelay, sidechained to the dry vocal, high passed at 300 Hz. Quarter note slapback delay with both ends filtered, 10% wet. Optional throw delay on tail words only, dotted eighth with feedback. Everything panned center on the dry, slightly spread on the wet.</p>

<p>Test on three sources: studio monitors, phone speaker, cheap earbuds. If the vocal feels present and dimensional on all three, you've nailed it. Curious how those polished masters might pay out? Run your numbers through our <a href="/spotify-calculator">Spotify calculator</a> or <a href="/apple-music-calculator">Apple Music calculator</a> to estimate what releases could earn across platforms.</p>

<p>Ready to push these mixes into the world? You can <a href="https://distrokid.com/vip/seven/3063815" target="_blank" rel="noopener">get 7% off DistroKid here</a>, and <a href="https://www.pluginboutique.com/?a_aid=64d179a60ffc7" target="_blank" rel="noopener">browse more deals on Plugin Boutique</a>.</p>`;
