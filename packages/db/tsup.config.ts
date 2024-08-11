import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/scripts"],
  format: ["esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  external: ["nanoid"],
});
