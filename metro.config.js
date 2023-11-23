const { getDefaultConfig } = require("expo/metro-config");

const originalConfig = getDefaultConfig(__dirname);

// [Web-only]: Enables CSS support in Metro.
originalConfig.isCSSEnabled = true;

const { transformer, resolver } = originalConfig;

transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer",
);

// Remove "svg" from assetExts and add "svg" to sourceExts
resolver.assetExts = resolver.assetExts.filter((ext) => ext !== "svg");
resolver.sourceExts.push("svg");

module.exports = originalConfig;
