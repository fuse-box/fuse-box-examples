import "tslib";
import * as React from "react";
import * as ReactDOM from "react-dom";
import ApplicationComponent from "./components/ApplicationComponent";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import "./styles/main.css";

ReactDOM.render(
    <div>
        <ApplicationComponent />
    </div>
    ,
    document.querySelector("#demo-app")
);

