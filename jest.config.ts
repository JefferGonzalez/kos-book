import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!next-auth)', // Transforma los módulos de `next-auth`
  ],
  moduleNameMapper: {
    // Mapea extensiones y módulos para Jest
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};

export default createJestConfig(config);
