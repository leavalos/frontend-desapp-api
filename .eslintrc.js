module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "vue/no-use-v-if-with-v-for": "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
