var bodyParser = require('body-parser');
var expressaa = require ('express-async-await');
var express = require('express');
var Nightmare = require('nightmare');


var app = expressaa(express());
app.use( express.json() );      
//app.use( express.urlencoded() );

app.options('/add', (req, res) => {
	res.setHeader('Access-Control-Allow-Headers','Access-Control-Allow-Origin , Access-Control-Allow-Headers, Content-Type');
	res.setHeader('Access-Control-Allow-Origin','*');
	res.send();
});

app.post('/add',(req, res) => {

	res.setHeader('Access-Control-Allow-Headers','Access-Control-Allow-Origin ,  Access-Control-Allow-Headers, Content-Type');
	res.setHeader('Access-Control-Allow-Origin','*');
	var selector = req.body.selector;
	if(!selector){
		res.status(400);
		res.send("Parameter [selector] is missing.");
	}
	
	var url = req.body.url;
	if(!url){
		res.status(400);
		res.send("Parameter [url] is missing.");
	}
	
	var nightmare = Nightmare({
		  waitTimeout: 5000,
		  executionTimeout : 5000,
		  poolInterval : 50
	});
	
	nightmare.on('console', (log, msg) => {
			     console.log(msg)
			 })
			 .goto(url)
			 .wait(function(selector){
				 return document.querySelector(selector).textContent.trim() != '';
			 }, selector)
			 .evaluate(function(selector){
				 return document.querySelector(selector).textContent;
			 }, selector)
			 .end()
			 .then(function (result) {
				 console.log("Value is: "+result);
				 res.send("Value is: "+result);
				 return result;
			 })
			 .catch(function (error) {
				 console.error('Search failed:', error); 
				 res.send("ERROR");
			 });
	
	
});

app.get('/', function (req, res) {
	
	var Nightmare = require('nightmare');
	var n = Nightmare();
	var value;

	Promise.resolve()
	.then(function () { 
	  return n.goto('https://tools.euroland.com/tools/ticker/html/?companycode=pt-ctt&lang=pt-PT')
	    .wait(function(){ return document.querySelector('body > div > div > div > div.PriceCont > div.Last > span').textContent.trim() != '' })
	    .evaluate(function () {
	      var element = document.querySelector('body > div > div > div > div.PriceCont > div.Last > span');
	      return {
	          value: element.textContent
	      }
	    });
	})
	.then(function (_value) {
	  value = _value;
	  n.end();
	})  
	.then(function () {
	  console.log(value);    // <-- prints out "undefined" (expected to see a DOM element)
	});
    
    
    
});


app.listen(3000, () => console.log("Listening on port 3000"));



