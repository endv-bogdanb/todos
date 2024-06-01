import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";
import eslint from "@eslint/js";
import globals from "globals";
import typescriptEslintParser from "@typescript-eslint/parser";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import typescriptSortKeysPlugin from "eslint-plugin-typescript-sort-keys";
import canonicalPlugin from "eslint-plugin-canonical";

const root = dirname(fileURLToPath(import.meta.url));

/**
 * @type {import("eslint").Linter.FlatConfig["rules"]}
 */
export const baseRules = {
  ...eslint.configs.recommended.rules,
  ...eslint.configs.all.rules,
  "arrow-body-style": "off",
  "prefer-arrow-callback": "off",
  "no-console": "error",
  "sort-imports": "off",
  "func-style": "off",
  "sort-vars": "off",
  "one-var": "off",
  "id-length": ["error", { "exceptions": ["_"] }],
  "new-cap": "off",
  "capitalized-comments": "off",
  "multiline-comment-style": "off",
  ...prettierConfig.rules,
  "prettier/prettier": "error",
};

/**
 * @type {import("eslint").Linter.FlatConfig["rules"]}
 */
const typescriptRules = {
  ...typescriptEslintPlugin.configs.recommended.rules,
  ...typescriptEslintPlugin.configs["recommended-type-checked"].rules,
  ...typescriptEslintPlugin.configs.strict.rules,
  ...typescriptEslintPlugin.configs["strict-type-checked"].rules,
  ...typescriptEslintPlugin.configs["stylistic-type-checked"].rules,
  ...typescriptSortKeysPlugin.configs.recommended.rules,
  "@typescript-eslint/restrict-template-expressions": "off",
  "canonical/sort-keys": [
    2,
    "asc",
    {
      caseSensitive: false,
      natural: true,
    },
  ],
};

/**
 * @type {import("eslint").Linter.FlatConfig["rules"]}
 */
const importRules = {
  "@typescript-eslint/consistent-type-imports": [
    "error",
    { fixStyle: "inline-type-imports", prefer: "type-imports" },
  ],
  "simple-import-sort/imports": [
    "error",
    {
      groups: [
        [
          "^\\u0000",
          "^vitest",
          "^node:",
          "^react",
          "^express",
          "^@?\\w",
          "^",
          "^\\.\\./+",
          "^\\.",
        ],
      ],
    },
  ],
  "simple-import-sort/exports": "error",
};

/**
 * @type {import("eslint").Linter.FlatConfig["rules"]}
 */
export const hooksRules = {
  ...reactHooksPlugin.configs.recommended.rules,
  "react-refresh/only-export-components": [
    "warn",
    { allowConstantExport: true },
  ],
};

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
const config = [
  {
    // ui app
    files: ["apps/ui/src/**/*.{ts,tsx}"],
    ignores: ["apps/ui/src/**/*.test.{ts,tsx}"],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        tsconfigRootDir: resolve(join(root, "apps/ui")),
        project: "tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      "react-hooks": reactHooksPlugin,
      "react-refresh": reactRefreshPlugin,
      "simple-import-sort": simpleImportSort,
      "typescript-sort-keys": typescriptSortKeysPlugin,
      canonical: canonicalPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...baseRules,
      ...typescriptRules,
      ...importRules,
      ...hooksRules,
    },
  },
  {
    // api app
    files: ["apps/api/src/**/*.ts"],
    ignores: ["apps/api/src/**/*.test.ts"],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        tsconfigRootDir: resolve(join(root, "apps/api")),
        project: "tsconfig.json",
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      "simple-import-sort": simpleImportSort,
      "typescript-sort-keys": typescriptSortKeysPlugin,
      canonical: canonicalPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...baseRules,
      ...typescriptRules,
      ...importRules,
      "@typescript-eslint/no-misused-promises": "off"
    },
  },
];

export default config;
