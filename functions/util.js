/**
 * Wraps a handling function that may thow, providing a parsed JSON request body
 * @param {(body: any) => { statusCode: number, body: string }} handler 
 * @returns AWS-Lambda compatible handler
 */
const makeHandler = (handler) => async (event) => {
  if (!event.body) return makeRes(400, 'Missing payload');
  if (typeof event.body !== 'string') return makeRes(400, 'Payload not string');
  if (!isJSON(event.body)) return makeRes(400, 'Payload not JSON');

  try {
    return await handler(JSON.parse(event.body))
  } catch (err) {
    if (err.isAxiosError && err.response && err.response.status == 400) {
      console.log(err.response.data)
      return makeRes(400, 'Bad request, see logs for details');
    }
    console.log(err);
    return makeRes(500, 'An internal error occurred');
  }
}

/**
 * @param {number} statusCode The status code
 * @param {string} message The error message
 * @returns {{ statusCode: number, body: string }}
 */
const makeRes = (statusCode, message) => ({
  statusCode,
  body: JSON.stringify({ message }),
});

/**
 * @param {string} maybeJSON A string to test
 * @returns {boolean}
 */
const isJSON = (maybeJSON) => {
  try {
    JSON.parse(maybeJSON);
    return true;
  } catch {
    return false;
  }
};

module.exports = { makeHandler, makeRes, isJSON };