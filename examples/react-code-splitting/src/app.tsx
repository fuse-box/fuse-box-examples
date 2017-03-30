import * as React from "react";
import * as ReactDOM from "react-dom";
import { lazyLoad } from "fuse-tools";
import ApplicationComponent from "./components/ApplicationComponent";

require("./styles/main.css")
ReactDOM.render(
    <div>
        <ApplicationComponent />
    </div>
    ,
    document.querySelector("#demo-app")
);

