export function createAction(type, customAction) {
  const actionCreator = (...args) => {
    if (customAction) return { type, ...customAction(...args) }
    let action = { type }
    if (args[0] !== undefined) action.payload = args[0]
    return action
  }

  actionCreator.toString = () => `${type}`
  actionCreator.type = type
  actionCreator.match = (action) => action.type === type

  return actionCreator
}

export function createAsyncAction(type, payloadCreator) {
  const pending = createAction(`${type}/pending`)
  const fulfilled = createAction(`${type}/fulfilled`)
  const rejected = createAction(`${type}/rejected`)

  const actionCreator = (arg) => {
    return (dispatch, getState) => {
      dispatch(pending())
      payloadCreator(arg, { dispatch, getState })
        .then((...args) => dispatch(fulfilled(...args)))
        .catch((...args) => dispatch(rejected(...args)))
    }
  }

  actionCreator.toString = () => `${type}`
  actionCreator.type = type
  actionCreator.match = (action) => action.type === type

  actionCreator.pending = pending
  actionCreator.fulfilled = fulfilled
  actionCreator.rejected = rejected

  return actionCreator
}
