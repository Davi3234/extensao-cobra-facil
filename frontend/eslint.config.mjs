import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**'
  ]),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      quotes: ['warn', 'single'],
      'linebreak-style': ['off', 'windows'],
      semi: ['warn', 'never'],
      curly: ['warn', 'multi-line'],
      'no-trailing-spaces': 'warn',
      'prettier/prettier': ['off', { endOfLine: 'auto' }],
    }
  }
])

export default eslintConfig
