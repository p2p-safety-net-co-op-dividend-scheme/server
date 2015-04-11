
/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds035448.mongolab.com:35448/bootable_version");   




var LINES = []
var dividendRate_quota_sum = 0
    var penalty = Boolean



function compute_swarm(account_id, currency, dividend_amount, callback){

lines_for_X(account_id)

function lines_for_X(account){
    

    db.collection(account).findOne({ type:"contract", currency: currency },function (err, doc){
    
    var dividendRate_line = doc.dividendRate
 db.collection(account).find({ type:"dividend_pathway", currency: currency },function (err, doc){
    

    for(var i=0;i<doc.length; i++){
            var temp_doc = doc[i] // quick fix
        
          if(JSON.stringify(LINES).indexOf(temp_doc.account) ===-1){
//if(doc[i].account == account_id){console.log("CIRCULAR)}
if(temp_doc.account !== account_id){
    var penalty_dividendRate
    

    // Let's add incentive layer penalties:

    db.collection(temp_doc.account).find({ type:"incentive_layer_penalty", currency: currency },function (err, doc){
        console.log(doc)
        if(doc.length!==0){
            
            // get the lowest dividend rate that user has a penalty at
       penalty_dividendRate = doc[0].dividendRate
       for(var j=0;j<doc.length;j++){
            if(penalty_dividendRate<doc[j].dividendRate<penalty_dividendRate){
            penalty_dividendRate = doc[j].dividendRate
            }
        }
        if(penalty_dividendRate<dividendRate_line){penalty=true}
        console.log("penalty_dividendRate: "+penalty_dividendRate)
        
        }
    
    //temp_doc.dividendRate
    //penalty_dividendRate
    
    // Then continue again,
    console.log(temp_doc)
    if(temp_doc.dividendRate < dividendRate_line){
    var dividendRate_quota = temp_doc.dividendRate / dividendRate_line //eg. 0.02/0.03 = 0.66
    }
    else dividendRate_quota = 1
    
    
    // More penalty code:
    if(penalty == true){
        var dividendRate_quota_without_penalty = dividendRate_quota
            var dividendRate_quota = penalty_dividendRate / dividendRate_line
            console.log("dividendRate_quota_without_penalty: "+dividendRate_quota_without_penalty)
        }
    
    
            
            console.log("dividendRate_quota: "+dividendRate_quota)

            
            
        if(penalty == true)LINES.push({account: temp_doc.account, pathway: temp_doc.total_pathway, dividendRate_quota: dividendRate_quota, dividendRate_quota_without_penalty: dividendRate_quota_without_penalty, line: Number(LINES.length)}) 
        else LINES.push({account: temp_doc.account, pathway: temp_doc.total_pathway, dividendRate_quota: dividendRate_quota, line: Number(LINES.length)}) 

       
       
       
        dividendRate_quota_sum = Number(dividendRate_quota_sum) + Number(dividendRate_quota)
        
        
        
              console.log("dividendRate_quota_sum: "+dividendRate_quota_sum)
    })
          }

        lines_for_X(temp_doc.account)
          }
          //else console.log("CIRCULAR")
    }



        });

    })
        
    }

setTimeout(function(){
console.log(LINES)


    //callback(LINES, dividendRate_quota_sum, currency, account_id, dividend_amount)
    
}, 3000)
    
}


exports.compute_swarm = compute_swarm;