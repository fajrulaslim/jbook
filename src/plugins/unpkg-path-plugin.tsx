import * as esbuild from 'esbuild-wasm';
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // Handle root entry
      build.onResolve({ filter: /(^index\.js$)/ }, async() => {
        return { path: 'index.js', namespace: 'a' };
      })

      // Handle relative path module
      build.onResolve({ filter: /^\.+\// }, async(args: any) => {
        return {
            namespace: 'a',
            path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
          }
      })

      // Handle main file module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        }
      });
    },
  };
};