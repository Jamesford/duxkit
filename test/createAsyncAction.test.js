import test from 'ava'
import { callbacks } from './helpers'
import { createAsyncAction } from '../src/createAsyncAction/createAsyncAction'

const type = 'asyncType'
const asyncActionCreator = createAsyncAction(type, async (status) => {
  await Promise.resolve(true)
  return { status }
})

const failingAsyncActionCreator = createAsyncAction(type, async (status) => {
  await Promise.reject(new Error('failed'))
  return { status }
})

test('fulfills return contract', (t) => {
  t.is(typeof asyncActionCreator, 'function')
  t.is(typeof asyncActionCreator.toString, 'function')
  t.is(typeof asyncActionCreator.match, 'function')
  t.is(asyncActionCreator.toString(), type)
  t.is(asyncActionCreator.type, type)
  t.is(asyncActionCreator.match({ type }), true)
  // sub-actions
  t.is(typeof asyncActionCreator.pending, 'function')
  t.is(typeof asyncActionCreator.fulfilled, 'function')
  t.is(typeof asyncActionCreator.rejected, 'function')
})

test.cb('should dispatch pending & fulfilled actions', (t) => {
  const asyncAction = asyncActionCreator('ok')
  t.plan(3) // expected # of assertions in this test

  const mockDispatch = callbacks(
    [
      (action) => {
        t.is(action.type, `${type}/pending`)
      },
      (action) => {
        t.is(action.type, `${type}/fulfilled`)
        t.deepEqual(action.payload, { status: 'ok' })
        t.end() // stop waiting for callbacks
      },
    ],
    (m) => t.fail(m)
  )

  asyncAction(mockDispatch)
})

test.cb('should dispatch pending & rejected actions', (t) => {
  const asyncAction = failingAsyncActionCreator('ok')
  t.plan(3) // expected # of assertions in this test

  const mockDispatch = callbacks(
    [
      (action) => {
        t.is(action.type, `${type}/pending`)
      },
      (action) => {
        t.is(action.type, `${type}/rejected`)
        t.deepEqual(action.payload, new Error('failed'))
        t.end() // stop waiting for callbacks
      },
    ],
    (m) => t.fail(m)
  )

  asyncAction(mockDispatch)
})
