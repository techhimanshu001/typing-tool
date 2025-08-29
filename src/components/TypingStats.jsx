import React from 'react';
import { Timer, Target, Zap } from 'lucide-react';

const TypingStats = ({ wpm, accuracy, timeLeft, isActive }) => {
  const getTimeColor = () => {
    if (timeLeft > 40) return 'text-blue-800';
    if (timeLeft > 20) return 'text-yellow-700';
    return 'text-red-700';
  };
  
  const getAccuracyColor = () => {
    if (accuracy >= 95) return 'text-green-800';
    if (accuracy >= 85) return 'text-yellow-700';
    return 'text-red-700';
  };
  
  const getWPMColor = () => {
    if (wpm >= 50) return 'text-purple-800';
    if (wpm >= 30) return 'text-blue-800';
    return 'text-gray-800';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Timer Card */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-center mb-3">
          <Timer className={`w-6 h-6 mr-2 ${isActive ? 'animate-spin' : ''} text-blue-600`} />
          <span className="text-sm font-medium text-blue-600">Time Left</span>
        </div>
        <div className={`text-4xl font-bold text-center ${getTimeColor()} transition-colors duration-300`}>
          {timeLeft}
        </div>
        <div className="text-sm text-blue-600 text-center mt-1">seconds</div>
        {isActive && timeLeft <= 10 && (
          <div className="text-xs text-red-500 text-center mt-2 animate-pulse">
            Hurry up!
          </div>
        )}
      </div>
      
      {/* WPM Card */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-center mb-3">
          <Zap className="w-6 h-6 text-green-600 mr-2" />
          <span className="text-sm font-medium text-green-600">Speed</span>
        </div>
        <div className={`text-4xl font-bold text-center ${getWPMColor()} transition-colors duration-300`}>
          {wpm}
        </div>
        <div className="text-sm text-green-600 text-center mt-1">WPM</div>
        {wpm >= 50 && (
          <div className="text-xs text-green-700 text-center mt-2">
            🚀 Excellent!
          </div>
        )}
      </div>
      
      {/* Accuracy Card */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center justify-center mb-3">
          <Target className="w-6 h-6 text-purple-600 mr-2" />
          <span className="text-sm font-medium text-purple-600">Accuracy</span>
        </div>
        <div className={`text-4xl font-bold text-center ${getAccuracyColor()} transition-colors duration-300`}>
          {accuracy}%
        </div>
        <div className="text-sm text-purple-600 text-center mt-1">precision</div>
        {accuracy === 100 && wpm > 0 && (
          <div className="text-xs text-purple-700 text-center mt-2">
            🎯 Perfect!
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingStats;