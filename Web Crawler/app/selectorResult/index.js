const selectorResultService = require('./selectorResultService')
const selectorResultManager = require('./selectorResultManager')
const selectorResultDao = require('./selectorResultDao')

module.exports = (app,db) => {
	selectorResultService(app,db);
	selectorResultManager(app,db);
	selectorResultDao(app,db);
}