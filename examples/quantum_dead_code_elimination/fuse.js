const { FuseBox, Sparky, WebIndexPlugin, QuantumPlugin } = require("fuse-box");

const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js",
    plugins: [
        WebIndexPlugin(),
        QuantumPlugin({
            treeshake : true,
            uglify: false
        })
    ]
});
app = fuse.bundle("app")
    .instructions(">index.ts")
fuse.run()

// Foo=hello node fuse
// Foo=world node fuse
// Foo=bar node fuse