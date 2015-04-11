

### https:// + domain (eg: api.basicincome.co) + /v1/setdividendRate

{ "address": your_account, "currency": "XYZ", dividendRate: x.xx, "oauth": oauth_authorization_key }





### https:// + domain (eg: api.basicincome.co) + /v1/sign_dividends

req: { "address": your_account}

res: { "account": destination_account, "currency": "XYZ", "amount": dividend_amount, "destination_tag": how_the_system_knows_you_paid }




### https:// + domain (eg: api.basicincome.co) + /v1/removeAccount

req: { "address": your_account, "oauth": oauth_authorization_key }

res: "Removed all data for account: " + your_account





## Built on NodeJS, express, ws, MongoDB

### source: http://twitter.com/resilience_me