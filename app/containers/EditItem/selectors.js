import { createSelector } from 'reselect';
const selectEdititem = (state) => state.get('edititem');

const makeSelectItem = () => createSelector(
  selectEdititem,
  (editItemState) => {
    const item = editItemState.get('item');
    return item && item.toJS();
  }
);

const makeSelectField = () => createSelector(
  selectEdititem,
  (editItemState) => editItemState.get('field')
);

const makeSelectPrimary = () => createSelector(
  selectEdititem,
  (editItemState) => {
    const primary = editItemState.get('primary');
    return primary && primary.toJS();
  }
);

export {
  selectEdititem,
  makeSelectPrimary,
  makeSelectItem,
  makeSelectField,
};
