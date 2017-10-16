if ( process.env.FOO === "bar"){
    console.log("Yes, foo equals bar");
    var a = function(){}
    a();
} else {
    console.log("No foo is not bar");
}


if ( process.env.FOO === 'hello'){
    require("./hello")
    console.log("foo is hello");
} 

if ( process.env.FOO === 'world'){
    console.log("foo is world");
} 