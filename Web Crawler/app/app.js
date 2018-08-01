const bodyParser = require('body-parser');
const expressaa = require ('express-async-await');
const express = require('express');
const fs = require('fs');
const schedule = require('node-schedule');
//const cors = require('cors');


const app = expressaa(express());
/*
const corsOptions = {
		origin: process.env.ENDPOINT,
		preflightContinue : true,
		optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
*/

//app.use(cors(corsOptions));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));



require('./controller')(app, {});
require('./manager')(app, {});
require('./dao')(app, {});

app.listen(3000, () => {
	console.log("Listening on port 3000")
});
