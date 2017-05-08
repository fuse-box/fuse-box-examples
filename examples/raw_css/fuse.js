const { FuseBox, WebIndexPlugin, SassPlugin, RawPlugin } = require("fuse-box");
const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js",
    plugins: [
        WebIndexPlugin(), [
            SassPlugin(), RawPlugin()
        ]

    ]
});

fuse.dev();

fuse.bundle("app")
    .instructions(`>index.ts`);

fuse.run();