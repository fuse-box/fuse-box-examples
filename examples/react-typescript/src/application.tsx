import * as React from "react";
import * as ReactDOM from "react-dom";
import { HelloWorld } from "./components/HelloWorld";
import "./styles/main.scss";

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
    // our app
    ReactDOM.render(
        <div className="test">
            <HelloWorld />
        </div>
        ,
        document.querySelector(element) as HTMLElement
    );
};
