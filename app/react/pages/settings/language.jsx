/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');
var Navigation = require('./nav');
var LangStore = require('../../flux/stores/lang');
var LangActions = require('../../flux/actions/lang')
var __ = LangStore._;

module.exports = React.createClass({

  getInitialState: function(){
    return this.getStateFromStores();
  },

  getStateFromStores: function(){
    return {
      languages: LangStore.getLanguages(),
      selected: LangStore.getSelected()
    } 
  },

  setPageTitle: function(){
    this.props.setPageTitle(__('language'));
  },

  componentDidMount: function(){
    LangStore.onChange( this.onLanguageChange );
    this.setPageTitle();
  },

  componentWillUnmount: function(){
    LangStore.offChange( this.onLanguageChange );
  },

  onLanguageChange: function(){
    this.setState( this.getStateFromStores() );
    this.setPageTitle();
  },

  selectLang: function(code){
    LangActions.setLocale(code);
    return false;
  },

  render: function(){
    var selected = this.state.selected;
    if( !selected ){
      selected = this.state.languages[0];
    }

    var langs = [];
    _.each(this.state.languages, function(lang){
      var selectedIndicator = null;
      if ( lang.code == selected.code ){
        selectedIndicator = <i className="ion-ios7-checkmark pull-right" style={{fontSize:20}} />;
      }
      langs.push(
        <li key={lang.code} className="list-group-item"  onClick={this.selectLang.bind(this, lang.code)}>
        {selectedIndicator}
        {lang.name}
        </li>
        );
    }.bind(this));
    
    return(
      <div>
      <Navigation />
      <div className="p10">
      <ul className="list-group">
      {langs}                
      </ul>
      </div>
      </div>
      );
  }
});