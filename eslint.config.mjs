import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js + TypeScript base, then turn off formatting rules via Prettier
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      // Prefer simple-import-sort
      "import/order": "off",
      "sort-imports": "off",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      // Remove unused imports and keep warnings for unused vars unless prefixed with _
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;
