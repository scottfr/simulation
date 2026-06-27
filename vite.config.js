import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig(({ command }) => ({
  test: {
    globals: true,
    testTimeout: 60000,
    exclude: [...configDefaults.exclude, "types/**"]
  }
}));
