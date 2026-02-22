/* --- IMPORTS --- */
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

/* --- CONFIGURATION ESLINT --- */
export default defineConfig([
  /* IGNORER LES FICHIERS DE BUILD */
  globalIgnores(['dist', 'dev-dist']),
  
  {
    /* FICHIERS CIBLÉS */
    files: ['**/*.{js,jsx}'],
    
    /* EXTENSIONS DE CONFIGURATION */
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    
    /* OPTIONS DE LANGAGE */
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    
    /* RÈGLES PERSONNALISÉES */
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])