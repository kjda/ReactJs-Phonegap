var React = require('react');
var __ = require('../flux/stores/i18n')._

var UserActions = require('../flux/actions/user');

module.exports = React.createClass({
	componentDidMount: function(){
		UserActions.logout();
	},
	render: function(){
		return <div />;
	}
});