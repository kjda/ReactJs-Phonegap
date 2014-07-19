/** @jsx React.DOM */
var React = require('react');
var SubNav = require('../../components/subNav');
var __ = require('../../flux/stores/i18n')._
module.exports = React.createClass({

  getLinks: function(){
    return [
    {url: '/#settings', label: __('Profile')}, 
    {url: '/#settings/photos', label: __('Photo')}, 
    {url: '/#settings/language', label: __('Language')}
    ];
  },
  
  
  render: function(){
    return (
      <SubNav links={this.getLinks()} />    
      );
  }

});