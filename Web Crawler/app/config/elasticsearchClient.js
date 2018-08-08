const elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
		keepAlive: true,
		host: 		'localhost:9200',
		version:	'5.1',
		maxSockets:	'10',
		log:[
//			{
//			    type: 'file',
//			    level: 'trace',
//			    path: '../logs/elasticsearch.log'
//			},
			{
			    type: 'console',
			    level: 'trace'
			}
		] 	
	});


module.exports = client;