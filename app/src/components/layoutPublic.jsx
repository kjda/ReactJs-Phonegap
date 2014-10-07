/** @jsx React.DOM */
var React = require('react');
var __ = require('../flux/stores/lang')._

var UI = require('react-topui');
var SubNav = require('./subNav');
module.exports = React.createClass({
	render: function() {
		var links = [
		{label: __('Home'), url: '#'},
		{label: __('Login'), url: '#login'},
		{label: __('Signup'), url: '#signup'}
		]
		return ( 
			<div>
				<UI.NavBar>
					<UI.NavBarItem center full>
						<UI.NavBarTitle center title={__('app.name')} />
					</UI.NavBarItem>
				</UI.NavBar>
				<SubNav links={links} />
				<div>
					{this.props.children}
				</div>
			</div>
		);
	}
});