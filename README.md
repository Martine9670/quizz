# 🏆 Quizz

A vibrant, modern general knowledge quiz built with **React**, **Vite**, and **JavaScript**. This project was developed with a strict focus on **clean code** and **separation of concerns**, ensuring zero inline CSS within the HTML/JSX structure.

## ✨ Features

- **3 Difficulty Levels**: Easy, Medium, and Hard (30 questions total).
- **Dynamic Content**: Questions are shuffled at the start of each game for a unique experience.
- **Progress Tracking**: Real-time score and question counter.
- **Immersive UI**: Full-screen vibrant design with a floating card effect and decorative background.
- **Celebration**: Interactive confetti effects powered by `canvas-confetti` for perfect scores.
- **Zero Inline Styles**: 100% of the styling is handled via external CSS.

## 🚀 Tech Stack

- **Frontend**: React (Hooks: `useState`, `useEffect`)
- **Build Tool**: Vite
- **Styling**: CSS3 (Flexbox, Animations, Pseudo-elements)
- **Library**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd quizz-master

    Install dependencies
    Bash

    npm install

    Run the development server
    Bash

    npm run dev

    Build for production
    Bash

    npm run build

🧠 Logic Highlights

    Shuffle Algorithm: Uses a localized version of the Fisher-Yates principle to randomize questions upon level selection.

    State Management: Centralized game state (score, index, level) to ensure smooth transitions and clean resets.

    Responsiveness: The layout uses min-height: 100vh and Flexbox to stay centered and visually appealing on all screen sizes.

    -----

  ##  Author : Martine PINNA