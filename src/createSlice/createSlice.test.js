import test from 'ava'

test('foo', (t) => {
  t.pass()
})

// import { createSlice } from './createSlice'

// const counter = createSlice({
//   name: 'counter',
//   initialState: 0,
//   reducers: {
//     incr: (state, action) => state + action.payload,
//     decr: (state, action) => state - action.payload,
//     reset: () => 0,
//     setByTextLength: {
//       action: (text) => ({ payload: text.length }),
//       reducer: (state, action) => action.payload,
//     },
//   },
//   extraReducers: {
//     'counter/reset': () => 'will never be reached',
//     reset: () => 'reachable',
//   },
// })

// describe('createSlice', () => {
//   it('fulfills return contract', () => {
//     expect(counter).toEqual(
//       expect.objectContaining({
//         name: expect.any(String),
//         reducer: expect.any(Function),
//         actions: expect.any(Object),
//       })
//     )
//   })

//   it('uses correct name', () => {
//     expect(counter.name).toEqual('counter')
//   })

//   it('generates correct actions', () => {
//     // Amount
//     expect(Object.keys(counter.actions).length).toEqual(4)
//     expect(Object.keys(counter.actions).sort()).toEqual(
//       ['incr', 'decr', 'reset', 'setByTextLength'].sort()
//     )
//     // Correctness
//     expect(counter.actions.incr(1)).toEqual({
//       type: 'counter/incr',
//       payload: 1,
//     })
//     expect(counter.actions.decr(1)).toEqual({
//       type: 'counter/decr',
//       payload: 1,
//     })
//     expect(counter.actions.reset()).toEqual({
//       type: 'counter/reset',
//     })
//     expect(counter.actions.setByTextLength('test')).toEqual({
//       type: 'counter/setByTextLength',
//       payload: 4,
//     })
//   })

//   it('generates correct reducer', () => {
//     expect(counter.reducer(undefined, { type: '@@INIT' })).toEqual(0)
//     expect(counter.reducer(undefined, counter.actions.incr(1))).toEqual(1)
//     expect(counter.reducer(undefined, counter.actions.decr(1))).toEqual(-1)
//     expect(counter.reducer(-1, counter.actions.incr(1))).toEqual(0)
//     expect(counter.reducer(1, counter.actions.decr(1))).toEqual(0)
//     expect(counter.reducer(1, counter.actions.reset())).toEqual(0)
//     expect(counter.reducer(1, counter.actions.setByTextLength('test'))).toEqual(
//       4
//     )
//   })

//   it('includes extraReducers in reducer', () => {
//     expect(counter.reducer(1, { type: 'counter/reset' })).toEqual(0)
//     expect(counter.reducer(1, { type: 'reset' })).toEqual('reachable')
//   })
// })
