module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "airbnb",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: [
    "react-refresh",

    "@typescript-eslint",
    "react",
    "spellcheck",
    "sonarjs",
    "import",
  ],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/jsx-filename-extension": [0],
    "import/extensions": "off",
    "no-shadow": "off",
    "class-methods-use-this": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-unused-vars": ["error"],
    "id-length": [
      2,
      {
        min: 3,
        properties: "never",
        exceptions: ["id"],
      },
    ],
    "react/require-default-props": [
      2,
      {
        functions: "defaultArguments",
      },
    ],
    "@typescript-eslint/no-duplicate-enum-values": "error",
    "@typescript-eslint/no-implicit-any-catch": "error",
    "@typescript-eslint/no-dynamic-delete": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "max-lines": [
      "error",
      {
        max: 250,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    "max-depth": ["error", 3],
    "max-lines-per-function": [
      "error",
      {
        max: 200,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    "max-params": [
      "error",
      {
        max: 4,
      },
    ],
    "no-alert": "error",
    "no-console": "error",
    "no-delete-var": "error",
    "no-const-assign": "error",
    "no-unreachable": "error",
    "no-magic-numbers": [
      "error",
      {
        ignore: [-1, 0, 1],
      },
    ],
    "@typescript-eslint/no-redeclare": "error",
    "@typescript-eslint/ban-types": "error",
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/no-var-requires": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Za-z]",
          match: true,
        },
      },
      {
        selector: "enum",
        format: ["PascalCase"],
        custom: {
          regex: "Enum$",
          match: true,
        },
      },
    ],
    "spellcheck/spell-checker": [
      1,
      {
        comments: false,
        strings: false,
        templates: false,
        identifiers: true,
        lang: "en_US",
        skipWords: [
          "youtube",
          "enum",
          "unlikes",
          "checkbox",
          "fieldset",
          "dataset",
          "readonly",
          "href",
          "dsn",
          "integrations",
          "emojis",
          "Sao",
          "Paulo",
          "Gmt",
        ],
        minLength: 3,
      },
    ],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "import/prefer-default-export": "off",
  },
};
