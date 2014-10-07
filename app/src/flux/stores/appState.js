var ReactFlux = require('react-flux');
var constants = require('../constants/appState');
var Lang = require('./lang/index');
var _ = require('underscore');

var Store = ReactFlux.createStore({
	getInitialState: function(){
		return {
			title: ''
		}
	}
}, [
	[constants.SET_TITLE_SUCCESS, function(payload){
		this.setState({
			title: payload.title
		});
	}]
]);

module.exports = Store;