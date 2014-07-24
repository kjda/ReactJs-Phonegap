var React = require('react');
var __ = require('../flux/stores/i18n')._

var UserActions = require('../flux/actions/user');
var UserStore = require('../flux/stores/user');

module.exports = React.createClass({
	
	componentWillMount: function(){
		UserStore.addChangeListener(this.onUserChange);
	},

	componentDidMount: function(){
		UserActions.logout();
	},
	
	componentWillUnmount: function(){
		UserStore.removeChangeListener(this.onUserChange);
	},
	
	onUserChange: function(){
		window.location.href = '#';
	},

	render: function(){
		return <div />;
	}
});