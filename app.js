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


    });
    
    
   

router.route('/sign_dividends')

 
    .post(function(req, res) {
        console.log(req.body)
        
        
        
db.collection(req.body.address).find({
        query: {type: "unsigned_dividends"}
    }, function(err,doc){
        console.log(doc)
        for(var i=0; i<doc.length;i++){
        unsigned_dividend_payments(doc[i].currency, doc[i].total_amount)
        }   
    })

function unsigned_dividend_payments(currency, total_amount){

        var swarm = require('./swarm_redistribution.js')
        swarm.compute_swarm(req.body.address, currency, do_it)
        
        
        function do_it(lines, account){
            console.log(total_amount)
            var find_highest_accumulated_dividend = require('./find_highest_accumulated_dividend.js')

            find_highest_accumulated_dividend.find_highest_accumulated_dividend(lines, currency, function(data){
                console.log(data)
                console.log()
                var destination_tag = Math.floor((Math.random() * 10000) + 1);
                
                var dividend_amount
                if(Number(String(JSON.parse(data).accumulated_amount).slice(0,16))<=total_amount){
                    dividend_amount = Number(String(JSON.parse(data).accumulated_amount).slice(0,16)) // find better truncate-method
                }
                else dividend_amount =  Number(String(total_amount).slice(0,16))
                console.log(dividend_amount)
                
                     // upsert pending_dividendSignature
    db.collection(req.body.address).findAndModify({
        query: {type: "pending_dividendSignature", currency: JSON.parse(data).currency}, 
        update:{$set:{destination_tag: destination_tag, amount: dividend_amount}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
            res.json(doc); 
        })    


        
                
                res.json({ account: JSON.parse(data).account, currency: JSON.parse(data).currency, amount: dividend_amount, destination_tag: destination_tag}); 
            })
            
        }
}

    });





router.route('/removeAccount')

    
    .post(function(req, res) {
        
        /* todo: oauth with req.body.oauth */

db.collection(req.body.address).drop(function(err,res){console.log(res)})

var WebSocket = require('ws')

var websocket = new WebSocket('wss://s1.ripple.com')


var subscribeCommand = '{"command":"unsubscribe","id":0,"accounts":["'+req.body.address+'"]}'

console.log(subscribeCommand)

websocket.on('open', function(){
    console.log('Connected to the Ripple payment network')
    websocket.send(subscribeCommand)
   
   
})    
    websocket.on('message', function(data){
        console.log('message', data)
   
    })


                res.json("Removed all data for account: " +req.body.address); 


    });
    
    



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/v1', router);



var boot = require('./boot.js')

boot.boot()