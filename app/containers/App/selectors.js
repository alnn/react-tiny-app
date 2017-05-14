/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectCurrentEntity = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentEntity')
);

const makeSelectEntityItems = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['entityData', 'list']).toJS()
);

const makeSelectRelatedData = () => createSelector(
  selectGlobal,
  (globalState) => {
    const relatedData = globalState.get('relatedData');
    return relatedData && relatedData.toJS();
  }
);

const makeSelectEntityItemIndex = (id) => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['entityData', 'list']).toJS().findIndex((item) => item.id === id)
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  makeSelectCurrentEntity,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocationState,
  makeSelectEntityItems,
  makeSelectEntityItemIndex,
  makeSelectRelatedData,
};
