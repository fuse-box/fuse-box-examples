const { FuseBox, Sparky, WebIndexPlugin, QuantumPlugin } = require("fuse-box");
const { src, task, watch, context, fuse } = require("fuse-box/sparky");


context(class {
    getConfig() {
        return FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            target: "browser@es5",
            hash: this.isProduction,
            plugins: [
                WebIndexPlugin(),
                this.isProduction && QuantumPlugin({
                    bakeApiIntoBundle: "app",
                    uglify: true,
                    extendServerImport: true
                })
            ]
        })
    }
    createBundle(fuse) {
        const app = fuse.bundle("app");
        if (!this.isProduction) {
            app.watch()
            app.hmr()
        }
        app.instructions(">index.ts");
        return app;
    }
});
task("clean", () => src("dist").clean("dist").exec() )

task("launch-server", async context => {
    const server = FuseBox.init({ target: "server", homeDir: "server", output: "dist/server/$name.js" })
    server.bundle("server")
        .completed(proc => proc.start())
        .instructions(">[server.ts]").watch()
    await server.run();
});

task("default", ["clean", "launch-server"], async context => {
    const fuse = context.getConfig();
    fuse.dev({ httpServer: false });
    context.createBundle(fuse);
    await fuse.run();
});

task("dist", ["clean", "launch-server"], async context => {
    context.isProduction = true;
    const fuse = context.getConfig();
    fuse.dev(); // remove it later
    context.createBundle(fuse);
    await fuse.run();
});