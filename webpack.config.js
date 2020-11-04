const path = require("path");

module.exports = {
  entry: [
    "./js/const.js",
    "./js/util.js",
    "./js/backend.js",
    "./js/form.js",
    "./js/main.js",
    "./js/preview.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
