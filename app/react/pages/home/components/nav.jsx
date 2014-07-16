/** @jsx React.DOM */

var React = require('react');
var SubNav = require('../../../components/subNav');
var __ = require('../../../i18n')._;

module.exports = React.createClass({
  getInitialState: function(){
    return {
      links: [
      {url: '/#', label: __('Home')}, 
      {url: '/#/test1/param1', label: __('Test1')}, 
      {url: '/#/test2/param2', label: __('Test2')} 
      ]
    }
  },
  
  render: function(){
    return (
      <SubNav links={this.state.links} />    
      );
  }

});