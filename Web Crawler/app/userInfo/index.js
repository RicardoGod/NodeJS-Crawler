const userInfoService = require('./userInfoService')
const userInfoManager = require('./userInfoManager')
const userInfoDao 	  = require('./userInfoDao')

module.exports = (app,db) => {
	userInfoService(app,db);
	userInfoManager(app,db);
	userInfoDao(app,db);
}