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

  const income = {};
  const expenses = {};
  for (const t of transactions) {
    if (t.amount < 0) {
      expenses[t.date.slice(0, 7)] = expenses[t.date.slice(0, 7)] || 0;
      expenses[t.date.slice(0, 7)] -= t.amount;
    } else if (t.amount > 0) {
      income[t.date.slice(0, 7)] = income[t.date.slice(0, 7)] || 0;
      income[t.date.slice(0, 7)] += t.amount;
    }
  }

  const decision = classify({
    minIncome: Math.min(...Object.values(income)),
    maxIncome: Math.max(...Object.values(income)),
    minExpenses: Math.min(...Object.values(expenses)),
    maxExpenses: Math.max(...Object.values(expenses)),
    averageIncome: Object.values(income).reduce((acc, cur) => acc + cur, 0) / Object.keys(income).length,
    averageExpenses: Object.values(expenses).reduce((acc, cur) => acc + cur, 0) / Object.keys(expenses).length,
    averageNet: (Object.values(income).reduce((acc, cur) => acc + cur, 0) / Object.keys(income).length) - (Object.values(expenses).reduce((acc, cur) => acc + cur, 0) / Object.keys(expenses).length),
  });

  const monthlyCost = Math.ceil({
    'low': 279,
    'med': 299,
    'high': 339,
    'vhigh': 369,
  }[decision] * 60 / body.months);

  return { statusCode: 200, body: JSON.stringify({ monthlyCost, finalPurchaseCost: 999, finalExchangeValue: 4000 }) };
});

const classify = ({ minIncome, maxIncome, minExpenses, maxExpenses, averageIncome, averageExpenses, averageNet }) => {
  if (averageIncome <= 170.0) {
    if (maxExpenses <= 874.0) {
      if (maxExpenses <= 483.5) {
        if (minExpenses <= 233.5) {
          return 'high'
        } else { // if minExpenses > 233.5
          return 'low'
        }
      } else { // if maxExpenses > 483.5
        return 'med'
      }
    } else { // if maxExpenses > 874.0
      return 'low'
    }
  } else { // if averageIncome > 170.0
    if (minExpenses <= 885.5) {
      if (maxIncome <= 907.0) {
        if (maxIncome <= 793.0) {
          if (maxExpenses <= 941.0) {
            if (averageExpenses <= 402.5) {
              return 'high'
            } else { // if averageExpenses > 402.5
              return 'vhigh'
            }
          } else { // if maxExpenses > 941.0
            return 'med'
          }
        } else { // if maxIncome > 793.0
          return 'med'
        }
      } else { // if maxIncome > 907.0
        if (maxExpenses <= 681.5) {
          return 'high'
        } else { // if maxExpenses > 681.5
          if (maxIncome <= 980.0) {
            return 'vhigh'
          } else { // if maxIncome > 980.0
            return 'high'
          }
        }
      }
    } else { // if minExpenses > 885.5
      if (maxIncome <= 808.5) {
        return 'vhigh'
      } else { // if maxIncome > 808.5
        if (minIncome <= 701.0) {
          return 'high'
        } else { // if minIncome > 701.0
          return 'vhigh'
        }
      }
    }
  }
}
