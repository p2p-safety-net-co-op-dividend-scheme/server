var Remote = require('ripple-lib').Remote;
var Request = require('ripple-lib').Request;

var options = {
    servers : [ {
      host : "s1.ripple.com",
      port : "443", // websocket port
      secure : true
    } ]
};

var remote = new Remote(options);
//remote.trace = true;

remote.connect(function() {
  console.log("connected")
  
  
  var request = remote.requestSubscribe();
  
  request.setAccounts([ 'rLaKjMvLbrAJwnH4VpawQ6ot9epZqJmbfQ','r46XJq7UJmoPno2cURDRs8bB9crRLJgpcY' ])
  
  remote.on('transaction', function(res) {
     //console.log("remote transactions ", res)
     console.log("remote transactions ", res.transaction.Account)
  });
  
  
  request.on('success', function(success) {
    console.log('success: ', JSON.stringify(success, null, 4));
  });
  
  request.on('error', function(error) {
    console.log('request error: ', JSON.stringify(error, null, 4));
  });
  
  console.log('request.message: ', JSON.stringify(request.message, null, 4));
  
  request.request();
});