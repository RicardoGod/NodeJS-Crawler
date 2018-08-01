
const client = require('../config/elasticsearchClient');
const Nightmare = require('nightmare');
let userSelector = require('../model/userSelector');

module.exports = app => {
	
	app.options('/add', function(req,res){
		res.setHeader('Access-Control-Allow-Headers','Access-Control-Allow-Origin ,  Access-Control-Allow-Headers, Content-Type');
		res.setHeader('Access-Control-Allow-Origin','*');
		res.status(200).end();
	});
	
	app.post('/add', function(req, res){
		
//		let selector = req.body.selector;
		userSelector.selector = req.body.selector;
		
		if(!userSelector.selector || userSelector.selector == undefined || userSelector.selector.trim() == ''){
			res.status(400);
			res.send("Parameter [selector] is missing.");
		}
		
//		let url = req.body.url;
		userSelector.url = req.body.url;
		if(!userSelector.url || userSelector.url == undefined || userSelector.url.trim() == ''){	
			res.status(400);
			res.send("Parameter [url] is missing.");
		}
		
//		let clientId = req.body.clientId;
		userSelector.clientId = req.body.clientId;
		if(!userSelector.clientId || userSelector.clientId == undefined || userSelector.clientId.trim() == ''){	
			res.status(400);
			res.send("Parameter [clientId] is missing.");
		}
		
		
//		let body = {
//			'clientId':	clientId,
//			'url'	  :	url,
//			'selector':	selector
//		}
		
		var body_query = build_body_query(userSelector)
		
		client.count({
			index: 'crawler-index',
			type : 'crawler_definition',
			body : body_query
		}, function(error, success){
			if(error){
				res.status(500).send(error);
			}
			else if(success){
				if(success.count <= 0){
					client.index({
						index: 'crawler-index',
						type : 'crawler_definition',
						body : userSelector
					});
					res.status(201).end();
				}
				else{
					res.status(409).send("The resource already exists");
				}
			}
			else{
				res.status(500).end();
			}
		});	
		
	});
	
	app.get('/index', function (req, res){
		
	//	var d = new Date();
	//	var year = new String(d.getFullYear());
	//	var month = new String(d.getMonth()).lpad(0,2);
	//	var day = new String(d.getDay()).lpad(0,2);
	//	var hours = new String(d.getHours()).lpad(0,2);
	//	var minutes = new String(d.getMinutes()).lpad(0,2);
	//	var dateTime = year+month+day+hours+minutes;
		
		client.indices.create({
			index: 'crawler-index',
			body: {
				'settings' : {
					'number_of_replicas': 0,
					'number_of_shards': 1,
				},			
				'mappings' : {
			        'crawler_definition' : {
			            'properties' : {
			                'clientId' : { 'type' : 'keyword' },
			                'url' : {'type': 'keyword'},
			                'selector' : { 'type': 'keyword'}
			            }
			        },
			        'crawler_results': {
			        	'properties' : {
			        		'crawler_def_id' : {'type'  : 'keyword'},
			        		'result' : {'type' : 'keyword'}
			        	}
			        }
			    }
				
			}
		}, function(err,resp){
			if(err){
				console.log(err);
				res.status(400).send(err);
			}
			else{
				console.log('Response: '+resp);
				res.status(200).end();
			}
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
		  n.end()
		})  
		.then(function () {
		  console.log(value);    // <-- prints out "undefined" (expected to see a DOM element)
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
			var field_query = { "match": {} };
			field_query.match[field]=  must[field];
			
			body_query.query.bool.must.push(field_query);
		}
	
	if(must_not)
		//Insert must_not fields
		for(var field in must_not){
			var field_query = { "match": {} };
			field_query.match[field]=  must_not[field];
	
			body_query.query.bool.must.push(field_query);
		}
	
	if(should)
		//Insert should fields
		for(var field in should){
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
	
