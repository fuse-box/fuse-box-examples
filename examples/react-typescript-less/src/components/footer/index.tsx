import * as React from "react";
import {Component} from "react";
import "./style.less";

/**
 * @class Footer
 */
export default class Footer extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <footer className="widget-footer">
                <a href="#">online privacy policy</a> |&nbsp;
                <a href="#">byteshift web design</a> |&nbsp;
                <a href="#">info on lorem ipsum</a> |&nbsp;
                <a href="#">Free discount codes at Plusvouchercode.co.uk</a>
                <div className="error-less" >The Less <strong>footer</strong> module is not initialize!</div>
            </footer>
        );
    }

}