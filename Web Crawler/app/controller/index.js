const userInfo 		 = require('./userInfoRS');
const selectorResult = require('./selectorResultRS');
const userSelector 	 = require('./userSelectorRS');


module.exports = (app, db) => {
//	userInfo(app, db);
//	selectorResult(app, db);
	userSelector(app, db);
}