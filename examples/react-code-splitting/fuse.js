const { Sparky, FuseBox, UglifyJSPlugin, CSSPlugin } = require("fuse-box");

let producer;

// main task
Sparky.task("default", ["clean", "build", "make-html"], () => {});

// wipe it all
Sparky.task("clean", () => Sparky.src("dist/*").clean("dist/*"));

// copy and replace HTML
Sparky.task("make-html", () => {
    return Sparky.src("src/index.html")
        .file("*", file => {
            let fname;
            const vendor = producer.bundles.get("vendor");
            const app = producer.bundles.get("app");
            // get generated bundle names
            file.template({
                vendor: vendor.context.output.lastGeneratedFileName,
                app: app.context.output.lastGeneratedFileName,
            });
        })
        .dest("dist/$name")
});

Sparky.task("build", ["prepare"], () => {
    const fuse = FuseBox.init({
        homeDir: "src",
        output: "dist/$name.js",
        plugins: [
            CSSPlugin()
        ]
    });
    fuse.dev();


    // extract dependencies automatically
    fuse.bundle("vendor")
        .hmr() // hmr related code
        .instructions(`~ **/**.{ts,tsx}`)

    fuse.bundle("app")
        .hmr()
        .watch()
        .splitConfig({ browser: "bundles/", dest: "bundles/" })
        .split("routes/about/**", "about > routes/about/AboutComponent.tsx")
        .split("routes/contact/**", "contact > routes/contact/ContactComponent.tsx")
        .split("routes/home/**", "home > routes/home/HomeComponent.tsx")
        // bundle the entry point without deps
        // bundle routes for lazy loading as there is not require statement in or entry point
        .instructions(`> [app.tsx] + [routes/**/**.{ts, tsx}]`)

    return fuse.run().then((fuseProducer) => {
        producer = fuseProducer;
    });
});