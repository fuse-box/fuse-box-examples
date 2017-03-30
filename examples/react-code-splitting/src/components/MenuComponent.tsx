import * as React from "react";
import { Component } from 'react';
import { lazyLoad } from "fuse-tools";


export default class MenuComponent extends Component {
    private state: any;
    private setState: any;
    private props: any;
    constructor(props) {
        super(props);
        this.state = {};
    }
    lazyLoad(name) {
        return lazyLoad(name).then(module => {
            if (this.props.onLazyComponent) {
                this.props.onLazyComponent(module.default)
            }
        })
    }
    render() {

        return (
            <div className="header clearfix">
                <nav>
                    <ul className="nav nav-pills pull-right">
                        <li role="presentation"><a onClick={() => this.lazyLoad("home")} href="#">Home</a></li>
                        <li role="presentation"><a onClick={() => this.lazyLoad("about")} href="#">About</a></li>
                        <li role="presentation"><a onClick={() => this.lazyLoad("contact")} href="#">Contact</a></li>
                    </ul>
                </nav>
                <h3 className="text-muted">React lazy loading</h3>
            </div>
        );
    }
}