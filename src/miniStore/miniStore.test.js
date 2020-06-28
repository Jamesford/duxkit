import test from 'ava'
import { createSlice } from '../createSlice/createSlice'
import { miniStore } from './miniStore'

const counter = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    incr: (state) => state + 1,
    decr: (state) => state - 1,
  },
})

const store = miniStore(counter.reducer)

test('should fulfill the return contract', (t) => {
  t.is(typeof store, 'object')
  t.is(typeof store.dispatch, 'function')
  t.is(typeof store.subscribe, 'function')
  t.is(typeof store.getState, 'function')
})

test('should return hte current state', (t) => {
  t.is(store.getState(), 0)
})

test('should update state on dispatching action', (t) => {
  store.dispatch(counter.actions.incr())
  t.is(store.getState(), 1)
  store.dispatch(counter.actions.decr())
  t.is(store.getState(), 0)
})

test('should call subscriptions on dispatch', (t) => {
  const unsub = store.subscribe((state) => {
    t.is(state, 1)
  })
  store.dispatch(counter.actions.incr())
  unsub()
  store.dispatch(counter.actions.incr())
  t.is(store.getState(), 2)
})
