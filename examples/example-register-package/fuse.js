const { FuseBox, HTMLPlugin } = require("fsbx");

const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js",
    plugins: [HTMLPlugin()] // required by custom hello package
});

fuse.register("hello", {
    homeDir: "packages/hello",
    main: "index.js",
    instructions: "**/**.html",
});

fuse.bundle("app")
    .watch().cache(false) // no cache, cuz we are "developing" a package
    .instructions(" > index.ts")
    .completed(proc => proc.exec()) // Execute process right after bundling is completed

fuse.run();