const { FuseBox, QuantumPlugin, WebIndexPlugin, HTMLPlugin, UglifyJSPlugin } = require("fuse-box");
const isProduction = true;
const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js",
    plugins: [
        WebIndexPlugin(),
        HTMLPlugin(),
        isProduction && QuantumPlugin({
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
});

fuse.dev();
fuse.bundle("app")
    .instructions(`>index.ts +views/**/*.html`);

fuse.run();