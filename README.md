# duxkit

**An unofficial, simple, toolkit for organising actions and reducers for Redux**

Inspired by the [official redux-toolkit](https://redux-toolkit.js.org/).

- [Installation](#installation)
- [Usage](#usage)
  - [createAction()](#createaction)
  - [createAsyncAction()](#createasyncaction)
  - [createReducer()](#createreducer)
  - [createSlice()](#createslice)
  - [miniStore()](#ministore)
- [Differences to Redux Toolkit](#differences-to-redux-toolkit)

## Installation

### npm or yarn

Duxkit is available as a package on NPM for use with a module bundler or in a Node application:

```bash
# NPM
npm i duxkit

# Yarn
yarn add duxkit
```

### Copy 'n Paste

A goal of duxkit is to be simple enough to be able to just copy and paste the source code here into your own source. `createAction`, `createReducer`, and `miniStore` have no dependencies on other parts of the code, so they can be dropped into your source without a worry. `createAsyncAction`[1] and `createSlice`[2] rely on `createAction`[1,2] and `createReducer`[2] so if you want to use those you'll have to copy their dependencies too.

## Usage

### createAction()

`createAction(type, customAction?)`

```javascript
import { createAction } from 'duxkit'

const actionCreator = createAction('myAction')

actionCreator('myPayload')
// { type: 'myAction', payload: 'myPayload' }

const customActionCreator = createAction('myCustom', (str = '') =>
  str.split('').reverse().join('')
)

actionCreator('abc')
// { type: 'myCustom', payload: 'cba' }
```

### createAsyncAction()

`createAsyncAction(type, asyncAction)`

```javascript
import { createAsyncAction } from 'duxkit'

const actionCreator = createAsyncAction('fetchUser', async (id) => {
  if (id === 0) {
    throw new Error('demo error')
  }
  await getUserById(id) // { id: 123, name: 'Joe' }
})

dispatch(actionCreator(123))
// { type: 'fetchUser/pending' }
// { type: 'fetchUser/fulfilled', payload: { id: 123, name: 'Joe' } }

dispatch(actionCreator(0))
// { type: 'fetchUser/pending' }
// { type: 'fetchUser/rejected', payload: Error{ message: 'demo error' } }
```

`createAsyncAction()` returns a thunk, not an action. Use with `store.dispatch()`.

### createReducer()

`createReducer(initialState, actionHandlers)`

```javascript
import { createReducer, createAction } from 'duxkit'

const decr = createAction('decr')

const initialState = 0

const actionHandlers = {
  incr: (state) => state + 1,
  [decr]: (state) => state - 1,
}

const reducer = createReducer(initialState, actionHandlers)

reducer(undefined, { type: 'incr' })
// 1

reducer(5, decr())
// 4
```

### createSlice()

`createSlice({ name, initialState, reducers?, extraReducers? })`

```javascript
import { createSlice, createAsyncAction } from 'duxkit'

const setAsync = createAsyncAction('counter/setAsync', async (value = 0) => {
  return Promise.resolve(value)
})

const counter = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    incr: (state) => state + 1,
    decr: (state) => state - 1,
  },
  extraReducers: {
    [`${setAsync}/pending`]: (state) => 0,
    [`${setAsync}/rejected`]: (state) => -1,
    [`${setAsync}/fulfilled`]: (state, action) => action.payload,
  },
})
// { name: counter, actions: { incr(), decr() }, reducer() }

counter.actions.incr()
// { type: 'counter/incr' }

counter.actions.decr()
// { type: 'counter/decr' }

counter.reducer(undefined, counter.actions.incr())
// 1

counter.reducer(1, { type: 'counter/setAsync/fulfilled', payload: 42 })
// 42
```

### miniStore()

`miniStore(reducer)`

```javascript
import { miniStore, createSlice } from 'duxkit'

const counter = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    incr: (state) => state + 1,
    decr: (state) => state - 1,
  },
})
// { name: counter, actions: { incr(), decr() }, reducer() }

const store = miniStore(counter.reducer)

store.getState()
// 0

const unsub = store.subscribe((state) => {
  console.log(state)
})

store.dispatch(counter.actions.incr())
// console.log: 1

store.dispatch(counter.actions.decr())
// console.log: 0

unsub()

store.dispatch(counter.actions.decr())
// console.log not called
```

## Differences to Redux Toolkit

| Status  | Name                    | Description                           |
| :------ | :---------------------- | :------------------------------------ |
| removed | `createAsyncThunk()`    | renamed to `createAsyncAction()`      |
| added   | `createAsyncAction()`   | renamed from `createAsyncThunk()`     |
| added   | `miniStore()`           | simple redux store with thunk support |
| changed | `createReducer()`       | removed immer                         |
| removed | `configureStore()`      |                                       |
| removed | `createEntityAdapter()` |                                       |
| removed | `createSelector`        | not re-exported                       |
