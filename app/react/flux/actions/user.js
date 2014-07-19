var constants = require('../constants/user');
var loginService = require("../services/login");

var Fluxy = require('fluxy');

module.exports = Fluxy.createActions({
	serviceActions: {
		login: [constants.LOGIN, function (username, password) {
			return loginService.login(username, password);
		}],
		logout: [constants.LOGOUT, function () {
			return loginService.logout();
		}],
	}
});
