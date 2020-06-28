import test from 'ava'
import { createAction } from '../src/createAction/createAction'

const type = 'type'
const actionCreator = createAction(type)

test('fulfills return contract', (t) => {
  t.is(typeof actionCreator, 'function')
  t.is(typeof actionCreator.toString, 'function')
  t.is(typeof actionCreator.match, 'function')
  t.is(actionCreator.toString(), type)
  t.is(actionCreator.type, type)
  t.is(actionCreator.match({ type }), true)
})

test('basic usage', (t) => {
  const action = actionCreator()

  t.is(typeof action, 'object')
  t.is(Object.keys(action).length, 1)
  t.is(action.hasOwnProperty('type'), true)
  t.is(action.type, type)
})

test('usage with arguments', (t) => {
  const action = actionCreator('my-argument')

  t.is(Object.keys(action).length, 2)
  t.is(action.hasOwnProperty('type'), true)
  t.is(action.hasOwnProperty('payload'), true)
  t.is(action.payload, 'my-argument')
})

test('usage with customAction', (t) => {
  const customActionCreator = createAction('custom', (data) => ({
    payload: data,
    metadata: 'metadata',
  }))
  const action = customActionCreator('custom-payload')

  t.is(Object.keys(action).length, 3)
  t.is(action.hasOwnProperty('type'), true)
  t.is(action.hasOwnProperty('payload'), true)
  t.is(action.hasOwnProperty('metadata'), true)
  t.is(action.payload, 'custom-payload')
  t.is(action.metadata, 'metadata')
})
