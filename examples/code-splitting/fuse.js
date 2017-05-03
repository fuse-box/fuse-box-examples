const { Sparky, FuseBox, UglifyJSPlugin, WebIndexPlugin } = require("fuse-box");



const fuse = FuseBox.init({
    homeDir: "src",
    plugins: [WebIndexPlugin()],
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