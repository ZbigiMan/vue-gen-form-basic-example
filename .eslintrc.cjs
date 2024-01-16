module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier"
  ],
  parser: "vue-eslint-parser",
  rules: {
    "prettier/prettier": ["error"],
    "@typescript-eslint/ban-ts-comment": "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "quote-props": [2, "consistent-as-needed"],
    "quotes": ["error", "single"]
  },
  ignorePatterns: ["*.js", "*.json", "*.cjs"],
  plugins: ["prettier"]
}
