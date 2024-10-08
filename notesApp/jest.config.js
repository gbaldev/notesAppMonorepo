module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-vector-icons|react-native-reanimated|@react-native-community/netinfo)/|axios)',
  ],
};
