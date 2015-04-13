/* find_dividend_pathway_line_between_nodes.js */


/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds035448.mongolab.com:35448/bootable_version");   

/*
var address = "r46XJq7UJmoPno2cURDRs8bB9crRLJgpcY"
var destination = "rJqpM2tzsHT5c8obB3wCzjbaKaF2WP6qB9"
var currency = "RES"

  find_dividend_pathway_line_between_nodes(address, destination, function(data){console.log(data)})
*/  
                function find_dividend_pathway_line_between_nodes(address, destination, currency, callback){//export.find_dividend_pathway_line_between_nodes on bottom of script
                    // could use safety-net-pathways here
                     var LINES = []
            lines_for_X(address)
    function lines_for_X(account){
        db.collection(account).find({ type:"dividend_pathway", currency: currency },function (err, doc){
           
        for(var i=0;i<doc.length;i++){
            if(doc[i].account === destination){
                LINES.push({from:account,to:doc[i].account})

                //console.log("found")
                //console.log(LINES)

filter_out_path_from_destination_to_account()
                                                break


            }
            
        if(LINES.indexOf(account) === -1){
            if(LINES.indexOf(doc[i].account) === -1){
            LINES.push({from:account,to:doc[i].account})
            lines_for_X(doc[i].account)
            
            }
        }
        }
        
             /* 
                var PATH = []

                var last = LINES[LINES.length-1] //add to PATH
                var filteredArray = LINES.filter(function (element) { 
                    return element.to === last.from;
                    });
                var filteredArray_next = LINES.filter(function (element) { 
                    return element.to === filteredArray.from;
                    });    
                
            console.log(last)
            console.log(LINES.indexOf({to: last.from}))
            
console.log(filteredArray)

last = filteredArray
*/




    })
    
    
    
}

function filter_out_path_from_destination_to_account(){
var PATH = []
var last = LINES[LINES.length-1]
PATH.push(last)
for(var i=(LINES.length-1);i>0;i--){ // set loop limit to LINES.length

    if(LINES[i].from !== address){
    var filteredArray = LINES.filter(function (element) { 
    return element.to === last.from;
});
PATH.push(filteredArray[0])
last = filteredArray
}
else{
PATH.push(LINES[i])

callback(PATH)
break
}

}
    
}


                }


exports.find_dividend_pathway_line_between_nodes = find_dividend_pathway_line_between_nodes
                
                