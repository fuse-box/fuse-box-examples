import styled from 'styled-components';

export const StyledButton = styled.button`
  border: none;
  appearance: none;
  cursor: pointer;
  color: tomato;
  background-color: green;

  &:disabled {
    cursor: default;
  }
`;
