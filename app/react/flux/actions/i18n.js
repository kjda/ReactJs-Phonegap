var ReactFlux = require('react-flux');
var constants = require('../constants/i18n');

module.exports = ReactFlux.createActions({

		setLocale: [constants.I18N_SET_LOCALE, function (locale) {
			return {
				locale: locale
			};
		}]

});