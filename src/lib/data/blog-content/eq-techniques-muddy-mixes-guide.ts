export const content = `<h2>What "Muddy" Actually Means</h2>
<p>Every producer has been there. You've layered your tracks, balanced the levels, and the mix still sounds thick. Cloudy. Like someone draped a blanket over your speakers. That's mud, and it's the single most common mixing problem in home studios.</p>
<p>Mud isn't mysterious. It's an accumulation of energy in the lower midrange, roughly between 200 Hz and 500 Hz, where nearly every instrument has harmonic content. Guitars, vocals, synth pads, pianos, even kick drums all compete in this range. When multiple elements stack up there without proper management, the result is a mix that lacks definition and sounds smaller than it should.</p>

<div class="stat-row">
<div class="stat-card"><span class="stat-value">200 to 500 Hz</span><span class="stat-label">Where mix mud accumulates</span></div>
<div class="stat-card"><span class="stat-value">3 to 5 dB</span><span class="stat-label">Typical cut to clear it up</span></div>
</div>

<h2>High Pass Filters: Your First Move</h2>
<p>Before you reach for a parametric EQ, start with the simplest tool in your arsenal: the high pass filter. Most tracks in a mix don't need their lowest frequencies. A vocal picks up room rumble below 80 Hz. A guitar amp sim generates sub bass that just eats headroom. Synth pads accumulate low end you'll never consciously hear but your speakers definitely feel.</p>
<p>Roll off the low end on every track that doesn't need it. For vocals, try starting around 80 to 100 Hz. Acoustic guitars can handle a cutoff around 100 to 120 Hz. Synth pads and keys often sound cleaner with a filter at 150 to 200 Hz, depending on their role in the arrangement.</p>

<div class="callout"><div class="callout-label">Pro tip</div><p>Don't just set a high pass filter and forget it. Sweep the cutoff frequency upward while the full mix plays until you hear the sound get thin, then back it off slightly. That sweet spot is where you're removing mud without sacrificing body.</p></div>

<p>This single step removes a surprising amount of clutter. Most home recordings carry unnecessary sub content across dozens of tracks, and clearing it opens up real space for your kick and bass to breathe.</p>

<h2>Subtractive EQ in the Lower Midrange</h2>
<p>Once your high pass filters are set, the surgical work begins. The 200 to 500 Hz zone is where mud lives, and your goal isn't to nuke it. You need to make selective cuts on individual tracks so they stop competing.</p>
<p>Here's the technique that actually works: solo a track, add a narrow EQ boost of about 6 dB, and sweep slowly through the 200 to 500 Hz range. Listen for the frequencies that sound boxy, honky, or woolly. When you find the offending spot, flip that boost into a gentle cut of 2 to 4 dB. Widen the Q slightly so the cut sounds natural rather than surgical.</p>

<table class="data-table"><thead><tr><th>Instrument</th><th>Common Mud Frequency</th><th>Suggested Cut</th></tr></thead><tbody><tr><td>Vocals</td><td class="table-highlight">250 to 350 Hz</td><td>2 to 3 dB</td></tr><tr><td>Acoustic Guitar</td><td class="table-highlight">200 to 300 Hz</td><td>3 to 5 dB</td></tr><tr><td>Electric Guitar</td><td class="table-highlight">300 to 500 Hz</td><td>2 to 4 dB</td></tr><tr><td>Synth Pads</td><td class="table-highlight">200 to 400 Hz</td><td>3 to 5 dB</td></tr><tr><td>Piano</td><td class="table-highlight">250 to 400 Hz</td><td>2 to 4 dB</td></tr></tbody></table>

<p>The key word is selective. You don't need to cut the same frequency on every track. If your vocal sounds boxy at 300 Hz, maybe leave that range alone on the guitar and cut at 400 Hz instead. Each instrument gets its own pocket in the spectrum.</p>

<h2>Dynamic EQ: The Modern Solution</h2>
<p>Static EQ cuts work, but they remove energy even when there's no problem. A vocal might only get muddy during the chorus when it's competing with thick guitar layers. During the verse, that same lower mid energy adds warmth you actually want to keep.</p>
<p>Dynamic EQ solves this. A dynamic EQ band only cuts when the signal crosses a threshold you set. It stays transparent during quiet passages and engages automatically when things get dense.</p>
<p><a href="https://www.pluginboutique.com/product/2-Effects/16-EQ/14125-FabFilter-Pro-Q-4?a_aid=64d179a60ffc7" target="_blank" rel="noopener">FabFilter Pro-Q 4</a> is the industry standard here. Every band can switch between static and dynamic modes with a single click. The spectral EQ mode in version 4 takes things even further, applying gain changes only to specific frequencies that exceed the threshold within a band.</p>
<p><a href="https://www.pluginboutique.com/product/2-Effects/21-Channel-Strip/13502-Neutron-5?a_aid=64d179a60ffc7" target="_blank" rel="noopener">iZotope Neutron 5</a> offers a different approach. Its Mix Assistant analyzes your tracks and suggests EQ moves, which is a great starting point if you're still training your ears. The Unmask feature identifies frequency collisions between two tracks and applies corrective EQ automatically.</p>
<p>On a budget? <a href="https://www.pluginboutique.com/product/2-Effects/16-EQ/4656-TDR-Nova-GE?a_aid=64d179a60ffc7" target="_blank" rel="noopener">TDR Nova GE</a> delivers solid dynamic EQ at a fraction of the price. The free version of TDR Nova is also excellent for producers just getting started.</p>

<h2>Think Arrangement Before EQ</h2>
<p>Here's the thing most mixing tutorials won't tell you: if your mix is muddy, the problem might not be EQ at all. It might be arrangement.</p>
<p>When four instruments play in the same octave range simultaneously, no amount of EQ will make them all sound clear. Sometimes the best fix is muting a pad during the chorus, transposing a synth up an octave, or thinning out a guitar part. EQ is a corrective tool, not a magic wand.</p>

<blockquote class="pull-quote"><p>The best EQ move is the one you never have to make. If your arrangement gives each instrument its own frequency space, the mix practically clears itself.</p></blockquote>

<h2>Common Mistakes That Make Mud Worse</h2>
<p>Boosting the highs to "compensate" for a muddy mix is the most common rookie move. Adding 5 dB at 10 kHz doesn't remove the mud. It just makes a muddy mix that's also harsh. Always cut the problem frequency instead of boosting around it.</p>
<p>Another trap: soloing tracks while EQing. A guitar that sounds thin soloed might sit perfectly in the full mix. Make your final EQ decisions with everything playing. Solo is useful for finding problem frequencies, but the full arrangement is what matters.</p>
<p>Cutting too much is real too. If you've pulled 8 dB out of the lower midrange on every track, you've gone too far. The mix will sound hollow. Aim for the minimum cut that creates clarity, usually 2 to 4 dB per track.</p>

<div class="callout callout-warning"><div class="callout-label">Watch out</div><p>Loudness normalization on streaming platforms means your master gets turned down if it's too loud. A muddy mix pushed hard in mastering sounds worse on Spotify and Apple Music because normalization reveals the mud without perceived volume masking it. Get the mix right first.</p></div>

<h2>A Quick Cleanup Workflow</h2>
<p>Here's a practical routine for any session. Add high pass filters to every track except bass and kick. Identify the two or three instruments that dominate the 200 to 500 Hz range and make targeted cuts of 2 to 4 dB at their problem frequencies. Use dynamic EQ on vocals and lead instruments so cuts only engage when things get dense. Finally, check your work on headphones and at least one other speaker system. Mud is especially obvious on smaller speakers.</p>
<p>Clean mixes translate better across every playback system. When your music sounds polished, it holds attention longer, which means more complete streams and better algorithmic performance.</p>
<p>Ready to see what those streams are worth? Check our <a href="/">streaming calculators</a> for every major platform, including <a href="/spotify-calculator">Spotify</a> and <a href="/apple-music-calculator">Apple Music</a>. If you need a reliable distributor to get your polished mixes out to the world, <a href="https://distrokid.com/vip/seven/3063815" target="_blank" rel="noopener">get 7% off DistroKid here</a>. And for the EQ tools mentioned in this guide, <a href="https://www.pluginboutique.com/?a_aid=64d179a60ffc7" target="_blank" rel="noopener">browse more deals on Plugin Boutique</a>.</p>`;
