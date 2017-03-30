import * as React from "react";
import { Component } from 'react';

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Home page</h1>
                <p className="lead">Nullam mattis convallis nisi, id porttitor nibh tempus sit amet. Quisque congue magna sed tortor luctus finibus. Etiam sed molestie augue. Cras quam enim, faucibus vel sem vitae, vestibulum dignissim dui. Vivamus sapien nibh, bibendum nec lacus nec, fringilla bibendum metus. Duis laoreet interdum leo in vehicula. Fusce sem felis, convallis eu suscipit vel, tristique non eros. Aliquam dolor odio, viverra vel aliquet in, maximus ut nibh. Phasellus venenatis efficitur laoreet. Donec ac lorem nisi. Phasellus lectus mi, congue non erat quis, pellentesque sagittis risus. Etiam id nulla ultricies, aliquet ligula vitae, volutpat nibh. Aliquam ac ullamcorper nisl, et laoreet lectus.</p>
                <p><a className="btn btn-lg btn-success" href="#" role="button">Sign up today</a></p>
            </div>
        );
    }
}

