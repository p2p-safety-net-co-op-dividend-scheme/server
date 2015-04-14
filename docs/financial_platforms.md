<b>FAQ</b>: How do I add a new financial platform ? What requirements are there ?

<b>The system needs to be able to read an accounts transactions. In other words, users need to be able to give the system access to their account-feed. Both Bitcoin and Ripple have public ledgers. 

If the platform has an API through which you can read transactions, and you trust the platform, then add it like this:</b>

```js
financial_platforms/connect_to_platform.js
```

<br><br><br>
<img width="30%" src="https://wiki.ripple.com/images/3/32/Logo_M.png"><img width="30%" src="http://hobbieworks.com/wp-content/uploads/2014/07/bitcoin-logo.png">


<br><br>
<b>FAQ</b>: What should the script look like ?
<br>

<b>The system reads the user's transactions through what is often called a subscribe function, or a webhook.</b>

<b>Basically, you tell the other end to send you a message every time a user recieves a transaction. These notifications are usually recieved via http and websocket.

On the event of a transaction,

```js
websocket.on('message', function(tx){

var connect_transaction = require('../connect_transaction.js')

connect_transaction.connect_transaction(tx)

```

And you're done. 


