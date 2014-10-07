/** @jsx React.DOM */

var React = require('react');
var SubNav = require('../../components/subNav');
var __ = require('../../flux/stores/lang')._
var SubNav = require('../../components/subNav');
var AppStateActions = require('../../flux/actions/appState');

module.exports = React.createClass({

  getLinks: function(){
    return [
      {
        label: __('nav.home'),
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