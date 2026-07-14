/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'test',
  testEnvironment: 'node',
  testRegex: '.e2e-spec\\.ts$',
  transform: { '^.+\\.(t|j)s$': ['ts-jest', { tsconfig: '<rootDir>/../tsconfig.json' }] },
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/../src/$1' },
  setupFiles: ['<rootDir>/setup-env.ts'],
  testTimeout: 15000,
}
