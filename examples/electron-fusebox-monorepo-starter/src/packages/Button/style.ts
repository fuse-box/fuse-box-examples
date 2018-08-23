import styled from 'styled-components';

export const StyledButton = styled.button`
  border: none;
  appearance: none;
  cursor: pointer;
  color: silver;
  background-color: blue;

  &:disabled {
    cursor: default;
  }
`;
