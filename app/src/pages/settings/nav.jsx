/** @jsx React.DOM */

var React = require('react');
var SubNav = require('../../components/subNav');
var __ = require('../../flux/stores/lang')._
var SubNav = require('../../components/subNav');

module.exports = React.createClass({

  render: function(){
    var links = [
      {
        label: __('Profile'),
        url: '#settings'
      },
      {
        label: __('Photo'),
        url: '#settings/photos'
      },
      {
        label: __('Language'),
        url: '#settings/language'
      }
    ];
    return ( <SubNav links={links} /> );
  }

});