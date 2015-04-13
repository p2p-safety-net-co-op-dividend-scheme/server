/* boot.js
* boots up connections to: Ripple
* 
*/

/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds035448.mongolab.com:35448/bootable_version");   


exports.boot = function(){

var connect_to_ripple = require('./connect_to_ripple.js')

var collections = []

db.getCollectionNames(function(err, res){
        for(var i =0;i<res.length;i++){
            if(res[i] !== 'system.indexes' && res[i].length == "r3DbjmNpTAKCLHTBnb1rGh5dVtjULZHURe".length){
                collections.push(res[i])
            }
        }
        connect_to_ripple.connect(collections)
        console.log(collections)
        })


}