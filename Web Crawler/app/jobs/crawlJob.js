const schedule = require('node-schedule');
//const client = require('../config/elasticsearchClient');

var rule = new schedule.RecurrenceRule();
rule.second = [0, new schedule.Range(0, 59, 10)];  //every 10 seconds

var crawlJob = schedule.scheduleJob(rule, function(){
	console.log('Another 10 seconds has passed!');
});


/* ============================================================ *
 * 						AUXILIARY METHODS						*
 * ============================================================ */

function getAllActiveSelectors(){
	
}

module.exports = crawlJob;