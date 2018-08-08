const bodyParser = require('body-parser');
const expressaa = require ('express-async-await');
const express = require('express');
const cors = require('cors');
require('console-stamp')(console, 'HH:MM:ss.l')
const client = require('./config/elasticsearchClient');


const app = expressaa(express());

const corsOptions = {
		origin: true,
		preflightContinue : true,
		optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};


app.use(cors(corsOptions));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


require('./selectorResult')(app, {});
require('./userInfo')(app, {});
require('./userSelector')(app, {});
const jobs = require('./jobs')();

app.listen(3000, () => {
	console.log("Listening on port 3000")
});


app.get('/index', function (req, res){
	
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
		        		'crawlerDefId' : {'type'  : 'keyword'},
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