// jest.config.js
module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      babelConfig: false,
      diagnostics: {
        pathRegex: /\.spec\.ts$/,
        ignoreCodes: [
          // Could not find a declaration file for module
          // 'TS7016',
        ],
      },
    },
  },
  setupFiles: ['<rootDir>/test/setupFile.ts'],
};
