var ReactFlux = require('react-flux');

var userConstants = require('../constants/user');

var loginService = require('../services/login');

module.exports = ReactFlux.createActions({

	login: [userConstants.USER_LOGIN, function (email, password) {
		console.log("UserActions.login");
		return loginService.login(email, password);
	}],

	logout: [userConstants.USER_LOGOUT, function () {
		console.log("UserActions.logout");
		return loginService.logout();
	}],

	edit: [userConstants.USER_EDIT_DATA, function(username){
		return {
			username: username
		}
	}]
	
});
