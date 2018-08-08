

const Nightmare = require('nightmare');
const UserSelector = require('./userSelector');
const UserSelectorManager = require('./userSelectorManager');


module.exports = app => {

app.post('/add', function(req, res){
	
	var uselector = new UserSelector();
	uselector.selector = req.body.selector;
	if(!uselector.selector || uselector.selector == undefined || uselector.selector.trim() == ''){
		res.status(400);
		res.send("Parameter [selector] is missing.");
	}
	
	uselector.url = req.body.url;
	if(!uselector.url || uselector.url == undefined || uselector.url.trim() == ''){	
		res.status(400);
		res.send("Parameter [url] is missing.");
	}
	
	uselector.clientId = req.body.clientId;
	if(!uselector.clientId || uselector.clientId == undefined || uselector.clientId.trim() == ''){	
		res.status(400);
		res.send("Parameter [clientId] is missing.");
	}
	
	UserSelectorManager.addUserSelector(uselector, function (error, success){
		if(error){
			return res.status(error.code).send(error.message);
		}
		else{
			return res.status(success.code).end();
		}
	});
	
	
//	client.count({
//		index: 'crawler-index',
//		type : 'crawler_definition',
//		body : body_query
//	}, function(error, success){
//		if(error){
//			res.status(500).send(error);
//		}
//		else if(success){
//			if(success.count <= 0){
//				client.index({
//					index: 'crawler-index',
//					type : 'crawler_definition',
//					body : uselector.toJSON()
//				});
//				res.status(201).end();
//			}
//			else{
//				res.status(409).send("The resource already exists");
//			}
//		}
//		else{
//			res.status(500).end();
//		}
//	});	
	
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
	  n.end()
	})  
	.then(function () {
	  console.log(value);  
	  res.status(200).send(value);
	});
       
});
}




/*============================================================ Auxiliary Methods ==============================================================*/

/**
 * Fill with padString on left side of String till it reach the length given.
 */
String.prototype.lpad = function(padString, length) {
	var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}


/**
 * Auxiliary function to build elasticsearch body query 
 */
function build_body_query(must, must_not, should, from, size, aggs){
	var body_query = 
	{
		"query": {
			"bool" : {
				"must": [],
				"must_not" : [],
				"should" : []
			}
		}
	};
	
	if(must)
		//Insert must fields
		for(var field in must){
			if(must[field]==undefined || must[field]=='') 
				continue; 
			var field_query = { "match": {} };
			field_query.match[field]=  must[field];
			
			body_query.query.bool.must.push(field_query);
		}
	
	if(must_not)
		//Insert must_not fields
		for(var field in must_not){
			if(must_not[field]==undefined || must_not[field]=='') 
				continue; 
			var field_query = { "match": {} };
			field_query.match[field]=  must_not[field];
	
			body_query.query.bool.must.push(field_query);
		}
	
	if(should)
		//Insert should fields
		for(var field in should){
			if(should[field]==undefined || should[field]=='') 
				continue;
			var field_query = { "match": {} };
			field_query.match[field]=  should[field];
			
			body_query.query.bool.must.push(field_query);
		}
	
	return body_query;
}


//app.options('/add', (req, res) => {
//	res.setHeader('Access-Control-Allow-Headers','Access-Control-Allow-Origin , Access-Control-Allow-Headers, Content-Type');
//	res.setHeader('Access-Control-Allow-Origin','*');
//	res.send();
//});


//app.post('/add',(req, res) => {
//
//	res.setHeader('Access-Control-Allow-Headers','Access-Control-Allow-Origin ,  Access-Control-Allow-Headers, Content-Type');
//	res.setHeader('Access-Control-Allow-Origin','*');
//	var selector = req.body.selector;
//	if(!selector){
//		res.status(400);
//		res.send("Parameter [selector] is missing.");
//	}
//	
//	var url = req.body.url;
//	if(!url){
//		res.status(400);
//		res.send("Parameter [url] is missing.");
//	}
//	
//	var nightmare = Nightmare({
//		  waitTimeout: 5000,
//		  executionTimeout : 5000,
//		  poolInterval : 50
//	});
//	
//	nightmare.on('console', (log, msg) => {
//			     console.log(msg)
//			 })
//			 .goto(url)
//			 .wait(function(selector){
//				 return document.querySelector(selector).textContent.trim() != '';
//			 }, selector)
//			 .evaluate(function(selector){
//				 return document.querySelector(selector).textContent;
//			 }, selector)
//			 .end()
//			 .then(function (result) {
//				 console.log("Value is: " + result);
//				 res.send("Value is: " + result);
//				 return result;
//			 })
//			 .catch(function (error) {
//				 console.error('Search failed:', error); 
//				 res.send("ERROR");
//			 });
//	
//	
//});
	
