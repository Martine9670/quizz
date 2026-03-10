🎮 QUIZZY App

A vibrant, modern general knowledge quiz built with React, Vite, and JavaScript. This project focuses on clean code, Service Pattern architecture, and separation of concerns.

-----

👤 User Stories
Core Gameplay: En tant que joueur, je veux choisir un thème et un niveau de difficulté pour tester mes connaissances.

Progression (Auth): En tant que compétiteur, je veux m'identifier pour cumuler mes points et débloquer des badges évolutifs (Novice à GOAT).

Immersion: En tant qu'utilisateur, je veux une ambiance sonore et visuelle dynamique (musique, effets glitch) pour une expérience de jeu immersive.

Inclusion (Accessibilité): En tant qu'utilisateur dyslexique, je veux activer un mode de lecture adapté pour lire les questions confortablement.

-----

✨ Key Features

Service Layer Architecture: Complete decoupling of API logic from UI components.

User Authentication: Secure registration/login system with Strapi Auth.

Internal Routing: Custom state-based navigation (Game, Contact, Legal) without reloads.

Inclusive Design: Specialized Dyslexic Mode toggle for enhanced accessibility.

Gamification: Dynamic badge system (Novice to GOAT) based on total points.

Persistent Leaderboard: Real-time "Hall of Fame" fetching Top 5 scores.

Real-time Feedback: Asynchronous contact form via Axios.

Audio Immersive System: Background music & SFX with a Global Mute Toggle (persistent state).

Dynamic UI: Glitch & Pulse animations for high-engagement "Call to Action" buttons.

-----

⚖️ Navigation & Compliance
GDPR Ready: Dedicated pages for Terms of Use (CGU), Legal Mentions and GDPR.

Advanced Validation: Regex-based form checks for data integrity.

WCAG Compliant: Full keyboard navigation (TAB/ENTER) and semantic HTML5.

-----

🚀 Tech Stack
Frontend: React (Advanced Hooks: useState, useEffect, useCallback)

Backend: Strapi CMS (Headless)

Styling: CSS3 (Variables, Flexbox, Transitions)

Library: canvas-confetti, vite-plugin-pwa

-----

🛠️ Architecture & Logic

📁 The Service Pattern
Technical logic is isolated in src/services/api.js. UI components remain "dumb" and focus only on rendering, making the app highly scalable.

⚡ Performance & Safety
Cascading Renders Fix: Optimized useEffect hooks with asynchronous wrappers.

Memory Safety: Systematic use of useCallback and cleanup functions to prevent leaks.

PWA Optimization: Manifest configuration matching real asset sizes for a seamless installation experience.

🧠 Game Logic
Dynamic Timer: CSS variables synced with React state for smooth, hardware-accelerated progress bars.
Shuffle Algorithm: Real-time randomization of questions to ensure a unique experience every session.
Audio Logic: Single-instance audio management via useRef to maintain a persistent "Mute" state across the entire application.
Label Syncing: Centralized dictionary pattern to decouple database IDs from display labels (e.g., "Aléatoire").

-----

⚙️ Installation & Setup
1. Clone & Install
Bash

git clone <your-repository-url>
cd quizz

# Install Frontend
cd frontend && npm install

# Install Backend
cd ../backend && npm install

2. Backend Setup (Strapi)

    Ensure Strapi runs on http://localhost:1337.

    Permissions: Enable find (Questions/Scores), create (Scores/Messages), and Auth in Settings > Roles > Public.

🔄 Data Management

Database: Questions are managed via the Strapi Admin panel (http://localhost:1337/admin).

Seeding (Local only): The import_questions.js script is used for initial local database population. Note: This script is excluded from the repository (.gitignore) for data privacy.

Manual Setup: If you are setting up the project for the first time, ensure you create the Questions and Scores collection types in Strapi and set the appropriate Public permissions (find/create).
📁 Project Management

Development followed an Agile methodology. Track progress and tasks here:
👉 [View Trello Board] https://trello.com/b/zxegXEBf

![Architecture Diagram](./diagramme.png)

---

Author: Martine PINNA