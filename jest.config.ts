import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      // `ts-jest` specific options go here
      tsconfig: '<rootDir>/tsconfig.json' // or tsconfig.test.json if you have a specific config for tests
    }],
  },
  testMatch: ['**/?(*.)+(spec|test).ts'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1', // Adjust this if you're using path aliases
  },
  // Remove the `globals` section
};

export default config;


// import type { Config } from '@jest/types';

// const config: Config.InitialOptions = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   transform: {
//     '^.+\\.ts$': 'ts-jest',
//   },
//   testMatch: ['**/?(*.)+(spec|test).ts'],
//   moduleNameMapper: {
//     '^@src/(.*)$': '<rootDir>/src/$1', // Adjust this if you're using path aliases
//   },
//   globals: {
//     'ts-jest': {
//       tsconfig: '<rootDir>/tsconfig.json', // or tsconfig.test.json if you have a specific config for tests
//     },
//   },
// };

// export default config;

