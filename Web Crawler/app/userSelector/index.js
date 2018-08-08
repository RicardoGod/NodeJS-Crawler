const userSelectorService = require('./userSelectorService')

module.exports = (app,db) => {
	userSelectorService(app,db);
}