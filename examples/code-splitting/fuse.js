const { Sparky, FuseBox, UglifyJSPlugin } = require("fuse-box");


Sparky.task("prepare", () => {
    return Sparky.src("src/index.html")
        //.clean("dist/")
        .dest("dist/$name")
})


Sparky.task("default", ["prepare"], () => {
    const fuse = FuseBox.init({
        homeDir: "src",
        cache: true,
        //hash: true,
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

    return fuse.run();
});