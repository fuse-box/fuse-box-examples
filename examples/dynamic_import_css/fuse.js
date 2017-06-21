const { FuseBox, Sparky, WebIndexPlugin, QuantumPlugin } = require("fuse-box");

let fuse, app, isProduction;

Sparky.task("copy-test-file", () => {
    return Sparky.src("target.css").dest("dist/$name");
});

Sparky.task("config", ["copy-test-file"], () => {
    fuse = FuseBox.init({
        experimentalFeatures: true,
        homeDir: "src",
        output: "dist/$name.js",
        hash: isProduction,
        plugins: [
            WebIndexPlugin(),

            isProduction && QuantumPlugin({
                target: "universal",
                bakeApiIntoBundle: "app",
                uglify: true
            })
        ]
    });
    fuse.dev();
    app = fuse.bundle("app")
        .watch()
        .hmr()
        .instructions(">index.ts")
});

Sparky.task("clean", () => {
    return Sparky.src("dist/").clean("dist/");
});

Sparky.task("default", ["clean", "config"], () => fuse.run());
Sparky.task("set-production", () => {
    isProduction = true;
});
Sparky.task("dist", ["clean", "set-production", "config"], () => {
    fuse.run()
});