const path = require("path");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const webpackConfig = {
  resolve: {
    extensions: [".js", ".ts"],
  },
  optimization: {
    minimize: false,
    moduleIds: "named",
  },
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "../dist"),
  },
  target: "web",
  externals: {
    jquery: "$",
  },
  module: {
    rules: [
      {
        test: /\.m?ts$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.json",
          },
        },
      },
      {
        test: /\.less$/,
        use: ["css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
    ],
  },
  plugins: process.env.npm_config_report ? [new BundleAnalyzerPlugin()] : [],
};

module.exports = webpackConfig;
