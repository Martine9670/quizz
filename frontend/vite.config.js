/* --- IMPORTS --- */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

/* --- VITE CONFIGURATION --- */
export default defineConfig({
  plugins: [
    react(),
    
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true 
      },
      includeAssets: ['favicon.ico', 'robots.txt', 'sounds/*.mp3'], 
      
      /* --- PWA MANIFEST --- */
      manifest: {
        id: '/', // <-- To uniquely identify the app
        name: 'Quizzy Pro',
        short_name: 'Quizzy',
        description: 'Le meilleur quizz pour tester vos connaissances',
        theme_color: '#646cff',
        background_color: '#000000',
        display: 'standalone',
        
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/808/808439.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'https://cdn-icons-png.flaticon.com/512/808/808439.png', 
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ],
        /* --- SCREENSHOTS --- */
        screenshots: [
          {
            src: 'screenshot-desktop.png', 
            sizes: '1854x1048',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Quizzy sur ordinateur'
          },
          {
            src: 'screenshot-mobile.png', 
            sizes: '712x1080',
            type: 'image/png',
            label: 'Quizzy sur mobile'
          }
        ]
      }
    })
  ]
})