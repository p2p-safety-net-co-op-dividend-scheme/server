const RippleAccountMonitor = require('ripple-account-monitor');

const monitor = new RippleAccountMonitor({
  rippleRestUrl: 'https://api.ripple.com/',
  account: 'r46XJq7UJmoPno2cURDRs8bB9crRLJgpcY',
  lastHash: 'D71E301144A85ED9283425760F579BE67F47903BAF9121E29A170A6DC6EDCB67',
  timeout: 1000,

  onPayment: function(transaction, next) {
    console.log('new payment', transaction);
    next();
  }
});

monitor.start();