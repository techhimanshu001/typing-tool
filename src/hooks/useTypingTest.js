import { useState, useEffect, useRef, useCallback } from 'react';
import { calculateDetailedStats } from '../utils/calculations';

/**
 * Custom hook for managing typing test logic
 * Handles timer, input tracking, and statistics calculation
 */
export const useTypingTest = (initialText, testDuration = 60) => {
  // State management
  const [currentText, setCurrentText] = useState(initialText);
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(testDuration);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [testComplete, setTestComplete] = useState(false);
  
  // Refs
  const intervalRef = useRef(null);
  const testDurationRef = useRef(testDuration);
  
  // Calculate current statistics
  const currentStats = useCallback(() => {
    return calculateDetailedStats(userInput, currentText, startTime);
  }, [userInput, currentText, startTime]);
  
  // Timer management
  useEffect(() => {
    if (isActive && !isPaused && timeLeft > 0 && !testComplete) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            completeTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, timeLeft, testComplete]);
  
  // Check for test completion by text completion
  useEffect(() => {
    if (userInput.length === currentText.length && userInput === currentText) {
      completeTest();
    }
  }, [userInput, currentText]);
  
  // Start the typing test
  const startTest = useCallback(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setIsActive(true);
    setIsPaused(false);
    setTestComplete(false);
  }, [startTime]);
  
  // Pause/Resume test
  const togglePause = useCallback(() => {
    if (isActive) {
      setIsPaused(prev => !prev);
    }
  }, [isActive]);
  
  // Reset test to initial state
  const resetTest = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setUserInput('');
    setTimeLeft(testDurationRef.current);
    setStartTime(null);
    setTestComplete(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);
  
  // Complete the test
  const completeTest = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setTestComplete(true);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);
  
  // Update text and reset test
  const updateText = useCallback((newText) => {
    setCurrentText(newText);
    resetTest();
  }, [resetTest]);
  
  // Handle user input changes
  const handleInputChange = useCallback((newInput) => {
    if (!isActive && !isPaused && newInput.length === 1) {
      startTest();
    }
    setUserInput(newInput);
  }, [isActive, isPaused, startTest]);
  
  return {
    // State
    currentText,
    userInput,
    timeLeft,
    isActive,
    isPaused,
    testComplete,
    startTime,
    
    // Statistics
    stats: currentStats(),
    
    // Actions
    startTest,
    togglePause,
    resetTest,
    completeTest,
    updateText,
    handleInputChange,
    
    // Computed values
    currentIndex: userInput.length,
    progress: Math.min((userInput.length / currentText.length) * 100, 100)
  };
};