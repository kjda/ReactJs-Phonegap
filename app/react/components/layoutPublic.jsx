/** @jsx React.DOM */
var React = require('react');
var __ = require('../flux/stores/i18n')._

module.exports = React.createClass({
	render: function() {
		return ( 
			<div ref="content"  className="snap-content">

			<div ref="pageHeader" className="navbar navbar-inverse navbar-fixed" role="navigation">
				<div className="container-fluid">
				<div className="navbar-header">
					<div className="page-title-public">
						{__('app.name')}
					</div>
					<ul className="pull-right" style={{margin: 3}}>
					<li className="pull-left" style={{marginRight:5}}><a href="/#login" className="btn btn-primary navbar-btn">{__('login')}</a></li>
					<li className="pull-left"><a href="/#signup" className="btn btn-success navbar-btn">{__('signup')}</a></li>
					</ul>
				</div>
				</div>
			</div>
			<div className="page-content">
			{this.props.page}
			</div>
			</div>
			);
	}
});