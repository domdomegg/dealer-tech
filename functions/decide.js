const axios = require('axios').default;
const { makeHandler, makeRes } = require('./util');

module.exports.handler = makeHandler(async (body) => {
  if (!('publicToken' in body)) return makeRes(400, 'Payload missing publicToken');
  if (!('months' in body)) return makeRes(400, 'Payload missing months');
  if (typeof body.publicToken != 'string') return makeRes(400, 'publicToken is not a string');
  if (typeof body.months != 'number') return makeRes(400, 'months is not a number');

  const accessToken = (await axios.post(`${process.env.PLAID_API_HOST}/item/public_token/exchange`, {
    client_id: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
    public_token: body.publicToken,
  })).data.access_token;

  // TODO: machine learning on transaction data
  const transactions = (await axios.post(`${process.env.PLAID_API_HOST}/transactions/get`, {
    client_id: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
    access_token: accessToken,
    start_date: new Date(new Date().getTime() - 31556952000).toISOString().slice(0, 10),
    end_date: new Date().toISOString().slice(0, 10),
  })).data.transactions;

  return { statusCode: 200, body: JSON.stringify({ monthlyCost: 279, finalPurchaseCost: 999, finalExchangeValue: 4000 }) };
});
