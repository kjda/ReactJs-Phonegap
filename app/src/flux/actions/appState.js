var ReactFlux = require('react-flux');

var constants = require('../constants/appState');

module.exports = ReactFlux.createActions({

	setTitle: [constants.SET_TITLE, function (title) {
		return title;
	}],

	showBackButton: [constants.SHOW_BACK_BUTTON, function (show) {
		return show;
	}]

});
