declare const FuseBox: any;

const hello = require("hello");

console.log("");
console.log("I am so nicely executed on server!!!");
// this are bundles because register instructions say so
const htmlFiles = FuseBox.import("hello/*.html");
console.log(htmlFiles);