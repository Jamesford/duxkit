export function callbacks(cbs, onError) {
  let count = 0
  return (...args) => {
    if (!cbs || !Array.isArray(cbs)) {
      return onError('array of callback functions not provided')
    }

    if (!cbs[count]) {
      return onError(
        `callback called ${count + 1} time(s), but only ${
          cbs.length
        } expected handler(s)`
      )
    }

    if (typeof cbs[count] !== 'function') {
      return onError(`callback at index ${count} is not a function`)
    }

    cbs[count](...args)
    count += 1
  }
}
