const {
    FuseBox,
    Sparky,
    SassPlugin,
    CSSPlugin,
    WebIndexPlugin
} = require('fuse-box');

const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js",
    sourceMaps: {
        inline: false,
        sourceRoot: "/src"
    },
    plugins: [
        [
            SassPlugin({
                outputStyle: 'compressed',
                sourceMap: `bundle-static.css.map`,
                outFile: ''
            }),
            CSSPlugin({
                inject: file => `/dist/bundle-static.css`,
                outFile: file => `./dist/bundle-static.css`
            })
        ],
        WebIndexPlugin({
            path: '.'
        })
    ]
});

Sparky.task("watch", () => {
    const bundle = fuse.bundle(`bundle-static`)
        .target('browser')
        .instructions(`> index.ts`)
        .watch()
        .hmr();

    fuse.dev({
        root: './',
        // open: '/dist' // would be nice to choose a path to open // for now open http://localhost:4444/dist/ manually
    });
    fuse
        .run();
});

Sparky.task("default", ["watch"], () => {});