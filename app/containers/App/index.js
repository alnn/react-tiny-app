/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import styled from 'styled-components';
import SideBar from 'components/SideBar';

const Wrapper = styled.div`
  margin-top: 10px;
`;

export function App(props) {
  return (
    <Grid>
      <Wrapper>
        <Row>
          <SideBar />
          {React.Children.toArray(props.children)}
        </Row>
      </Wrapper>
    </Grid>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
