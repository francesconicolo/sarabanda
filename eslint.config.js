import typescriptEslintParser from "@typescript-eslint/parser";
import prettierEslintConfig from "eslint-plugin-prettier/recommended";
import typescriptEslintConfig from "typescript-eslint";
import eslintReactHooksPlugin from "eslint-plugin-react-hooks";
import eslintReactPlugin from "eslint-plugin-react";
import eslintJsxA11yPlugin from "eslint-plugin-jsx-a11y";

const tsRules = [
  prettierEslintConfig,
  ...typescriptEslintConfig.configs.recommended,
  {
    files: ["**/*.ts"],
    ignores: ["dist", "build", "node_modules"],
    languageOptions: {
      parser: typescriptEslintParser,
    },

    rules: {
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/explicit-function-return-type": "error",

      "prettier/prettier": [
        "error",
        {
          tabWidth: 2,
          semi: true,
          singleQuote: true,
          trailingComma: "none",
          bracketSpacing: true,
          arrowParens: "always",
          endOfLine: "auto",
        },
      ],
    },
  },
];

const mergePrettierEslintConfigs = (configs = [], rules = {}) => {
  const mergedPrettierRules = {};
  for (const config of configs) {
    if (config["rules"]?.["prettier/prettier"]) {
      const currentRules = config["rules"]["prettier/prettier"][1] || null;
      Object.assign(mergedPrettierRules, currentRules || {});
    }
  }

  return {
    "prettier/prettier": ["error", { ...mergedPrettierRules, rules }],
  };
};

export default [
  ...tsRules,
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["dist", "build", "node_modules"],

    plugins: {
      react: eslintReactPlugin,
      "react-hooks": eslintReactHooksPlugin,
      "jsx-a11y": eslintJsxA11yPlugin,
    },

    rules: {
      // react
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-no-bind": "off",
      // react-hooks
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/rules-of-hooks": "error",

      ...mergePrettierEslintConfigs(tsRules, {
        singleAttributePerLine: true,
        bracketSameLine: false,
        htmlWhitespaceSensitivity: "css",
      }),
    },
  },
];
