const path = require("path")

module.exports = {
  "extends": ["react-app", "plugin:jsx-a11y/recommended"],
  plugins: ["graphql", "prettier"],
  rules: {
    "graphql/template-strings": [
      "error",
      {
        env: "relay",
        tagName: "graphql",
        schemaJsonFilepath: path.resolve(
          __dirname,
          "src/__generated__gatsby-introspection.json"
        ),
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
}
