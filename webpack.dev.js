const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = [
  merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      contentBase: "./dist"
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true,
                localIdentName: "[name]__[local]"
              }
            }
          ]
        }
      ]
    }
  }),
  {
    mode: "development",
    target: "webworker",
    entry: {
      sw: "./src/sw.js"
    },
    devtool: "eval-cheap-module-source-map",
    resolve: {
      symlinks: false,
      modules: ["node_modules"],
      extensions: ["*", ".js", ".json"]
    }
  }
];
