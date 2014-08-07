/** @jsx React.DOM */
var React = require('react');
var IScroll = require('../components/iscroll');
var __ = require('../flux/stores/lang')._
var UI = require('react-topui');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      error: null
    }
  },
  register: function(){
    alert("signup");
    return false;
  },
  render: function() {
    return (
      <IScroll>
      <div className="box">
      <form role="form">
      
      <div className="p5">
        <UI.TextInput full ref="email" type="email" className="p5" placeholder={__('email')} />
      </div>
      
      <div className="p5">
        <UI.TextInput full ref="username" type="username" className="p5" placeholder={__('username')}  />
      </div>
      
      <div className="p5">
        <UI.TextInput full ref="password" type="password" className="p5" placeholder={__('password')} />
      </div>


      <div className="p5"  >
        <UI.Checkbox ref="terms" type="checkbox" label={__('agree.terms')} /> 
      </div>

      <div className="p10 text-center">
        <UI.Button cta ref="submit" type="submit" onClick={this.register}>
          {__('signup.submit')}
        </UI.Button>
      </div>
      
      </form>
      </div>
      </IScroll>
      );
}
});