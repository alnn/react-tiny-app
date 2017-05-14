/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_ENTITIES,
  LOAD_ENTITIES_SUCCESS,
  LOAD_ENTITIES_ERROR,
  SELECT_ENTITY,
  SAVE_ENTITY_ITEM,
  SAVE_ENTITY_ITEM_SUCCESS,
  SAVE_ENTITY_ITEM_ERROR,
  LOAD_RELATED_DATA,
  LOAD_RELATED_DATA_SUCCESS,
  LOAD_RELATED_DATA_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentEntity: 'department',
  entityData: {
    list: [],
  },
  relatedData: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_ENTITY:
      return state
        .set('loading', false)
        .set('error', false)
        .set('currentEntity', action.name);
    case LOAD_ENTITIES:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['entityData', 'list'], fromJS([]));
    case LOAD_ENTITIES_SUCCESS:
      return state
        .setIn(['entityData', 'list'], fromJS(action.list))
        .set('loading', false)
        .set('currentEntity', action.entityname);
    case SAVE_ENTITY_ITEM:
      return state
        .set('error', false)
        .set('loading', true);
    case SAVE_ENTITY_ITEM_SUCCESS:
      return state
        .setIn(['entityData', 'list', action.index], fromJS(action.item))
        .set('loading', false);
    case LOAD_RELATED_DATA:
      return state
        .set('loading', true)
        .set('error', false)
        .set('relatedData', false);
    case LOAD_RELATED_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('relatedData', fromJS(action.data));
    case LOAD_ENTITIES_ERROR:
    case SAVE_ENTITY_ITEM_ERROR:
    case LOAD_RELATED_DATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
