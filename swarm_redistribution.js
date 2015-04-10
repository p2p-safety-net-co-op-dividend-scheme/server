
/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds035448.mongolab.com:35448/bootable_version");   

/* boot test erase later
var account = "r46XJq7UJmoPno2cURDRs8bB9crRLJgpcY"
var dividendRate = 0.02
compute_swarm(account, "RES", function(data){console.log(data)})
boot test erase later*/


var LINES = []
var dividendRate_quota_sum = 0
function compute_swarm(account_id, currency, callback){

lines(account_id)

function lines(account){
    

    db.collection(account).findOne({ type:"contract", currency: currency },function (err, doc){
    
    var dividendRate_line = doc.dividendRate
 db.collection(account).find({ type:"dividend_pathway", currency: currency },function (err, doc){
    

    for(var i=0;i<doc.length; i++){
          if(JSON.stringify(LINES).indexOf(doc[i].account) ===-1){
//if(doc[i].account == account_id){console.log("CIRCULAR)}
if(doc[i].account !== account_id){

    if(doc[i].dividendRate < dividendRate_line){
    var dividendRate_quota = doc[i].dividendRate / dividendRate_line //eg. 0.02/0.03 = 0.66
    }
    else dividendRate_quota = 1
       LINES.push({account: doc[i].account, pathway: doc[i].total_pathway, dividendRate_quota: dividendRate_quota, line: Number(LINES.length)}) 
        dividendRate_quota_sum = Number(dividendRate_quota_sum) + Number(dividendRate_quota)
              console.log("dividendRate_quota_sum: "+dividendRate_quota_sum)
          }

        lines(doc[i].account)
          }
          //else console.log("CIRCULAR")
    }



        });

    })
        
    }

setTimeout(function(){

    callback(LINES, dividendRate_quota_sum, currency, account_id)}, 3000)

}


exports.compute_swarm = compute_swarm;