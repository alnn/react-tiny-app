import React from 'react';
import { Col } from 'react-bootstrap';
import Entity from 'containers/Entity';

class SideBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Col xs={4} md={2}>
        <Entity />
      </Col>
    );
  }
}

export default SideBar;
