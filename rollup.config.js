import typescriptPlugin from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import typescript from "typescript";
import pkg from "./package.json";

export default {
  input: "lib/de1/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    },
    {
      file: pkg.browser,
      format: "iife",
      name: "DE1",
      globals: {
        "es6-promisify": "es6Promisify",
        "@abandonware/noble": "noble",
        lodash: "lodash",
        binary: "binary"
      }
    }
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [typescriptPlugin({ typescript }), terser()]
};
