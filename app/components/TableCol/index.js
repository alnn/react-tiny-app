import React, { PropTypes } from 'react';
import EditItem from 'containers/EditItem';
import Td from './Td';

function TableCol(props) {
  return (
    <Td>
      <EditItem {...props} />
    </Td>
  );
}

TableCol.propTypes = {
  item: PropTypes.object,
  field: PropTypes.string,
};

export default TableCol;
