import * as React from "react";
import { Component } from 'react';

export default class ContactComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Contact</h1>
                <p className="lead">Quisque vulputate, massa id dictum tristique, elit felis ultricies ex, et dictum augue lorem iaculis velit. Pellentesque vitae sapien bibendum, scelerisque eros feugiat, egestas augue. Pellentesque et ex ut libero tincidunt ultrices et ac nisl. In eu lectus accumsan, accumsan magna ac, semper sapien. Nulla dapibus mattis lacus non ultrices. Vivamus in enim vel justo posuere porta eget vel leo. Suspendisse diam augue, laoreet in turpis semper, lacinia fermentum turpis. Sed condimentum laoreet leo. Morbi finibus sit amet orci et pharetra.</p>
                <p><a className="btn btn-lg btn-success" href="#" role="button">Sign up today</a></p>
            </div>
        );
    }
}

