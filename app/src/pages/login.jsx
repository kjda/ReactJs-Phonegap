/** @jsx React.DOM */
var React = require('react');
var __ = require('../flux/stores/lang')._

var UserStore = require('../flux/stores/user');
var UserActions = require('../flux/actions/user');

var UI = require('react-topui');

module.exports = React.createClass({
  
  getInitialState: function(){
    return {
      erorr: null
    };
  },

  login: function(){
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    UserActions.login(email, password);
    return false;
  },
  
  componentWillMount: function(){
    UserStore.onChange( this.onUserChange );
  },

  componentWillUnmount: function(){
    UserStore.offChange( this.onUserChange );
  },

  onUserChange: function(){
    if( UserStore.isAuth() ){
      window.location.href = '#dashboard';
    }
  },
  
  render: function() {
    return (
      <div className="p10 text-center">
        <form role="form">

          <div className="p10">
            <label htmlFor="email">{__('email')}</label>
            <UI.TextInput full ref="email" type="email" id="email" value="Maxmustermann" />
          </div>
          
          <div className="p10">
            <label htmlFor="pass">{__('Password')}</label>
            <UI.TextInput full ref="password" type="password" id="pass" value="123456" />
          </div>
          
          {this.renderStatus()}
          
          <div className="p10">
            <UI.Button cta type="submit" onClick={this.login}>{__('login')}</UI.Button>
          </div>
          
        </form>
      </div>
      );
  },

  renderStatus: function(){
    if( !this.state.error ){
      return;
    }
    return <div className="alert alert-danger">{this.state.error}</div>;
  }
});