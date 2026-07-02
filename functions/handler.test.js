const { makeHandler, makeRes, isJSON } = require('./util')
const linkToken = require('./linkToken')

const call = (handler, body) => handler({ body })

it('makeHandler rejects missing/invalid payloads', async () => {
  const handler = makeHandler(async () => ({ statusCode: 200, body: 'ok' }))
  expect((await call(handler, undefined)).statusCode).toBe(400)
  expect((await call(handler, 'not json')).statusCode).toBe(400)
  expect(await call(handler, '{}')).toEqual({ statusCode: 200, body: 'ok' })
})

it('makeHandler returns 500 on unexpected errors', async () => {
  const handler = makeHandler(async () => { throw new Error('boom') })
  const res = await call(handler, '{}')
  expect(res.statusCode).toBe(500)
})

it('linkToken validates id before calling Plaid', async () => {
  expect(await call(linkToken.handler, JSON.stringify({}))).toEqual(makeRes(400, 'Payload missing id'))
  expect(await call(linkToken.handler, JSON.stringify({ id: 5 }))).toEqual(makeRes(400, 'id is not a string'))
})

it('isJSON', () => {
  expect(isJSON('{}')).toBe(true)
  expect(isJSON('nope')).toBe(false)
})
