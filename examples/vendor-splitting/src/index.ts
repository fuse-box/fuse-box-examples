import * as path from "path";
// reset body for HMR
document.body.innerHTML = "";

const h1 = document.createElement("h1")
h1.innerHTML = "Some stuff here" + path.join("a", "b", "c")
document.body.appendChild(h1);

