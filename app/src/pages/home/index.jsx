/** @jsx React.DOM */
var React = require('react');
var IScroll = require('../../components/iscroll');
var Navigation = require('./nav');
var Ipsum = require('../../components/ipsum');
var __ = require('../../flux/stores/lang')._
var UI = require('react-topui');
var AppStateActions = require('../../flux/actions/appState');

var UserStore = require('../../flux/stores/user');

module.exports = React.createClass({

  componentWillMount: function(){
    if( UserStore.isAuth() ){
      window.location.href = '#dashboard'
    }
  },
  
  componentDidMount: function(){
    AppStateActions.setTitle(__('app.name'));
  },

  render: function(){
     
    return (
      <IScroll>
      
      <div className="text-center">
      <br /><br /><br />
      <UI.Icon name="like" style={{fontSize: '220px', color: 'red', textShadow:'3px 3px 5px #464646'}} />

      <div>

        <UI.LinkButton cta  href="#login">
          {__('login')}
        </UI.LinkButton>
        {' '}
        <UI.LinkButton cta href="#signup">
          {__('signup')}
        </UI.LinkButton>
      </div>

      </div>
      </IScroll>
      );
  }

});