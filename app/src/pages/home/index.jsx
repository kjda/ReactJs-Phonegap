/** @jsx React.DOM */
var React = require('react');
var IScroll = require('../../components/iscroll');
var Navigation = require('./nav');
var Ipsum = require('../../components/ipsum');
var __ = require('../../flux/stores/lang')._

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
      <a href="#login" className="btn btn-default">{__('login')}</a>
      <br />
      <a href="#signup" className="btn btn-default">{__('signup')}</a>
      </div>
      </IScroll>
      );
  }

});