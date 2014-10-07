var ReactFlux = require('react-flux');
var constants = require('../constants/router');
var Lang = require('./lang/index');
var _ = require('underscore');

var Store = ReactFlux.createStore({
	getInitialState: function(){
		return {
			path: '',
			page: null,
			routeParams: null
		}
	}
}, [
	
	[constants.SET_PATH_SUCCESS, function(payload){

		this.setState({
			path: payload.path,
			page: payload.page,
			routeParams: payload.routeParams || {}
		});
	}]
	
]);

module.exports = Store;