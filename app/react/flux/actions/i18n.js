var constants = require('../constants/i18n');
var Promise = require('bluebird');
var Fluxy = require('fluxy');

module.exports = Fluxy.createActions({
	serviceActions: {
		setLanguage: [constants.SET_LOCALE, function (locale) {
			var t = Promise.defer();
			t.resolve();
			return t.promise;
		}]
	}
});