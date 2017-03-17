import * as express from "express";
import * as path from "path";
const app = express();


app.use("/", express.static(path.resolve("./src/server/public")));
app.use("/static", express.static(path.resolve("./dist/client")));


app.listen(3000, function () {
    console.log("Powered by FuseBox");
    console.log('Example app listening on port 3000!')
});