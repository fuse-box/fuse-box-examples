const { FuseBox, Sparky, QuantumPlugin, WebIndexPlugin, LESSPlugin, CSSPlugin } = require("fuse-box");
const { merge } = require("lodash");
const path = require("path");
const LessPluginCleanCSS = require("less-plugin-clean-css");
const cleanCSSPlugin = new LessPluginCleanCSS({advanced: true});

/** -------------------------------------
 * CONFIGURATIONS
 */

// Settings
const libraryName = "react-ts-less-fuse-example";
const globalName = "reactTsLessFuseExample";

// Default fusebox configuration
const fuseConfig = {
  homeDir: "src",
  plugins: [
    // Init before for build LESS!
    WebIndexPlugin(),

    // Init LESS build
    [LESSPlugin({
        paths: [
          path.resolve(__dirname, "node_modules")
        ],
      plugins: [cleanCSSPlugin]
    }), CSSPlugin()]
  ]
};

// Quantum configuration for bundles
const quantumPluginConfig = {
  uglify: {
    compress: {
      drop_console: true
    }
  },
  treeshake: true,
  ensureES5: true,
  package: {
    name: libraryName,
    entry: "index.tsx",
  },
  globals: { default: globalName },
  bakeApiIntoBundle: `${libraryName}.min.js`
};

/** -------------------------------------
 * TASKS
 */

// Default
Sparky.task("default", ["clean", "bundle-dev", "bundle-standalone"], () => {});

// Clean
Sparky.task("clean", () => {
  return (
    Sparky.src("bundle/")
      .clean("bundle/dev/")
      .clean("bundle/standalone/")
  );
});

// Bundle the library dev with include fusebox api
Sparky.task("bundle-dev", () => {
  // Initialize with merge config
  const initConfig = merge({}, fuseConfig, {
    output: "bundle/dev/$name.js",
    plugins: [
      // Init after for build index.html!
      WebIndexPlugin({
        template: "src/index.html",
        title: "React + TypeScript + LESS example",
        target: "index.html"
      })
    ]
  });

  console.log("initConfig:", initConfig);

  const fuse = FuseBox.init(initConfig);

  // Create bundle
  fuse.bundle(`${libraryName}`)
    .target("browser")
    .instructions(`>index.tsx`)
    .watch()
    .hmr();

  // Start dev server
  fuse.dev({
    root: "bundle/dev"
  });

  // Run build
  return fuse.run();
});

// Bundle the library minimized with include fusebox api
Sparky.task("bundle-standalone", () => {
  // Initialize with merge config
  const initConfig = merge({}, fuseConfig, {
    output: "bundle/standalone/$name.js",
    plugins: [QuantumPlugin(quantumPluginConfig)]
  });

  console.log("initConfig standalone:", initConfig);
  const fuse = FuseBox.init(initConfig);

  // Create bundle
  fuse.bundle(`${libraryName}.min.js`)
    .target("browser")
    .instructions(`>index.tsx`);

  // Run build
  return fuse.run();
});

// Copy bundle standalone to test directory
Sparky.task("copy-test-file", () => {
  return Sparky.src("bundle").dest("test");
});

// Build bundle standalone and copy to test directory
Sparky.task("quantum-to-test", ["bundle-standalone", "copy-test-file"], () => {});