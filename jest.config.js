/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    collectCoverageFrom: [
        "src/app/**/*.{ts,tsx}",
        "src/features/**/*.{ts,tsx}",
        "src/libs/**/*.{ts,tsx}",
        "src/ui/**/*.{ts,tsx}",
        "src/utils/**/*.{ts,tsx}",
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
