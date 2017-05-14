/*
 * AdminPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Table, Col, Alert } from 'react-bootstrap';
import EntityTableHeader from 'components/EntityTableHeader';
import EntityTableRow from 'components/EntityTableRow';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  makeSelectEntityItems,
  makeSelectLoading,
  makeSelectError,
  makeSelectCurrentEntity,
} from 'containers/App/selectors';
import headers from './headers';
import { loadEntities, loadRelatedData } from '../App/actions';

export class AdminPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.onMounted();
  }
  render() {
    const { loading, error, items, entity } = this.props;
    const header = headers[entity];

    if (loading) return <Col xs={12} md={8}><LoadingIndicator /></Col>;
    if (error) return <Col xs={12} md={8}><Alert bsStyle="danger"><h4>{error.message}</h4></Alert></Col>;

    const content = items.map((item, index) => {
      const rowProps = { header, item };
      return <EntityTableRow key={`entity-table-row-${index}`} {...rowProps} />;
    });
    return (
      <Col xs={12} md={8}>
        <Table responsive>
          <EntityTableHeader data={headers[entity]} />
          <tbody>{content}</tbody>
        </Table>
      </Col>
    );
  }
}

AdminPage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  items: React.PropTypes.array,
  entity: React.PropTypes.string,
  onMounted: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onMounted: () => {
      dispatch(loadRelatedData());
      dispatch(loadEntities());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  items: makeSelectEntityItems(),
  entity: makeSelectCurrentEntity(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
