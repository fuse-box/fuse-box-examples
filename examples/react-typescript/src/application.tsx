import * as React from "react";
import * as ReactDOM from "react-dom";
import { HelloWorld } from "./components/HelloWorld";

declare global {
    namespace HelloSomeNameSpace {
        interface IError {
            error: string | number;
            reason?: string;
            details?: string;
        }
    }
}

/**
 * Render application into a div
 */
export const render = (element) => {
    // bootstrap
    require("https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css");
    // our app
    require("./styles/main.scss");
    ReactDOM.render(
        <div className="test">
            <HelloWorld />
        </div>
        ,
        document.querySelector(element) as HTMLElement
    );
};
