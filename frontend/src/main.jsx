/* --- IMPORTS --- */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/* --- PWA CONFIGURATION --- */
// Import and immediate registration of Service Worker for offline mode
import { registerSW } from 'virtual:pwa-register'

// Remove the duplicate "registerSW({ immediate: true })" line
// Configure automatic updates
const updateSW = registerSW({ 
  onNeedRefresh() {
    // UX: Politely ask user if they want the new version
    if (confirm("Une nouvelle version de Quizzy est disponible ! Recharger maintenant ?")) {
      updateSW(true); // Force reload and activation of new Service Worker
    }
  },
  onOfflineReady() {},
  immediate: true 
})

/* --- APP RENDERING --- */
// Initialize React entry point on #root element
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)