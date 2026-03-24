/* --- IMPORTS --- */
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

/* --- ESLINT CONFIGURATION --- */
export default defineConfig([
  /* IGNORE BUILD FILES */
  globalIgnores(['dist', 'dev-dist']),
  
  {
    /* TARGETED FILES */
    files: ['**/*.{js,jsx}'],
    
    /* CONFIGURATION EXTENSIONS */
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    
    /* LANGUAGE OPTIONS */
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    
    /* CUSTOM RULES */
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])