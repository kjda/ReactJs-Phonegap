var ReactFlux = require('react-flux');

var constants = require('../constants/user');

var loginService = require('../services/login');

var Promise = require('promise');

module.exports = ReactFlux.createActions({

	login: [constants.LOGIN, function (email, password) {
		console.log("UserActions.login");
		return loginService.login(email, password);
	}],

	logout: [constants.LOGOUT, function () {
		console.log("UserActions.logout");
		return loginService.logout();
	}],

	edit: [constants.EDIT_DATA, function(username){
		console.log("UserActions.edit");
		return new Promise(function(resolve, reject){
			setTimeout(function(){
				resolve({
					username: username
				});
			}, 1000);
		});
	}]
	
});
