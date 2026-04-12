import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Simplified configuration to avoid "tsconfig.json not found" errors
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn"
    }
  },
  {
    // Global ignores
    ignores: [
        "node_modules/", 
        "test-results/", 
        "playwright-report/", 
        "allure-results/",
        "dist/",
        "eslint.config.mjs" // Avoid linting the config itself
    ],
  }
);