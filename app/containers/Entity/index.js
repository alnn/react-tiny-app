import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Nav, NavItem } from 'react-bootstrap';
import { makeSelectCurrentEntity } from 'containers/App/selectors';
import { selectEntity, loadEntities, loadRelatedData } from 'containers/App/actions';

const entitiesMap = {
  department: 'Department',
  employee: 'Employee',
};
const activeKey = Object.keys(entitiesMap).shift();

export class Entity extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { currentEntity } = this.props;
    const content = Object.keys(entitiesMap).map(
      (name, index) => <NavItem key={`nav-item-${index}`} eventKey={name}>{entitiesMap[name]}</NavItem>
    );

    const navProps = {
      bsStyle: 'pills',
      activeKey: currentEntity || activeKey,
    };

    // Render the content into a list item
    return (
      <Nav stacked onSelect={this.props.onSelect} {...navProps}>{content}</Nav>
    );
  }
}

Entity.propTypes = {
  onSelect: React.PropTypes.func,
  currentEntity: React.PropTypes.any,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSelect: (entity) => {
      dispatch(selectEntity(entity));
      dispatch(loadRelatedData());
      dispatch(loadEntities());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  currentEntity: makeSelectCurrentEntity(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Entity);
