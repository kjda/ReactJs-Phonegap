/** @jsx React.DOM */
var React = require('react');
var __ = require('../flux/stores/lang')._

var UserActions = require('../flux/actions/user');
var UserStore = require('../flux/stores/user');

module.exports = React.createClass({
	
	componentWillMount: function(){
		UserStore.onChange( this.onUserChange );
	},

	componentWillUnmount: function(){
		UserStore.offChange( this.onUserChange );
	},

	componentDidMount: function(){
		UserActions.logout();
	
	},


	onUserChange: function(){
		if( !UserStore.isAuth() ){
			setTimeout(function(){
				window.location.hash = '#';
			}, 0);
		}
		else{

		}
	},

	render: function(){
		return <div />;
	}
});