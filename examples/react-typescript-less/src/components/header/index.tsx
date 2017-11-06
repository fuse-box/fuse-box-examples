import * as React from "react";
import {Component} from "react";
import "./style.less";

/**
 * @class Header
 */
export default class Header extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <header className="widget-header">
                <h1>react-ts-less-fuse-example</h1>
                <menu className="nav nav-pills">
                    <li role="presentation" className="active"><a href="#">Home</a></li>
                    <li role="presentation"><a href="#">Products</a></li>
                    <li role="presentation"><a href="#">Contacts</a></li>
                </menu>
                <div className="error-less" >The Less <strong>header</strong> module is not initialize!</div>
            </header>
        );
    }

}