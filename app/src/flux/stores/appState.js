var ReactFlux = require('react-flux');
var constants = require('../constants/appState');
var routerConstants = require('../constants/router');
var Lang = require('./lang/index');
var _ = require('underscore');

var Store = ReactFlux.createStore({
	getInitialState: function(){
		return {
			title: '',
			showBackButton: false
		}
	},

	setShowBackButton: function(showBackButton){
		this.setState({
			showBackButton: showBackButton
		});
	}
}, [

	[constants.SET_TITLE_SUCCESS, function(title){
		this.setState({
			title: title
		});
	}],

	[constants.SHOW_BACK_BUTTON_SUCCESS, function(showBackButton){
		this.setShowBackButton(showBackButton);
	}],

	[routerConstants.SET_PATH_SUCCESS, function(payload){
		var showBackButton = (payload.path != '' && payload.path != 'dashboard');
		this.setShowBackButton(showBackButton);
	}]

]);

module.exports = Store;