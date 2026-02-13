# 🏆 Quizz

A vibrant, modern general knowledge quiz built with **React**, **Vite**, and **JavaScript**. This project was developed with a strict focus on **clean code** and **separation of concerns**, ensuring zero inline CSS within the HTML/JSX structure.

## ✨ Features

- **Massive Database**: 150 questions across 3 difficulty levels (Easy, Medium, Hard).
- **Smart Sampling**: Randomly picks 10 unique questions per session for high replayability.
- **Diverse Topics**: Includes Video Games, Web Development, Music, and General Culture.
- **Progress Tracking**: Real-time score and question counter.
- **Immersive UI**: Full-screen vibrant design with a floating card effect and decorative background.
- **Celebration**: Interactive confetti effects powered by `canvas-confetti` for perfect scores.
- **Zero Inline Styles**: 100% of the styling is strictly handled via external CSS files.

## 🚀 Tech Stack

- **Frontend**: React (Hooks: `useState`, `useEffect`)
- **Build Tool**: Vite
- **Styling**: CSS3 (Flexbox, Animations, Pseudo-elements)
- **Library**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd quizz

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

    Shuffle & Slice Algorithm: Uses a localized Fisher-Yates shuffle to randomize the entire pool before slicing the top 10 questions, ensuring a fresh experience every game.

    State Management: Centralized React state to handle level selection, real-time scoring, and seamless game resets.

    Dynamic Layout: Fully responsive design using min-height: 100vh and Flexbox to keep the UI perfectly centered on any screen.

Developed as part of the THP (The Hacking Project) curriculum.

    -----

  ##  Author : Martine PINNA