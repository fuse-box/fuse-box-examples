const {FuseBox, WebIndexPlugin} = require("fuse-box");
const fuse = FuseBox.init({
    homeDir : "src",
    target : "browser@es5",
    useTypescriptCompiler : true,
    output : "dist/$name.js",
    plugins : [
        WebIndexPlugin()
    ]
});
fuse.dev();
fuse.bundle("app").instructions(">index.js")
fuse.run();