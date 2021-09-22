module.exports = {
    projects: [
      {
        globalSetup: './test/setup.ts',
        globalTeardown: './test/teardown.ts',
        displayName: 'test',
        rootDir: './',
        moduleFileExtensions: ['js', 'json', 'ts'],
        testMatch: ['**/__test__/**/*.+(ts|js)', '**/?(*.)+(test).+(ts|js)'],
        transform: {
          '^.+\\.(ts|tsx)$': 'ts-jest'
        },
        testEnvironment: 'node',
        collectCoverage: true,
        collectCoverageFrom: ['src_server/lib/**/*.ts'],
        coverageDirectory: './coverage',
        coverageThreshold: {
          global: {
            branches: 95,
            functions: 95,
            lines: 95,
            statements: 95
          }
        }
      }
    ]
  };
  