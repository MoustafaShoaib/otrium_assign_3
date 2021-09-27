module.exports = {
  projects: [
    {
      globalSetup: "./test/setup.ts",
      globalTeardown: "./test/teardown.ts",
      displayName: "test",
      rootDir: "./",
      moduleFileExtensions: ["js", "json", "ts"],
      testMatch: ["**/__test__/**/*.+(ts|js)", "**/?(*.)+(test).+(ts|js)"],
      transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
      },
      testEnvironment: "node",
    },
  ],
};
