var ReactFlux = require('react-flux');
var constants = require('../constants/router');

module.exports = ReactFlux.createActions({

	setPath: [constants.SET_PATH, function (path, page, routeParams) {
		return {
			path: path,
			page: page,
			routeParams: routeParams
		};
	}]

});
