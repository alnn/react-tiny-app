/**
 * EditItem
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getRelatedItem, getRelation } from 'utils/prepare-data';
import { saveEntityItem } from 'containers/App/actions';
import Input from 'components/Input';
import Select from 'components/Select';
import A from 'components/A';
import { makeSelectCurrentEntity, makeSelectRelatedData } from 'containers/App/selectors';
import { makeSelectItem, makeSelectField, makeSelectPrimary } from './selectors';
import { setEditData, changeSelectedData } from './actions';
import Wrapper from './Wrapper';

export class EditItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  getValue() {
    const { related, entity, item, field } = this.props;
    const relation = getRelation(entity, field);
    if (!relation) return item[field];
    const relatedItemData = getRelatedItem(related, item, field);
    return relatedItemData[relation.show] || item[field];
  }

  render() {
    const {
      item: { id },
      item, field, primary, entity, related,
      selectedItem, selectedField,
      onClick, onChange, onBlur,
    } = this.props;

    const inputProps = {
      placeholder: 'whatever...',
      value: item[field],
      name: field,
      primary,
      onBlur,
      onChange,
      item: selectedItem || {},
    };

    const relation = getRelation(entity, field);
    const isChange = selectedItem && selectedItem.id === id && field === selectedField;
    const editShow = field !== 'id' ? 'editable' : 'show';
    const contentType = isChange ? 'change' : editShow;
    const content = {
      change: relation
        ? <Select {...inputProps} related={related[field]} relation={relation} />
        : <Input {...inputProps} />,
      editable: <A onClick={() => onClick({ item, field })}>{this.getValue()}</A>,
      show: <span>{this.getValue()}</span>,
    };
    return (
      <Wrapper>{content[contentType]}</Wrapper>
    );
  }
}

EditItem.propTypes = {
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  item: PropTypes.object,
  primary: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  related: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  field: PropTypes.string,
  entity: PropTypes.string,
  selectedField: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  selectedItem: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
};

const mapStateToProps = createStructuredSelector({
  related: makeSelectRelatedData(),
  entity: makeSelectCurrentEntity(),
  primary: makeSelectPrimary(),
  selectedItem: makeSelectItem(),
  selectedField: makeSelectField(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChange: (event, field) => dispatch(changeSelectedData({ field, value: event.target.value })),
    onClick: (data) => data.field !== 'id' ? dispatch(setEditData(data)) : null,
    onBlur: (currentValue, primaryValue) => {
      if (currentValue != primaryValue) dispatch(saveEntityItem()); // eslint-disable-line eqeqeq
      dispatch(setEditData());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
