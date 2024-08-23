module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@containers': './src/containers',
          '@hooks': './src/hooks',
          '@models': './src/models',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@services': './src/services',
          '@store': './src/store',
        },
      },
    ],
  ],
};
