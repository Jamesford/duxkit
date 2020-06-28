# duxkit

**An unofficial, simple, toolkit for organising actions and reducers for Redux**

Inspired by the [official redux-toolkit](https://redux-toolkit.js.org/).

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

`createAction()`

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

## Differences to Redux Toolkit

| change  | name                       | desc                                  |
| :------ | :------------------------- | :------------------------------------ |
| removed | `createAsyncThunk()`       | renamed to `createAsyncAction()`      |
| added   | `createAsyncAction()`      | renamed from `createAsyncThunk()`     |
| added   | `miniStore()`              | simple redux store with thunk support |
| changed | `createReducer()`          | removed immer                         |
| removed | `configureStore()`         |                                       |
| removed | `createEntityAdapter()`    |                                       |
| removed | `createSelector` re-export |                                       |
