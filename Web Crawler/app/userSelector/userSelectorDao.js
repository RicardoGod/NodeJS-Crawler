const client = require('../config/elasticsearchClient');

function countUserSelector(body_query, callback){
	client.count({
		index: 'crawler-index',
		type : 'crawler_definition',
		body : body_query
	}, function(error,success) {
		callback(error,success);
	});
	
};
	
function addUserSelector(userSelector){
	client.index({
		index: 'crawler-index',
		type : 'crawler_definition',
		body : userSelector.toJSON()
	});
}

module.exports.countUserSelector = countUserSelector ;
module.exports.addUserSelector = addUserSelector ;