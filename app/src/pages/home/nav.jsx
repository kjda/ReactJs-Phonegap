/** @jsx React.DOM */

var React = require('react');
var SubNav = require('../../components/subNav');
var __ = require('../../flux/stores/lang')._
var SubNav = require('../../components/subNav');

module.exports = React.createClass({

  getLinks: function(){
    return [
      {
        label: __('Home'),
        url: '#dashboard'
      },
      {
        label: __('Test1'),
        url: '#test1/param1'
      },
      {
        label: __('Test2'),
        url: '#test2/param2'
      }
    ];
  },

  render: function(){
    return ( <SubNav links={this.getLinks()} /> );
  }

});