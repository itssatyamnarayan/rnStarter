module.exports = {
  presets: ['module:@react-native/babel-preset'],

  //by own
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    ['react-native-worklets/plugin'],
  ],
};
