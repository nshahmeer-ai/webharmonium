/**
 * AIModel.js — MODEL LAYER (AI & API Key Storage)
 * Manages the Gemini API key in localStorage and coordinates note generation queries.
 */

class AIModel {
  constructor() {
    this._storageKey = 'webharmonium_gemini_api_key';
  }

  /** Retrieve the API key from localStorage */
  getApiKey() {
    return localStorage.getItem(this._storageKey) || '';
  }

  /** Save the API key to localStorage */
  saveApiKey(key) {
    if (key) {
      localStorage.setItem(this._storageKey, key.trim());
    } else {
      localStorage.removeItem(this._storageKey);
    }
  }

  /** Check if the API key is configured */
  hasApiKey() {
    return !!this.getApiKey();
  }

  /**
   * Generates harmonium notes for a song using Gemini 2.5 Flash
   * @param {string} songQuery - The song name, artist, or lyric lines
   * @returns {Promise<Object>} - Parsed JSON containing generated song notes
   */
  async generateNotes(songQuery) {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      throw new Error('API key is not configured. Please enter a valid Gemini API key.');
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const prompt = `You are a professional harmonium master and Hindustani classical music teacher.
Translate the requested song/melody into a simple line-by-line harmonium playing guide.
Song Request: "${songQuery}"

Provide correct melody notes (usually mapped to C4 as the root Sa / ground key for convenience) for the song.
Only use valid harmonium notes across octaves 3, 4, and 5:
- Western Notes (with octave numbers, e.g. "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5")
- Indian Sargam Notes ("Sa", "Re♭", "Re", "Ga♭", "Ga", "Ma", "Ma#", "Pa", "Dha♭", "Dha", "Ni♭", "Ni")

Return your response in JSON format. It must match the following schema exactly:
{
  "songTitle": "Official Song Title",
  "key": "Suggested root/scale (e.g. C Major)",
  "lines": [
    {
      "lyric": "Lyric text of this line",
      "notes": ["G4", "C4", "D4", "E4", "C4"],
      "sargam": ["Pa", "Sa", "Re", "Ga", "Sa"]
    }
  ]
}

Ensure the "notes" and "sargam" arrays are equal in length and match note-for-note. Focus on accuracy for the main vocal melody. Keep it to a maximum of 6-8 main lines of the song.`;

    const requestBody = {
      contents: [
        {
          parts: [
            { text: prompt }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errMsg = errData.error?.message || `HTTP error! status: ${response.status}`;
      throw new Error(`Gemini API Error: ${errMsg}`);
    }

    const data = await response.json();
    
    // Extract JSON response text
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResponse) {
      throw new Error('No content returned from Gemini API.');
    }

    try {
      return JSON.parse(textResponse.trim());
    } catch (e) {
      console.error('Failed to parse response text as JSON:', textResponse);
      throw new Error('Failed to parse AI response as valid song data.');
    }
  }
}
