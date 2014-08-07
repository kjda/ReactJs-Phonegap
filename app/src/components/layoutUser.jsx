/** @jsx React.DOM */
var React = require('react');
var __ = require('../flux/stores/lang')._
var UI = require('react-topui');
var Snap = require('snapjs');

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

    <UI.List >
      <UI.ListHeader>
        ReactJs/Phonegap<br />
        TopCoat
      </UI.ListHeader>
      <UI.ListContainer>
        <UI.ListItem>
          <a href="#dashboard" onClick={this.hideNav}>{__('nav.home')}</a>
        </UI.ListItem>
        <UI.ListItem>
          <a href="#settings" onClick={this.hideNav}>{__('nav.settings')}</a>
        </UI.ListItem>
        <UI.ListItem>
          <a href="#logout" onClick={this.hideNav}>{__('nav.logout')}</a>
        </UI.ListItem>
      </UI.ListContainer>
    </UI.List>

    </div>

    <div className="snap-drawer snap-drawer-right">
    </div>
    </div>

    <div ref="content"  className="snap-content" >

    <UI.NavBar>
      <UI.NavBarItem left quarter onClick={this.toggleNav}>
        <UI.Icon name="listview" className='nav-bar-icon' />
      </UI.NavBarItem>
      <UI.NavBarItem center half>
        {this.props.pageTitle}
      </UI.NavBarItem>
      <UI.NavBarItem right quarter>
        {this.renderBackButton()}
      </UI.NavBarItem>
    </UI.NavBar>

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
      <UI.Icon name="back" onTouchStart={this.props.back}  className='nav-bar-icon' />
    );
  }
  
});