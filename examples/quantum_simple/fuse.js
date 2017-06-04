const { FuseBox, QuantumPlugin, WebIndexPlugin } = require("fuse-box");
const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js",
    plugins: [
        WebIndexPlugin(),
        QuantumPlugin({
            uglify: true
        })
    ]
});
fuse.dev();
fuse.bundle("app")
    .instructions(`>index.ts`);

fuse.run();