//const UserSelector = require('./userSelector');
const userSelectorDao = require('./userSelectorDao');

function addUserSelector(userSelector, callback){
	
	var body_query = build_body_query(userSelector);
	
	userSelectorDao.countUserSelector(body_query, function(error, success){
		if(error){
			return callback({code: 500, message: error}, null);
		}
		else if(success){
			if(success.count <= 0){
				userSelectorDao.addUserSelector(userSelector);
				return callback(null, {code: 201, message: success});
			}
			else{
				return callback({code: 409, message: "The resource already exists"}, null ); 
			}
		}
		else{
			return callback({code: 500, message: "Unknown Error"}, null);
		}
	});	
	
	
};

module.exports.addUserSelector = addUserSelector;


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