import 'tslib'
import 'reflect-metadata'
import { remote } from 'electron';
import * as React from 'react';
import { render } from 'react-dom';

//import Button from './components/Button';

import {Button} from '@coglite/button';


const fuseImage = require('./assets/fusebox-logo.png')
const heartImage = require('./assets/heart.png')


const main = remote.require("./main").FuseBox.main("default/project/desktop/main.js");

interface Props {
}
interface State {
  body: string;
}

class Main extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      body: "<3",
    };
  }

  render(): JSX.Element {
    const {body} = this.state;

    return (
      <div>
        <h1 style={{textAlign: 'center'}}>sample electron app</h1>
        <p>{body}</p>
        <Button onClick={this.handleClick}>button from the monorepo</Button>
        <div style={{display: 'flex'}}>
          <img style={{ margin: '20px auto', height: '100px'}} src={fuseImage} />
          <img style={{ margin: '20px auto', height: '100px'}} src={heartImage} />
        </div>
      </div>
    );
  }

  handleClick() {
    alert(main.fn());
  }
}

render(<Main />, document.getElementById("root"));
