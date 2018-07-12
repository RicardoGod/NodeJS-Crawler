var bodyParser = require('body-parser');
var expressaa = require ('express-async-await');
var express = require('express');
var Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);


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
		  webPreferences: {
		    webSecurity:false
		    }
		  });
	nightmare.goto(url)
			 //.wait(function(selectorParam){ return nightmare.exists(selectorParam)}, selector)
			 .evaluate(selectorParam => {
				 return document.querySelector(selectorParam).textContent;
			 }, selector)
			 .end()
			 .then(function (result) {
				 res.send("Value is: "+result);
			 })
			 .catch(function (error) {
				 console.error('Search failed:', error); 
				
				 res.send("ERROR");
			 });
	
});

app.get('/', function (req, res) {
	
	
	var nightmare = Nightmare({
		  waitTimeout: 5000,
		  webPreferences: {
		    webSecurity:false
		    }
		  });
	nightmare.goto('https://tools.euroland.com/tools/ticker/html/?companycode=pt-ctt&lang=pt-PT')
			 .wait('html > body.pt-PT > div > div.instrument.instrument_93868 > div.Container > div.PriceCont > div.Last > span.last')
			 .evaluate(function() {
				 return document.querySelector('html > body.pt-PT > div > div.instrument.instrument_93868 > div.Container > div.PriceCont > div.Last > span.last').innerText;
			 })
			 .end()
			 .then(function (result) {
				 
				 console.log('O valor das acções CTT atual é: ' + result +'€\n'); 
				 res.send("O valor das acções CTT atual é: "+result+ "€");
			 })
			 .catch(function (error) {
				 console.error('Search failed:', error); 
				 res.send("ERROR");
			 });
	
});


app.listen(3000, () => console.log("Listening on port 3000"));



