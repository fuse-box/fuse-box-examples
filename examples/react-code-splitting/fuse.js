const { Sparky, FuseBox, UglifyJSPlugin, TypeScriptHelpers, WebIndexPlugin, CSSPlugin, EnvPlugin } = require("fuse-box");
const express = require("express");
const path = require("path");
let producer;
let production = false;

Sparky.task("build", ["prepare"], () => {
    const fuse = FuseBox.init({
        homeDir: "src",
        output: "dist/static/$name.js",
        hash: production,
        cache: !production,
        plugins: [
            EnvPlugin({ NODE_ENV: production ? "production" : "development" }),
            CSSPlugin(), production && UglifyJSPlugin(),
            WebIndexPlugin({
                title: "React Code Splitting demo",
                template: "src/index.html",
                path: "/static/"
            })
        ]
    });

    if (!production) {
        // Configure development server
        fuse.dev({ root: false }, server => {
            const dist = path.join(__dirname, "dist");
            const app = server.httpServer.app;
            app.use("/static/", express.static(path.join(dist, 'static')));
            app.get("*", function(req, res) {
                res.sendFile(path.join(dist, "static/index.html"));
            });
        })

    }

    // extract dependencies automatically
    const vendor = fuse.bundle("vendor")
        .instructions(`~ **/**.{ts,tsx} +tslib`)
    if (!production) { vendor.hmr(); }

    const app = fuse.bundle("app")
        // Code splitting ****************************************************************
        .splitConfig({ browser: "/static/bundles/", dest: "bundles/" })
        .split("routes/about/**", "about > routes/about/AboutComponent.tsx")
        .split("routes/contact/**", "contact > routes/contact/ContactComponent.tsx")
        .split("routes/home/**", "home > routes/home/HomeComponent.tsx")
        // bundle the entry point without deps
        // bundle routes for lazy loading as there is not require statement in or entry point
        .instructions(`> [app.tsx] + [routes/**/**.{ts, tsx}]`)

    if (!production) { app.hmr().watch() }

    return fuse.run().then((fuseProducer) => {
        producer = fuseProducer;
    });
});

// main task
Sparky.task("default", ["clean", "build"], () => {});

// wipe it all
Sparky.task("clean", () => Sparky.src("dist/*").clean("dist/"));



Sparky.task("set-production-env", () => production = true);
Sparky.task("dist", ["clean", "set-production-env", "build"], () => {})