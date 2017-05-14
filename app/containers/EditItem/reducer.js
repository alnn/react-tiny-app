import { fromJS } from 'immutable';
import { SET_EDIT_DATA, CHANGE_SELECTED_DATA } from './constants';

// The initial state of the App
const initialState = fromJS({
  primary: false,
  item: false,
  field: false,
});

function edititemReducer(state = initialState, action) {
  const { item = false, field = false } = action.data || {};
  switch (action.type) {
    case SET_EDIT_DATA:
      return state
        .set('primary', fromJS(item))
        .set('item', fromJS(item))
        .set('field', field);
    case CHANGE_SELECTED_DATA:
      return state
        .setIn(['item', action.field], action.value);
    default:
      return state;
  }
}

export default edititemReducer;
