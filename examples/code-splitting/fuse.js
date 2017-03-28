const { Sparky, FuseBox, UglifyJSPlugin } = require("fuse-box");

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
            producer.bundles.forEach(bundle => {
                fname = bundle.context.output.lastGeneratedFileName;
            })
            file.template({
                mainApp: fname
            });
        })
        .dest("dist/$name")
});

Sparky.task("build", ["prepare"], () => {
    const fuse = FuseBox.init({
        homeDir: "src",
        cache: true,
        hash: true,
        //plugins: [UglifyJSPlugin()],
        output: "dist/$name.js"
    });
    fuse.dev();

    fuse.bundle("app")
        .hmr()
        .watch()
        .split("routes/home/**", "home > routes/home/HomeComponent.ts")
        .split("routes/about/**", "about > routes/about/AboutComponent.ts")
        .instructions("> index.ts **/**.ts")

    return fuse.run().then((fuseProducer) => {
        producer = fuseProducer;
    });
});