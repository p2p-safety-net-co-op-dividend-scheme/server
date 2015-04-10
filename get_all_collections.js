/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds035448.mongolab.com:35448/bootable_version");   


function get_all_collections(callback){

db.getCollectionNames(function(err,res){
    var collections = []
        for(var i =0;i<res.length;i++){
            if(res[i] !== 'system.indexes'){
                collections.push(res[i])
            }
        }
        callback(collections)
        
    })
}

exports.get_all_collections = get_all_collections;