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
      prettier: prettierPlugin,
    },
    rules: {
      ...baseRules,
      ...typescriptRules,
      ...importRules,
    },
  }
];

export default config;
