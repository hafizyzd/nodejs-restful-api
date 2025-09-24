export default {
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    transformIgnorePatterns: [
        'node_modules/(?!(uuid)/)'
    ],
    testEnvironment: 'node',
    testMatch: [
        "**/test/**/*.test.js"
    ],
    moduleFileExtensions: ['js'],
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^(\\.{1,2}/.*)\\.js$': '$1'
    },
    rootDir: '.'
}