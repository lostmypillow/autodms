import * as esbuild from 'esbuild'

const sharedConfig = {
    bundle: true,
    minify: true,
    entryPoints: ['src/index.mjs'],
}
await esbuild.build({
    ...sharedConfig,
  platform: 'node',
  outfile: 'dist/index.js',
})

