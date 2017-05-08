import {createReducer} from '../helpers/reducer'
import types from '../constants/ActionTypes'
import { INITIAL_STATE } from '../constants/Initial'


find
get
create
update
remove


export default createReducer(INITIAL_STATE, {
  [types.FETCHING_TERMS] (state) {
    return { ...state };
  },
  [types.SET_TERMS] (state, action) {
    return { ...state, terms: {
      section: action.section,
      locale: action.locale,
      list: action.result
    } };
  },
  [types.INSERTING_TERM] (state) {
    return { ...state };
  },
  [types.ADD_TERM] (state, action) {
    return {
      ...state,
      terms: { ...state.terms, list: [ ...state.terms.list, action.result ] }
    };
  },
  [types.UPDATING_TERM] (state) {
    return { ...state };
  },
  [types.CHANGE_TERM] (state, action) {
    const termList = state.terms.list.map(term => {
      return term.id === action.result.id ? action.result : { ...term };
    });
    return { ...state,
      terms: { ...state.terms, list: [ ...termList ] }
    };
  },
  [types.DELETING_TERM] (state) {
    return { ...state };
  },
  [types.REMOVE_TERM] (state, action) {
    return {
      ...state, terms: {
        ...state.terms,
        list: [ ...state.terms.list.filter(term => term.id !== action.id) ]
      }
    };
  }
});