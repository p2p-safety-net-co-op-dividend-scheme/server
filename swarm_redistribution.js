
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
var max_penalty_quota_sum = 0
    var penalty = Boolean



function compute_swarm(account_id, currency, callback){

lines(account_id)

function lines(account){
    

    db.collection(account).findOne({ type:"contract", currency: currency },function (err, doc){
    
    var dividendRate_line = doc.dividendRate
 db.collection(account).find({ type:"dividend_pathway", currency: currency },function (err, doc){
    

    for(var i=0;i<doc.length; i++){
            var temp_doc = doc[i] // quick fix
        
          if(JSON.stringify(LINES).indexOf(temp_doc.account) ===-1){
//if(doc[i].account == account_id){console.log("CIRCULAR)}
if(temp_doc.account !== account_id){
    var max_penalty
    

    // Let's add incentive layer penalties:

    db.collection(temp_doc.account).find({ type:"incentive_layer_penalty", currency: currency },function (err, doc){
        console.log(doc)
        if(doc.length!==0){
       max_penalty = doc[0].dividendRate
       for(var j=0;j<doc.length;j++){
            if(max_penalty<doc[j].dividendRate<max_penalty){
            max_penalty = doc[j].dividendRate
            }
        }
        if(max_penalty<dividendRate_line){penalty=true}
        console.log("max_penalty: "+max_penalty)
        
        }
    
    
    // Then continue again,
    console.log(temp_doc)
    if(temp_doc.dividendRate < dividendRate_line){
    var dividendRate_quota = temp_doc.dividendRate / dividendRate_line //eg. 0.02/0.03 = 0.66
    }
    else dividendRate_quota = 1
    
    // More penalty code:
    if(penalty == true){
        if(max_penalty < dividendRate_line){
            var max_penalty_quota = max_penalty / dividendRate_line
        }
        else max_penalty_quota = 1
    }
    
            console.log("max_penalty_quota: "+max_penalty_quota)
        if(penalty == true)LINES.push({account: temp_doc.account, pathway: temp_doc.total_pathway, dividendRate_quota: dividendRate_quota, max_penalty_quota: max_penalty_quota, line: Number(LINES.length)}) 
        else LINES.push({account: temp_doc.account, pathway: temp_doc.total_pathway, dividendRate_quota: dividendRate_quota, line: Number(LINES.length)}) 

       
       
       
        dividendRate_quota_sum = Number(dividendRate_quota_sum) + Number(dividendRate_quota)
        
        if(penalty == true){
        max_penalty_quota_sum = Number(max_penalty_quota_sum) + Number(max_penalty_quota)
        }
        else max_penalty_quota_sum = Number(max_penalty_quota_sum) + Number(dividendRate_quota)
              console.log("dividendRate_quota_sum: "+dividendRate_quota_sum)
              console.log("max_penalty_quota_sum: "+max_penalty_quota_sum)
    })
          }

        lines(temp_doc.account)
          }
          //else console.log("CIRCULAR")
    }



        });

    })
        
    }

setTimeout(function(){
console.log(LINES)


    if(penalty==true) callback(LINES, dividendRate_quota_sum, currency, account_id, max_penalty_quota_sum, penalty)
    else callback(LINES, dividendRate_quota_sum, currency, account_id)
    
}, 3000)
    
}


exports.compute_swarm = compute_swarm;