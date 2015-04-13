var Fraction = require('fractional').Fraction // javascript library to handle fractions

/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds035448.mongolab.com:35448/bootable_version");   

/*
var account = "r46XJq7UJmoPno2cURDRs8bB9crRLJgpcY"
var currency = "RES"
var dividendRate = "0.06"
var dividendRate_quota_X = 1

compute_swarm(account, currency, dividendRate, function(LINES, dividendRate_quota_sum){
    console.log(LINES); console.log(dividendRate_quota_sum)
    var amount = 4
var f = new Fraction(dividendRate_quota_sum).numerator

console.log(f)
})
*/


exports.compute_swarm = function (account_id, currency, dividendRate, dividend_amount, callback){



var LINES = []
var dividendRate_quota_sum = 0

var line = 0 // LINES[i].line // todo: improve this


lines_for_X(account_id, currency, dividendRate, 1)


function lines_for_X(account, currency, dividendRate_X, dividendRate_quota_X){
var line_X = line // todo: improve this.
line ++



   //filter out if an account has multiple dividendRates, sort by the rate closest to dividendRate_X
  filter_dividend_pathways_by_dividendRate(account, currency, dividendRate_X, line_X_dividend_pathways)  
  function filter_dividend_pathways_by_dividendRate(account, currency, dividendRate_X, callback){
       db.collection(account).find({ type:"dividend_pathway", currency: currency, dividendRate: { $lte: dividendRate_X} },function (err, doc){
           var temp = []

           for(var i=0;i<doc.length;i++){
               if(JSON.stringify(temp).indexOf(doc[i].account) === -1){
               temp.push(doc[i])
               }
               else{

               // the account already has a doc, check if dividendRate is lower than the previous, filter out the highest one
               
               
               Array.prototype.filterObjects = function(key, value) {
                   return this.filter(function(x) { return x[key] === value; })
               }
               
               var a = temp.filterObjects("account", doc[i].account);
                
               if(a[0].dividendRate > doc[i].dividendRate){  
               temp = temp.filter(function (el) {
                        return el.account !== doc[i].account;
                       });
            
               temp.push(doc[i])                   
               }
                   
               }
              
           }
           
           
           
           
setTimeout(function(){ // todo: use async.waterfall instead of setTimeout
var doc_filtered = temp
    callback(doc_filtered)
    
}, 1000)
    
           
        })
        
        
        
  }


   function line_X_dividend_pathways(doc){

        for(var i=0;i<doc.length;i++){
            // filter out the root account
                  if(doc.account !== account_id){
                      
                     // filter out accounts that have been passed to avoid loops          
                     if(JSON.stringify(LINES).indexOf(doc[i].account) ===-1){
                         add_inventive_layer_penalties(doc[i])
                     } 
                  } 
                  else console.log("CIRCULAR")
        }
   }



    function add_inventive_layer_penalties(doc_X){
        
            var penalty_dividendRate
    db.collection(doc_X.account).find({ type:"incentive_layer_penalty", currency: currency },function (err, doc){
        if(doc.length!==0){
            
            // get the lowest dividend rate that user has a penalty at
       penalty_dividendRate = doc[0].dividendRate
       for(var j=0;j<doc.length;j++){
            if(penalty_dividendRate<doc[j].dividendRate<penalty_dividendRate){
            penalty_dividendRate = doc[j].dividendRate
            }
        }
        if(penalty_dividendRate<dividendRate_X){

        add_dividendRate_quotas(doc_X, dividendRate_quota_X, penalty_dividendRate)

        }
        else add_dividendRate_quotas(doc_X, dividendRate_quota_X)
        }
        else add_dividendRate_quotas(doc_X, dividendRate_quota_X)

    
})

}



    function add_dividendRate_quotas(doc,dividendRate_quota_X, penalty_dividendRate){ // todo: fix this
    //     
    if(doc.dividendRate <= dividendRate_X){
        
        var dividendRate_quota_X = new Fraction((doc.dividendRate *100),(dividendRate_X*100)).multiply(new Fraction(dividendRate_quota_X)).toString()



    }
    else dividendRate_quota_X = dividendRate_quota_X
    
    // More penalty code:
    if(penalty_dividendRate !== undefined){

        var dividendRate_quota_without_penalty = dividendRate_quota_X
        var dividendRate_quota_X = new Fraction((penalty_dividendRate *100),(dividendRate_X*100)).multiply(new Fraction(dividendRate_quota_X)).toString()

        
        

        }
dividendRate_quota_sum = new Fraction(dividendRate_quota_sum).add(new Fraction(dividendRate_quota_X)).toString()

push_to_LINES(doc, dividendRate_quota_X, penalty_dividendRate, dividendRate_quota_without_penalty)
    }
    
    
    function push_to_LINES(doc, dividendRate_quota_X, penalty_dividendRate, dividendRate_quota_without_penalty){




        if(penalty_dividendRate !== undefined)LINES.push({account: doc.account, pathway: doc.total_pathway, dividendRate_quota: dividendRate_quota_X, line: Number(line_X), dividendRate_quota_without_penalty: dividendRate_quota_without_penalty}) 
        else LINES.push({account: doc.account, pathway: doc.total_pathway, dividendRate_quota: dividendRate_quota_X, line: Number(line_X)}) //add total pathway here

       lines_for_X(doc.account, currency, doc.dividendRate, dividendRate_quota_X)

    }

        
    }

setTimeout(function(){


    callback(LINES, dividendRate_quota_sum, currency, account_id, dividend_amount)
    
}, 10000)
    
}
