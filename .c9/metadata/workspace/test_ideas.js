{"filter":false,"title":"test_ideas.js","tooltip":"/test_ideas.js","undoManager":{"mark":19,"position":19,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":31,"column":4},"action":"insert","lines":["router.route('/removeAccount')","","    ","    .post(function(req, res) {","        ","        /* todo: oauth with req.body.oauth */","","","var WebSocket = require('ws')","","var websocket = new WebSocket('wss://s1.ripple.com')","","","var subscribeCommand = '{\"command\":\"unsubscribe\",\"id\":0,\"accounts\":[\"'+req.body.address+'\"]}'","","console.log(subscribeCommand)","","websocket.on('open', function(){","    console.log('Connected to the Ripple payment network')","    websocket.send(subscribeCommand)","   ","   ","})    ","    websocket.on('message', function(data){","        console.log('message', data)","","    })","","","    });","    ","    "]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":31,"column":4},"action":"remove","lines":["router.route('/removeAccount')","","    ","    .post(function(req, res) {","        ","        /* todo: oauth with req.body.oauth */","","","var WebSocket = require('ws')","","var websocket = new WebSocket('wss://s1.ripple.com')","","","var subscribeCommand = '{\"command\":\"unsubscribe\",\"id\":0,\"accounts\":[\"'+req.body.address+'\"]}'","","console.log(subscribeCommand)","","websocket.on('open', function(){","    console.log('Connected to the Ripple payment network')","    websocket.send(subscribeCommand)","   ","   ","})    ","    websocket.on('message', function(data){","        console.log('message', data)","","    })","","","    });","    ","    "]},{"start":{"row":0,"column":0},"end":{"row":16,"column":6},"action":"insert","lines":["var websocket = new WebSocket('wss://s1.ripple.com')","","","var subscribeCommand = '{\"command\":\"unsubscribe\",\"id\":0,\"accounts\":[\"'+req.body.address+'\"]}'","","console.log(subscribeCommand)","","websocket.on('open', function(){","    console.log('Connected to the Ripple payment network')","    websocket.send(subscribeCommand)","   ","   ","})    ","    websocket.on('message', function(data){","        console.log('message', data)","   ","    })"]}]}],[{"group":"doc","deltas":[{"start":{"row":16,"column":6},"end":{"row":17,"column":0},"action":"insert","lines":["",""]},{"start":{"row":17,"column":0},"end":{"row":17,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":17,"column":4},"end":{"row":18,"column":0},"action":"insert","lines":["",""]},{"start":{"row":18,"column":0},"end":{"row":18,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":18,"column":4},"end":{"row":19,"column":0},"action":"insert","lines":["",""]},{"start":{"row":19,"column":0},"end":{"row":19,"column":4},"action":"insert","lines":["    "]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":36},"end":{"row":3,"column":47},"action":"remove","lines":["unsubscribe"]},{"start":{"row":3,"column":36},"end":{"row":3,"column":37},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":37},"end":{"row":3,"column":38},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":38},"end":{"row":3,"column":39},"action":"insert","lines":["b"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":39},"end":{"row":3,"column":40},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":40},"end":{"row":3,"column":41},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":41},"end":{"row":3,"column":42},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":42},"end":{"row":3,"column":43},"action":"insert","lines":["i"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":43},"end":{"row":3,"column":44},"action":"insert","lines":["b"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":44},"end":{"row":3,"column":45},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":47},"end":{"row":3,"column":88},"action":"remove","lines":["\"id\":0,\"accounts\":[\"'+req.body.address+'\""]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":47},"end":{"row":3,"column":48},"action":"remove","lines":["]"]}]}],[{"group":"doc","deltas":[{"start":{"row":3,"column":46},"end":{"row":3,"column":47},"action":"remove","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":1,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":1,"column":0},"end":{"row":2,"column":0},"action":"insert","lines":["",""]}]}],[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":1,"column":0},"action":"insert","lines":["var WebSocket = require('ws')",""]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":1,"column":0},"end":{"row":1,"column":0},"isBackwards":true},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1428736419541,"hash":"40ce3137b40941f3775b113f3dfb242594e15661"}