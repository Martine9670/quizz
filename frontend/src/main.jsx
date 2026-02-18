/* --- IMPORTS --- */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/* --- PWA CONFIGURATION --- */
// Importation et enregistrement immédiat du Service Worker pour le mode déconnecté
import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true })

/* --- APP RENDERING --- */
// Initialisation du point d'entrée React sur l'élément #root
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)