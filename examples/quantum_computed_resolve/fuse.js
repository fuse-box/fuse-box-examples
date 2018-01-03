const { FuseBox, Sparky, WebIndexPlugin, HTMLPlugin, QuantumPlugin } = require("fuse-box");
const { src, task, watch, context, fuse } = require("fuse-box/sparky");


context(class {
    getConfig() {
        return FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            target: "browser@es5",
            hash: this.isProduction,
            plugins: [
                WebIndexPlugin({ path: "." }),
                HTMLPlugin(),
                this.isProduction && QuantumPlugin({
                    //uglify: true,
                    api: (core) => {
                        core.solveComputed("moment/moment.js", {
                            mapping: "moment/locale**",
                            fn: statement => {
                                statement.setExpression(`"moment/locale/" + name + ".js"`)
                            }
                        });

                        core.solveComputed("default/foo.js", {
                            mapping: "views/*.html",
                            fn: (statement, core) =>
                                statement.setExpression(`"default/views/" + name + ".html"`)
                        });
                    }
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
        app.instructions(">index.ts +views/**/*.html");
        return app;
    }
});

task("clean", () => src("dist").clean("dist").exec())

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