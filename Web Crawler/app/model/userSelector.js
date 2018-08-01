module.exports = class UserSelector{
	
	constructor(){
		this.clientId = new String();
		this.url = new String();
		this.selector = new String();
		this.id = new String();
	}
	
	get clientId(){ return this.clientId; }
	set clientId(_clientId) { this.clientId = _clientId; }
	
	get url(){ return this.url;	}
	set url(_url) { this.url = _url; }
	
	get selector(){ return this.selector; }
	set selector(_selector) { this.selector = _selector; }
	
	get id(){ return this.id;	}
	set id(_id) { this.id = _id; }
	
};