// this script connects transactions that are made to users that give dividends,
// it creates dividend pathways

var Fraction = require('fractional').Fraction // javascript library to handle fractions




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
            //console.log(doc)
        })
 
        
        dividend_amount = Number(amount)*dividendRate
        //console.log("dividend_amount: "+dividend_amount)
        
  db.collection(destination).findAndModify({
        query: {type: "unsigned_dividends", currency: currency}, 
        update:{$inc:{total_amount:dividend_amount}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
                        //console.log(doc)

        })

// ------------------------- upsert accumulated dividends

var swarm = require('./swarm_redistribution.js')

swarm.compute_swarm(destination, currency, dividendRate, dividend_amount, calculate_dividend_fractions)

}


function calculate_dividend_fractions(lines, dividendRate_quota_sum, currency, account, dividend_amount){
console.log(lines)


  
  // create "pie chart"
for(var i=0;i<lines.length;i++){
    lines[i].dividendRate_quota
    var dividend_fraction = new Fraction(lines[i].dividendRate_quota).divide(new Fraction(dividendRate_quota_sum)).toString()
    
    // convert the fraction.js string to a decimal number
    dividend_fraction = dividend_fraction.split('/');
    dividend_fraction = parseInt(dividend_fraction[0], 10) / parseInt(dividend_fraction[1], 10);

    upsert_accumulated_dividend(lines[i].account, currency, dividend_fraction, dividend_amount)
}
  
  

  calculate_missed_out_dividend_fractions_from_penalty()
  function calculate_missed_out_dividend_fractions_from_penalty(){
  var dividendRate_quota_sum_without_penalty = "0"
 for(var i =0;i<lines.length;i++){
     if(lines[i].dividendRate_quota_without_penalty!==undefined){
         console.log("lines[i].dividendRate_quota_without_penalty "+ lines[i].dividendRate_quota_without_penalty)
         
         
dividendRate_quota_sum_without_penalty = new Fraction(dividendRate_quota_sum_without_penalty).add(new Fraction(lines[i].dividendRate_quota_without_penalty)).toString()


     }
     else dividendRate_quota_sum_without_penalty = new Fraction(dividendRate_quota_sum_without_penalty).add(new Fraction(lines[i].dividendRate_quota)).toString()


 }

  // create "pie chart" for dividendRate_quota_sum_without_penalty
for(var i=0;i<lines.length;i++){
     if(lines[i].dividendRate_quota_without_penalty!==undefined){
     
    var dividend_fraction_without_penalty = new Fraction(lines[i].dividendRate_quota_without_penalty).divide(new Fraction(dividendRate_quota_sum_without_penalty)).toString()
   
    // convert the fraction.js string to a decimal number
    dividend_fraction_without_penalty = dividend_fraction_without_penalty.split('/');
    dividend_fraction_without_penalty = parseInt(dividend_fraction_without_penalty[0], 10) / parseInt(dividend_fraction_without_penalty[1], 10);
    console.log(dividend_fraction_without_penalty);


         decrease_from_incentive_layer_penalty(lines[i].account, dividend_fraction_without_penalty)
     }   
     else{} //no penalty
}
  
  
  
  function decrease_from_incentive_layer_penalty(accouont, dividend_fraction_without_penalty){
      
// decrease from incentive layer penalty
                
                db.collection(account).findAndModify({
                        query: {type: "incentive_layer_penalty", currency: currency}, 
                        update:{$inc:{total_penalty:-(dividend_fraction_without_penalty*dividend_amount)}}, 
                        new: true
                        
                    }, 
                        function(err,doc){
                            console.log(doc)
                            if(doc.total_penalty<0){//quick hack, todo: fix this
                                db.collection(account).findAndModify({
                                query: {type: "incentive_layer_penalty", currency: currency}, 
                                update:{$set:{total_penalty:0}}})
                        
                            }
                
                })
  }
  
  }



    }

function upsert_accumulated_dividend(account, currency, dividend_fraction, dividend_amount) {
    console.log(Number(dividend_fraction))
          // upsert
    db.collection(account).findAndModify({
        query: {type: "accumulated_dividends", currency: currency}, 
        update:{$inc:{accumulated_dividends:Number(dividend_fraction) * Number(dividend_amount)}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)

        })
        
    


}   
    








exports.connect_transaction = connect_transaction;