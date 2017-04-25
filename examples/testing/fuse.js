const { Sparky, FuseBox } = require("fuse-box");
const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js",
});


Sparky.task("default", () => {
    fuse.bundle("app")
        .instructions(`>index.ts`);
    fuse.run();
});

Sparky.task("test", () =>
    fuse.bundle("app")
    .test("[**/**.test.ts]")
);