const { FuseBox, HTMLPlugin, WebIndexPlugin } = require("fuse-box");

const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js"
});

fuse.dev({ port: 4445, httpServer: false });

fuse.bundle("server/bundle")
    .watch("server/**") // watch only server related code.. bugs up atm
    .instructions(" > [server/index.ts]")
    // Execute process right after bundling is completed
    // launch and restart express
    .completed(proc => proc.start())


fuse.bundle("client/app")
    .watch("client/**") // watch only client related code
    .hmr()
    .instructions(" > client/index.ts");

fuse.run();