var Promise = require('bluebird');
//dummy login service
module.exports = {
  login: function (username, password) {
    var token = Promise.defer();
    setTimeout(function(){
    	token.resolve({
    		_id: 1, 
    		username: username
      });
    }, 0)
    return token.promise;
  },
  logout: function(){
  	var t = Promise.defer();
  	t.resolve();
  	return t.promise;
  }
};