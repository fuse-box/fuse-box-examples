const { FuseBox, Sparky, WebIndexPlugin, QuantumPlugin } = require("fuse-box");
const { src, task, watch, context, fuse } = require("fuse-box/sparky");


context(class {
    getConfig() {
        return FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            hash: this.isProduction,
            plugins: [
                WebIndexPlugin(),
                this.isProduction && QuantumPlugin({
                    target: "universal",
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

task("copy:test-file", () =>
    src("target.css").dest("dist/$name").exec())

task("default", ["copy:test-file"], async context => {
    const fuse = context.getConfig();
    fuse.dev();
    context.createBundle(fuse);
    await fuse.run();
});

task("dist", ["copy:test-file"], async context => {
    context.isProduction = true;
    const fuse = context.getConfig();
    fuse.dev(); // remove it later
    context.createBundle(fuse);
    await fuse.run();
});