/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');
var UI = require('react-topui');

module.exports = React.createClass({
  
  propTypes: {
    links: React.PropTypes.array.isRequired
  },

  nav: function(fragment){
    window.location.href = fragment;
    return false;
  },
  
  render: function(){
    var items = _.map(this.props.links, function(item, key){
    	return(
        <UI.TabBarItem full key={key}  onClick={this.nav.bind(this, item.url)}>
        {item.label}
        </UI.TabBarItem>
       );
    }, this);
    

    return(
    	<UI.TabBar full>
        {items}
      </UI.TabBar>
    );
    
  }
  
});
