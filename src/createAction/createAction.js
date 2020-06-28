export function createAction(type, customAction) {
  const actionCreator = (...args) => {
    if (customAction) {
      return { type, ...customAction(...args) }
    } else {
      let action = { type }
      if (args[0] !== undefined) action.payload = args[0]
      return action
    }
  }

  actionCreator.toString = () => `${type}`
  actionCreator.type = type
  actionCreator.match = (action) => action.type === type

  return actionCreator
}
