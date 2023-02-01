module.exports = {
  moduleDirectories: ['node_modules', '<rootDir>'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },

  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  modulePaths: ['./src'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!firebase)/'],
  collectCoverage: true,
  coverageDirectory: 'src/coverage',
};
