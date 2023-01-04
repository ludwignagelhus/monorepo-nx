/// <reference types="vitest" />
import { join } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    dts({
      tsConfigFilePath: join(__dirname, "tsconfig.json"),
      // Faster builds by skipping tests. Set this to false to enable type checking.
      skipDiagnostics: true,
    }),
    viteTsConfigPaths({
      root: "../../",
    }),
  ],

  build: {
    lib: {
      entry: "src/main.ts",
      name: "pure-libs-rlv1",
      fileName: "main",
      formats: ["es", "cjs"],
    },
  },
  test: {
    globals: true,
    cache: {
      dir: "../../node_modules/.vitest",
    },
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
