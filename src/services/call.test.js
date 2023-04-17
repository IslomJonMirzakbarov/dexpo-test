import callFunction from './call'

describe('callFunction()', () => {
  it('Call rest ', () => {
    const callApp = callFunction(1)
    expect(callApp).toBe(1)
  })
})
