function Request(url, params){

	this.url = url;
	this.params = params;

	this.create = function() {
		return !urlFree() ? url + "?"+ createParams() : null;
	};

	function createParams(){
		if (checkParams()) {
			throw "params array can't be undefined"
		}
		var generated = [];
		for (var index in params) {
			var name = index;
			var value = params[index];
			generated.push(name + "=" + value);
		}
		return generated.join("&");
	}

	function urlFree() { 
		return url.length == 0; 
	}

	function checkParams() {
		return params === undefined;
	}
}