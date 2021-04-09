const axios = require('axios').default;
const { makeHandler, makeRes } = require('./util');

module.exports.handler = makeHandler(async (body) => {
  if (!('id' in body)) return makeRes(400, 'Payload missing id');
  if (typeof body.id != 'string') return makeRes(400, 'id is not a string');

  const linkToken = (await axios.post(`${process.env.PLAID_API_HOST}/link/token/create`, {
    client_id: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
    client_name: 'Frictionless',
    language: 'en',
    country_codes: ['GB'],
    user: { client_user_id: body.id },
    products: ['transactions'],
  })).data.link_token;

  return { statusCode: 200, body: JSON.stringify({ linkToken }) };
});
