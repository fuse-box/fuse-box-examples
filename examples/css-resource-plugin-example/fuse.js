const {
    FuseBox,
    Sparky,
    SassPlugin,
    WebIndexPlugin,
    CSSPlugin,
    CSSResourcePlugin,
    QuantumPlugin
} = require("fuse-box");
const { src, task, watch, context, fuse } = require("fuse-box/sparky");


context(class {
    getConfig() {
        return FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            hash: this.isProduction,
            sourceMaps: true,
            target: "browser",
            plugins: [
                WebIndexPlugin({
                    template: "src/index.html"
                }),
                [
                    SassPlugin(),
                    CSSResourcePlugin({
                        dist: "dist/css-resources"
                    }), CSSPlugin()
                ],
                this.isProduction && QuantumPlugin({
                    bakeApiIntoBundle: "app",
                    uglify: true,
                    css : { clean : true},
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


task("default", async context => {
    const fuse = context.getConfig();
    fuse.dev();
    context.createBundle(fuse);
    await fuse.run();
});

task("dist", async context => {
    context.isProduction = true;
    const fuse = context.getConfig();
    fuse.dev(); // remove it later
    context.createBundle(fuse);
    await fuse.run();
});