// this script connects transactions that are made to users that give dividends,
// it creates dividend pathways





/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds035448.mongolab.com:35448/bootable_version");   


/* boot test erase later
var account = "rLaKjMvLbrAJwnH4VpawQ6ot9epZqJmbfQ"
var destination = "r46XJq7UJmoPno2cURDRs8bB9crRLJgpcY"
var currency ="RES"
var amount = 20
var dividendRate = 0.02
connect_transaction(account, destination, currency, amount, dividendRate)
boot test erase later*/

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

swarm.compute_swarm(destination, currency, upsert_accumulated_dividend)

}




function upsert_accumulated_dividend(lines, dividendRate_quota_sum, currency, account, max_penalty_quota_sum, penalty) {

// pointless to have max_penalty_quota_sum ?


console.log("dividendRate_quota_sum: "+dividendRate_quota_sum)

if(penalty ==true) console.log("max_penalty_quota_sum: "+max_penalty_quota_sum)

// how much without penalty - amount with penalty
var dividend_piece = Number(dividend_amount) / Number(dividendRate_quota_sum)
if(penalty ==true) var penalty_dividend_piece = Number(dividend_amount) / Number(max_penalty_quota_sum)
console.log("dividend_piece = " + dividend_piece)
if(penalty== true) console.log("penalty_dividend_piece = " + penalty_dividend_piece)


 for(var i=0;i<lines.length;i++){
        console.log(lines[i].account)
        
        console.log("dividend_amount: "+Number(dividend_piece*lines[i].dividendRate_quota))
        console.log("penalty_dividend_amount: "+Number(dividend_piece*lines[i].max_penalty_quota))
        
        if(penalty==true)var added_amount = Number(dividend_piece*lines[i].max_penalty_quota)
        else var added_amount = Number(dividend_piece*lines[i].dividendRate_quota)
        
          // upsert
    db.collection(lines[i].account).findAndModify({
        query: {type: "accumulated_dividends", currency: currency}, 
        update:{$inc:{accumulated_dividends:added_amount}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)

        })
        
        
// decrease from incentive layer penalty
        

        if(penalty == true){
        db.collection(lines[i].account).findAndModify({
                query: {type: "incentive_layer_penalty", currency: currency}, 
                update:{$inc:{total_penalty:-Number(dividend_piece*lines[i].dividendRate_quota)}}, 
                upsert: true,
                new: true
                
            }, 
                function(err,doc){
                    console.log(doc)
        
        })
        }
        
    }


}   
    








exports.connect_transaction = connect_transaction;