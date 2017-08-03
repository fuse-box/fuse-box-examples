const { FuseBox, Sparky, WebIndexPlugin, QuantumPlugin, CopyPlugin } = require("fuse-box");
const path = require("path");
let fuse, app, isProduction;
let serverTarget = true;

Sparky.task("config", () => {

    const output = serverTarget ? "dist/server/$name.js" : "dist/browser/$name.js";
    fuse = FuseBox.init({
        experimentalFeatures: true,
        homeDir: "src",
        output: output,
        hash: true,
        plugins: [
            WebIndexPlugin(),
            CopyPlugin({
                files: ["*.txt"],

            }),
            QuantumPlugin({
                bakeApiIntoBundle: "app",
                target: serverTarget ? "server" : "browser",
                uglify: true
            })
        ]
    });
    app = fuse.bundle("app")
        .hmr()
        .instructions(">[index.ts]")
});

Sparky.task("clean", () => {
    return Sparky.src("dist/").clean("dist/");
});

Sparky.task("bundle", ["config"], () => fuse.run());

Sparky.task("default", ["clean", "config"], () => {
    return Sparky.start("bundle").then(() => {
        serverTarget = false;
        return Sparky.start("bundle");
    });
});