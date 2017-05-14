import React, { PropTypes } from 'react';

function EntityTableHeader({ data }) {
  const content = data.map((item) => {
    const [field, title] = item;
    return <th key={`header-item-${field}`}>{title}</th>;
  });
  return <thead><tr>{content}</tr></thead>;
}

EntityTableHeader.propTypes = {
  data: PropTypes.array,
};

export default EntityTableHeader;
