const { FuseBox, Sparky, WebIndexPlugin, QuantumPlugin } = require("fuse-box");
const { src, task, watch, context } = require("fuse-box/sparky");


task("copy:test-file", () =>
    src("target.txt").dest("dist/$name").exec())

task("default", ["copy:test-file"], async context => {
    const fuse = context.config();
    fuse.dev();
    context.bundle(fuse);
    await fuse.run();
});

task("dist", ["copy:test-file"], async context => {
    context.isProduction = true;
    const fuse = context.config();
    fuse.dev();
    context.bundle(fuse);
    await fuse.run();
});

context(class {
    bundle(fuse) {
        const app = fuse.bundle("app");
        if (!this.isProduction) {
            app.watch()
            app.hmr()
        }
        app.instructions(">index.ts");
        return app;
    }
    config() {
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
});