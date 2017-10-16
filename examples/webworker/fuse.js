const { FuseBox, Sparky, QuantumPlugin, WebIndexPlugin } = require("fuse-box");

let isProduction = false;
let fuse;

Sparky.task("worker", () => {
    // workers should live in a separate production by design
    const worker = FuseBox.init({
        homeDir: "src/worker",
        output: "dist/$name.js",
        sourceMaps: !isProduction,
        plugins: [
            isProduction && QuantumPlugin({
                // these options are essentials
                // it should be an isolated 1 bundle
                containedAPI: true,
                bakeApiIntoBundle: "worker"
            })
        ]
    });
    // workers can't have HMR
    // should contain only 1 bundle (no vendors allowed)
    // Cannot contain CSS Related plugins
    const workerBundle = worker.bundle("worker")
        .instructions("> index.ts");
    if (!isProduction) {
        workerBundle.watch()
    }
    return worker.run();
});

Sparky.task("config", () => {
    fuse = FuseBox.init({
        homeDir: "src",
        output: "dist/$name.js",
        plugins: [
            WebIndexPlugin(),
            isProduction && QuantumPlugin({ bakeApiIntoBundle: "app" })
        ]
    });
    //if (!isProduction) { // uncomment for real production builds
    fuse.dev();
    //}


    const app = fuse.bundle("app")
        .instructions("> index.ts")

    if (!isProduction) {
        app.watch().hmr()
    }

})

Sparky.task("set-prod", () => { isProduction = true })
Sparky.task("dist", ["set-prod", "config", "worker"], () => {
    return fuse.run();
});


Sparky.task("default", ["config", "worker"], () => {
    return fuse.run();
});