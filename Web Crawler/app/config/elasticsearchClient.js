const elasticsearch = require('elasticsearch');

module.exports = elasticsearch.Client({
		host: 		'localhost:9200',
		version:	'5.1',
		maxSockets:	'10',
		log:[
			{
			    type: 'file',
			    level: 'trace',
			    path: '../logs/elasticsearch.log'
			},
			{
			    type: 'console',
			    level: 'trace'
			}
		] 	
	});