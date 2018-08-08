module.exports = class SelectorResult{
	
	constructor(){
		this.crawlerDefId = new String();
		this.result = new String();
	}
	
	get crawlerDefId(){ return this._crawlerDefId; }
	set crawlerDefId(value) { this._crawlerDefId = value; }
	
	get result(){ return this._result;	}
	set result(value) { this._result = value; }
	
	
	toJSON() {
	    let {crawlerDefId, result} = this;
	    return {crawlerDefId, result};
	}
	
};