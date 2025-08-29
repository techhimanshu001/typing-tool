import { 
  fetchSingleQuote, 
  fetchTypingTexts, 
  fetchQuotesByDifficulty, 
  apiCache 
} from '../services/apiService';

// Fallback texts when API is unavailable
export const fallbackTexts = [
  "The quick brown fox jumps over the lazy dog. This pangram sentence contains every letter of the alphabet at least once, making it perfect for typing practice and testing keyboard layouts.",
  "Technology has become an integral part of our daily lives. From smartphones to artificial intelligence, we are surrounded by innovations that were once considered science fiction just a few decades ago.",
  "The art of programming is not just about writing problems creatively and efficiently. Good programmers think before they code and always consider the maintainability of their solutions for future development.",
  "Learning new skills requires dedication, practice, and patience. Whether you're mastering a musical instrument, learning a new language, or developing professional expertise, consistent effort over time yields the best results.",
  "Climate change represents one of the most significant challenges of our time. Rising temperatures, melting ice caps, and extreme weather patterns are clear indicators that immediate action is required to protect our planet.",
  "Space exploration continues to push the boundaries of human knowledge and technological capability. From the first moon landing to modern Mars rovers, each mission teaches us more about our universe and our place within it.",
  "The digital revolution has transformed how we communicate, work, and live. Social media platforms connect people across continents, while remote work technologies enable collaboration without geographical constraints.",
  "Artificial intelligence and machine learning are reshaping industries and creating new possibilities. From healthcare diagnostics to autonomous vehicles, these technologies promise to solve complex problems and improve quality of life.",
  "Sustainable development requires balancing economic growth with environmental protection. Renewable energy sources, efficient transportation systems, and responsible consumption patterns are essential for a sustainable future.",
  "Education in the modern era must adapt to rapidly changing technologies and job markets. Critical thinking, creativity, and continuous learning have become more important than memorizing static information."
];

/**
 * Get random text from API or fallback to local data
 * @param {string} difficulty - Optional difficulty level
 * @returns {Promise<Object>} Text object with metadata
 */
export const getRandomText = async (difficulty = null) => {
  try {
    // Check cache first
    const cacheKey = `random-text-${difficulty || 'any'}`;
    const cached = apiCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    let textObj;
    
    if (difficulty) {
      const quotes = await fetchQuotesByDifficulty(difficulty);
      if (quotes && quotes.length > 0) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        textObj = {
          id: randomQuote._id,
          text: `${randomQuote.content} - ${randomQuote.author}`,
          author: randomQuote.author,
          length: randomQuote.content.length,
          tags: randomQuote.tags,
          difficulty: difficulty,
          source: 'api'
        };
      }
    } else {
      const quote = await fetchSingleQuote();
      textObj = quote;
    }

    // Cache the result
    if (textObj) {
      apiCache.set(cacheKey, textObj);
      return textObj;
    }
    
    // Fallback to local data
    return getFallbackText();
    
  } catch (error) {
    console.error('Error getting random text:', error);
    return getFallbackText();
  }
};

/**
 * Get fallback text when API fails
 * @returns {Object} Fallback text object
 */
export const getFallbackText = () => {
  const randomText = fallbackTexts[Math.floor(Math.random() * fallbackTexts.length)];
  return {
    id: `fallback-${Date.now()}`,
    text: randomText,
    author: 'Practice Text',
    length: randomText.length,
    tags: ['practice'],
    difficulty: getDifficultyFromLength(randomText.length),
    source: 'fallback'
  };
};

/**
 * Load initial texts for the application
 * @param {number} count - Number of texts to load
 * @returns {Promise<Array>} Array of text objects
 */
export const loadInitialTexts = async (count = 5) => {
  try {
    const texts = await fetchTypingTexts(count);
    return texts.length > 0 ? texts : getFallbackTexts();
  } catch (error) {
    console.error('Error loading initial texts:', error);
    return getFallbackTexts();
  }
};

/**
 * Get fallback texts as objects
 * @returns {Array<Object>} Array of fallback text objects
 */
export const getFallbackTexts = () => {
  return fallbackTexts.map((text, index) => ({
    id: `fallback-${index}`,
    text,
    author: 'Practice Text',
    length: text.length,
    tags: ['practice'],
    difficulty: getDifficultyFromLength(text.length),
    source: 'fallback'
  }));
};

/**
 * Determine difficulty based on text length
 * @param {number} length - Text length
 * @returns {string} Difficulty level
 */
const getDifficultyFromLength = (length) => {
  if (length <= 80) return 'easy';
  if (length <= 150) return 'medium';
  return 'hard';
};

/**
 * Get text by specific criteria
 * @param {Object} criteria - Search criteria
 * @returns {Promise<Object>} Text object matching criteria
 */
export const getTextByCriteria = async (criteria = {}) => {
  try {
    const { difficulty, minLength, maxLength, tags } = criteria;
    
    if (difficulty) {
      return await getRandomText(difficulty);
    }
    
    const quotes = await fetchRandomQuotes({
      limit: 1,
      minLength: minLength || 50,
      maxLength: maxLength || 200,
      tags: tags || ''
    });
    
    if (quotes && quotes.length > 0) {
      const quote = quotes[0];
      return {
        id: quote._id,
        text: `${quote.content} - ${quote.author}`,
        author: quote.author,
        length: quote.content.length,
        tags: quote.tags,
        difficulty: getDifficultyFromLength(quote.content.length),
        source: 'api'
      };
    }
    
    return getFallbackText();
    
  } catch (error) {
    console.error('Error getting text by criteria:', error);
    return getFallbackText();
  }
};

// Export sample texts (for compatibility with old code)
export const sampleTexts = fallbackTexts;
