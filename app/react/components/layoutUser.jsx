/** @jsx React.DOM */
var React = require('react');
var __ = require('../flux/stores/i18n')._

module.exports = React.createClass({

  componentDidMount: function(){
    this.snapper = new Snap({
     element: this.refs.content.getDOMNode(),
     flickThreshold: 50,
     disable: 'right'
   });
  },

  toggleNav: function(){
    if( this.snapper.state().state == 'left' ){
      this.snapper.close();
    }
    else{
      this.snapper.open('left');
    }
  },

  hideNav: function(){
    this.snapper.close();
  },

  render: function() {
   return ( 
    <div>
    <div className="snap-drawers">
    <div className="snap-drawer snap-drawer-left">
    <ul>
    <li><a href="/#" onClick={this.hideNav}>{__('nav.home')}</a></li>
    <li><a href="/#settings" onClick={this.hideNav}>{__('nav.settings')}</a></li>
    <li><a href="/#logout" onClick={this.hideNav}>{__('nav.logout')}</a></li>
    </ul>
    </div>

    <div className="snap-drawer snap-drawer-right">
    </div>
    </div>

    <div ref="content"  className="snap-content" >

    <div ref="pageHeader" className="navbar navbar-default" role="navigation">
    <div className="container-fluid">
    <div className="navbar-header">
    {this.renderBackButton()}
    <button className="btn btn-default no-outline home-button" onClick={this.toggleNav} >
    <i className="glyphicon glyphicon-align-justify" />
    </button>

    <div className="page-title">
    {this.props.pageTitle}
    </div>
    </div>
    </div>
    </div>

    <div ref="pageContent" className="page-content">
    {this.props.page}
    </div>

    </div>
    </div>
    );
},
renderBackButton: function(){
  if( !this.props.showBackButton ){
    return;
  }
  return (
    <i className="pull-right ion-ios7-undo back-button" onClick={this.props.back} />
    );
}
});