import React, { PropTypes } from 'react';
import TableCol from 'components/TableCol';

function EntityTableRow({ item, header }) {
  const content = header.map((fieldTitle, index) => {
    const [field] = fieldTitle;
    const colProps = { field, item };
    return <TableCol key={`table-col-${index}`} {...colProps} />;
  });
  return <tr>{content}</tr>;
}

EntityTableRow.propTypes = {
  header: PropTypes.array,
  item: PropTypes.object,
};

export default EntityTableRow;
