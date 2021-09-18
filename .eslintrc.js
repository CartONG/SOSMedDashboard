module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/standard",
    "@vue/typescript/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    quotes: ["error", "double"],
    "no-console": process.env.NODE_ENV === "production" ? ["error", { allow: ["warn", "error"] }] : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
}
