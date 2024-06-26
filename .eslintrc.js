// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    // Parser that checks the content of the <script> tag
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    "vue/setup-compiler-macros": true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    // Airbnb JavaScript Style Guide https://github.com/airbnb/javascript
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    "import/resolver": {
      typescript: {
        project: path.resolve(__dirname, "./tsconfig.json"),
      },
    },
  },
  rules: {
    "no-console": 0,
    "no-tabs": 0,
    "no-mixed-spaces-and-tabs": 0,
    "prettier/prettier": 0,
    "import/no-extraneous-dependencies": 0,
    "import/extensions": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "no-nested-ternary": 0,
    "no-void": 0,
    "no-restricted-syntax": 0,
    "no-await-in-loop": 0,
    "no-shadow": 0,
    "import/prefer-default-export": 0,
    radix: 0,
    "prefer-destructuring": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "no-unused-expressions": 0,
    "no-useless-escape": 0,
    "no-constant-condition": 0,
    "vue/multi-word-component-names": 0,
    "vue/first-attribute-linebreak": 0,
    "no-undef": 0,
    xxxxxx446: 0,
    xxxxxx557: 0,
    xxxxxx668: 0,
    xxxxxx4332: 0,
    xxxxxx5343: 0,
    xxxxxx6355: 0,
    xxxxxx4466: 0,
    xxxxxx5577: 0,
    xxxxxx6688: 0,
    xxxxxx43324: 0,
    xxxxxx53433: 0,
    xxxxxx63552: 0,
    xxxxxx44661: 0,
    xxxxxx55777: 0,
    xxxxxx66888: 0,
    xxxxxx433243: 0,
    xxxxxx534334: 0,
    xxxxxx635525: 0,
    xxxxxx446616: 0,
    xxxxxx557777: 0,
    xxxxxx668888: 0,
  },
  globals: {},
};
