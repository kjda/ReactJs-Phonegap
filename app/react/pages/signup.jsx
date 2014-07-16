/** @jsx React.DOM */
var React = require('react');
var __ = require('../i18n')._;
var IScroll = require('../components/iscroll');

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
      
      <div className="form-group">
      <input ref="email" type="email" className="form-control" placeholder={__('email')} />
      </div>
      
      <div className="form-group">
      <input ref="username" type="username" className="form-control" placeholder={__('username')}  />
      </div>
      
      <div className="form-group">
      <input ref="password" type="password" className="form-control" placeholder={__('password')} />
      </div>


      <div className="form-group"  >
      <label className="checkbox no-outline" >
      <input ref="terms" type="checkbox"  /> <span style={{margin:10, display: 'inline-block'}}>{__('agree.terms')}</span>
      </label>
      </div>

      <div className="form-group text-center">
      <button ref="submit" type="submit" className="btn btn-primary btn-lg" onClick={this.register}>{__('signup.submot')}</button>
      </div>
      
      </form>
    </div>
    </IScroll>
    );
}
});