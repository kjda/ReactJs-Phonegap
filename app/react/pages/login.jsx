/** @jsx React.DOM */
var React = require('react');
var __ = require('../flux/stores/i18n')._

var UserStore = require('../flux/stores/user');
var UserActions = require('../flux/actions/user');

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
    UserStore.addChangeListener(this.onUserChange);
  },

  componentWillUnmount: function(){
    UserStore.removeChangeListener(this.onUserChange);
  },

  onUserChange: function(){
    if( UserStore.isAuth() ){
      window.location.href = '#';
    }
  },
  
  render: function() {
    var error = null;
    if( this.state.error ){
      error = <div className="alert alert-danger">{this.state.error}</div>;
    }
    return (
      <div className="p10">
      <form role="form" className="box">
      <div className="form-group">
      <label htmlFor="email">{__('email')}</label>
      <input ref="email" type="email" className="form-control" id="email" />
      </div>
      <div className="form-group">
      <label htmlFor="pass">{__('Password')}</label>
      <input ref="password" type="password" className="form-control" id="pass" />
      </div>
      {error}
      <button type="submit" className="btn btn-default" onClick={this.login}>{__('login')}</button>
      </form>
      </div>
      );
  }
});