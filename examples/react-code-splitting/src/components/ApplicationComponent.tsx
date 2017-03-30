import * as React from "react";
import { Component } from 'react';
import { lazyLoad } from "fuse-tools";
import MenuComponent from "./MenuComponent";

export default class ApplicationComponent extends Component {
    private state: any;
    private setState: any;
    constructor(props) {
        super(props);
        this.state = {};
    }

    public display() {
        if (this.state.LazyComponent) {
            const LazyComponent = this.state.LazyComponent;
            return (
                <LazyComponent />
            )
        }
    }

    render() {
        return (
            <div>
                <MenuComponent onLazyComponent={
                    LazyComponent => this.setState({ LazyComponent })
                } />
                <div className="jumbotron">{this.display()}</div>
            </div >
        );
    }
}