import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node', // No JSDOM needed for pure logic/Node projects
    globals: true, // Allows you to use 'test' and 'expect' without importing them
  },
});
