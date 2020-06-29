export function miniStore(reducer) {
  let subscriptions = []
  let state = reducer(undefined, { type: '@@INIT' })

  const dispatch = (action) => {
    if (typeof action === 'function') {
      action(dispatch, () => state)
    } else {
      state = reducer(state, action)
      subscriptions.forEach((handler) => handler(state))
    }
  }

  const subscribe = (handler) => {
    subscriptions = [...subscriptions, handler]
    return () => {
      subscriptions = subscriptions.filter((sub) => sub !== handler)
    }
  }

  return {
    dispatch,
    subscribe,
    getState: () => state,
  }
}
