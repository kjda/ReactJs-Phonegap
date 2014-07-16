/** @jsx React.DOM */

var React = require('react');
var __ = require('../../i18n')._;
var IScroll = require('../../components/iscroll');
var Navigation = require('./nav');

module.exports = React.createClass({
  
  getInitialState: function(){
    return {
      data: this.props.user.getData()
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
    alert('Saving...')
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