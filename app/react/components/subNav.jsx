/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

module.exports = React.createClass({
	render: function(){
		var elements = [];
		_.each(this.props.links, function(item, key){
			elements.push(
				<li key={key}><a href={item.url}>{item.label}</a></li>
			);
		})
		return(
		<div className="sub-nav">
      <ul>
      {elements}
      </ul>
    </div>
   );
	}
});