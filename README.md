# 🏆 Quizz - Quizzy App

A vibrant, modern general knowledge quiz built with **React**, **Vite**, and **JavaScript**. This project was developed with a strict focus on **clean code**, **Service Pattern architecture**, and **separation of concerns**.

## ✨ Key Features (New & Improved)

- **Service Layer Architecture**: Complete decoupling of API logic from UI components. All communication with the Strapi backend is centralized in a dedicated service layer.
- **User Authentication**: Secure registration and login system integrated with Strapi's Auth provider.
- **Dynamic Database**: Fetches questions based on difficulty levels with a custom **Shuffle & Mapping** algorithm.
- **5-Second Blitz Timer**: A high-pressure environment with automated answer validation using optimized React hooks.
- **Inclusive Design (Dyslexic Mode)**: A specialized accessibility toggle that adjusts typography and spacing across the entire application.
- **Persistent Leaderboard**: Global "Hall of Fame" fetching the Top 5 scores in real-time from the **Strapi REST API**.
- **Immersive UI**: 100% external CSS architecture with floating card effects and `canvas-confetti` celebrations for perfect scores.

## 🚀 Tech Stack

- **Frontend**: React (Advanced Hooks: `useState`, `useEffect`, `useCallback`)
- **Backend**: Strapi CMS (Headless CMS)
- **Architecture**: **Service Pattern** (Separation of Data and View)
- **Styling**: CSS3 (Variables, Flexbox, Transitions)
- **Library**: `canvas-confetti`

## 🛠️ Architecture & Logic Highlights

### 📁 The Service Pattern (Refactored)
We migrated all technical logic from `App.jsx` to `src/services/api.js`. 
- **Benefit**: The UI components don't need to know about Strapi's data structure (`.attributes`, etc.). 
- **Scalability**: Changing the API URL or the database provider only requires updating one single file.



### ⚡ Performance Optimization
- **Cascading Renders Fix**: Optimized `useEffect` hooks using `setTimeout(..., 0)` and asynchronous wrappers to ensure smooth UI transitions and prevent performance bottlenecks.
- **Memory Safety**: Systematic use of `useCallback` to prevent unnecessary function re-creations and `clearTimeout/clearInterval` to avoid memory leaks.

### 🧠 Game Logic
- **Dynamic Timer**: Leverages CSS variables updated by React state to animate the progress bar without inline styles.
- **Shuffle Algorithm**: Questions are randomized on the fly in the service layer before reaching the component.

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd quizz

    Install dependencies
    Bash

    # From the root
    npm install

    Backend Setup (Strapi)

        Ensure Strapi is running on http://localhost:1337.

        Collections: Questions and Scores.

        Roles: Ensure Public has permissions for find, create, and register.

⚡ Quick Start (VS Code)

This project includes a .vscode/launch.json configuration:

    Open Run and Debug (Ctrl+Shift+D).

    Select 🚀 TOUT LANCER (Quizz).

    Press F5 to start both the Strapi backend and Vite frontend.

-----

Developed as part of the curriculum with a focus on professional software engineering patterns.

-----

Author: Martine PINNA