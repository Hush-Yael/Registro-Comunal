import js from "@eslint/js";
import solid from "eslint-plugin-solid/configs/recommended";
import globals from "globals";
import * as tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,jsx}"],
    ...solid,
    languageOptions: {
      globals: {
        ...globals,
      },
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
      },
    },
    rules: {
      "no-unused-vars": "warn",
    },
  },
];
