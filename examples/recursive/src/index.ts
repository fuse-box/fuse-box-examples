const { FuseBox } = require("fuse-box");

const dynamics = FuseBox.init({
    homeDir: "module",
    output: "dist/module/$name.js",
		sourceMaps: true,
		cache: false,
		package: 'module'
});

export function feedBack(x: string) {
	console.log(`Module feedback: ${x}`);
}

function dyanmicImport(letter) {
	dynamics.bundle(`module-${letter}`)
		.watch()
		//"removes the loader API from a bundle" arithmetic `!` can NOT be used:
		// The loader is needed not to fall back on global FuseBox that is the main package
		.instructions(`> [mod-${letter}.ts]`)
		.completed(proc=> {
			proc.require();
		});
}

dyanmicImport('a');

dynamics.run();

/*
If this file is modified while the example is running, the console displays :
`Bundle app doesn't export a close() function and no close was given` - Because we didn't define any closing method; This is just a warning
```
Module feedback: Closing module A
Module feedback: Starting module A
```
As this main bundle was restarted, the module-a was restarted too
*/