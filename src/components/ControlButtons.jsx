import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Shuffle, ChevronDown } from 'lucide-react';

const ControlButtons = ({ 
  isActive, 
  isPaused, 
  onStart, 
  onPause, 
  onReset, 
  onNewText, 
  isLoading = false,
  onDifficultyChange = null 
}) => {
  const [showDifficultyMenu, setShowDifficultyMenu] = useState(false);

  const handleDifficultySelect = async (difficulty) => {
    if (onDifficultyChange) {
      await onDifficultyChange(difficulty);
    }
    setShowDifficultyMenu(false);
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center relative">
      {/* Start / Pause */}
      {!isActive ? (
        <button
          onClick={onStart}
          className="flex items-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
        >
          <Play className="w-4 h-4" />
          Start Test
        </button>
      ) : (
        <button
          onClick={onPause}
          className="flex items-center gap-2 bg-yellow-600 text-white py-3 px-6 rounded-lg hover:bg-yellow-700 transition-colors duration-200 font-medium"
        >
          <Pause className="w-4 h-4" />
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      )}

      {/* Reset */}
      <button
        onClick={onReset}
        className="flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </button>

      {/* New Text */}
      <button
        onClick={onNewText}
        disabled={isLoading}
        className={`flex items-center gap-2 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <Shuffle className="w-4 h-4" />
        {isLoading ? 'Loading...' : 'New Text'}
      </button>

      {/* Difficulty Dropdown */}
      {onDifficultyChange && (
        <div className="relative">
          <button
            onClick={() => setShowDifficultyMenu(!showDifficultyMenu)}
            className="flex items-center gap-2 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            Difficulty
            <ChevronDown className="w-4 h-4" />
          </button>

          {showDifficultyMenu && (
            <div className="absolute top-full mt-2 bg-white shadow-md rounded-lg w-40">
              {['Easy', 'Medium', 'Hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => handleDifficultySelect(level.toLowerCase())}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {level}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ControlButtons;
