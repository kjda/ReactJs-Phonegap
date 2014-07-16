/** @jsx React.DOM */
var React = require('react');
var SubNav = require('../../components/subNav');
var __ = require('../../i18n')._;

module.exports = React.createClass({
  getInitialState: function(){
    return {
      links: [
      {url: '/#settings', label: __('Profile')}, 
      {url: '/#settings/photos', label: __('Photo')}, 
      {url: '/#settings/language', label: __('Language')}
      ]
    }
  },
  render: function(){

    return (
      <SubNav links={this.state.links} />    
      );
  }
});