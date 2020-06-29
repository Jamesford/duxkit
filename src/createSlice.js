import { createAction } from './createAction'
import { createReducer } from './createReducer'

export function createSlice({
  name,
  initialState,
  reducers = {},
  extraReducers = {},
}) {
  const { actions, reducers: typedReducers } = Object.entries(reducers).reduce(
    ({ actions, reducers }, [type, reducer]) => {
      const isFunc = typeof reducer === 'function'
      const actionName = `${name}/${type}`
      const action = isFunc
        ? createAction(actionName)
        : createAction(actionName, reducer.action)

      return {
        actions: {
          ...actions,
          [type]: action,
        },
        reducers: {
          ...reducers,
          [action]: isFunc ? reducer : reducer.reducer,
        },
      }
    },
    { actions: {}, reducers: {} }
  )

  const reducer = createReducer(initialState, {
    ...extraReducers,
    ...typedReducers,
  })

  return {
    name,
    reducer,
    actions,
  }
}
