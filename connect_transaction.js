// this script connects transactions that are made to users that give dividends,
// it creates dividend pathways





/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds035448.mongolab.com:35448/bootable_version");   


var dividend_amount

function connect_transaction(account, destination, currency, amount, dividendRate){

   // upsert dividend_pathways
    db.collection(destination).findAndModify({
        query: {type: "dividend_pathway", account: account, currency: currency, dividendRate: dividendRate}, 
        update:{$inc:{total_pathway:Number(amount)}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
        })
 
        
        dividend_amount = Number(amount)*dividendRate
        console.log("dividend_amount: "+dividend_amount)
        
        console.log("dividend amount: "+dividend_amount)
  db.collection(destination).findAndModify({
        query: {type: "unsigned_dividends", currency: currency}, 
        update:{$inc:{total_amount:dividend_amount}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
                        console.log(doc)

        })

// ------------------------- upsert accumulated dividends

var swarm = require('./swarm_redistribution.js')

swarm.compute_swarm(destination, currency, dividendRate, dividend_amount, upsert_accumulated_dividend)

}




function upsert_accumulated_dividend(lines, dividendRate_quota_sum, currency, account, dividend_amount) {



console.log("dividendRate_quota_sum: "+dividendRate_quota_sum)


// how much without penalty - amount with penalty
console.log(dividend_amount)
console.log(dividendRate_quota_sum)

console.log(typeof dividend_amount)
console.log(typeof dividendRate_quota_sum)
var dividend_piece = Number(dividend_amount) * Number(dividendRate_quota_sum / lines.length) // sum of dividend_rate_quotas / number of nodes


console.log("dividend_piece = " + dividend_piece)


 for(var i=0;i<lines.length;i++){
        console.log(lines[i].account)
        if(JSON.stringify(lines[i]).indexOf("dividendRate_quota_without_penalty")!==-1){
            var dividendRate_quota_without_penalty = lines[i].dividendRate_quota_without_penalty
            console.log("dividendRate_quota_without_penalty: "+dividendRate_quota_without_penalty)
            var dividend_amount_without_penalty = Number(dividend_piece / dividendRate_quota_without_penalty)
                    
        // decrease from incentive layer penalty
                
                db.collection(lines[i].account).findAndModify({
                        query: {type: "incentive_layer_penalty", currency: currency}, 
                        update:{$inc:{total_penalty:-dividend_amount_without_penalty}}, 
                        upsert: true,
                        new: true
                        
                    }, 
                        function(err,doc){
                            console.log(doc)
                
                })
            
            
        }
        

        var dividend_amount = Number(dividend_piece / lines[i].dividendRate_quota)
        
        console.log("dividend_amount: "+Number(dividend_piece*lines[i].dividendRate_quota))

        
          // upsert
    db.collection(lines[i].account).findAndModify({
        query: {type: "accumulated_dividends", currency: currency}, 
        update:{$inc:{accumulated_dividends:dividend_amount}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)

        })
        
        

        
        
    }


}   
    








exports.connect_transaction = connect_transaction;