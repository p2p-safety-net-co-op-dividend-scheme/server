exports.connect = function(db){


// ----- STANDARDIZED SCRIPT -----
// add your financial platform here, here's code for Ripple


    /* Loading ripple-lib with Node.js */
var ripple = require('ripple-lib')
var Remote = ripple.Remote;


var remote = new Remote({
  // see the API Reference for available options
  servers: [ 'wss://s1.ripple.com:443' ]
});

remote.connect(function() {
    console.log("connected to Ripple")
  /* remote connected */

});//end remote connect




// load all connected users from that financial platform
function get_all_collections(){
    
var get_all_collections =require('./get_all_collections.js')
get_all_collections.get_all_collections(db, function(accounts){
                request_subscribe(accounts)

})
}
get_all_collections()





function request_subscribe(accounts){
    
// connect to ripple-lib 


var req = remote.request_subscribe();
req.message.accounts = accounts
console.log(req.message.accounts)
req.request();
remote.on('transaction', function(data){
 

// filter out payement transactions


if(data.transaction.TransactionType === 'Payment'){

// filter out transactions from accounts within the network    
if(accounts.indexOf(data.transaction.Account)!== -1){
console.log(data.transaction.TransactionType + "scanned")

// filter by currencies that are in use by the account that recieved the payment

  db.collection(data.transaction.Destination).find({type: "contract"}, function(err,doc){
            console.log("hi")
            for(var i=0;i<doc.length;i++){
                
                if(data.transaction.Amount.currency === doc[i].currency){
                    
                console.log(data.transaction)
                console.log(data.engine_result_message)
                    
                    transaction()
                break
                
                }
                else consumption_outside_network()
            }
            
            
            
            
    }) 
    
    
}
else{
    console.log(data.transaction.Account)
    console.log(accounts.indexOf(data.transaction.Account))
    console.log("transaction from an account outside the network")    
}
}

// update consumption outside network penalty

function consumption_outside_network(){
    
    // upsert extra-network consumption
    db.collection(data.transaction.Account).findAndModify({
        query: {type: "consumption_outside_network", currency: data.transaction.Amount.currency}, 
        update:{$inc:{total_amount:Number(data.transaction.Amount.value)}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
        })    
    
}



// connect the transaction by creating a dividend pathway


function transaction(){
        
    //get taxRate
     db.collection(data.transaction.Destination).findOne({type: "contract", currency: data.transaction.Amount.currency}, function(err,doc){
            var taxRate;


            taxRate = doc.taxRate
            console.log(taxRate)
            console.log("taxRate" + taxRate)
            
            var connect_transaction = require('./connect_transaction.js')


            connect_transaction.connect_transaction(data.transaction.Account, data.transaction.Destination, data.transaction.Amount.currency, data.transaction.Amount.value, taxRate)
            
            

    }) 
   
} 
         
})
    
}


}