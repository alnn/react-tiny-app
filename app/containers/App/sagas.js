import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_ENTITIES, SAVE_ENTITY_ITEM, LOAD_RELATED_DATA } from 'containers/App/constants';
import {
  entitiesLoaded,
  entitiesLoadingError,
  relatedDataLoaded,
  relatedDataLoadingError,
  entityItemSaved,
  entityItemSavingError,
} from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectCurrentEntity, makeSelectEntityItemIndex } from 'containers/App/selectors';
import { makeSelectItem } from 'containers/EditItem/selectors';
import dataRelation from '../../data-relation';

/**
 * Entity request/response handler
 */
export function* getEntities() {
  const entity = yield select(makeSelectCurrentEntity());
  const requestURL = `http://localhost:3033/${entity}`;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);
    yield put(entitiesLoaded(data, entity));
  } catch (error) {
    yield put(entitiesLoadingError(error));
  }
}

/**
 * Related Data request/response handler
 */
export function* getRelatedData() {
  const entity = yield select(makeSelectCurrentEntity());
  const relations = dataRelation[entity];
  const data = {};
  try {
    for (const item of relations) { // eslint-disable-line no-restricted-syntax
      data[item.entity] = yield call(request, `http://localhost:3033/${item.entity}`);
    }
    yield put(relatedDataLoaded(data));
  } catch (error) {
    yield put(relatedDataLoadingError(error));
  }
}

export function* saveEntityItem() {
  const entity = yield select(makeSelectCurrentEntity());
  const item = yield select(makeSelectItem());
  const index = yield select(makeSelectEntityItemIndex(item.id));
  const requestURL = `http://localhost:3033/${entity}/${item.id}`;

  const options = {
    method: 'PUT',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // Call our request helper (see 'utils/request')
    yield call(request, requestURL, options);
    yield put(entityItemSaved(index, item));
  } catch (error) {
    yield put(entityItemSavingError(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* entityData() {
  const loadWatcher = yield takeLatest(LOAD_ENTITIES, getEntities);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(loadWatcher);
}

export function* entityItemData() {
  const watcher = yield takeLatest(SAVE_ENTITY_ITEM, saveEntityItem);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* relatedData() {
  const watcher = yield takeLatest(LOAD_RELATED_DATA, getRelatedData);
  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  entityData,
  relatedData,
  entityItemData,
];
