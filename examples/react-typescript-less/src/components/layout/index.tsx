import * as React from "react";
import {Component} from "react";
import Header from "../header";
import Main from "../main";
import Footer from "../footer";
import "./style.less";

/**
 * @class Layout
 */
export default class Layout extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className="container widget-layout">
                <Header/>
                <Main/>
                <Footer/>
                <div className="error-less" >The Less <strong>layout</strong> module is not initialize!</div>
            </div>
        );
    }

}