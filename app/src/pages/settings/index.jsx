/** @jsx React.DOM */

var React = require('react');
var IScroll = require('../../components/iscroll');
var Navigation = require('./nav');
var AppStateActions = require('../../flux/actions/appState');
var __ = require('../../flux/stores/lang')._
var UserConstants = require('../../flux/constants/user');
var UserStore = require('../../flux/stores/user');
var UserActions = require('../../flux/actions/user');

var UI = require('react-topui');

module.exports = React.createClass({

  mixins: [ UserStore.mixin() ],

  getStateFromStores: function(){
    return {
      data: UserStore.get('data'),
      isSaving: UserStore.getActionState(UserConstants.EDIT_DATA, 'isSaving'),
      success:  UserStore.getActionState(UserConstants.EDIT_DATA, 'success')
    }
  },

  componentDidMount: function(){
    AppStateActions.setTitle(__('settings'));
    UserStore.resetActionState(UserConstants.EDIT_DATA);
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
    var successMsg = null;
    if( this.state.success ){
      successMsg = <span style={{margin: 15}}><UI.Icon name="arrowup" /> Saved!</span>;
    }
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
                  disabled={this.state.isSaving}
                  onClick={this.save}>{__('Save')}</UI.Button>
              {successMsg}
            </div>
        </IScroll>
      </div>
      );
  }
});