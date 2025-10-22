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
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "next-env.d.ts",
      "**/dist/**",
      "**/build/**",
      "**/out/**",
      "**/coverage/**",
      "**/.snaplet/**",
      "**/supabase/.branches/**",
      "**/supabase/.temp/**",
      "**/supabase/functions/.deno/**",
      "pnpm-lock.yaml",
      "yarn.lock",
      "package-lock.json",
    ],
  },
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
      "@typescript-eslint/no-unused-vars": "off",
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
      // Prefer expect-error but allow ts-ignore with description to reduce noise
      "@typescript-eslint/ban-ts-comment": [
        "warn",
        { "ts-expect-error": "allow-with-description", "ts-ignore": "allow-with-description" },
      ],
    },
  },
];

export default eslintConfig;
