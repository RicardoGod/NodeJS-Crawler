var express = require('express');
var Nightmare = require('nightmare');
require('nightmare-iframe-manager')(Nightmare);


var app = express();

app.get('/', (req, res) => {
	
	
	var nightmare = Nightmare({
		  waitTimeout: 5000,
		  webPreferences: {
		    webSecurity:false
		    }
		  });
	nightmare.goto('https://www.ctt.pt/ctt-e-investidores/acao-ctt/cotacao.html')
			 .wait('#iframe_cotacao')
			 .enterIFrame('#iframe_cotacao')
			 .wait('#Ticker8 > table > tbody > tr.TickerRow.OddRow.Ticker_OddRow.Ticker_SelectedRow > td.TickerValueTD.TickerValueTD_LastPrice > span')
			 .evaluate(function() {
				 return document.querySelector('#Ticker8 > table > tbody > tr.TickerRow.OddRow.Ticker_OddRow.Ticker_SelectedRow > td.TickerValueTD.TickerValueTD_LastPrice > span').textContent;
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



