const { FuseBox, Sparky, WebIndexPlugin, CSSPlugin, QuantumPlugin } = require("fuse-box");
const { src, task, watch, context, fuse } = require("fuse-box/sparky");
const express = require("express");
const path = require("path");

context(class {
    getConfig() {
        return FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            hash: this.isProduction,
            target: "browser@es5",
            plugins: [
                WebIndexPlugin({
                    title: "React Code Splitting demo",
                    template: "src/index.html",
                    //path: "/static/"
                }),
                CSSPlugin(),
                this.isProduction && QuantumPlugin({
                    bakeApiIntoBundle: "static/app",
                    uglify: false,
                    extendServerImport: true
                })
            ]
        })
    }
    createBundle(fuse) {
        const app = fuse.bundle("static/app");
        app.splitConfig({ dest: "static" })
        if (!this.isProduction) {
            app.watch()
            app.hmr()
        }
        app.instructions(">app.tsx");
        return app;
    }

    enableServer(fuse) {
        fuse.dev({ root: false }, server => {
            const dist = path.join(__dirname, "dist");
            const app = server.httpServer.app;
            app.use("/static/", express.static(path.join(dist, 'static')));
            app.get("*", function(req, res) {
                res.sendFile(path.join(dist, "index.html"));
            });
        });
    }
});


task("clean", () => src("dist").clean("dist").exec());

task("default", ["clean"], async context => {
    const fuse = context.getConfig();
    context.enableServer(fuse);

    context.createBundle(fuse);
    await fuse.run();
});

task("dist", ["clean"], async context => {
    context.isProduction = true;
    const fuse = context.getConfig();
    context.enableServer(fuse);
    //fuse.dev(); // remove it later
    context.createBundle(fuse);
    await fuse.run();
});