## Wiki: Swarm Redistribution


![alt tag](http://i.imgur.com/TNwsT37.png)


<b>FAQ</b>: If I've created multiple <a href="https://www.youtube.com/watch?v=bxyjt2T_nLQ">dividend pathways</a> to one node, but in different dividendRates ?

<b>If a node has multiple dividend pathways, it will use the most efficient one. </b>

See
<a href="https://gist.github.com/resilience-me/93f9fefc562012f0383e">
```js
filter_dividend_pathways_by_dividendRate()
```
</a>

in <a href="https://github.com/p2p-safety-net-co-op-dividend-scheme/server/blob/master/swarm_redistribution.js">swarm_redistribution.js</a>
