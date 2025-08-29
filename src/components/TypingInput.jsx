import React, { useRef, useEffect } from 'react';

const TypingInput = ({ userInput, setUserInput, disabled, onStart }) => {
  const inputRef = useRef(null);
  
  // Focus management
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);
  
  // Auto-focus on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Prevent typing if disabled
    if (disabled) return;
    
    setUserInput(value);
    
    // Start test on first character
    if (value.length === 1 && userInput.length === 0) {
      onStart();
    }
  };
  
  const handleKeyDown = (e) => {
    // Prevent certain keys when disabled
    if (disabled && !['Tab'].includes(e.key)) {
      e.preventDefault();
      return;
    }
    
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'a':
          // Allow Ctrl+A for select all
          break;
        case 'c':
          // Allow Ctrl+C for copy
          break;
        case 'v':
          // Prevent paste
          e.preventDefault();
          break;
        default:
          break;
      }
    }
  };
  
  const handlePaste = (e) => {
    // Prevent pasting to maintain test integrity
    e.preventDefault();
  };
  
  return (
    <div className="mb-6">
      <label htmlFor="typing-input" className="sr-only">
        Type the text shown above
      </label>
      <textarea
        id="typing-input"
        ref={inputRef}
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        disabled={disabled}
        placeholder={disabled ? "Click Reset to start typing..." : "Start typing here..."}
        className="w-full h-32 p-4 border-2 border-gray-300 rounded-xl font-mono text-lg resize-none focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
      <div className="text-xs text-gray-500 mt-2 flex justify-between">
        <span>Tip: Focus on accuracy first, speed will follow naturally</span>
        <span>Characters: {userInput.length}</span>
      </div>
    </div>
  );
};

export default TypingInput;