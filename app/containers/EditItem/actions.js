import {
  SET_EDIT_DATA,
  CHANGE_SELECTED_DATA,
} from './constants';

export function setEditData(data) {
  return {
    type: SET_EDIT_DATA,
    data,
  };
}

export function changeSelectedData(data) {
  return {
    type: CHANGE_SELECTED_DATA,
    ...data,
  };
}
