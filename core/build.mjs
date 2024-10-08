import * as esbuild from "esbuild";

const sharedConfig = {
  bundle: true,
  minify: true,
  entryPoints: ["src/index.mjs"],
};
await esbuild.build({
  ...sharedConfig,
  format: 'esm',
  bundle: true,
  outfile: "dist/index.mjs",
});
