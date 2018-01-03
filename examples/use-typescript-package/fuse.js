const { FuseBox, WebIndexPlugin, QuantumPlugin } = require("fuse-box");
const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js",
    target: "browser@esnext",
    cache : false,
    plugins: [
        WebIndexPlugin(),
        true && QuantumPlugin({
            ensureES5 : false,
            treeshake: true,
            uglify: false
        })
    ]
});
fuse.dev();

fuse.bundle("app")
    .watch()
    .hmr()
    .instructions(" > index.ts");
fuse.run();