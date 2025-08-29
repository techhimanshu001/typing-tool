# 🚀 Typing Master

A modern, professional typing speed test application built with React, Vite, and Tailwind CSS.

## ✨ Features

- **Real-time Statistics**: Live WPM, accuracy, and progress tracking
- **Visual Feedback**: Character-by-character color coding
- **Smart Timer**: Auto-start on first keystroke with 60-second countdown
- **Progress Tracking**: Visual progress bar and completion detection
- **Results Analysis**: Detailed performance breakdown modal
- **Multiple Texts**: Random text selection for variety
- **Pause/Resume**: Full test control functionality
- **Responsive Design**: Mobile-friendly layout
- **Modern UI**: Clean design with smooth animations

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework (using @tailwindcss/vite plugin)
- **Lucide React** - Icon library
- **ES6+ JavaScript** - Modern JavaScript features

## 📁 Project Structure

```
src/
├── components/
│   ├── TypingMaster.jsx      # Main component
│   ├── TypingStats.jsx       # Statistics dashboard
│   ├── TextDisplay.jsx       # Text display with highlighting
│   ├── TypingInput.jsx       # Input textarea component
│   ├── ResultsModal.jsx      # Results popup modal
│   └── ControlButtons.jsx    # Control buttons component
├── hooks/
│   └── useTypingTest.js      # Custom typing test hook
├── utils/
│   ├── textData.js           # Sample texts and text utilities
│   ├── calculations.js       # WPM and accuracy calculations
│   └── constants.js          # App constants and configurations
├── App.jsx                   # Root app component
├── main.jsx                  # React entry point
└── index.css                 # Global styles and Tailwind imports
```

## 🚀 Quick Start

### 1. Create Project
```bash
npm create vite@latest typing-master -- --template react
cd typing-master
```

### 2. Install Dependencies
```bash
npm install lucide-react
npm install -D @tailwindcss/vite tailwindcss
```

### 3. Copy Files
Copy all the provided files into their respective directories as shown in the project structure.

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## 📋 Setup Checklist

- [ ] Create Vite React project
- [ ] Install dependencies (`lucide-react`, `@tailwindcss/vite`, `tailwindcss`)
- [ ] Copy all component files to `src/components/`
- [ ] Copy utility files to `src/utils/`
- [ ] Copy hook file to `src/hooks/`
- [ ] Replace `src/App.jsx`, `src/main.jsx`, `src/index.css`
- [ ] Update `vite.config.js` and `package.json`
- [ ] Replace `index.html`
- [ ] Run `npm run dev`

## 🎯 Usage

1. **Start Typing**: Click in the input area and begin typing
2. **Auto-Timer**: Timer starts automatically on first keystroke
3. **Visual Feedback**: See real-time feedback with color-coded characters
4. **Track Progress**: Monitor your WPM, accuracy, and progress
5. **Complete Test**: Finish within 60 seconds or type the entire text
6. **View Results**: See detailed statistics in the results modal

## ⚡ Key Features Explained

### Real-time Statistics
- **WPM**: Calculated using standard (characters typed / 5) / minutes formula
- **Accuracy**: Percentage of correctly typed characters
- **Progress**: Visual progress bar showing completion percentage

### Visual Feedback System
- 🟢 **Green
