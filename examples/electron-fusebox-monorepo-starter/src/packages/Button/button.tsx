import * as React from 'react';

import { StyledButton } from './style';

interface Props extends React.HTMLProps<HTMLButtonElement> {
}
interface State {
}

class Button extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    };
  }

  public render(): JSX.Element {
    const {ref, ...props} = this.props;
    return (
      <StyledButton
        innerRef={typeof ref === "function" ? ref : () => {}}
        {...props}>
        {this.props.children}
      </StyledButton>
    );
  }
}

export {Button as default, Button};
