/* --- IMPORTS --- */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

/* --- VITE CONFIGURATION --- */
// https://vitejs.dev/config/
export default defineConfig({
  /* --- PLUGINS --- */
  plugins: [
    react(),
    
    /* --- PWA CONFIGURATION --- */
    VitePWA({
      /* Comportement de la mise à jour (automatique) */
      registerType: 'autoUpdate',
      
      /* Options pour le développement */
      devOptions: {
        enabled: true 
      },
      
      /* Fichiers statiques à inclure dans le cache du Service Worker */
      includeAssets: ['favicon.ico', 'robots.txt', 'sounds/*.mp3'], 
      
      /* --- MANIFEST PWA --- */
      manifest: {
        name: 'Quizzy Pro',
        short_name: 'Quizzy',
        description: 'Le meilleur quizz pour tester vos connaissances',
        theme_color: '#646cff',
        background_color: '#000000',
        display: 'standalone',
        
        /* Icônes de l'application (Android / iOS / Desktop) */
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/808/808439.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'https://cdn-icons-png.flaticon.com/512/808/808439.png', 
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      }
    })
  ]
})