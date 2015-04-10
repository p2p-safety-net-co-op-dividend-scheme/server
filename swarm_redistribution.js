
/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds035448.mongolab.com:35448/bootable_version");   

var LINES = []

function compute_swarm(account, currency, callback){

lines(account)

function lines(account){
 db.collection(account).find({ type:"dividend_pathway", currency: currency },function (err, doc){
    
        

    for(var i=0;i<doc.length; i++){
        
          
          if(JSON.stringify(LINES).indexOf(doc[i].account)===-1){
if(doc[i].account == account){console.log("FUCKKKK")}
if(doc[i].account != account){
       LINES.push({account: doc[i].account, pathway: doc[i].total_pathway, line: Number(LINES.length)}) 

              
          }

        lines(doc[i].account)
          }
          //else console.log("CIRCULAR")
    }



        });
}

setTimeout(function(){
    console.log(LINES)
    callback(LINES, account)}, 3000)

}


exports.compute_swarm = compute_swarm;