import os
import json
import xml.etree.ElementTree as ET
from xml.dom import minidom

def main():
    # Paths
    data_dir = os.path.join("d:\\webharmonium", "data")
    template_dir = os.path.join("d:\\webharmonium", "templates")
    
    notes_json_path = os.path.join(data_dir, "notes.json")
    raags_json_path = os.path.join(data_dir, "raags.json")
    scales_json_path = os.path.join(data_dir, "scales.json")
    site_json_path = os.path.join(data_dir, "site.json")
    
    # Load JSON files
    with open(notes_json_path, "r", encoding="utf-8") as f:
        notes_data = json.load(f)
        
    with open(raags_json_path, "r", encoding="utf-8") as f:
        raags_data = json.load(f)
        
    with open(scales_json_path, "r", encoding="utf-8") as f:
        scales_data = json.load(f)
        
    with open(site_json_path, "r", encoding="utf-8") as f:
        site_data = json.load(f)

    # Load templates
    with open(os.path.join(template_dir, "note-template.html"), "r", encoding="utf-8") as f:
        note_template = f.read()
        
    with open(os.path.join(template_dir, "scale-template.html"), "r", encoding="utf-8") as f:
        scale_template = f.read()
        
    with open(os.path.join(template_dir, "raag-template.html"), "r", encoding="utf-8") as f:
        raag_template = f.read()

    # Base sargam map to Western notes
    sargam_to_western = {
        "Sa": "C",
        "Re♭": "Db",
        "Re": "D",
        "Ga♭": "Eb",
        "Ga": "E",
        "Ma": "F",
        "Ma#": "Gb",
        "Pa": "G",
        "Dha♭": "Ab",
        "Dha": "A",
        "Ni♭": "Bb",
        "Ni": "B",
        "Sa+1": "C"
    }

    # Ensure output directories exist
    os.makedirs(os.path.join("d:\\webharmonium", "notes"), exist_ok=True)
    os.makedirs(os.path.join("d:\\webharmonium", "scales"), exist_ok=True)
    os.makedirs(os.path.join("d:\\webharmonium", "raags"), exist_ok=True)

    generated_urls = []

    # 1. GENERATE NOTES PAGES
    print("Generating note pages...")
    for note in notes_data["notes"]:
        note_id = note["id"]
        sargam = note["sargam"]
        desc = note["description"]
        note_lower = note_id.lower()
        
        # Long description for SEO
        note_type = "Shuddha (Natural)"
        if note["komal"]:
            note_type = "Komal (Flat)"
        elif note["tivra"]:
            note_type = "Tivra (Sharp)"
            
        long_desc = (
            f"In Indian classical music (Hindustani and Carnatic), {sargam} is the standard designation "
            f"for this frequency range. As a {note_type} note, it plays a vital role in constructing "
            f"various raags. Western music refers to this note as {note_id}."
        )
        
        # Frequencies across octaves
        freq_rows = ""
        freq_c4 = ""
        for octave in [3, 4, 5]:
            octave_note = f"{note_id}{octave}"
            freq = notes_data["frequencies"].get(octave_note, 0)
            if octave == 4:
                freq_c4 = str(freq)
            freq_rows += f"<tr><td>Octave {octave}</td><td>{octave_note}</td><td>{freq} Hz</td></tr>\n"

        # Find Raags that use this note
        used_raags = []
        for raag in raags_data["raags"]:
            # Match notes by sargam symbol
            if sargam in raag["notes"] or (sargam == "Sa" and "Sa" in raag["notes"]) or (sargam == "Sa" and "Ṡa" in raag["notes"]):
                used_raags.append(raag)
            # Check flat/sharp equivalents
            elif sargam == "Re♭" and "Re♭" in raag["notes"]:
                used_raags.append(raag)
            elif sargam == "Ga♭" and "Ga♭" in raag["notes"]:
                used_raags.append(raag)
            elif sargam == "Dha♭" and "Dha♭" in raag["notes"]:
                used_raags.append(raag)
            elif sargam == "Ni♭" and "Ni♭" in raag["notes"]:
                used_raags.append(raag)
            elif sargam == "Ma#" and "Ma#" in raag["notes"]:
                used_raags.append(raag)

        raag_chips_html = ""
        if used_raags:
            for r in used_raags:
                raag_chips_html += f'<a href="../raags/{r["slug"]}.html" class="raag-chip" style="display:inline-flex; align-items:center; gap:6px;"><i data-lucide="music" style="width:12px; height:12px;"></i>{r["name"]}</a>\n'
        else:
            raag_chips_html = '<span style="color:var(--text-secondary);">No specific raags indexed.</span>'

        # Template Substitution
        html = note_template
        html = html.replace("{{META_TITLE}}", f"Learn {note_id} ({sargam}) Note on Harmonium | WebHarmonium")
        html = html.replace("{{META_DESCRIPTION}}", f"Learn how to play {note_id} ({sargam}) note on the virtual harmonium. See frequencies for C3, C4, C5, Western vs Indian names, and raags that use it.")
        html = html.replace("{{META_KEYWORDS}}", f"{note_id}, {sargam}, harmonium notes, play {note_id}, learn {sargam}")
        html = html.replace("{{CANONICAL_URL}}", f"https://webharmonium.netlify.app/notes/{note_lower}.html")
        html = html.replace("{{OG_TITLE}}", f"Learn {note_id} ({sargam}) Note on Harmonium")
        html = html.replace("{{HEADLINE}}", f"Learn the {note_id} ({sargam}) Note")
        html = html.replace("{{NOTE_NAME}}", note_id)
        html = html.replace("{{SARGAM}}", sargam)
        html = html.replace("{{DESCRIPTION}}", desc)
        html = html.replace("{{FREQ_C4}}", freq_c4)
        html = html.replace("{{NOTE_ID}}", note_id)
        html = html.replace("{{NOTE_TYPE}}", note_type)
        html = html.replace("{{FREQ_ROWS}}", freq_rows)
        html = html.replace("{{RAAG_CHIPS}}", raag_chips_html)
        html = html.replace("{{LONG_DESCRIPTION}}", long_desc)
        html = html.replace("{{NOTE_IDS_JSON}}", json.dumps([note_id]))

        # Write file
        output_file = os.path.join("d:\\webharmonium", "notes", f"{note_lower}.html")
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(html)
            
        generated_urls.append((f"notes/{note_lower}.html", "0.6"))

    # 2. GENERATE SCALES PAGES
    print("Generating scale pages...")
    for scale in scales_data["scales"]:
        name = scale["name"]
        slug = scale["slug"]
        key = scale["key"]
        stype = scale["type"]
        difficulty = scale["difficulty"]
        notes = scale["notes"]
        asc = scale["ascending"]
        desc = scale["descending"]
        brief = scale["description"]
        long_desc = scale["longDescription"]
        intervals = scale["intervalsDesc"]

        # Note pills
        note_pills = ""
        for n in notes:
            note_pills += f'<div class="scale-note-pill">{n}</div>\n'

        # Ascending notes list
        asc_html = ""
        for i, n in enumerate(asc):
            asc_html += f'<span class="note-step">{n}</span>'
            if i < len(asc) - 1:
                asc_html += '<span class="arrow">→</span>'

        # Descending notes list
        desc_html = ""
        for i, n in enumerate(desc):
            desc_html += f'<span class="note-step">{n}</span>'
            if i < len(desc) - 1:
                desc_html += '<span class="arrow">→</span>'

        html = scale_template
        html = html.replace("{{META_TITLE}}", f"{name} Scale on Harmonium | Notes, Practice & Keyboard Layout")
        html = html.replace("{{META_DESCRIPTION}}", f"Master the {name} scale on the harmonium. Study keyboard positions, ascending and descending note sequences, and practice with the interactive virtual harmonium.")
        html = html.replace("{{META_KEYWORDS}}", f"{name} scale, harmonium keys, play {name}, scale practice")
        html = html.replace("{{CANONICAL_URL}}", f"https://webharmonium.netlify.app/scales/{slug}.html")
        html = html.replace("{{OG_TITLE}}", f"{name} Scale on Harmonium")
        html = html.replace("{{HEADLINE}}", f"Guide to the {name} Harmonium Scale")
        html = html.replace("{{SCALE_NAME}}", name)
        html = html.replace("{{SCALE_KEY}}", key)
        html = html.replace("{{DESCRIPTION}}", brief)
        html = html.replace("{{NOTE_PILLS}}", note_pills)
        html = html.replace("{{NOTE_COUNT}}", str(len(notes)))
        html = html.replace("{{SCALE_TYPE}}", stype)
        html = html.replace("{{DIFFICULTY}}", difficulty)
        html = html.replace("{{ASCENDING_NOTES}}", asc_html)
        html = html.replace("{{DESCENDING_NOTES}}", desc_html)
        html = html.replace("{{LONG_DESCRIPTION}}", long_desc)
        html = html.replace("{{INTERVALS_DESC}}", intervals)
        html = html.replace("{{SCALE_NOTE_IDS_JSON}}", json.dumps(notes))

        output_file = os.path.join("d:\\webharmonium", "scales", f"{slug}.html")
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(html)
            
        generated_urls.append((f"scales/{slug}.html", "0.7"))

    # 3. GENERATE RAAGS PAGES
    print("Generating raag pages...")
    for raag in raags_data["raags"]:
        raag_name = raag["name"]
        slug = raag["slug"]
        thaat = raag["thaat"]
        time = raag["time"]
        mood = raag["mood"]
        notes = raag["notes"]
        aaroh = raag["aaroh"]
        avaroh = raag["avaroh"]
        vadi = raag["vadi"]
        samvadi = raag["samvadi"]
        desc = raag["description"]
        difficulty = raag["difficulty"]

        # Long description for SEO
        long_desc = (
            f"{raag_name} belongs to the {thaat} Thaat. The singing time is {time}, which evokes a "
            f"{mood} mood. The Vadi note is {vadi} and Samvadi note is {samvadi}. Use the interactive harmonium "
            f"keyboard above to practice this raag. Click 'Play Aaroh' or 'Play Avaroh' to hear and watch the correct note sequence."
        )

        # Note pills
        note_pills = ""
        for n in notes:
            note_pills += f'<div class="raag-note-pill">{n}</div>\n'

        # Note chips (links to notes/[note].html)
        note_chips_html = ""
        for n in notes:
            clean_n = n.replace("Ṡ", "S").strip()
            w_note = sargam_to_western.get(clean_n, "C")
            note_chips_html += f'<a href="../notes/{w_note.lower()}.html" class="raag-chip" style="display:inline-flex; align-items:center; gap:6px;"><i data-lucide="music" style="width:12px; height:12px;"></i>{n} ({w_note})</a>\n'

        # Difficulty tag class
        diff_class = "diff-beginner"
        if difficulty.lower() == "intermediate":
            diff_class = "diff-intermediate"
        elif difficulty.lower() == "advanced":
            diff_class = "diff-advanced"
        diff_tag = f'<span class="difficulty-tag {diff_class}">{difficulty}</span>'

        # Get Western note IDs for highlighting
        raag_note_ids = []
        for n in notes:
            clean_n = n.replace("Ṡ", "S").strip()
            w = sargam_to_western.get(clean_n)
            if w and w not in raag_note_ids:
                raag_note_ids.append(w)

        # Autoplay sequence arrays
        aaroh_list = aaroh.split()
        avaroh_list = avaroh.split()

        html = raag_template
        html = html.replace("{{META_TITLE}}", f"{raag_name} Notes on Harmonium | Aaroh, Avaroh & Play Along Guide")
        html = html.replace("{{META_DESCRIPTION}}", f"Learn how to play {raag_name} on harmonium. Watch key highlights, autoplay Aaroh/Avaroh, view Vadi and Samvadi, and master the {thaat} Thaat scale.")
        html = html.replace("{{META_KEYWORDS}}", f"{raag_name} notes, learn {raag_name}, play {raag_name} harmonium, aaroh avaroh")
        html = html.replace("{{CANONICAL_URL}}", f"https://webharmonium.netlify.app/raags/{slug}.html")
        html = html.replace("{{OG_TITLE}}", f"{raag_name} Notes & Play Along on Harmonium")
        html = html.replace("{{HEADLINE}}", f"Guide to Playing {raag_name} on Harmonium")
        html = html.replace("{{RAAG_NAME}}", raag_name)
        html = html.replace("{{DESCRIPTION}}", desc)
        html = html.replace("{{NOTE_PILLS}}", note_pills)
        html = html.replace("{{TIME}}", time)
        html = html.replace("{{MOOD}}", mood)
        html = html.replace("{{THAAT}}", thaat)
        html = html.replace("{{DIFFICULTY_TAG}}", diff_tag)
        html = html.replace("{{VADI}}", vadi)
        html = html.replace("{{SAMVADI}}", samvadi)
        html = html.replace("{{AAROH}}", aaroh)
        html = html.replace("{{AVAROH}}", avaroh)
        html = html.replace("{{LONG_DESCRIPTION}}", long_desc)
        html = html.replace("{{RAAG_NOTE_CHIPS}}", note_chips_html)
        html = html.replace("{{RAAG_NOTE_IDS_JSON}}", json.dumps(raag_note_ids))
        html = html.replace("{{SARGAM_TO_NOTE_JSON}}", json.dumps(sargam_to_western))
        html = html.replace("{{AAROH_JSON}}", json.dumps(aaroh_list))
        html = html.replace("{{AVAROH_JSON}}", json.dumps(avaroh_list))

        output_file = os.path.join("d:\\webharmonium", "raags", f"{slug}.html")
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(html)
            
        generated_urls.append((f"raags/{slug}.html", "0.8"))

    # 4. UPDATE site.json
    print("Updating site.json links...")
    updated_chips = []
    for chip in site_data["raagChips"]:
        label = chip["label"]
        # Match label to slug
        matched = False
        if "Raag Yaman" in label:
            chip["href"] = "raags/raag-yaman.html"
            matched = True
        elif "Raag Bhairav" in label:
            chip["href"] = "raags/raag-bhairav.html"
            matched = True
        elif "Raag Kafi" in label:
            chip["href"] = "raags/raag-kafi.html"
            matched = True
        elif "Raag Bhopali" in label:
            chip["href"] = "raags/raag-bhopali.html"
            matched = True
        elif "Raag Durga" in label:
            chip["href"] = "raags/raag-durga.html"
            matched = True
        elif "Raag Marwa" in label:
            chip["href"] = "raags/raag-marwa.html"
            matched = True
        elif "Raag Todi" in label:
            chip["href"] = "raags/raag-todi.html"
            matched = True
        elif "C Major Scale" in label:
            chip["href"] = "scales/c-major-scale.html"
            matched = True
        elif "D Major Scale" in label:
            chip["href"] = "scales/d-major-scale.html"
            matched = True
        elif "G Major Scale" in label:
            chip["href"] = "scales/g-major-scale.html"
            matched = True
        elif "A Minor Scale" in label:
            chip["href"] = "scales/a-minor-scale.html"
            matched = True
        elif "Pentatonic Scale" in label:
            chip["href"] = "scales/pentatonic-scale.html"
            matched = True
            
        updated_chips.append(chip)
        
    site_data["raagChips"] = updated_chips
    
    with open(site_json_path, "w", encoding="utf-8") as f:
        json.dump(site_data, f, indent=2)

    # 5. REGENERATE sitemap.xml
    print("Updating sitemap.xml...")
    sitemap_path = os.path.join("d:\\webharmonium", "sitemap.xml")
    
    # Read core of sitemap.xml
    # We will build it cleanly from scratch to avoid duplicate nodes or messing up formatting
    core_urls = [
        ("/", "1.0", "weekly"),
        ("about.html", "0.6", "monthly"),
        ("contact.html", "0.5", "monthly"),
        ("privacy.html", "0.3", "yearly"),
        ("terms.html", "0.3", "yearly")
    ]
    
    # Let's read articles from articles.json dynamically to add them automatically
    articles_json_path = os.path.join(data_dir, "articles.json")
    if os.path.exists(articles_json_path):
        with open(articles_json_path, "r", encoding="utf-8") as f:
            articles_data = json.load(f)
            for art in articles_data.get("articles", []):
                core_urls.append((f"articles/{art['slug']}.html", "0.8", "monthly"))

    # Construct XML
    root = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    
    # Add core & articles
    for path, priority, *changefreq in core_urls:
        freq = changefreq[0] if changefreq else "monthly"
        url_node = ET.SubElement(root, "url")
        loc = ET.SubElement(url_node, "loc")
        loc.text = f"https://webharmonium.netlify.app/{path if path != '/' else ''}"
        lastmod = ET.SubElement(url_node, "lastmod")
        lastmod.text = "2024-01-01"
        cf = ET.SubElement(url_node, "changefreq")
        cf.text = freq
        prio = ET.SubElement(url_node, "priority")
        prio.text = priority

    # Add dynamically generated pages
    for path, priority in generated_urls:
        url_node = ET.SubElement(root, "url")
        loc = ET.SubElement(url_node, "loc")
        loc.text = f"https://webharmonium.netlify.app/{path}"
        lastmod = ET.SubElement(url_node, "lastmod")
        lastmod.text = "2024-01-01"
        cf = ET.SubElement(url_node, "changefreq")
        cf.text = "weekly"
        prio = ET.SubElement(url_node, "priority")
        prio.text = priority

    # Format XML nicely
    xml_str = ET.tostring(root, encoding="utf-8")
    reparsed = minidom.parseString(xml_str)
    pretty_xml = reparsed.toprettyxml(indent="  ")
    
    # Remove empty lines that minidom toprettyxml leaves sometimes
    pretty_xml = "\n".join([line for line in pretty_xml.splitlines() if line.strip()])

    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(pretty_xml)

    print("Successfully generated all SEO pages!")

if __name__ == "__main__":
    main()
