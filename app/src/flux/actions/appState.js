var ReactFlux = require('react-flux');

var userConstants = require('../constants/appState');

module.exports = ReactFlux.createActions({

	setTitle: [userConstants.SET_TITLE, function (title) {
		return {title: title};
	}]

});
