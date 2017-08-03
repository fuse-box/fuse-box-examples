declare const FuseBox: any;
const someFileLink = require("./hello.txt");
console.log(someFileLink);
const doSomethingImportant = () => {
    if (FuseBox.isServer) {
        return require("react")
    }

    if (FuseBox.isBrowser) {
        return {}
    }
}
console.log(doSomethingImportant());