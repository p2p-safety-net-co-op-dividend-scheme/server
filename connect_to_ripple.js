/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds035448.mongolab.com:35448/bootable_version");   


exports.connect = function(collections){
/*loading ripple-socket*/    

var WebSocket = require('ws')

var websocket = new WebSocket('wss://s1.ripple.com')


var subscribeCommand = '{"command":"subscribe","id":0,"accounts":'+JSON.stringify(collections)+'}'

console.log(subscribeCommand)

websocket.on('open', function(){
    console.log('Connected to the Ripple payment network')
    websocket.send(subscribeCommand)
   
   
})    
    websocket.on('message', function(data){
       
       if(JSON.parse(data).id === 0){
        console.log('message' + data)
       }
             
        if(data.indexOf('Payment') !== -1){
            var tx = JSON.parse(data)
        // filter out transactions from accounts within the network    
        if(collections.indexOf(tx.transaction.Account)!== -1){

        
// Now, check if the payment is a dividend being payed out. It wouldn't make sense to issue dividends on dividends, it'd cause an infinite feedback loop.

    if(JSON.stringify(tx).indexOf('DestinationTag') !== -1){
  db.collection(tx.transaction.Account).findOne({type: "pending_dividendSignature", currency: tx.transaction.Amount.currency}, function(err,doc){
      console.log(doc)
      

            if(doc.destination_tag == tx.transaction.DestinationTag && doc.amount == tx.transaction.Amount.value){ 
               console.log("fit")
                                 db.collection(tx.transaction.Account).findAndModify({
                          query: {type: "unsigned_dividends", currency: tx.transaction.Amount.currency}, 
                          update:{$inc:{total_amount:-Number(tx.transaction.Amount.value)}}
                          
                      })
                          
                           db.collection(tx.transaction.Account).remove({type: "pending_dividendSignature", currency: tx.transaction.Amount.currency})
                
            }

               
            }) 
    }

// If it isn't, then process it as usual:    
    else{
    

// First, check if the Destination account has a dividendRate for this currency,

  db.collection(tx.transaction.Destination).find({type: "contract"}, function(err,doc){
     
            for(var i=0;i<doc.length;i++){
                
                if(tx.transaction.Amount.currency === doc[i].currency){
                    
                
                console.log(tx.engine_result_message)
                    
                    transaction()
                break
                
                }
               
            }
            
             // If not, then it counts as consumption outside the network. The incentive layer adds a penalty to the account who sent the transaction,

                if(doc.length==0)consumption_outside_network()
            
    }) 
    
    }  
}

        else{
   
    console.log("transaction from an account outside the network")    
}
            






        function consumption_outside_network(){
    
    // upsert extra-network consumption
    db.collection(tx.transaction.Account).findAndModify({
        query: {type: "incentive_layer_penalty", currency: tx.transaction.Amount.currency, dividendRate: 0.00}, 
        update:{$inc:{total_penalty:Number(tx.transaction.Amount.value)}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
        })    
    
}
    
        
        function transaction(){
        
    //get dividendRate
     db.collection(tx.transaction.Destination).findOne({type: "contract", currency: tx.transaction.Amount.currency}, function(err,doc){
            var dividendRateDestination = doc.dividendRate;
            
              //get dividendRate
     db.collection(tx.transaction.Account).findOne({type: "contract", currency: tx.transaction.Amount.currency}, function(err,doc){
            var dividendRateAccount = doc.dividendRate
            if(dividendRateAccount>dividendRateDestination){
                //incentive layer penalty
                 db.collection(tx.transaction.Account).findAndModify({
        query: {type: "incentive_layer_penalty", currency: tx.transaction.Amount.currency, dividendRate: dividendRateDestination}, 
        update:{$inc:{total_penalty:Number(tx.transaction.Amount.value)}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
        })
                
            }
     })


            var dividendRate = dividendRateDestination
            console.log("dividendRate: " + dividendRate)
            
            var connect_transaction = require('./connect_transaction.js')


            connect_transaction.connect_transaction(tx.transaction.Account, tx.transaction.Destination, tx.transaction.Amount.currency, tx.transaction.Amount.value, dividendRate)
            
            

    }) 
   
}     
            
            
            
        }
        
        
        
        
    })

    
    
}