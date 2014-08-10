/** @jsx React.DOM */
var React = require('react');
var __ = require('../flux/stores/lang')._
var UI = require('react-topui');
var Snap = require('./snaplayout');
var Ipsum = require('./ipsum');
var IScroll = require('./iscroll');

module.exports = React.createClass({
  render: function() {
    return(
      <Snap.Layout>
        <Snap.Drawers>
          
          <Snap.Left>
            <UI.List >
              <UI.ListHeader>
                ReactJs/Phonegap<br />
                TopCoat
              </UI.ListHeader>
              <UI.ListContainer className="nav-list">
                <UI.ListItem>
                  <a href="#dashboard">{__('nav.home')}</a>
                </UI.ListItem>
                <UI.ListItem>
                  <a href="#settings">{__('nav.settings')}</a>
                </UI.ListItem>
                <UI.ListItem>
                  <a href="#logout">{__('nav.logout')}</a>
                </UI.ListItem>
              </UI.ListContainer>
            </UI.List>
          </Snap.Left>
          
          <Snap.Right>
            <div className="text-justify p10">
              <Ipsum paragraphs={50} />
            </div>
          </Snap.Right>
        
        </Snap.Drawers>
        
        <Snap.Content>

          <UI.NavBar>
            <UI.NavBarItem left quarter>
              <Snap.Toggler side="left">
              <UI.Icon name="listview" className="nav-bar-icon" />
              </Snap.Toggler>
            </UI.NavBarItem>
            <UI.NavBarItem center half>
              {this.props.pageTitle}
            </UI.NavBarItem>
            <UI.NavBarItem right quarter>
              {this.renderBackButton()}
            </UI.NavBarItem>
          </UI.NavBar>

          <div>
            {this.props.page}
          </div>
        </Snap.Content>

      </Snap.Layout>
    );
  },

  renderBackButton: function(){
    if( !this.props.showBackButton ){
      return;
    }
    return (
      <UI.Icon name="back" onClick={this.props.back}  className='nav-bar-icon' />
    );
  }
  
});