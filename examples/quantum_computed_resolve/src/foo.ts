export function Foo() {

}


export function getHTMLContents(name: string) {
    return require("./views/" + name + ".html");
}