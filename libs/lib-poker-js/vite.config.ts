/// <reference types="vitest" />
import { join } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    dts({
      tsConfigFilePath: join(__dirname, "tsconfig.lib.json"),
      skipDiagnostics: true,
    }),
    viteTsConfigPaths({
      root: "../../",
    }),
  ],

  build: {
    lib: {
      entry: "src/index.ts",
      name: "pure-libs-rlv1",
      // fileName: "index",
      formats: ["es", "cjs"],
    },
  },
  test: {
    globals: true,
    cache: {
      dir: "../../node_modules/.vitest",
    },
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
