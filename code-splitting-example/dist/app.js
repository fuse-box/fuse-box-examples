(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module, __filename, __dirname){

"use strict";
exports.__esModule = true;
var path = require("path");
// reset body for HMR
document.body.innerHTML = "";
var h1 = document.createElement("h1");
h1.innerHTML = "Some stuff here" + path.join("a", "b", "c");
document.body.appendChild(h1);

});
});

FuseBox.import("default/index.js");
FuseBox.main("default/index.js");
})
(FuseBox)