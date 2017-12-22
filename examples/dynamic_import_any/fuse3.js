const { FuseBox, Sparky, WebIndexPlugin, QuantumPlugin } = require("fuse-box");
const {src, watch, context} = require("fuse-box/sparky");


task("copy:test-file", () =>
    src("target.txt").dest("dist/$name").exec())

task("default", ["copy:test-file"], async context => {
    const fuse = context.config();
    config.bundle(fuse);
    await fuse.run();
});

task("dist", ["copy:test-file"], async context => {
    context.isProduction = true;
    const fuse = context.config();
    config.bundle(fuse);
    await fuse.run();
});

context({
    bundle : (fuse) => {
        const app = fuse.bundle("app");
        if( this.isProduction ){
            app.watch()
            app.hmr()
        }
        app.instructions(">index.ts");
        return app;
    },
    config : FuseBox.init({
        experimentalFeatures: true,
        homeDir: "src",
        output: "dist/$name.js",
        hash: isProduction,
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
});