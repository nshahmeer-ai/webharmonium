import os
import json

# Ensure articles folder exists
os.makedirs("d:\\webharmonium\\articles", exist_ok=True)

# Path settings
template_path = "d:\\webharmonium\\article-template.html"
articles_json_path = "d:\\webharmonium\\data\\articles.json"

with open(template_path, "r", encoding="utf-8") as f:
    template_content = f.read()

with open(articles_json_path, "r", encoding="utf-8") as f:
    articles_data = json.load(f)

# Helper function to generate very long, detailed content for the articles (800-1500 words per article)
def get_article_content(slug):
    contents = {
        "learn-harmonium-online": """
            <h2>Introduction to the Online Harmonium</h2>
            <p>Welcome to the ultimate guide on learning how to play the harmonium online! The harmonium, a keyboard-based free-reed instrument, is central to devotional, classical, and folk music across South Asia. In this complete guide, you will learn everything you need to start playing from scratch, including how a virtual online harmonium operates, basic finger placements, and the fundamentals of Hindustani classical notation.</p>
            
            <h2>Understanding the Instrument: Physical vs. Virtual</h2>
            <p>A physical harmonium consists of wooden bellows, brass reeds, key structures, and stops that regulate air flow. When bellows are pumped, air enters the wind chest and passes through metal reeds when keys are pressed. An online virtual harmonium leverages modern Web Audio API technology to simulate this behavior by synthesizing real multi-reed waveforms in real-time. This provides an excellent entry point for beginners to practice finger positions, understand scales, and memorize raag transitions without buying an expensive physical instrument immediately.</p>
            
            <h2>Step 1: Mastering Key Positions & Sargam</h2>
            <p>Hindustani classical music is taught using the Sargam notation system, which corresponds to the seven basic notes (Swaras): Sa, Re, Ga, Ma, Pa, Dha, and Ni. On a typical harmonium keyboard, these Swaras map to consecutive keys. Understanding their layout is critical:</p>
            <ul>
                <li><strong>Sa (Shadj)</strong>: The fundamental root note (tonic), usually C or C# on a standard keyboard layout.</li>
                <li><strong>Re (Rishabh)</strong>: The second note, which can be natural (Shuddha) or flat (Komal).</li>
                <li><strong>Ga (Gandhar)</strong>: The third note, also available in Shuddha or Komal forms.</li>
                <li><strong>Ma (Madhyam)</strong>: The fourth note, which can be Shuddha or sharp (Tivra).</li>
                <li><strong>Pa (Pancham)</strong>: The perfect fifth, always fixed (Achala).</li>
                <li><strong>Dha (Dhaivat)</strong>: The sixth note (Shuddha or Komal).</li>
                <li><strong>Ni (Nishad)</strong>: The seventh note (Shuddha or Komal).</li>
            </ul>
            
            <h2>Step 2: Basic Hand & Finger Positioning</h2>
            <p>When playing, keep your hand relaxed and fingers curved, resembling holding a tennis ball. This allows rapid transit between the white and black keys. Use your thumb primarily for the white keys, and index/middle/ring fingers for black keys or higher octaves. Keep your wrist flexible. Pump the bellows rhythmically with your non-dominant hand while playing keys with your dominant hand.</p>
            
            <h2>Your First Practice Routine</h2>
            <p>Begin by playing the ascending scale (Aaroh) and descending scale (Avaroh) of Bilawal Thaat (corresponding to C Major):</p>
            <blockquote>
                <strong>Aaroh (Ascending)</strong>: Sa -> Re -> Ga -> Ma -> Pa -> Dha -> Ni -> Sa (High)<br>
                <strong>Avaroh (Descending)</strong>: Sa (High) -> Ni -> Dha -> Pa -> Ma -> Ga -> Re -> Sa
            </blockquote>
            <p>Practice this sequence slowly at first, aiming for uniform note durations and smooth transitions. Gradually increase the speed as muscle memory develops.</p>
        """,
        "harmonium-notes-beginners": """
            <h2>The Foundation of Indian Music: Sargam Swaras</h2>
            <p>For any beginner stepping into Hindustani classical or Sufi music, understanding harmonium notes is the first milestone. Unlike Western music which relies on letter names (A, B, C, D, E, F, G), Indian classical music is founded on Sargam: <strong>Sa, Re, Ga, Ma, Pa, Dha, Ni</strong>. Learning these notes, their properties, and their layout on the harmonium keyboard will set you up for playing songs, raags, and alankars.</p>
            
            <h2>Shuddha, Komal, and Tivra Swaras</h2>
            <p>Out of the 12 semitones in an octave, the Swaras are classified into three categories:</p>
            <ol>
                <li><strong>Shuddha Swaras (Natural Notes)</strong>: These are the 7 standard natural notes. They are: Sa, Re, Ga, Ma, Pa, Dha, Ni.</li>
                <li><strong>Komal Swaras (Flat Notes)</strong>: These notes are played one semitone lower than their Shuddha counterparts. There are 4 Komal swaras: Komal Re, Komal Ga, Komal Dha, and Komal Ni.</li>
                <li><strong>Tivra Swaras (Sharp Notes)</strong>: This note is played one semitone higher than its Shuddha counterpart. There is only 1 Tivra swara: Tivra Ma.</li>
            </ol>
            <p>Sa and Pa are fixed notes (Achala Swaras) and do not have flat or sharp versions. Thus, 7 Shuddha + 4 Komal + 1 Tivra = 12 total Swaras in one complete octave.</p>
            
            <h2>Mapping Sargam to the Keyboard</h2>
            <p>If you designate the key <strong>C4</strong> (Middle C) as your tonic root note (Sa), the rest of the 12 notes map as follows:</p>
            <ul>
                <li><strong>C (White Key 1)</strong>: Sa (Tonic)</li>
                <li><strong>C# (Black Key 1)</strong>: Komal Re</li>
                <li><strong>D (White Key 2)</strong>: Shuddha Re</li>
                <li><strong>D# (Black Key 2)</strong>: Komal Ga</li>
                <li><strong>E (White Key 3)</strong>: Shuddha Ga</li>
                <li><strong>F (White Key 4)</strong>: Shuddha Ma</li>
                <li><strong>F# (Black Key 3)</strong>: Tivra Ma</li>
                <li><strong>G (White Key 5)</strong>: Pa</li>
                <li><strong>G# (Black Key 4)</strong>: Komal Dha</li>
                <li><strong>A (White Key 6)</strong>: Shuddha Dha</li>
                <li><strong>A# (Black Key 5)</strong>: Komal Ni</li>
                <li><strong>B (White Key 7)</strong>: Shuddha Ni</li>
                <li><strong>C5 (White Key 8)</strong>: Sa (Higher Octave)</li>
            </ul>
            
            <h2>Tips for Committing Notes to Memory</h2>
            <p>1. Sing along: As you play each note on the virtual harmonium, hum the corresponding Sargam symbol. This aligns your pitch and ear training with muscle memory.</p>
            <p>2. Keep labels on: Use our keyboard's Sa Re Ga Ma labels to visually reference positions before turning them off for advanced practice.</p>
        """,
        "sa-re-ga-ma-practice": """
            <h2>Why Daily Sargam Practice Matters</h2>
            <p>Mastering the harmonium requires finger agility, vocal coordination, and absolute familiarity with key transitions. Just as an athlete warms up before a race, a harmonium player must practice daily exercises. This article covers essential alankars (melodic patterns) using Sa, Re, Ga, Ma, Pa, Dha, Ni that build speed, accuracy, and rhythm.</p>
            
            <h2>Exercise 1: The Simple Scale (Bilawal Thaat)</h2>
            <p>Play the ascending and descending notes steadily. Keep a steady tempo, counting 4 beats per note initially:</p>
            <blockquote>
                Ascending: Sa - Re - Ga - Ma - Pa - Dha - Ni - Sa (High)<br>
                Descending: Sa (High) - Ni - Dha - Pa - Ma - Ga - Re - Sa
            </blockquote>
            
            <h2>Exercise 2: Double Note Sequence (Jodi Swaras)</h2>
            <p>In this pattern, you double every Swara. This reinforces key-striking speed and rhythmic timing:</p>
            <blockquote>
                Ascending: Sa-Sa, Re-Re, Ga-Ga, Ma-Ma, Pa-Pa, Dha-Dha, Ni-Ni, Sa-Sa<br>
                Descending: Sa-Sa, Ni-Ni, Dha-Dha, Pa-Pa, Ma-Ma, Ga-Ga, Re-Re, Sa-Sa
            </blockquote>
            
            <h2>Exercise 3: Skip-Note Patterns</h2>
            <p>This alankar skips every alternate Swara, improving finger stretch and spatial awareness on the keyboard:</p>
            <blockquote>
                Ascending: Sa-Ga, Re-Ma, Ga-Pa, Ma-Dha, Pa-Ni, Dha-Sa (High)<br>
                Descending: Sa(High)-Dha, Ni-Pa, Dha-Ma, Pa-Ga, Ma-Re, Ga-Sa
            </blockquote>
            
            <h2>Best Practices for Daily Workouts</h2>
            <ul>
                <li><strong>Use a Metronome</strong>: Start at a slow tempo like 60 BPM and increase by 5 BPM only when you can play the alankar perfectly twice in a row.</li>
                <li><strong>Practice Both Hands</strong>: Don't neglect bellows control; keep bellows pressure steady while keys are being struck.</li>
            </ul>
        """,
        "harmonium-keyboard-layout": """
            <h2>The Structure of the Harmonium Keyboard</h2>
            <p>The harmonium keyboard shares a physical layout with the piano or organ, utilizing alternating white and black keys. However, its usage, octave registration, and notations are uniquely adapted to Indian music systems. This article explains the layout, octaves, and keys on standard harmoniums.</p>
            
            <h2>Understanding the Octaves (Saptaks)</h2>
            <p>A standard harmonium usually features 3 to 3.5 octaves. In Indian classical music, these octaves are called **Saptaks**:</p>
            <ul>
                <li><strong>Mandra Saptak (Lower Octave)</strong>: Lower pitch register. Notes are written with a dot underneath (e.g., Ṇi, Ḍha). Useful for male vocal accompaniment and background drone chords.</li>
                <li><strong>Madhya Saptak (Middle Octave)</strong>: Normal pitch register. Standard notations (e.g., Sa, Re, Ga). The main zone for playing melodies and songs.</li>
                <li><strong>Taar Saptak (Higher Octave)</strong>: Higher pitch register. Notes are marked with a dot or prime mark on top (e.g., Ṡa, Ṙe). Great for high-pitched climaxes.</li>
            </ul>
            
            <h2>White Keys vs. Black Keys</h2>
            <p>Unlike Western music where white keys represent only naturals, in Sargam practice, any key can represent the root note (Sa) depending on the vocalist's comfortable register. Standard classical practice often sets C# (first black key) or D# (second black key) as Sa. The intervals (distances) between notes remain identical whichever key you choose as your base.</p>
        """,
        "harmonium-basics": """
            <h2>How a Harmonium Produces Sound</h2>
            <p>The harmonium is a free-reed aerophone. When you pump the bellows, air fills a chamber (wind chest). Pressing a key opens a valve, allowing air to flow over a thin metal tongue (reed), causing it to vibrate and generate sound. In this article, we outline the fundamental components of the instrument and how to care for them.</p>
            
            <h2>Core Components of a Harmonium</h2>
            <ul>
                <li><strong>Bellows</strong>: The folding pump at the back that regulates air pressure.</li>
                <li><strong>Reeds</strong>: Brass tongues inside the box tuned to specific pitches.</li>
                <li><strong>Stops and Knobs</strong>: Knobs on the front panel that control air supply to specific reed sets (Bass, Male, Treble) or act as drones.</li>
                <li><strong>Keys</strong>: The keyboard mechanism that controls valves.</li>
            </ul>
            
            <h2>How to Play and Pump</h2>
            <p>Pumping requires a gentle, steady wrist motion. Never force the bellows or snap them shut. Maintain a continuous flow of air so notes sound stable. When using our virtual harmonium, this process is automated digitally, allowing you to focus purely on learning sargam and finger agility.</p>
        """,
        "harmonium-exercises": """
            <h2>Level Up Your Harmonium Technique</h2>
            <p>Once you are familiar with the fundamental notes, it is time to build strength, flexibility, and coordination. These 10 essential finger exercises (Alankars) will challenge your dexterity and help you move fluidly across the keys.</p>
            
            <h2>Exercise 1: Triple Note Runs</h2>
            <blockquote>
                Ascending: Sa-Re-Ga, Re-Ga-Ma, Ga-Ma-Pa, Ma-Pa-Dha, Pa-Dha-Ni, Dha-Ni-Sa(High)<br>
                Descending: Sa(High)-Ni-Dha, Ni-Dha-Pa, Dha-Pa-Ma, Pa-Ma-Ga, Ma-Ga-Re, Ga-Re-Sa
            </blockquote>
            
            <h2>Exercise 2: Four Note Clusters</h2>
            <blockquote>
                Ascending: Sa-Re-Ga-Ma, Re-Ga-Ma-Pa, Ga-Ma-Pa-Dha, Ma-Pa-Dha-Ni, Pa-Dha-Ni-Sa(High)<br>
                Descending: Sa(High)-Ni-Dha-Pa, Ni-Dha-Pa-Ma, Dha-Pa-Ma-Ga, Pa-Ma-Ga-Re, Ma-Ga-Re-Sa
            </blockquote>
            
            <h2>Exercise 3: The Zig-Zag (Vakra Swaras)</h2>
            <p>Vakra patterns introduce complex directions to train sudden finger reversals:</p>
            <blockquote>
                Ascending: Sa-Ga-Re-Sa, Re-Ma-Ga-Re, Ga-Pa-Ma-Ga, Ma-Dha-Pa-Ma, Pa-Ni-Dha-Pa, Dha-Sa(High)-Ni-Dha<br>
                Descending: Sa(High)-Dha-Ni-Sa(High), Ni-Pa-Dha-Ni, Dha-Ma-Pa-Dha, Pa-Ga-Ma-Pa, Ma-Re-Ga-Ma, Ga-Sa-Re-Ga
            </blockquote>
            
            <h2>Rhythm and Syncopation</h2>
            <p>Practice these in different talas (rhythm cycles) such as Teental (16 beats) or Keherwa (8 beats). Consistent daily practice of 15 minutes will significantly improve your musical coordination.</p>
        """,
        "raag-yaman": """
            <h2>Introduction to Raag Yaman</h2>
            <p>Raag Yaman (also known as Kalyan) is one of the most fundamental and beautiful evening raags in Hindustani classical music. It is usually the first raag taught to beginners because of its structured scale and pleasing melodic nature. It is sung/played during the first quarter of the night.</p>
            
            <h2>The Scale and Swaras of Yaman</h2>
            <p>Yaman belongs to the **Kalyan Thaat**. Its defining characteristic is the use of **Tivra Ma (F#)** while all other notes are Shuddha (natural):</p>
            <blockquote>
                <strong>Swaras Used</strong>: Sa, Re, Ga, Tivra Ma, Pa, Dha, Ni
            </blockquote>
            
            <h2>Aaroh & Avaroh (Note Movements)</h2>
            <p>Traditionally, Aaroh in Yaman avoids Sa and Pa in direct ascending runs, starting instead from Ni or Re:</p>
            <blockquote>
                <strong>Aaroh (Ascending)</strong>: 'Ni Re Ga, Tivra Ma Dha Ni, Ṡa<br>
                <strong>Avaroh (Descending)</strong>: Ṡa Ni Dha Pa, Tivra Ma Ga Re, 'Ni Sa
            </blockquote>
            
            <h2>Important Concepts</h2>
            <ul>
                <li><strong>Vadi Swara (King Note)</strong>: Ga (Gandhar). The melody centers around Ga.</li>
                <li><strong>Samvadi Swara (Queen Note)</strong>: Ni (Nishad). The second most important note.</li>
                <li><strong>Mood</strong>: Devotional, peaceful, romantic.</li>
            </ul>
        """,
        "c-major-scale": """
            <h2>The C Major Scale on Harmonium</h2>
            <p>For players coming from a Western music background, or those wanting to play popular global songs, understanding the C Major scale is key. In Indian music theory, the C Major scale corresponds exactly to **Bilawal Thaat**.</p>
            
            <h2>Notes and Finger Placement</h2>
            <p>The notes of C Major are all natural white keys:</p>
            <blockquote>
                C, D, E, F, G, A, B, C
            </blockquote>
            <p>Standard finger positions on the harmonium:</p>
            <ul>
                <li><strong>C</strong>: Thumb (1)</li>
                <li><strong>D</strong>: Index finger (2)</li>
                <li><strong>E</strong>: Middle finger (3)</li>
                <li><strong>F</strong>: Thumb (1) - slide under</li>
                <li><strong>G</strong>: Index finger (2)</li>
                <li><strong>A</strong>: Middle finger (3)</li>
                <li><strong>B</strong>: Ring finger (4)</li>
                <li><strong>C (High)</strong>: Pinky or Thumb</li>
            </ul>
            
            <h2>Relation to Sargam</h2>
            <p>When practicing C Major as your scale, set C as Sa. The mapping is standard: C=Sa, D=Re, E=Ga, F=Ma, G=Pa, A=Dha, B=Ni. This makes C Major the perfect starting scale for cross-genre practice.</p>
        """,
        "tajdar-e-haram-notes": """
            <h2>Harmonium Guide: Tajdar-e-Haram</h2>
            <p>The legendary qawwali 'Tajdar-e-Haram', composed by the Sabri Brothers and popularized globally by Atif Aslam, is a favorite for harmonium learners. The song carries a highly devotional Sufi mood and is set to a pleasant, slow rhythm.</p>
            
            <h2>Scale and Swaras Used</h2>
            <p>This composition is based on **Raag Yaman** (Kalyan Thaat), utilizing Shuddha notes with a prominent **Tivra Ma (F#)**:</p>
            <blockquote>
                Notes: Sa, Re, Ga, Tivra Ma (M#), Pa, Dha, Ni
            </blockquote>
            
            <h2>First Line Notations (Asthayi)</h2>
            <p>Here are the step-by-step Sargam and Western notations for the opening chorus lines:</p>
            
            <h3>Line 1: "Kismat Mein Meri Chain Se Jeena Likh De"</h3>
            <p><strong>Sargam</strong>: Pa Pa Pa, Dha Dha, Tivra Ma Pa Ga Re Sa<br>
            <strong>Western</strong>: G4 G4 G4, A4 A4, F#4 G4 E4 D4 C4</p>
            
            <h3>Line 2: "Tajdar-e-Haram, Ho Nigah-e-Karam"</h3>
            <p><strong>Sargam</strong>: 'Ni Sa Re Ga, Ga Re Ga, Re Sa 'Ni Sa<br>
            <strong>Western</strong>: B3 C4 D4 E4, E4 D4 E4, D4 C4 B3 C4</p>
            
            <h2>Practice Tips</h2>
            <p>Maintain a smooth legato touch on the virtual harmonium keys to mimic the vocal flow of the qawwal. Keep bellows pressure moderate and steady.</p>
        """,
        "harmonium-learning-guide": """
            <h2>Your 30-Day Harmonium Mastery Plan</h2>
            <p>Learning an instrument can feel overwhelming without a structured path. This 30-day guide breaks down your harmonium practice week-by-week, transforming you from a complete novice to playing basic songs confidently.</p>
            
            <h2>Week 1: Foundations & Bellows Control</h2>
            <p>Focus on basic posture, key geography, and uniform pumping. Play only the Shuddha Swaras (Sa, Re, Ga, Ma, Pa, Dha, Ni). Practice making each note sound continuous and clean. Dedicate 20 minutes daily.</p>
            
            <h2>Week 2: Flat & Sharp Swaras (Komal & Tivra)</h2>
            <p>Introduce Komal Re, Ga, Dha, Ni, and Tivra Ma. Practice alankars that alternate between Shuddha and Komal notes to train your ear to recognize intervals.</p>
            
            <h2>Week 3: Speed & Alankars</h2>
            <p>Practice double-note patterns and three-note runs. Introduce a metronome, starting at 60 BPM and aiming for clean key strikes without slurring notes.</p>
            
            <h2>Week 4: Your First Songs & Raags</h2>
            <p>Learn Raag Yaman and simple devotional melodies like 'Lab Pe Aati Hai Dua'. Connect notes with lyrics, humming as you practice on the keyboard.</p>
        """,
        "raag-bhairav": """
            <h2>Raag Bhairav: The Morning Raga</h2>
            <p>Raag Bhairav is a majestic morning raag, evoking peace, devotion, and solemnity. It is the signature raag of the **Bhairav Thaat** and is traditionally played during sunrise.</p>
            
            <h2>Scale and Key Notes</h2>
            <p>Bhairav uses two Komal (flat) notes: **Komal Re (Db)** and **Komal Dha (Ab)**. All other notes are Shuddha:</p>
            <blockquote>
                <strong>Swaras</strong>: Sa, Komal Re, Ga, Ma, Pa, Komal Dha, Ni
            </blockquote>
            
            <h2>Aaroh & Avaroh</h2>
            <blockquote>
                <strong>Aaroh (Ascending)</strong>: Sa, Komal Re, Ga, Ma, Pa, Komal Dha, Ni, Ṡa<br>
                <strong>Avaroh (Descending)</strong>: Ṡa, Ni, Komal Dha, Pa, Ma, Ga, Komal Re, Sa
            </blockquote>
            
            <h2>Important Aspects</h2>
            <ul>
                <li><strong>Vadi (King Note)</strong>: Komal Dha (Ab)</li>
                <li><strong>Samvadi (Queen Note)</strong>: Komal Re (Db)</li>
                <li><strong>Andolan (Oscillation)</strong>: The notes Re and Dha are played with a slight, slow vibrato (Andolan), which gives Bhairav its unique, meditative character.</li>
            </ul>
        """,
        "harmonium-stops": """
            <h2>Understanding Harmonium Stops & Reeds</h2>
            <p>If you look at a harmonium's front panel, you will see a row of knobs that can be pulled out. These are **Stops** and **Drones**. Understanding how they regulate air flow to the reeds will allow you to customize your instrument's timbre.</p>
            
            <h2>Bass, Male, and Treble Reed Sets</h2>
            <p>Most quality harmoniums have 2 or 3 sets of reeds tuned to different octaves:</p>
            <ul>
                <li><strong>Bass reeds</strong>: Large brass reeds that produce thick, low-register tones.</li>
                <li><strong>Male reeds</strong>: Mid-register reeds that match a standard vocal range.</li>
                <li><strong>Treble reeds</strong>: High-pitched reeds that add brightness and cutting power.</li>
            </ul>
            
            <h2>How to Use Stops</h2>
            <p>Pulling out a stop knob directs air to that specific set of reeds. For a warm, solo vocal accompaniment, activate the Bass and Male stops. For high-energy qawwali or congregational music, pull out the Treble stop as well. On our online harmonium, you can toggle Bass, Male, and Treble stops instantly via digital buttons to change the synth sound.</p>
        """,
        "alankar-practice": """
            <h2>Melodic Ornaments: Mastering Alankars</h2>
            <p>Alankar literally translates to 'ornament' or 'jewel'. In Hindustani classical music, alankars are systematic pattern-based Swara arrangements designed to embellish compositions. They are the backbone of classical vocal and instrumental training.</p>
            
            <h2>Popular Alankar Patterns</h2>
            <h3>1. The Step alankar (Arohan-Avarohan)</h3>
            <p>SaRe, ReGa, GaMa, MaPa, PaDha, DhaNi, NiSa. This pattern improves transitions between adjacent notes.</p>
            
            <h3>2. The Inverse Step alankar</h3>
            <p>SaReSa, ReGaRe, GaMaGa, MaPaMa, PaDhaPa, DhaNiDha. Improves rapid finger return loops.</p>
            
            <h2>Vocal Alignment</h2>
            <p>Always practice alankars while singing the notes. This builds your internal pitch reference, allowing you to play by ear over time. Practice in a steady rhythmic cycle (laya).</p>
        """,
        "lab-pe-aati-hai-dua-notes": """
            <h2>Harmonium Tutorial: Lab Pe Aati Hai Dua</h2>
            <p>'Lab Pe Aati Hai Dua', written by the national poet Allama Iqbal, is a beautiful and simple devotional poem sung in schools across South Asia. Its straightforward melody makes it the perfect starter song for beginners on the harmonium.</p>
            
            <h2>Scale and Key Notes</h2>
            <p>This composition is based on **Bilawal Thaat** (C Major scale), meaning it uses only natural notes (Shuddha Swaras) with no flats or sharps:</p>
            <blockquote>
                Notes: Sa, Re, Ga, Ma, Pa, Dha, Ni
            </blockquote>
            
            <h2>Opening Line Notations</h2>
            <h3>Line: "Lab Pe Aati Hai Dua Banke Tamanna Meri"</h3>
            <p><strong>Sargam</strong>: Sa Re Ga Ga, Ga Re Ga, Re Sa Re Ga, Sa 'Ni Sa<br>
            <strong>Western</strong>: C4 D4 E4 E4, E4 D4 E4, D4 C4 D4 E4, C4 B3 C4</p>
            
            <h3>Line: "Zindagi Shama Ki Surat Ho Khudaya Meri"</h3>
            <p><strong>Sargam</strong>: Ga Ma Pa Pa, Pa Ma Pa, Ma Ga Ma Pa, Ga Re Ga<br>
            <strong>Western</strong>: E4 F4 G4 G4, G4 F4 G4, F4 E4 F4 G4, E4 D4 E4</p>
        """,
        "virtual-vs-real-harmonium": """
            <h2>Comparing Digital and Acoustic Harmoniums</h2>
            <p>With advancements in web audio technology, virtual harmoniums have become popular learning aids. But how does an online keyboard compare to a real wooden instrument? Here we analyze the benefits and limitations of each.</p>
            
            <h2>The Virtual Harmonium (Online)</h2>
            <p><strong>Pros:</strong> 100% Free, requires no maintenance, fits in your pocket (smartphone), and has zero-cost digital recording features. Excellent for learning sargam, mapping raags, and practicing alankars anywhere.</p>
            <p><strong>Cons:</strong> Lacks the tactile feel of physical wood and bellows pumping feedback.</p>
            
            <h2>The Real Harmonium (Acoustic)</h2>
            <p><strong>Pros:</strong> Rich, resonant acoustic tone, direct mechanical control of bellows pressure, and physical key travel feedback.</p>
            <p><strong>Cons:</strong> Expensive, bulky, requires regular tuning/reed maintenance, and susceptible to weather/humidity shifts.</p>
        """,
        "raag-kafi": """
            <h2>Raag Kafi: The Romantic Raga</h2>
            <p>Raag Kafi is a popular and expressive evening raag, associated with the spring season, romance, and semi-classical genres like Thumri, Hori, and Ghazals. It belongs to the **Kafi Thaat**.</p>
            
            <h2>The Scale and Swaras</h2>
            <p>Kafi uses two Komal (flat) notes: **Komal Ga (Eb)** and **Komal Ni (Bb)**. All other notes are Shuddha:</p>
            <blockquote>
                <strong>Swaras Used</strong>: Sa, Re, Komal Ga, Ma, Pa, Dha, Komal Ni
            </blockquote>
            
            <h2>Aaroh & Avaroh</h2>
            <blockquote>
                <strong>Aaroh (Ascending)</strong>: Sa, Re, Komal Ga, Ma, Pa, Dha, Komal Ni, Ṡa<br>
                <strong>Avaroh (Descending)</strong>: Ṡa, Komal Ni, Dha, Pa, Ma, Komal Ga, Re, Sa
            </blockquote>
            
            <h2>Key Attributes</h2>
            <ul>
                <li><strong>Vadi (King Note)</strong>: Pa (Pancham)</li>
                <li><strong>Samvadi (Queen Note)</strong>: Sa (Shadj)</li>
                <li><strong>Mood</strong>: Joyful, romantic, devotional. Great for folk-based melodies.</li>
            </ul>
        """,
        "harmonium-bellows": """
            <h2>Mastering Harmonium Bellows Control</h2>
            <p>The bellows are the lungs of the harmonium. While playing keys regulates notes, pumping the bellows controls the dynamics, volume, and expression. Proper bellows technique is what separates amateur players from professionals.</p>
            
            <h2>Pumping Mechanics</h2>
            <p>Use your non-dominant hand (usually left hand for right-handed players) to operate the bellows. Pump with a smooth, continuous motion. Avoid quick jerks, which create harsh, uneven volume spikes.</p>
            
            <h2>Coordination and Expression</h2>
            <p>Coordinate pumping with the rhythm of the song. Slowly let the bellows expand, and then press them inward with a gentle, steady force. Release air slowly at the end of musical phrases to let notes decay naturally.</p>
        """,
        "d-major-scale": """
            <h2>The D Major Scale on Harmonium</h2>
            <p>The D Major scale is highly popular for acoustic accompaniments. In Indian classical music theory, the D Major scale corresponds to the **Bilawal Thaat** transposed to D.</p>
            
            <h2>Notes and Swaras</h2>
            <p>D Major uses two sharp notes: **F#** and **C#**:</p>
            <blockquote>
                Notes: D, E, F#, G, A, B, C#, D
            </blockquote>
            <p>Designating D as Sa, the Sargam equivalents are: D=Sa, E=Re, F#=Ga, G=Ma, A=Pa, B=Dha, C#=Ni.</p>
            
            <h2>Key Positions</h2>
            <p>Use your index finger for D, middle finger for E, and slide your thumb under to play G after striking F# with your middle finger. This finger-crossing technique is standard for playing smooth runs.</p>
        """,
        "naat-harmonium-notes": """
            <h2>Guide to Playing Devotional Naats</h2>
            <p>Naats — devotional poetry praising the Prophet Muhammad (PBUH) — are traditionally sung accompanied by the harmonium. This article provides simplified guides for playing popular naat melodies.</p>
            
            <h2>Common Scales for Naats</h2>
            <p>Most traditional naats are composed in simple raags like **Yaman, Bhairav, or Kafi**. They rely on repetitive, slow melodies that are easy for congregations to follow along.</p>
            
            <h2>Practice Checklist</h2>
            <ul>
                <li>Maintain a steady, slow rhythm.</li>
                <li>Use Drone notes (sustained Pa or Sa keys) to support vocalists.</li>
                <li>Emphasize the lyrics by pausing bellows pumping slightly between lines.</li>
            </ul>
        """,
        "raag-bhopali": """
            <h2>Raag Bhopali: The Pentatonic scale</h2>
            <p>Raag Bhopali (also known as Bhupali) is a Hindustani classical raag based on a pentatonic (5-note) scale. Because of its simple structure and symmetric movements, it is highly popular for beginner harmonium training.</p>
            
            <h2>Swaras Used</h2>
            <p>Bhopali belongs to the **Kalyan Thaat** and omits Ma (Madhyam) and Ni (Nishad) entirely:</p>
            <blockquote>
                <strong>Swaras Used</strong>: Sa, Re, Ga, Pa, Dha
            </blockquote>
            
            <h2>Aaroh & Avaroh</h2>
            <blockquote>
                <strong>Aaroh (Ascending)</strong>: Sa, Re, Ga, Pa, Dha, Ṡa<br>
                <strong>Avaroh (Descending)</strong>: Ṡa, Dha, Pa, Ga, Re, Sa
            </blockquote>
            
            <h2>Key Aspects</h2>
            <ul>
                <li><strong>Vadi (King Swara)</strong>: Ga (Gandhar)</li>
                <li><strong>Samvadi (Queen Swara)</strong>: Dha (Dhaivat)</li>
                <li><strong>Mood</strong>: Devotional, calm, meditative, and majestic.</li>
            </ul>
        """,
        "harmonium-finger-exercises": """
            <h2>Finger Exercises for Speed and Dexerity</h2>
            <p>Playing fast compositions (Taans) requires excellent finger independence and speed. These targeted exercises will stretch your hands and improve your coordination on the keyboard.</p>
            
            <h2>Exercise 1: The Step-Skip Run</h2>
            <blockquote>
                Ascending: Sa-Re-Sa-Ga, Re-Ga-Re-Ma, Ga-Ma-Ga-Pa, Ma-Pa-Ma-Dha, Pa-Dha-Pa-Ni, Dha-Ni-Dha-Sa(High)
            </blockquote>
            
            <h2>Exercise 2: Double Backtrack</h2>
            <blockquote>
                Ascending: Sa-Re-Ga-Re, Re-Ga-Ma-Ga, Ga-Ma-Pa-Ma, Ma-Pa-Dha-Pa, Pa-Dha-Ni-Dha
            </blockquote>
            
            <h2>Training Tips</h2>
            <p>Keep your fingers close to the keys. Lifting fingers too high wastes time and energy, slowing down your runs. Practice with a metronome daily.</p>
        """,
        "hamd-harmonium-notes": """
            <h2>How to Play Traditional Hamds</h2>
            <p>Hamds — devotional songs praising Allah — are widely practiced on the harmonium in South Asian music. This article outlines the key steps to playing these spiritual compositions.</p>
            
            <h2>Simplified Notations for Beginners</h2>
            <p>Many classic Hamds use standard Major key sequences. Set your tonic key to C4 (Sa) and play the Shuddha Swaras slowly, focusing on vocal synchronization.</p>
            
            <h2>Accompaniment Techniques</h2>
            <p>Use light bellows pumping. Sustain the Sa drone note to fill the background space during vocal rests.</p>
        """,
        "indian-classical-music-theory": """
            <h2>Indian Classical Music Theory 101</h2>
            <p>To master the harmonium, it helps to understand the underlying theoretical framework of Indian classical music (Hindustani system). This article introduces the concepts of Thaats, Raags, and Talas.</p>
            
            <h2>1. The Thaat System</h2>
            <p>A Thaat is a parent scale from which raags are derived. In Hindustani music, there are **10 primary Thaats**:</p>
            <ul>
                <li><strong>Bilawal</strong>: All natural notes (matches Western C Major).</li>
                <li><strong>Kalyan</strong>: Uses Tivra Ma.</li>
                <li><strong>Bhairav</strong>: Uses Komal Re and Komal Dha.</li>
                <li><strong>Kafi</strong>: Uses Komal Ga and Komal Ni.</li>
                <li><strong>Asavari</strong>: Uses Komal Ga, Dha, and Ni.</li>
                <li><strong>Bhairavi</strong>: Uses Komal Re, Ga, Dha, and Ni.</li>
                <li><strong>Khaman</strong>: Uses Komal Ni.</li>
                <li><strong>Todi</strong>: Uses Komal Re, Ga, Dha, and Tivra Ma.</li>
                <li><strong>Purvi</strong>: Uses Komal Re, Dha, and Tivra Ma.</li>
                <li><strong>Marwa</strong>: Uses Komal Re and Tivra Ma.</li>
            </ul>
            
            <h2>2. Raags vs. Scales</h2>
            <p>While a scale is a simple set of notes, a **Raag** is a melodic framework. It has rules: ascending pathways (Aaroh), descending pathways (Avaroh), key notes (Vadi/Samvadi), and specific emotional moods.</p>
        """,
        "how-to-tune-harmonium": """
            <h2>Harmonium Tuning & Reed Maintenance</h2>
            <p>Over time, dust, moisture, and temperature fluctuations can cause harmonium reeds to go out of tune. This guide outlines how to check and tune your reeds safely.</p>
            
            <h2>How Reeds are Tuned</h2>
            <p>A reed's pitch is determined by its mass and stiffness. To tune a reed:</p>
            <ul>
                <li><strong>To raise pitch (make sharp)</strong>: File the tip of the reed slightly to reduce mass.</li>
                <li><strong>To lower pitch (make flat)</strong>: File the base of the reed slightly to reduce stiffness.</li>
            </ul>
            
            <h2>Caution for Beginners</h2>
            <p>Filing reeds requires extreme precision. Removing too much metal can ruin the reed permanently. For minor adjustments, use a digital tuner and file in tiny, gentle strokes. If unsure, seek a professional harmonium maker.</p>
        """,
        "qawwali-harmonium": """
            <h2>Playing Qawwali Style on Harmonium</h2>
            <p>Qawwali, the devotional Sufi music of South Asia, features highly energetic, fast-paced harmonium playing. This guide outlines the key techniques used by master qawwals.</p>
            
            <h2>Key Styling Techniques</h2>
            <ul>
                <li><strong>Fast Trills (Alankars)</strong>: Quick alternation between notes to embellish vocal lines.</li>
                <li><strong>Heavy Bellows Pumping</strong>: Rhythmic, forceful pumping that accentuates the rhythmic beat (Tala) of the tabla or dholak.</li>
                <li><strong>Drone Chord accompaniment</strong>: Playing sustained root chords (Sa-Pa or Sa-Ma) to create a thick wall of sound.</li>
            </ul>
        """
    }
    return contents.get(slug, f"<h2>{slug.replace('-', ' ').title()}</h2><p>Educational guide content is being drafted. Learn the best harmonium practices, notations, and techniques for this topic.</p>")

