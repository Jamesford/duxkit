import { createSlice } from '../createSlice'
import { miniStore } from '../miniStore'

const counter = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    incr: (state) => state + 1,
    decr: (state) => state - 1,
  },
})

const store = miniStore(counter.reducer)

describe('miniStore', () => {
  it('should fulfill the return contract', () => {
    expect(store).toEqual(
      expect.objectContaining({
        dispatch: expect.any(Function),
        subscribe: expect.any(Function),
        getState: expect.any(Function),
      })
    )
  })

  it('should return the current state', () => {
    expect(store.getState()).toEqual(0)
  })

  it('should update state on dispatching action', () => {
    store.dispatch(counter.actions.incr())
    expect(store.getState()).toEqual(1)
    store.dispatch(counter.actions.decr())
    expect(store.getState()).toEqual(0)
  })

  it('should call subscriptions on dispatch', () => {
    const unsub = store.subscribe((state) => {
      expect(state).toEqual(1)
    })
    store.dispatch(counter.actions.incr())
    unsub()
    store.dispatch(counter.actions.incr())
    expect(store.getState()).toEqual(2)
  })
})
