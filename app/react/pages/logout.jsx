var React = require('react');
var __ = require('../i18n')._;
module.exports = React.createClass({
	componentDidMount: function(){
		this.props.user.clearSession();
		window.location.href= '/#';
	},
	render: function(){
		return <div />;
	}
});