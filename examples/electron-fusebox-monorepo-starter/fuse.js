const {FuseBox,Sparky, SassPlugin, CSSPlugin, CSSResourcePlugin, WebIndexPlugin, RawPlugin, CopyPlugin} = require("fuse-box");
const {spawn} = require("child_process");
var execa = require('execa')

const isDev = process.env.NODE_ENV !== "production";


const ASSETS = ["*.jpg", "*.png", "*.jpeg", "*.gif", "*.svg"]


Sparky.task("copy-html", () => {
  return Sparky.src("./**/*.html", {base: "./src/project/app"}).dest("./dist/app/");
});

Sparky.task("default", ["copy-html"], () => {
  const fuse = FuseBox.init({
    homeDir: "src",
    automaticAlias: true,
    sourcemaps: true,
    useTypescriptCompiler: true,
    allowSyntheticDefaultImports: true,
    output: "dist/$name.js",
    plugins: [
         [SassPlugin({import: true}), CSSResourcePlugin(), CSSPlugin()],
         CSSPlugin(),
    ],
    alias : {
   "@coglite" : "~/packages"
  }
  });

  if (isDev) {
    fuse.dev({port: 8085, httpServer: false});

    fuse.bundle("desktop/main")
      .target("electron")
      .instructions(" > [project/desktop/main.ts]")
      .watch();

    fuse.bundle("app/app")
      .target("electron")
      .instructions(" > [project/app/app.tsx] +fuse-box-css")
      .watch().hmr()
      .plugin(CopyPlugin({ useDefault: false, files: ASSETS, dest: "app/assets", resolve: "assets/" }));

  
    return fuse.run().then(() => {
      const child = execa("node", [`${ __dirname }/node_modules/electron/cli.js`, __dirname ], { stdio: "inherit" })
      .on("close", () => {process.exit()})
      .on('data', function (data) {console.log("electron > " + data)});
    });
  } 
  
  //------------------prod config here..needs some work but doesnt matter atm-----------------------//
  else {
    fuse.bundle("desktop/main")
      .target("electron")
      .instructions(" > [desktop/main.ts]");

    fuse.bundle("app/app")
      .target("electron")
      .instructions(" > app/app.tsx");

    return fuse.run();
  }

});
