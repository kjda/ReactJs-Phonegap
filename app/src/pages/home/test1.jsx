/** @jsx React.DOM */
var React = require('react');
var SubNav = require('./nav');
var IScroll = require('../../components/iscroll');
var __ = require('../../flux/stores/lang')._
var Ipsum = require('../../components/ipsum');
var AppStateActions = require('../../flux/actions/appState');

module.exports = React.createClass({
    
    componentDidMount: function(){
      AppStateActions.setTitle('Test 1');
    },

    render: function(){
      return (
        <div>
        <SubNav />
        <IScroll>
        <h2>{this.props.routeParams.id}</h2>
        <Ipsum paragraphs={8} />
        </IScroll>
        </div>
        );
    }
});