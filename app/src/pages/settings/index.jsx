/** @jsx React.DOM */

var React = require('react');
var IScroll = require('../../components/iscroll');
var Navigation = require('./nav');

var __ = require('../../flux/stores/lang')._
var UserStore = require('../../flux/stores/user');
var UserActions = require('../../flux/actions/user');

var UI = require('react-topui');

module.exports = React.createClass({

  mixins: [ UserStore.mixin() ],

  getStateFromStores: function(){
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
            <div className="p10">
              <label>{__('username')}</label>
              <br />
              <UI.TextInput
                  full 
                  type="text" 
                  ref="username" 
                  value={this.state.data.username} 
                  onChange={this.onDataChange.bind(this, 'username')} />
            </div>
            <div className="p10">
              <UI.Button 
                  cta 
                  onClick={this.save}>{__('Save')}</UI.Button>
            </div>
        </IScroll>
      </div>
      );
  }
});