var WebSocket = require('ws')


var websocket = new WebSocket('wss://s1.ripple.com')


var subscribeCommand = '{"command":"subscribe"}'

console.log(subscribeCommand)

websocket.on('open', function(){
    console.log('Connected to the Ripple payment network')
    websocket.send(subscribeCommand)
   
   
})    
    websocket.on('message', function(data){
        console.log('message', data)
   
    })
    
    
    