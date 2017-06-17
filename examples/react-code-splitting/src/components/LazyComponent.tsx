import * as React from "react";
import { Component } from 'react';
import { lazyLoad } from "fuse-tools";

export default class LazyComponent extends Component {
    private state: any;
    private setState: any;
    private props: any;
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps: any) {
        let name = nextProps.bundle;
        if (name) {
            this.lazyLoad(name);
        }
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    renderLazyComponent() {
        if (this.state.LazyComponent) {
            const MyComponent = this.state.LazyComponent;
            return (
                <MyComponent />
            )
        }
    }

    async lazyLoad(name) {
        let target;
        if (name === "about") {
            target = await import("../routes/about/AboutComponent");
        }
        if (name === "home") {
            target = await import("../routes/home/HomeComponent");
        }
        if (name === "contact") {
            target = await import("../routes/contact/ContactComponent");
        }
        this.setState({ LazyComponent: target.default });
    }
    render() {

        return (
            <div>{this.renderLazyComponent()}</div>
        );
    }
}

