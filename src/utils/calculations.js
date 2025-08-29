/**
 * Calculate Words Per Minute (WPM)
 * Standard calculation: (total characters typed / 5) / minutes elapsed
 * @param {string} input - User's typed input
 * @param {number} timeElapsed - Time elapsed in milliseconds
 * @returns {number} Words per minute
 */
export const calculateWPM = (input, timeElapsed) => {
  if (!input.length || timeElapsed <= 0) return 0;
  
  const minutes = timeElapsed / (1000 * 60);
  const wordsTyped = input.trim().split(' ').length;
  return Math.round(wordsTyped / minutes);
};

/**
 * Calculate typing accuracy percentage
 * @param {string} userInput - What the user typed
 * @param {string} originalText - The original text to compare against
 * @returns {number} Accuracy percentage (0-100)
 */
export const calculateAccuracy = (userInput, originalText) => {
  if (!userInput.length) return 100;
  
  let correctChars = 0;
  const maxLength = Math.min(userInput.length, originalText.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (userInput[i] === originalText[i]) {
      correctChars++;
    }
  }
  
  return Math.round((correctChars / userInput.length) * 100);
};

/**
 * Calculate detailed typing statistics
 * @param {string} userInput - User's typed input
 * @param {string} originalText - Original text
 * @param {number} startTime - Test start timestamp
 * @returns {object} Detailed statistics object
 */
export const calculateDetailedStats = (userInput, originalText, startTime) => {
  const timeElapsed = startTime ? Date.now() - startTime : 0;
  
  let correctChars = 0;
  let incorrectChars = 0;
  
  for (let i = 0; i < userInput.length; i++) {
    if (i < originalText.length && userInput[i] === originalText[i]) {
      correctChars++;
    } else {
      incorrectChars++;
    }
  }
  
  const wpm = calculateWPM(userInput, timeElapsed);
  const accuracy = calculateAccuracy(userInput, originalText);
  
  return {
    wpm,
    accuracy,
    correctChars,
    incorrectChars,
    totalChars: userInput.length,
    timeElapsed: Math.round(timeElapsed / 1000), // in seconds
    errors: incorrectChars
  };
};

/**
 * Format time in MM:SS format
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Get typing speed rating based on WPM
 * @param {number} wpm - Words per minute
 * @returns {object} Rating information
 */
export const getTypingRating = (wpm) => {
  if (wpm >= 70) return { level: 'Expert', color: 'text-purple-600', description: 'Outstanding typing speed!' };
  if (wpm >= 50) return { level: 'Advanced', color: 'text-blue-600', description: 'Great typing speed!' };
  if (wpm >= 35) return { level: 'Intermediate', color: 'text-green-600', description: 'Good typing speed!' };
  if (wpm >= 20) return { level: 'Beginner', color: 'text-yellow-600', description: 'Keep practicing!' };
  return { level: 'Novice', color: 'text-gray-600', description: 'Practice more to improve!' };
};