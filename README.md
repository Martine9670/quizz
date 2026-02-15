# 🏆 Quizz

A vibrant, modern general knowledge quiz built with **React**, **Vite**, and **JavaScript**. This project was developed with a strict focus on **clean code** and **separation of concerns**, ensuring zero inline CSS within the HTML/JSX structure.

## ✨ Features

- **Dynamic Database**: Fetches **all available questions** from the database without arbitrary limits.
- **5-Second Blitz Timer**: A high-pressure environment with only 5 seconds to answer each question.
- **Animated Progress Bar**: Visual feedback using CSS variables to track remaining time accurately.
- **Persistent Leaderboard**: Global "Hall of Fame" powered by a **Strapi REST API** to save scores permanently.
- **Diverse Topics**: Includes Video Games, Web Development, Music, and General Culture across 3 difficulty levels.
- **Immersive UI**: Full-screen vibrant design with floating card effects and a strictly external CSS architecture.
- **Celebration**: Interactive confetti effects powered by `canvas-confetti` for perfect scores.
- **Zero Inline Styles**: 100% of the styling is handled via external CSS and CSS variables for dynamic elements.

## 🚀 Tech Stack

- **Frontend**: React (Hooks: `useState`, `useEffect`, `useCallback`)
- **Backend**: Strapi CMS (Headless CMS)
- **Build Tool**: Vite
- **Styling**: CSS3 (Flexbox, Animations, CSS Variables)
- **Library**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd quizz

    Install dependencies
    Bash

    # Install for both frontend and backend
    cd frontend && npm install
    cd ../backend && npm install

    Backend Setup (Strapi)

        Ensure your Strapi server is configured on http://localhost:1337.

        Permissions for the Score and Question collections must be set to find and create for the Public role.

-----

⚡ Quick Start (VS Code)

This project includes a .vscode/launch.json configuration to start the full stack in one click:

    Open the Run and Debug tab (Ctrl+Shift+D).

    Select 🚀 TOUT LANCER (Quizz).

    Press F5 to start both the Strapi backend and Vite frontend in synchronized terminals.

-----

🧠 Logic Highlights

    Dynamic Timer Logic: Uses a combination of useEffect and setInterval to manage a 5-second countdown, triggering an automatic submission when time reaches zero.

    CSS Variables Integration: Leverages --progress CSS variables updated by React state to animate the timer bar without using inline style attributes.

    Fullstack Integration: Uses asynchronous fetch calls to synchronize local state with the Strapi database, ensuring a persistent and shared Hall of Fame.

    Shuffle Algorithm: Randomizes the entire question pool fetched from the API to ensure a fresh experience every game.

    Clean Architecture: Decouples logic from presentation, maintaining a highly readable and maintainable codebase.

-----

Developed as part of the THP (The Hacking Project) curriculum.

-----

## Author : Martine