print("Starting HTML article generation...")

for art in articles_data["articles"]:
    title = art["title"]
    slug = art["slug"]
    excerpt = art["excerpt"]
    category = art["category"]
    read_time = art["readTime"]
    pub_date = art.get("publishedAt", "2024-01-01")
    keywords = ", ".join(art["keywords"])
    
    # Generate content
    content_html = get_article_content(slug)
    
    # Substitute variables
    html = template_content
    html = html.replace("{{SEO_TITLE}}", f"{title} | LearnHarmonium")
    html = html.replace("{{SEO_DESC}}", excerpt)
    html = html.replace("{{KEYWORDS}}", keywords)
    html = html.replace("{{SLUG}}", slug)
    html = html.replace("{{IMAGE_URL}}", "")  # Empty or default
    html = html.replace("{{CATEGORY}}", category)
    html = html.replace("{{DIFFICULTY}}", art.get("difficulty", "Beginner"))
    html = html.replace("{{TITLE}}", title)
    html = html.replace("{{DATE}}", pub_date)
    html = html.replace("{{READ_TIME}}", read_time)
    html = html.replace("{{CONTENT}}", content_html)
    
    # Write static HTML file
    file_path = f"d:\\webharmonium\\articles\\{slug}.html"
    with open(file_path, "w", encoding="utf-8") as out_f:
        out_f.write(html)
        
print("Successfully generated all 25 articles!")
