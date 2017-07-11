declare const FuseBox: any;

const doSomethingImportant = () => {
    if (FuseBox.isServer) {
        return require("react")
    }

    if (FuseBox.isBrowser) {
        return {}
    }
}
console.log(doSomethingImportant());