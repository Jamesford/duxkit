export function createReducer(initialState, actionHandlers) {
  return function (state = initialState, action) {
    if (!action || !action.type) return state
    const reducer = actionHandlers[action.type]
    if (!reducer) return state
    return reducer(state, action)
  }
}

export function upsert(fn) {
  return function (state, action) {
    return {
      ...state,
      ...fn(state, action),
    }
  }
}
