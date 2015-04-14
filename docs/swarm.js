/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds035448.mongolab.com:35448/bootable_version");   


// The functions in Swarm Redistribution, isolated so you can study them.

/* Steps:
* lines_for_X()
* filter_dividend_pathways_by_dividendRate()
* line_X_dividend_pathways()
* add_inventive_layer_penalties()
* add_dividendRate_quotas()
* push_to_LINES()
*
* lines_for_X
* ...
* ...
* ...
* ...
* ...
* callback()
*/


/*
* upsert_accumulated_dividends()
* calculate_dividend_fractions()
*
*/


var account = "rLaKjMvLbrAJwnH4VpawQ6ot9epZqJmbfQ"
var currency = "RES"
var dividendRate = "0.04"


filter_dividend_pathways_by_dividendRate(account, currency, dividendRate)
  function filter_dividend_pathways_by_dividendRate(account, currency, dividendRate_X, callback){
       db.collection(account).find({ type:"dividend_pathway", currency: currency, dividendRate: { $lte: dividendRate_X} },function (err, doc){
           console.log(doc)
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
console.log(temp)
var doc_filtered = temp

    callback(doc_filtered)
    
}, 3000)
    
           
        })
        
        
        
  }
  
  
  exports.filter_dividend_pathways_by_dividendRate = filter_dividend_pathways_by_dividendRate