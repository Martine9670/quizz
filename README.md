🎮 QUIZZY App
A vibrant, modern general knowledge quiz built with React, Vite, and Strapi. This project focuses on clean code, Service Pattern architecture, and a highly interactive user experience.

👤 User Stories
Core Gameplay: En tant que joueur, je veux choisir un thème et un niveau de difficulté pour tester mes connaissances.

Progression (Auth): En tant que compétiteur, je veux m'identifier pour cumuler mes points et débloquer des badges évolutifs (Novice à GOAT).

Immersion: En tant qu'utilisateur, je veux une ambiance sonore et visuelle dynamique (musique, effets glitch) pour une expérience de jeu immersive.

Inclusion (Accessibilité): En tant qu'utilisateur dyslexique, je veux activer un mode de lecture adapté pour lire les questions confortablement.

✨ Key Features
Service Layer Architecture: Complete decoupling of API logic from UI components.

Dynamic Audio System: Background music and sound effects with a Global Mute Toggle persistent across the app.

Advanced UI/UX: * Glitch & Pulse Animations: High-visibility "Call to Action" buttons.

Responsive Layout: Smart spacing to prevent footer overlap on small screens.

Gamification: Dynamic badge system based on total_points (Novice, Apprenti, Guerrier, Expert, Légende, GOAT).

Inclusive Design: Specialized Dyslexic Mode toggle for enhanced accessibility.

PWA Ready: Installable on home screens for a native mobile feel.

🚀 Tech Stack
Frontend: React 18+ (Hooks: useCallback, useRef, useMemo)

Backend: Strapi CMS (Headless)

Animations: CSS3 Keyframes (Glitch/Pulse), canvas-confetti

State Management: LocalStorage & React State synchronization

Environment: Node.js v24 (LTS recommended)

🛠️ Architecture & Logic
🎵 Audio Management
The app uses a Single Source of Truth for audio via useRef in the main App.js. This prevents audio overlap and ensures that the "Mute" state is respected even during page transitions or game resets.

🧠 Game & Category Logic
Categorization: Fully customizable category labels via a central dictionary.

Memory Safety: Systematic use of cleanup functions in useEffect to prevent memory leaks with timers and event listeners.

Performance: Optimized re-renders using useCallback for API-heavy functions like chargerScores.

⚙️ Installation & Setup
Clone & Install

Bash
git clone <your-repository-url>
cd quizz
# Install Frontend & Backend
cd frontend && npm install
cd ../backend && npm install
Node Version Requirement
This project requires Node v24. If you use NVM:

Bash
nvm use 24
nvm alias default 24
Backend Setup
Ensure Strapi runs on http://localhost:1337.
Permissions: Enable find (Questions/Scores), create (Scores/Messages) in Settings > Roles > Public.

📁 Project Management
Track progress and tasks here:
👉 View Trello Board

Author: Martine PINNA