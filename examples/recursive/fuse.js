const { FuseBox } = require("fuse-box");

const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js",
		package: 'mainPack',
		sourceMaps: true,
		cache: false
});

fuse.bundle("app")
    .watch()
    .instructions(" > index.ts")
    .completed(proc => {
			proc.require();
		})

fuse.run();

// .vscode/launch.json :
//	"sourceMaps": true,
//	"outFiles": ["${workspaceRoot}/examples/recursive/dist/**/*.js"],	- given absolutely to help vsCode finds the sourceMaps