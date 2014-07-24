/** @jsx React.DOM */
var React = require('react');
var IScroll = require('../../components/iscroll');
var Navigation = require('./nav');
var Ipsum = require('../../components/ipsum');
var __ = require('../../flux/stores/i18n')._

module.exports = React.createClass({

  componentDidMount: function(){
    this.props.setPageTitle(__('app.name'));

  },
  render: function(){
    return (
      <div>
      {this.realRender()}
      </div>
      );
  },
  realRender: function(){ 
    if( !this.props.isAuth ){
      return this.renderGuest();
    }
    return (
      <div>
      <Navigation />
      <IScroll>
      <Ipsum paragraphs={10} />
      </IScroll>
      </div>
      );
  },
  renderGuest: function(){
    return(
      <IScroll>
      <div className="text-center">
      <h3>{__('welcome')}</h3>
      <button href="/#login" className="topcoat-button--cta">{__('login')}</button>
      <br />
      <a href="/#signup" className="topcoat-button">{__('signup')}</a>
      </div>
      </IScroll>
      );
  }

});