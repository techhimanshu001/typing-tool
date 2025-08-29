import React from 'react';

const TextDisplay = ({ text, userInput, currentIndex }) => {
  return (
    <div className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 mb-6 font-mono text-lg leading-relaxed">
      {text.split('').map((char, index) => {
        let className = 'transition-colors duration-150 ';
        
        if (index < userInput.length) {
          if (userInput[index] === char) {
            className += 'bg-green-200 text-green-800';
          } else {
            className += 'bg-red-200 text-red-800';
          }
        } else if (index === currentIndex) {
          className += 'bg-blue-400 text-white animate-pulse';
        } else {
          className += 'text-gray-600';
        }
        
        return (
          <span key={index} className={className}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default TextDisplay;