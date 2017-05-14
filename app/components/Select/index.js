import React, { PropTypes } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

const Select = (props) => {
  const {
    item, name, primary, related, relation,
    onChange, onBlur,
  } = props;

  const controlProps = {
    componentClass: 'select',
    placeholder: 'select',
    name,
    defaultValue: item[name],
    onBlur: (event) => onBlur(event.target.value, primary[name]),
    onKeyUp: (event) => event.keyCode === 13 ? onBlur(event.target.value, primary[name]) : null,
    onChange: (event) => onChange(event, name),
  };

  const content = related.map((data, index) => <option key={`related-item-${index}`} value={data.id}>{data[relation.show]}</option>);

  return (
    <FormGroup bsSize="small">
      <FormControl {...controlProps} autoFocus>
        {content}
      </FormControl>
    </FormGroup>
  );
};
Select.propTypes = {
  primary: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  related: PropTypes.array,
  relation: PropTypes.object,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  item: PropTypes.object,
};

export default Select;
