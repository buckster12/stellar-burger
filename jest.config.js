module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^~/(.*)$': '<rootDir>/$1',
    },
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ['node_modules/'],
    moduleFileExtensions: ['js', 'ts'],
    transform: {
        '^(.+)(j|t)sx?$': 'ts-jest',
    },
};