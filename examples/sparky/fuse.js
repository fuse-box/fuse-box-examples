const { src, task, context } = require("fuse-box/sparky");
const { FuseBox, QuantumPlugin } = require("fuse-box")

task("default", async context => {
    await context.cleanDist()
    await context.execute();
    const fuse = context.getConfig();
    context.createBundle(fuse);
    await fuse.run();
});

task("dist", async context => {
    await context.cleanDist()
    await context.execute();
    context.isProduction = true;
    const fuse = context.getConfig();
    context.createBundle(fuse);
    await fuse.run();
});

context(class {
    getConfig() {
        return FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            plugins: [
                this.isProduction && QuantumPlugin({
                    bakeApiIntoBundle: "app"
                })
            ]
        })
    }

    createBundle(fuse) {
        const bundle = fuse.bundle("app")
            .instructions(">index.ts");
        if (!this.isProduction) {
            bundle.watch().hmr();
        }
        return bundle;
    }

    async cleanDist() {
        await src("dist/").clean("dist/").exec();
    }
    async moveTextFiles() {
        await src("stuff/**/**.txt").dest("dist/").exec();
    }
    async moveJSONFiles() {
        await src("stuff/**/**.json").dest("dist/").exec();
    }
    async execute() {
        await this.moveJSONFiles();
        await this.moveTextFiles();
    }
});



