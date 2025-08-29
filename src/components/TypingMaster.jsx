import React, { useState, useEffect } from 'react';
import TypingStats from './TypingStats';
import TextDisplay from './TextDisplay';
import TypingInput from './TypingInput';
import ResultsModal from './ResultsModal';
import ControlButtons from './ControlButtons';
import { useTypingTest } from '../hooks/useTypingTest';
import { getRandomText } from '../utils/textData';

const TypingMaster = () => {
  const [showResults, setShowResults] = useState(false);
  const [currentTextObj, setCurrentTextObj] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    currentText,
    userInput,
    timeLeft,
    isActive,
    isPaused,
    testComplete,
    stats,
    startTest,
    togglePause,
    resetTest,
    updateText,
    handleInputChange,
    progress
  } = useTypingTest(currentTextObj?.text || '');

  // Load initial text on mount
  useEffect(() => {
    const initializeApp = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const initialText = await getRandomText();
        setCurrentTextObj(initialText);
        updateText(initialText.text);
      } catch (err) {
        console.error('Failed to load initial text:', err);
        setError('Failed to load content. Using offline mode.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Show results modal when test completes
  useEffect(() => {
    if (testComplete) {
      setShowResults(true);
    }
  }, [testComplete]);

  const handleNewText = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const newTextObj = await getRandomText();
      setCurrentTextObj(newTextObj);
      updateText(newTextObj.text);
      setShowResults(false);
    } catch (err) {
      console.error('Failed to fetch new text:', err);
      setError('Failed to load new content.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setShowResults(false);
    resetTest();
  };

  const handleDifficultyChange = async (difficulty) => {
    try {
      setIsLoading(true);
      setError(null);

      const newTextObj = await getRandomText(difficulty);
      setCurrentTextObj(newTextObj);
      updateText(newTextObj.text);
      setShowResults(false);
    } catch (err) {
      console.error('Failed to change difficulty:', err);
      setError('Failed to load content for selected difficulty.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !currentTextObj) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading typing test...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Typing Master
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Test and improve your typing speed with inspiring quotes and passages. 
            Track your words per minute, accuracy, and progress over time.
          </p>
          {currentTextObj && currentTextObj.source === 'api' && (
            <p className="text-sm text-green-600 mt-2">
              ✨ Powered by real quotes from famous authors
            </p>
          )}
          {error && (
            <p className="text-sm text-amber-600 mt-2 bg-amber-50 px-4 py-2 rounded-lg inline-block">
              ⚠️ {error}
            </p>
          )}
        </header>

        {/* Stats */}
        <TypingStats 
          wpm={stats.wpm}
          accuracy={stats.accuracy}
          timeLeft={timeLeft}
          isActive={isActive}
        />

        {/* Typing Area */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Text Info */}
          {currentTextObj && (
            <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex flex-wrap items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  {currentTextObj.author !== 'Practice Text' && (
                    <span className="text-gray-600">
                      <strong>Author:</strong> {currentTextObj.author}
                    </span>
                  )}
                  <span className="text-gray-600">
                    <strong>Length:</strong> {currentTextObj.length} chars
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentTextObj.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    currentTextObj.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {currentTextObj.difficulty.charAt(0).toUpperCase() + currentTextObj.difficulty.slice(1)}
                  </span>
                </div>
                {currentTextObj.tags && currentTextObj.tags.length > 0 && (
                  <div className="flex gap-1 mt-2 md:mt-0">
                    {currentTextObj.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Text */}
          <TextDisplay 
            text={currentText}
            userInput={userInput}
            currentIndex={userInput.length}
          />

          {/* Input */}
          <TypingInput
            userInput={userInput}
            setUserInput={handleInputChange}
            disabled={!isActive || isPaused || timeLeft === 0 || testComplete || isLoading}
            onStart={startTest}
          />

          {/* Controls */}
          <ControlButtons
            isActive={isActive}
            isPaused={isPaused}
            onStart={startTest}
            onPause={togglePause}
            onReset={resetTest}
            onNewText={handleNewText}
            isLoading={isLoading}
            onDifficultyChange={handleDifficultyChange}
          />
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Use</h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-600">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Getting Started</h4>
              <ul className="space-y-1 text-sm">
                <li>• Click in the input area to start typing</li>
                <li>• Timer starts automatically on first keystroke</li>
                <li>• Type the displayed text as accurately as possible</li>
                <li>• Use backspace to correct mistakes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Scoring</h4>
              <ul className="space-y-1 text-sm">
                <li>• WPM: Words per minute calculation</li>
                <li>• Accuracy: Percentage of correct characters</li>
                <li>• Green highlight: Correct character</li>
                <li>• Red highlight: Incorrect character</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">💡 Pro Tips</h4>
            <div className="text-sm text-blue-700 grid md:grid-cols-2 gap-2">
              <div>• Focus on accuracy over speed initially</div>
              <div>• Use proper finger positioning</div>
              <div>• Practice regularly for improvement</div>
              <div>• Try different difficulty levels</div>
            </div>
          </div>
        </div>

        {/* Results Modal */}
        <ResultsModal
          isOpen={showResults}
          onClose={() => setShowResults(false)}
          results={stats}
          onRestart={handleRestart}
          textInfo={currentTextObj}
        />

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500">
          <p className="text-sm">
            Built with React & Vite • Quotes powered by Quotable API • Practice makes perfect! 🚀
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TypingMaster;
