const { FuseBox, WebIndexPlugin, SassPlugin, CSSPlugin } = require("fuse-box");
const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js",
    plugins: [
        WebIndexPlugin({ template: "src/index.html" }),

        [SassPlugin(), CSSPlugin()],
    ]
});

fuse.dev();
fuse.bundle("app").hmr().watch()
    .instructions(`>index.ts`);


fuse.run()