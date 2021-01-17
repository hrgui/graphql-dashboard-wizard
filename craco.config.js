const path = require("path");

module.exports = {
  webpack: {
    alias: {
      // stop importing multiple copies of react
      // just use 1
      react: path.dirname(require.resolve("react")),
      "react-dom": path.dirname(require.resolve("react-dom")),
    },
  },
};