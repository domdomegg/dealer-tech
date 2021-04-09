# functions

Serverless functions designed to connect with the Plaid API and make motor finance decisions in AWS Lambda.

## Setup

```
npm i -g serverless
```

## Deploy

```
serverless deploy -v --stage prod
```

## `POST /linkToken`

Gets a link token from the Plaid API

### Request

```json
{ "id": "uniqueIdentifier" }
```

The `id` is used as Plaid's [`user.client_user_id`](https://plaid.com/docs/api/tokens/#link-token-create-request-client-user-id).

### Response: status code 200

```json
{ "linkToken": "link-token-abcd" }
```

The `linkToken` is a Plaid [`link_token`](https://plaid.com/docs/api/tokens/#link-token-create-response-link-token)

### Response: status code 400

```json
{ "message": "Message explaining the error" }
```

## `POST /decide`

Exchanges a public token for an access token, gets transaction data and makes credit decision based on the AI model.

### Request

```json
{ "publicToken": "public-token-abcd", "months": 60 }
```

The `publicToken` is the Plaid [`public_token`](https://plaid.com/docs/api/tokens/#item-public_token-exchange-request-public-token) used to exchange for a Plaid access token. The access token is then used to fetch transaction data.

The `months` property represents the number of months the user wants the vehicle financed for.

### Response: status code 200

```json
{ "monthlyCost": 279, "finalPurchaseCost": 999, "finalExchangeValue": 4000 }
```

All fields are in pounds (GBP).

The `monthlyCost` is the amount per monthly repayment.

The `finalPurchaseCost` is the amount the buyer can pay to fully own the car at the end of the finance agreement.

The `finalExchangeValue` is the trade-in value of the vehicle at the end of the finance agreement.

### Response: status code 400

```json
{ "message": "Message explaining the error" }
```