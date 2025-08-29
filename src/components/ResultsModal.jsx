import React from 'react';

const ResultsModal = ({ isOpen, onClose, results, onRestart }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4 shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Test Complete!</h2>
        
        <div className="space-y-4 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">{results.wpm}</div>
            <div className="text-gray-600">Words per minute</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{results.accuracy}%</div>
              <div className="text-sm text-green-600">Accuracy</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{results.errors}</div>
              <div className="text-sm text-purple-600">Errors</div>
            </div>
          </div>
          
          <div className="text-center text-gray-600">
            <div>Characters: {results.totalChars}</div>
            <div>Correct: {results.correctChars}</div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onRestart}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Try Again
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;