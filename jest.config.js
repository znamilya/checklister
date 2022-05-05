/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    collectCoverageFrom: [
        "src/features/**/*.{ts,tsx}",
        "src/libs/**/*.{ts,tsx}",
        "src/ui/**/*.{ts,tsx}",
        "src/utils/**/*.{ts,tsx}",
        // Index files only define public API of a module and do not contain any logic that should be tested.
        "!src/**/index.{ts,tsx}",
    ],
    coveragePathIgnorePatterns: [".stories.tsx", ".styled.ts", ".spec.{ts,tsx}", ".test.{ts,tsx}"],
    coverageReporters: ["lcov", "text-summary"],
    coverageDirectory: "coverage",
    coverageThreshold: {
        global: {
            statements: 2,
            branches: 2,
            functions: 2,
            lines: 2,
        },
    },
};
