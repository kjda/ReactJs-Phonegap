module.exports = {
	
	getItem: function(key){
		return window.localStorage.getItem(key);
	},

	setItem: function(key, value){
		window.localStorage.setItem(key, value);
	}
};