/* app.js
* manages the API and boots up connections to different financial platforms via boot.js
*/


/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds035448.mongolab.com:35448/bootable_version");   


var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 4730,function(){
  console.log("Started on PORT 4730");
})    





// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


router.route('/setdividendRate')

    
    .post(function(req, res) {
        
        /* todo: oauth with req.body.oauth */
        
  // upsert dividendRate
    db.collection(req.body.address).findAndModify({
        query: {type: "contract", currency: req.body.currency}, 
        update:{$set:{dividendRate: req.body.dividendRate}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
            res.json(doc); 
        })    
        
        add_to_subscribe_list()
    function add_to_subscribe_list(){
        
var WebSocket = require('ws')

var websocket = new WebSocket('wss://s1.ripple.com')


var subscribeCommand = '{"command":"subscribe","id":0,"accounts":["'+req.body.address+'"]}'

console.log(subscribeCommand)

websocket.on('open', function(){
    console.log('Connected to the Ripple payment network')
    websocket.send(subscribeCommand)
   
   
})    
    websocket.on('message', function(data){
        console.log('message', data)
   
    })
    }
        


    });
    
    
   

router.route('/sign_dividends')

 
    .post(function(req, res) {
        console.log(req.body)
        
        
        
db.collection(req.body.address).find({
        query: {type: "unsigned_dividends"}
    }, function(err,doc){
        console.log(doc)
        for(var i=0; i<doc.length;i++){
        unsigned_dividend_payments(doc[i].currency, doc[i].dividendRate, doc[i].total_amount)
        }   
    })

function unsigned_dividend_payments(currency, dividendRate, total_amount){
    
    compute_swarm(req.body.address, currency, find_highest_accumulated_dividend)
function compute_swarm(account_id, currency, callback){
        var LINES = []
lines_for_X(account_id)
    function lines_for_X(account){
        db.collection(account).find({ type:"dividend_pathway", currency: currency },function (err, doc){
        for(var i=0;i<doc.length;i++){
        if(LINES.indexOf(account_id) === -1){
            if(LINES.indexOf(doc[i].account) === -1){
            LINES.push(doc[i].account)
            lines_for_X(doc[i].account)
            
            }
        }
        }
    })
    
}


setTimeout(function(){


    callback(LINES, currency)
    
}, 4000)
    
}




function find_highest_accumulated_dividend (LINES, currency){

    
  
console.log(LINES)

var lines = LINES
var highest_accumulated_dividend = {"account": "", currency: currency, "accumulated_amount": 0}
var i = 0
loop(lines)
    function loop(lines){

    var account_in_lines = lines[i]

          // upsert safety net (sum of all safety_net_pathways)
    db.collection(lines[i]).findOne({
        query: {type: "accumulated_dividends", currency: currency}

        
    }, 
        function(err,doc){
// filter out highest accumulated ammount (Optimization Layer)

            if (highest_accumulated_dividend.accumulated_amount < doc.accumulated_dividends){
                
              
            highest_accumulated_dividend = {"account": account_in_lines, currency: currency, "accumulated_amount": doc.accumulated_dividends}
            
            
            
            }
            
        i++

    if(i<lines.length){
        loop(lines)
    }
    else{

        do_it(JSON.stringify(highest_accumulated_dividend));
    } 
            
        })
    


    }
    
    
}

        function do_it(highest_accumulated_dividend){
           
           
                var destination_tag = Math.floor((Math.random() * 10000) + 1);
                
                var dividend_amount
                if(Number(String(JSON.parse(highest_accumulated_dividend).accumulated_amount).slice(0,16))<=total_amount){
                    dividend_amount = Number(String(JSON.parse(highest_accumulated_dividend).accumulated_amount).slice(0,16)) // find better truncate-method
                }
                else dividend_amount =  Number(String(total_amount).slice(0,16))
                console.log(dividend_amount)
                
                     // upsert pending_dividendSignature
    db.collection(req.body.address).findAndModify({
        query: {type: "pending_dividendSignature", currency: JSON.parse(highest_accumulated_dividend).currency, dividendRate: dividendRate}, 
        update:{$set:{destination_tag: destination_tag, amount: dividend_amount}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
        })    


        
                
                res.json({ account: JSON.parse(highest_accumulated_dividend).account, currency: JSON.parse(highest_accumulated_dividend).currency, amount: dividend_amount, destination_tag: destination_tag}); 
           
            
        }
}

    });






    
    



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /v1
app.use('/v1', router);



var boot = require('./boot.js')

boot.boot()