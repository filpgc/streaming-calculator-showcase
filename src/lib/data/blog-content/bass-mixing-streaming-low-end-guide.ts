export const content = `<h2>Why Bass Is the Hardest Part of a Streaming Mix</h2>
<p>Bass is where amateur mixes get exposed. On studio monitors your low end might feel solid. Then you hear the same track on AirPods, a Honda Civic dashboard speaker, and a friend's laptop, and the bass either disappears completely or sounds like a paper bag full of mud. That gap between how it sounds in your room and how it actually plays back on the devices people use is the entire bass mixing problem.</p>

<p>Streaming makes it worse. Spotify, Apple Music, and YouTube Music all run lossy codecs that handle low frequencies aggressively. Add the loudness normalization most platforms apply and your carefully sculpted 60 Hz fundamentals can either get crushed or weirdly emphasized depending on choices made upstream. Knowing how to mix bass for this environment is what separates producers whose tracks hit on every device from ones who only sound good at home.</p>

<h2>Step One: Your Room Is Lying to You</h2>
<p>Before touching a plugin, check your monitoring. The biggest factor in bass mix decisions isn't the plugin chain. It's whether your room is telling you the truth. Most untreated bedroom setups have a 6 to 15 dB peak somewhere between 60 and 200 Hz from standing waves. You mix accordingly, cutting that peak out, and end up with a thin track on every other system.</p>

<div class="callout"><div class="callout-label">Pro tip</div><p>If you can't treat your room, calibrate your headphones with <a href="https://www.pluginboutique.com/product/3-Studio-Tools/95-Referencing-Tools/7408-SoundID-Reference-for-Headphones?a_aid=64d179a60ffc7" target="_blank" rel="noopener">SoundID Reference</a> and check key bass moments on phone speakers and earbuds. Reference tracks in the same genre tell you whether your low end is in the ballpark.</p></div>

<h2>Step Two: Cut What Nobody Hears</h2>
<p>The first move in any bass mix is a high pass filter on the bass element around 30 to 40 Hz. Almost no playback system reproduces below 40 Hz cleanly. Phone speakers cut off around 200 Hz. Laptop speakers around 150 Hz. Even decent earbuds rarely make it below 30 Hz. Energy below that point steals headroom without contributing anything audible to most listeners.</p>

<table class="data-table"><thead><tr><th>Playback System</th><th>Low Frequency Cutoff</th></tr></thead><tbody><tr><td>Phone speakers</td><td class="table-highlight">~200 Hz</td></tr><tr><td>Laptop speakers</td><td class="table-highlight">~150 Hz</td></tr><tr><td>AirPods Pro</td><td class="table-highlight">~30 Hz</td></tr><tr><td>Factory car audio</td><td class="table-highlight">~50 Hz</td></tr><tr><td>Bluetooth speakers</td><td class="table-highlight">~60 Hz</td></tr></tbody></table>

<p>A linear phase filter from <a href="https://www.pluginboutique.com/product/2-Effects/16-EQ/14125-FabFilter-Pro-Q-4?a_aid=64d179a60ffc7" target="_blank" rel="noopener">FabFilter Pro-Q 4</a> keeps phase tight, which matters when bass and kick share frequencies. Standard minimum phase filters can shift the relationship between elements and smear transients in the low end.</p>

<h2>Step Three: Separate the Sub from the Body</h2>
<p>Most producers think of bass as one frequency range. Pros think of it as two. The sub region (30 to 80 Hz) gives the track weight on subwoofers, car systems, and headphones. The body region (80 to 250 Hz) is what carries on phone speakers and laptops where the sub literally cannot exist.</p>

<p>Split your bass element with a multiband compressor like <a href="https://www.pluginboutique.com/product/2-Effects/8-Compressor/919-FabFilter-Pro-MB?a_aid=64d179a60ffc7" target="_blank" rel="noopener">FabFilter Pro-MB</a> or two parallel sends. Compress the sub band tightly to keep it consistent (around 4:1 ratio, slow attack, slow release). Leave the body band more open so it retains punch and articulation. The result is a bass that sounds full on big systems and present on small ones.</p>

<p>For synth bass, layer a clean sine wave triggered by the bass MIDI tuned to root notes. The sine gives you precise sub control without depending on the synth's low end. Roll off the synth below 100 Hz and let the sine own the bottom.</p>

<h2>Step Four: Carve Space for the Kick</h2>
<p>The relationship between kick and bass is the single most common low end problem in streaming mixes. They occupy the same frequency space and they both want presence. If both run full range, the mix turns into mud at the very first listen.</p>

<p>Two approaches work. Sidechain compression on the bass keyed to the kick (3 to 5 dB of duck, fast attack, fast release tuned to the song's tempo) using something like <a href="https://www.pluginboutique.com/product/2-Effects/8-Compressor/16644-Pro-C-3?a_aid=64d179a60ffc7" target="_blank" rel="noopener">FabFilter Pro-C 3</a>. Or static EQ trades: cut 60 Hz on the bass and boost 60 Hz on the kick, then cut 120 Hz on the kick and boost 120 Hz on the bass. The frequencies switch ownership without either element disappearing.</p>

<blockquote class="pull-quote"><p>Pick one element to own the sub and the other to own the punch. Trying to give both everything is how mixes lose their bottom on streaming.</p></blockquote>

<h2>Step Five: Saturation Where Small Speakers Live</h2>
<p>Here's the move that fixes bass on phones and laptops. Add subtle harmonic saturation. Tools like <a href="https://www.pluginboutique.com/product/2-Effects/44-Saturation/1801-Decapitator?a_aid=64d179a60ffc7" target="_blank" rel="noopener">Soundtoys Decapitator</a> or any FET style compressor with drive create overtones at 200 Hz, 400 Hz, and 800 Hz that small speakers actually reproduce. Listeners' brains fill in the missing fundamentals from those harmonics. Your bass appears to play on a phone speaker even though the actual low frequencies are gone.</p>

<p>Restraint is the key. Two to four dB of drive is plenty on most material. Heavy saturation works for rock and hip hop but turns a clean pop mix into something distorted. The "E" mode on Decapitator is a classic starting point for bass because it adds even order harmonics that feel like analog warmth rather than aggression.</p>

<div class="callout callout-info"><div class="callout-label">Good to know</div><p>This is why bass on hip hop records translates so well to earbuds and phone speakers. Producers have been saturating low end for decades specifically so it survives playback on tiny speakers that can't reproduce sub bass at all.</p></div>

<h2>Step Six: Check on Three Sources Before You Print</h2>
<p>The bass mix isn't done until you've heard it on three systems. Studio monitors or treated headphones for the sub and overall balance. A phone speaker for the body and saturation choices. A car or Bluetooth speaker for how the bass interacts with mid range elements after codec encoding.</p>

<p>If the bass disappears on phone speakers, you need more saturation or more body in the 150 to 300 Hz region. If it sounds boomy in a car, your sub is too hot or your 80 to 120 Hz range needs cutting. If everything balances on monitors but feels weak on earbuds, that's usually a sign your room is hyping the low end and you've under mixed it.</p>

<h2>Putting the Chain Together</h2>
<p>A bass chain that translates: high pass at 35 Hz (linear phase), surgical EQ cuts on any room resonances or string buzzes, multiband compression with the sub band tight and the body band open, parallel saturation around 5% wet, sidechain compression keyed to the kick at 3 to 5 dB of duck. Reference against commercial tracks in the same genre on phone, earbuds, and a car system before committing.</p>

<p>Once you've locked in a low end that holds up everywhere, you can start estimating what those tighter mixes might earn. Run the numbers through our <a href="/spotify-calculator">Spotify calculator</a> or <a href="/apple-music-calculator">Apple Music calculator</a> to see how stream counts translate to dollars. When the track is ready to ship, you can <a href="https://distrokid.com/vip/seven/3063815" target="_blank" rel="noopener">get 7% off DistroKid here</a>, and <a href="https://www.pluginboutique.com/?a_aid=64d179a60ffc7" target="_blank" rel="noopener">browse more deals on Plugin Boutique</a> for the plugins above.</p>`;
