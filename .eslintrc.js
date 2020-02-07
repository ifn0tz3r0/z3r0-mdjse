module.exports = {
  parser: `babel-eslint`,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: `module`
  },
  env: {
    es6: true,
    node: true
  },
  extends: [`eslint:recommended`],
  rules: {
    semi: [`error`, `never`],
    [`no-console`]: `off`
  }
}
