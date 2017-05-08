export const createReducer = (firstState, handlers) => {
  return (state = firstState, action) => {
    return handlers[action.type] ? handlers[action.type](state, action) : state
  }
}
