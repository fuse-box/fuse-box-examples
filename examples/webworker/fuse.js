const { FuseBox, Sparky, QuantumPlugin, WebIndexPlugin } = require("fuse-box");
const { src, task, watch, context, fuse } = require("fuse-box/sparky");

context(class {
    getConfig(){
        const fuse =  FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            plugins: [
                WebIndexPlugin(),
                this.isProduction && QuantumPlugin({ bakeApiIntoBundle: "app" })
            ]
        });
        fuse.dev();
        const app = fuse.bundle("app")
            .instructions("> index.ts");
        if (!this.isProduction) {
            app.watch().hmr()
        }
        return fuse;
    }

    async runWorker(){
        const worker = FuseBox.init({
            homeDir: "src/worker",
            output: "dist/$name.js",
            sourceMaps: !this.isProduction,
            plugins: [
                this.isProduction && QuantumPlugin({
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
        if (!this.isProduction) {
            workerBundle.watch()
        }
        await worker.run();
    }
});
task("default", async context => {
    context.runWorker();
    const fuse = context.getConfig();
    await fuse.run();
});

task("dist", async context => {
    context.isProduction = true;
    context.runWorker();
    const fuse = context.getConfig();
    await fuse.run();
})

