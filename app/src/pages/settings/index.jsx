/** @jsx React.DOM */

var React = require('react');
var IScroll = require('../../components/iscroll');
var Navigation = require('./nav');

var __ = require('../../flux/stores/lang')._
var UserStore = require('../../flux/stores/user');
var UserActions = require('../../flux/actions/user');

module.exports = React.createClass({
  
  mixins: [ UserStore.mixin() ],

  getStateFromStores: function(){
    console.log(UserStore.state.get('data'))
    return {
      data: UserStore.state.get('data')
    }
  },

  componentDidMount: function(){
    this.props.setPageTitle(__('settings'));
  },

  onDataChange: function(field){
    var data = this.state.data;
    data[field] = this.refs[field].getDOMNode().value;
    this.setState({
      data: data
    });
    return false;
  },

  save: function(){
    var username = this.refs.username.getDOMNode().value;
    UserActions.edit(username);
    return false;
  },

  render: function() {
    return (
      <div>
      <Navigation />
      <IScroll>
      <div  className="p10">
      <div className="form-group">
      <label>{__('username')}</label>
      <input type="text" 
        ref="username" 
        value={this.state.data.username} 
        className="form-control"
        onChange={this.onDataChange.bind(this, 'username')} />
      </div>
      <div className="form-group">
      <button className="btn btn-primary" onClick={this.save}>{__('Save')}</button>
      </div>
      </div>
      </IScroll>
      </div>
      );
  }
});