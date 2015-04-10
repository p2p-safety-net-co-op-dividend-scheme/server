/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds035448.mongolab.com:35448/bootable_version");   


var connect_to_ripple = require('./c.js')

var collections = []

db.getCollectionNames(function(err, res){
        for(var i =0;i<res.length;i++){
            if(res[i] !== 'system.indexes'){
                collections.push(res[i])
            }
        }
        connect_to_ripple.connect(collections)
        console.log(collections)
        })
