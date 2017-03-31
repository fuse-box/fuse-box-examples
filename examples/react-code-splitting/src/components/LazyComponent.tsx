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

    lazyLoad(name) {
        return lazyLoad(name).then(module => this.setState({ LazyComponent: module.default }))
    }
    render() {

        return (
            <div>{this.renderLazyComponent()}</div>
        );
    }
}

