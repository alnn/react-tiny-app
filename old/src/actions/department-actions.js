import createAction from '../helpers/action'
import types from '../constants/ActionTypes';

export const fetchingSections = createAction(types.FETCHING_SECTIONS);
export const setSections = createAction(types.SET_SECTIONS, 'result');

export const insertingSection = createAction(types.INSERTING_SECTION, 'name');
export const addSection = createAction(types.ADD_SECTION, 'name', 'result');

export const updatingSection = createAction(types.UPDATING_SECTION, 'id', 'name');
export const changeSection = createAction(types.CHANGE_SECTION, 'id', 'name', 'result');

export const deletingSection = createAction(types.DELETING_SECTION, 'id');
export const removeSection = createAction(types.REMOVE_SECTION, 'id');

// Async action creators:
export function fetchSections () {
  return {
    types: {
      on: types.FETCHING_SECTIONS,
      success: types.SET_SECTIONS,
      fail: types.FAIL_FETCHING
    }
  };
}

export function insertSection (name) {
  return {
    types: {
      on: types.INSERTING_SECTION,
      success: types.ADD_SECTION,
      fail: types.FAIL_INSERTING
    },
    params: {
      name
    }
  };
}

export function updateSection (id, name) {
  return {
    types: {
      on: types.UPDATING_SECTION,
      success: types.CHANGE_SECTION,
      fail: types.FAIL_UPDATING
    },
    params: {
      id, name
    }
  };
}

export function deleteSection (id) {
  return {
    types: {
      on: types.DELETING_SECTION,
      success: types.REMOVE_SECTION,
      fail: types.FAIL_DELETING
    },
    params: {
      id
    }
  };
}

export function insertLocale (sectionID, localeID) {
  return {
    types: {
      on: types.INSERTING_LOCALE,
      success: types.ADD_LOCALE,
      fail: types.FAIL_INSERTING
    },
    params: {
      sectionID, localeID
    }
  };
}

export function deleteLocale (sectionID, localeID) {
  return {
    types: {
      on: types.DELETING_LOCALE,
      success: types.REMOVE_LOCALE,
      fail: types.FAIL_DELETING
    },
    params: {
      sectionID, localeID
    }
  };
}

