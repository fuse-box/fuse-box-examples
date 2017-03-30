import * as React from "react";
import { Component } from 'react';

export default class AboutComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>About page contents</h1>
                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi scelerisque in elit vitae viverra. Curabitur facilisis dolor sem, eu venenatis nulla fermentum ac. Aenean congue nulla sed metus pulvinar, eu fringilla augue pulvinar. Quisque rhoncus lectus ac auctor lobortis. Quisque efficitur molestie mauris, non ornare leo placerat id. Integer ultricies libero in fermentum fermentum. Donec pharetra quis felis nec accumsan. Praesent mollis nisi ipsum, vel semper ante lacinia ut. Duis vestibulum tristique mattis. Phasellus ornare orci ac quam vestibulum, sed dignissim magna vehicula. Etiam a odio sit amet nulla convallis consectetur. Aenean vel semper ex, et efficitur tortor. Curabitur dui urna, fringilla eget porttitor nec, consectetur sed metus.</p>
                <p><a className="btn btn-lg btn-success" href="#" role="button">Sign up today</a></p>
            </div>
        );
    }
}

