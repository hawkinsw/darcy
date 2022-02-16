module.exports = {
  extends: ["google", "eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "2021"
  },
  env: {
    es2021: "true",
    node: "true"
  }
};
