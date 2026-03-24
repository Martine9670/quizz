/* --- IMPORTS --- */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/* --- PWA CONFIGURATION --- */
// Importation et enregistrement immédiat du Service Worker pour le mode déconnecté
import { registerSW } from 'virtual:pwa-register'

// On retire la ligne "registerSW({ immediate: true })" qui était ici en double
// On configure la mise à jour automatique
const updateSW = registerSW({ 
  onNeedRefresh() {
    // UX : On demande gentiment à l'utilisateur s'il veut la nouvelle version
    if (confirm("Une nouvelle version de Quizzy est disponible ! Recharger maintenant ?")) {
      updateSW(true); // Force le rechargement et l'activation du nouveau Service Worker
    }
  },
  onOfflineReady() {},
  immediate: true 
})

/* --- APP RENDERING --- */
// Initialisation du point d'entrée React sur l'élément #root
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)