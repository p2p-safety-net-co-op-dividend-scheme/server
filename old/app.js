/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds035448.mongolab.com:35448/bootable_version");   
exports.db = db;


 var connect_to_ripple = require('./connect_to_ripple.js')
 connect_to_ripple.connect(db)

