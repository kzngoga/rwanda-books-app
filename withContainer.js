import React from 'react';
import styled from 'styled-components';

const withContainer = (Component) => (props) => (
  <Container>
    <Component {...props} />
  </Container>
);

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  justify-content: center;
`;

export default withContainer;
