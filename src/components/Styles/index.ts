import styled from 'styled-components';

export const Ul = styled.ul`
  padding: 10px;
  transition: filter 0.15s ease-in-out;
  &.unfocused {
    filter: blur(1px) opacity(0.5);
  }
`;
