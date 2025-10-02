import { SYSTEM_PROMPT, generateUserPrompt } from '../prompts/systemPrompt.js';

export const callGeminiAPI = async (formData) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  console.log('Gemini service - formData:', formData) // Debug log
  
  if (!apiKey) {
    throw new Error('No Gemini API key found');
  }

  const userPrompt = generateUserPrompt(formData);
  console.log('Generated user prompt:', userPrompt) // Debug log
  
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: SYSTEM_PROMPT + "\n\n" + userPrompt
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    }
  };

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response format from Gemini API');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    console.log('Raw API response:', generatedText) // Debug log
    
    // Clean up the response - remove markdown code blocks
    let cleanedText = generatedText
      .replace(/```json\s*/g, '')  // Remove ```json
      .replace(/```\s*/g, '')      // Remove ```
      .trim();
    
    console.log('Cleaned text:', cleanedText) // Debug log
    
    // Try to parse as JSON first
    try {
      const questions = JSON.parse(cleanedText);
      if (Array.isArray(questions)) {
        console.log('Parsed JSON questions:', questions) // Debug log
        return questions;
      }
    } catch (e) {
      console.log('JSON parsing failed, using text parsing') // Debug log
      console.log('JSON parse error:', e.message) // Debug log
      
      // If JSON parsing fails, split by newlines and clean up
      const questions = cleanedText
        .split('\n')
        .map(q => q.trim())
        .filter(q => q.length > 0 && !q.startsWith('[') && !q.startsWith(']'))
        .map(q => q.replace(/^\d+\.\s*/, '')) // Remove numbering
        .map(q => q.replace(/^["']|["']$/g, '')) // Remove quotes from start/end
        .filter(q => q.length > 0);
      
      console.log('Parsed text questions:', questions) // Debug log
      return questions;
    }

    throw new Error('Could not parse questions from API response');
    
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}; 