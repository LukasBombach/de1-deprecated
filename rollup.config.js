import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

import typescriptPlugin from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import typescript from "typescript";
import pkg from "./package.json";

export default {
  input: "lib/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    }
  ],

  plugins: [resolve(), commonjs(), typescriptPlugin({ typescript }), terser()]
};
