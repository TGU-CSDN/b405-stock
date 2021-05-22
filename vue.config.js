process.env.UNI_USING_VUE3 = true;
process.env.UNI_USING_VUE3_OPTIONS_API = true;

const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, "cloudfunctions"),
          to: path.join(
            __dirname,
            "dist",
            process.env.NODE_ENV === "production" ? "build" : "dev",
            process.env.UNI_PLATFORM,
            "cloudfunctions"
          ),
        },
      ]),
    ],
  },
};
