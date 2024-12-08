module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          "react-compiler": {
            // Passed directly to the React Compiler Babel plugin.
            //compilationMode: "strict",
            panicThreshold: "all_errors",
          },
        },
      ],
    ],
    plugins: [
      'react-native-reanimated/plugin',
    ],
    env: {
      production: {
        plugins: ["transform-remove-console"],
      },
    },
  };
};
