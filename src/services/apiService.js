// API service for fetching quotes and sentences
const BASE_URL = 'https://api.quotable.io';

/**
 * Fetch random quotes from Quotable API
 * @param {Object} options - API options
 * @param {number} options.limit - Number of quotes to fetch (1-50)
 * @param {number} options.minLength - Minimum quote length
 * @param {number} options.maxLength - Maximum quote length
 * @param {string} options.tags - Filter by tags (comma or pipe separated)
 * @returns {Promise<Array>} Array of quote objects
 */
export const fetchRandomQuotes = async (options = {}) => {
  try {
    const {
      limit = 5,
      minLength = 50,
      maxLength = 200,
      tags = ''
    } = options;

    const params = new URLSearchParams({
      limit: limit.toString(),
      minLength: minLength.toString(),
      maxLength: maxLength.toString(),
    });

    if (tags) {
      params.append('tags', tags);
    }

    const response = await fetch('http://api.quotable.io/random?minLength=200&maxLength=500');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data.content : [data.content];
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return getFallbackTexts(); // Return fallback data on error
  }
};

/**
 * Fetch quotes by difficulty level
 * @param {string} difficulty - 'easy', 'medium', 'hard'
 * @returns {Promise<Array>} Array of quotes suited for difficulty level
 */
export const fetchQuotesByDifficulty = async (difficulty = 'medium') => {
  const difficultyConfig = {
    easy: { minLength: 30, maxLength: 80, tags: 'inspirational|motivational' },
    medium: { minLength: 80, maxLength: 150, tags: 'wisdom|famous-quotes' },
    hard: { minLength: 150, maxLength: 300, tags: 'literature|philosophy' }
  };

  const config = difficultyConfig[difficulty] || difficultyConfig.medium;
  return await fetchRandomQuotes(config);
};

/**
 * Fetch a specific number of typing practice texts
 * @param {number} count - Number of texts to fetch
 * @returns {Promise<Array>} Array of formatted texts for typing practice
 */
export const fetchTypingTexts = async (count = 10) => {
  try {
    const quotes = await fetchRandomQuotes({ 
      limit: Math.min(count, 50), // API limit is 50
      minLength: 60,
      maxLength: 180 
    });
    
    return quotes.map(quote => ({
      id: quote._id,
      text: `${quote.content} - ${quote.author}`,
      author: quote.author,
      length: quote.length,
      tags: quote.tags,
      difficulty: getDifficultyFromLength(quote.length)
    }));
  } catch (error) {
    console.error('Error fetching typing texts:', error);
    return getFallbackTexts().map((text, index) => ({
      id: `fallback-${index}`,
      text,
      author: 'Unknown',
      length: text.length,
      tags: ['practice'],
      difficulty: getDifficultyFromLength(text.length)
    }));
  }
};

/**
 * Get a single random quote for typing practice
 * @returns {Promise<Object>} Single quote object
 */
export const fetchSingleQuote = async () => {
  try {
    const response = await fetch('http://api.quotable.io/random?minLength=200&maxLength=500');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const quote = await response.json();
    return {
      id: quote._id,
      text: `${quote.content} - ${quote.author}`,
      author: quote.author,
      length: quote.length,
      tags: quote.tags,
      difficulty: getDifficultyFromLength(quote.length)
    };
  } catch (error) {
    console.error('Error fetching single quote:', error);
    const fallbackTexts = getFallbackTexts();
    const randomText = fallbackTexts[Math.floor(Math.random() * fallbackTexts.length)];
    return {
      id: 'fallback',
      text: randomText,
      author: 'Practice Text',
      length: randomText.length,
      tags: ['practice'],
      difficulty: getDifficultyFromLength(randomText.length)
    };
  }
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
 * Fallback texts when API is unavailable
 * @returns {Array<string>} Array of fallback texts
 */
const getFallbackTexts = () => [
  "The quick brown fox jumps over the lazy dog. This pangram sentence contains every letter of the alphabet at least once, making it perfect for typing practice and testing keyboard layouts.",
  
  "Technology has become an integral part of our daily lives. From smartphones to artificial intelligence, we are surrounded by innovations that were once considered science fiction just a few decades ago.",
  
  "The art of programming is not just about writing code; it's about solving problems creatively and efficiently. Good programmers think before they code and always consider the maintainability of their solutions.",
  
  "Learning new skills requires dedication, practice, and patience. Whether you're mastering a musical instrument, learning a new language, or developing professional expertise, consistent effort over time yields the best results.",
  
  "Climate change represents one of the most significant challenges of our time. Rising temperatures, melting ice caps, and extreme weather patterns are clear indicators that immediate action is required to protect our planet."
];

/**
 * Cache management for API responses
 */
class ApiCache {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > this.cacheTimeout;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear() {
    this.cache.clear();
  }
}

export const apiCache = new ApiCache();