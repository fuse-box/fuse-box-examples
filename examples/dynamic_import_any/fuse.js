const { FuseBox, Sparky, WebIndexPlugin, QuantumPlugin } = require("fuse-box");
const { src, task, watch, context, fuse } = require("fuse-box/sparky");

context({
    createBundle(){
        const app = this.fuse.bundle("app");
        if (!this.isProduction) {
            app.watch()
            app.hmr()
        }
        app.instructions(">index.ts");
        return app;
    }
});

fuse(context => ({
    homeDir: "src",
    output: "dist/$name.js",
    hash: context.isProduction,
    plugins: [
        WebIndexPlugin(),
        context.isProduction && QuantumPlugin({
            target: "universal",
            bakeApiIntoBundle: "app",
            uglify: true,
            extendServerImport: true
        })
    ]
}))


task("copy:test-file", () =>
    src("target.txt").dest("dist/$name").exec())

task("default", ["copy:test-file"], async context => {
    context.fuse.dev();
    context.createBundle();
    await context.fuse.run();
});

task("dist", ["copy:test-file"], async context => {
    context.isProduction = true;
    context.fuse.dev();
    context.createBundle();
    await context.fuse.run();
});