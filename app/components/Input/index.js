import React, { PropTypes } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

const Input = (props) => {
  const { item, name, primary, onChange, onBlur } = props;
  const controlProps = {
    type: 'text',
    placeholder: props.placeholder || 'whatever...',
    onBlur: (event) => onBlur(event.target.value, primary[name]),
    onKeyUp: (event) => event.keyCode === 13 ? onBlur(event.target.value, primary[name]) : null,
    onChange: (event) => onChange(event, name),
  };
  return (
    <FormGroup bsSize="small">
      <FormControl {...controlProps} autoFocus name={name} defaultValue={item[name]} />
    </FormGroup>
  );
};

Input.propTypes = {
  primary: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  item: PropTypes.object,
};

export default Input;
