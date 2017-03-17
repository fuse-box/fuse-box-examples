const { FuseBox, HTMLPlugin } = require("fsbx");

const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js",
});

fuse.bundle("vendor")
    .watch() // Watching (to add dependencies) it's damn fast anyway
    .hmr() // first bundle will get HMR related code injected
    .instructions(" ~ index.ts") // nothing has changed here

fuse.bundle("app")
    .watch()
    .hmr() // enable hmr on this bundle
    .instructions(" !> [index.ts]") // bundle without deps (we have a vendor for that) + without the api

fuse.dev({ port: 4445 });
fuse.run();