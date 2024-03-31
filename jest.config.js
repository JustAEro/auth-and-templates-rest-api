/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  rootDir: '.',
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '.(test|spec).(js?|ts?)$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  verbose: true,
};