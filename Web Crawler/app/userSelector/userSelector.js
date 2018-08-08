module.exports = class UserSelector{
	
	constructor(){
		this.clientId = new String();
		this.url = new String();
		this.selector = new String();
		this.id = undefined;
	}
	
	get _clientId(){ return this.clientId; }
	set _clientId(value) { this.clientId = value; }
	
	get _url(){ return this.url;	}
	set _url(value) { this.url = value; }
	
	get _selector(){ return this.selector; }
	set _selector(value) { this.selector = value; }
	
	get _id(){ return this.id;	}
	set _id(value) { this.id = value; }
	
	toJSON() {
	    let {clientId, url, selector} = this;
	    return {clientId, url, selector};
	}
	
};