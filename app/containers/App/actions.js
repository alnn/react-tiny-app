/*
 * App Actions
 */

import {
  SELECT_ENTITY,
  LOAD_ENTITIES,
  LOAD_ENTITIES_SUCCESS,
  LOAD_ENTITIES_ERROR,
  LOAD_RELATED_DATA,
  LOAD_RELATED_DATA_SUCCESS,
  LOAD_RELATED_DATA_ERROR,
  SAVE_ENTITY_ITEM,
  SAVE_ENTITY_ITEM_SUCCESS,
  SAVE_ENTITY_ITEM_ERROR,
} from './constants';

export function selectEntity(name) {
  return {
    type: SELECT_ENTITY,
    name,
  };
}

export function saveEntityItem() {
  return {
    type: SAVE_ENTITY_ITEM,
  };
}

export function entityItemSaved(index, item) {
  return {
    type: SAVE_ENTITY_ITEM_SUCCESS,
    index,
    item,
  };
}

export function entityItemSavingError(error) {
  return {
    type: SAVE_ENTITY_ITEM_ERROR,
    error,
  };
}

export function loadEntities() {
  return {
    type: LOAD_ENTITIES,
  };
}

export function entitiesLoaded(list, entityname) {
  return {
    type: LOAD_ENTITIES_SUCCESS,
    list,
    entityname,
  };
}

export function entitiesLoadingError(error) {
  return {
    type: LOAD_ENTITIES_ERROR,
    error,
  };
}

export function loadRelatedData() {
  return {
    type: LOAD_RELATED_DATA,
  };
}

export function relatedDataLoaded(data) {
  return {
    type: LOAD_RELATED_DATA_SUCCESS,
    data,
  };
}

export function relatedDataLoadingError(error) {
  return {
    type: LOAD_RELATED_DATA_ERROR,
    error,
  };
}
