const { FuseBox, Sparky, WebIndexPlugin, SassPlugin, CSSPlugin, QuantumPlugin } = require("fuse-box");
const { src, task, watch, context, fuse } = require("fuse-box/sparky");


context(class {
    getConfig() {
        return FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            target : "browser@es5",
            hash: this.isProduction,
            plugins: [
                WebIndexPlugin({path : "."}),
                this.isProduction && QuantumPlugin({
                    bakeApiIntoBundle: "app",
                    uglify: false,
                    extendServerImport: true
                }),
                [
                    SassPlugin({
                        outputStyle: 'compressed',
                        sourceMap: `bundle-static.css.map`,
                        outFile: ''
                    }),
                    CSSPlugin({
                        inject: file => `/bundle-static.css`,
                        outFile: file => `./dist/bundle-static.css`
                    })
                ]
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

task("default", ["clean"], async context => {
    const fuse = context.getConfig();
    fuse.dev();
    context.createBundle(fuse);
    await fuse.run();
});

task("dist", ["clean"], async context => {
    context.isProduction = true;
    const fuse = context.getConfig();
    fuse.dev(); // remove it later
    context.createBundle(fuse);
    await fuse.run();
});