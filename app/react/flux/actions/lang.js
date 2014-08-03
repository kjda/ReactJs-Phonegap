var ReactFlux = require('react-flux');
var constants = require('../constants/lang');

module.exports = ReactFlux.createActions({

		setLocale: [constants.SET_LOCALE, function (locale) {
			return {
				locale: locale
			};
		}]

});