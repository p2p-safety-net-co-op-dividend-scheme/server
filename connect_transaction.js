// this script connects transactions that are made to users that give dividends,
// it creates dividend pathways





/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds035448.mongolab.com:35448/bootable_version");   




exports.connect_transaction = function(account, destination, currency, amount, dividendRate){

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
 
        
        var dividend_amount = Number(amount)*dividendRate
        
console.log("dividend_amount = " + dividend_amount)
        
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

// need swarm-algorithm

// swarm-scanner
var swarm = require('./swarm_redistribution.js')

swarm.compute_swarm(destination, upsert_accumulated_dividend)


function upsert_accumulated_dividend(lines) {

console.log("lines.length = " + lines.length)

var dividend_piece = Number(dividend_amount) / Number(lines.length)
console.log("dividend_piece = " + dividend_piece)



 for(var i=0;i<lines.length;i++){
        console.log(lines[i].account)
        
        
          // upsert safety net (sum of all safety_net_pathways)
    db.collection(lines[i].account).findAndModify({
        query: {type: "accumulated_dividends", currency: currency}, 
        update:{$inc:{accumulated_amount:Number(dividend_piece)}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)

        })
        
    }


// when making payment --->
find_highest_accumulated_dividend(lines)

}   
    

function find_highest_accumulated_dividend(lines){
var highest_accumulated_dividend = {"account": "", "accumulated_amount": ""}

console.log(highest_accumulated_dividend)

 for(var i=0;i<lines.length;i++){
        console.log(lines[i].account)
        
        
          // upsert safety net (sum of all safety_net_pathways)
    db.collection(lines[i].account).findOne({
        query: {type: "accumulated_dividends", currency: currency}

        
    }, 
        function(err,doc){
            console.log(doc)

// filter out highest accumulated ammount (Optimization Layer)
            if (highest_accumulated_dividend.accumulated_amount < doc.accumulated_amount){
            highest_accumulated_dividend = {"account": account, "accumulated_amount": doc.accumulated_amount}
            console.log("account = " + account +" doc.accumulated_amount = " +doc.accumulated_amount)
            console.log(highest_accumulated_dividend)
            }
        })
        
    }
    
    
}


}//end module.exports






